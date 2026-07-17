import { useState, useEffect } from "react";
import api from "../../lib/api";
import Toast from "../../components/Toast";
import TitleBlock from "../../components/Admin/Services/TitleBlock";
import SearchBar from "../../components/Admin/Services/SearchBar";
import ServiceList from "../../components/Admin/Services/ServiceList";
import ServiceFormModal from "../../components/Admin/Services/ServiceFormModal";

interface Service {
  id: number;
  name: string;
  description?: string;
  duration: number;
  price: string;
  is_active: boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/services", { params: { search } });
      setServices(response.data?.data || response.data || []);
    } catch (err) {
      console.error("Failed to load services list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const openCreateModal = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const openEditModal = (srv: Service) => {
    setEditingService(srv);
    setModalOpen(true);
  };

  const handleDelete = async (id: number, srvName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${srvName}"?`))
      return;
    try {
      await api.delete(`/admin/services/${id}`);
      fetchServices();
      setToast({
        type: "success",
        message: `Service "${srvName}" has been deleted.`,
      });
    } catch (err) {
      console.error("Delete failed:", err);
      setToast({ type: "error", message: "Failed to delete service." });
    }
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Title block */}
      <TitleBlock openCreateModal={openCreateModal} />

      {/* Filter and Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Services List Grid */}
      <ServiceList
        loading={loading}
        services={services}
        openEditModal={openEditModal}
        handleDelete={handleDelete}
      />

      {/* Create / Edit Service Modal */}
      {modalOpen && (
        <ServiceFormModal
          editingService={editingService}
          onClose={() => setModalOpen(false)}
          onSuccess={(msg) => {
            setModalOpen(false);
            fetchServices();
            setToast({ type: "success", message: msg });
          }}
        />
      )}

      {/* Toast notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
