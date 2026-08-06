import api from '../lib/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key?: string;
  amount?: number;
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  config?: any;
}


export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface ProcessPaymentParams {
  amountInPaise: number;
  currency?: string;
  description?: string;
  appointmentId?: number;
  userInfo?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess: (paymentResult: any) => void;
  onFailure?: (error: any) => void;
  onDismiss?: () => void;
}

export const processRazorpayPayment = async ({
  amountInPaise,
  currency = 'INR',
  description = 'Appointment Booking Payment',
  appointmentId,
  userInfo,
  onSuccess,
  onFailure,
  onDismiss,
}: ProcessPaymentParams) => {
  try {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
    }

    // Step 1: Call backend to create order
    const orderRes = await api.post('/create-order', {
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${Date.now()}`,
      appointment_id: appointmentId,
    });

    const { order_id, amount, currency: orderCurrency } = orderRes.data;

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Step 2: Configure Razorpay modal
    const options: RazorpayOptions = {
      key: razorpayKey,
      amount,
      currency: orderCurrency,
      name: 'Appointment Booking System',
      description,
      order_id,
      prefill: {
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        contact: userInfo?.contact,
      },
      theme: {
        color: '#4f46e5',
      },

      handler: async function (response) {
        try {
          // Step 3: Verify payment with backend
          const verifyRes = await api.post('/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          onSuccess(verifyRes.data);
        } catch (err: any) {
          const errMsg = err.response?.data?.message || 'Payment verification failed.';
          if (onFailure) {
            onFailure(errMsg);
          }
        }
      },
      modal: {
        ondismiss: function () {
          if (onDismiss) {
            onDismiss();
          }
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      if (onFailure) {
        onFailure(response.error?.description || 'Payment failed. Please try again.');
      }
    });
    rzp.open();
  } catch (err: any) {
    const errMsg = err.response?.data?.message || err.message || 'Failed to initiate payment.';
    if (onFailure) {
      onFailure(errMsg);
    }
  }
};
