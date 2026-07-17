import { useState, useEffect } from "react";
import api from "../../lib/api";
import TitleBlock from "../../components/Admin/Customers/TitleBlock";
import FilterBar from "../../components/Admin/Customers/FilterBar";
import CustomerList from "../../components/Admin/Customers/CustomerList";

interface Customer {
  id: number;
  name: string;
  email: string;
  total_bookings: number;
  created_at?: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minBookings, setMinBookings] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params: any = {
        search,
        sort_by: sortBy,
      };
      if (minBookings !== "") {
        params.min_bookings = minBookings;
      }
      const response = await api.get("/admin/customers", { params });
      setCustomers(response.data || []);
    } catch (err) {
      console.error("Failed to load customers list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, minBookings, sortBy]);

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Title */}
      <TitleBlock />

      {/* Filter and Search Bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        minBookings={minBookings}
        setMinBookings={setMinBookings}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Customers List Table */}
      <CustomerList loading={loading} customers={customers} />
    </div>
  );
}
