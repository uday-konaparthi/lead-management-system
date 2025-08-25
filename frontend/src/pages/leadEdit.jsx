import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//fetch lead by id api endpoints
const fetchLeadById = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch lead");
  return await response.json();
};

//update lead by id api endpoints
const updateLead = async (id, data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update lead");
  return await response.json();
};

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    lead_value: "",
    score: "",
    status: "",
    source: "",
    last_activity_at: "",
    is_qualified: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeadById(id)
      .then((data) => {
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          company: data.company || "",
          city: data.city || "",
          state: data.state || "",
          lead_value: data.lead_value || "",
          score: data.score || "",
          status: data.status || "",
          source: data.source || "",
          last_activity_at: data.last_activity_at
            ? new Date(data.last_activity_at).toISOString().slice(0, 16)
            : "",
          is_qualified: data.is_qualified || false,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLead(id, form);
      toast.success("Lead updated successfully!");
      navigate("/leads");
    } catch (err) {
      toast.error("Error updating lead: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6 ">
      <h2 className="text-3xl font-semibold mb-4">Edit Lead</h2>

      <div className="grid grid-cols-3 gap-6">
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name *"
          className="input"
          required
        />
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name *"
          className="input"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email *"
          className="input"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number *"
          className="input"
          required
        />
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company Name *"
          className="input"
          required
        />
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="input"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="input"
        />
        <input
          type="text"
          name="lead_value"
          value={form.lead_value}
          onChange={handleChange}
          placeholder="Lead Value"
          className="input"
        />
        <input
          type="number"
          name="score"
          value={form.score}
          onChange={handleChange}
          placeholder="Score (0-100)"
          min="0"
          max="100"
          className="input"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="select"
          required
        >
          <option value="">Select Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="select"
          required
        >
          <option value="">Select Source</option>
          <option value="website">Website</option>
          <option value="facebook_ads">Facebook Ads</option>
          <option value="google_ads">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="events">Events</option>
          <option value="others">Others</option>
        </select>

        <input
          type="datetime-local"
          name="last_activity_at"
          value={form.last_activity_at}
          onChange={handleChange}
          className="input"
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="is_qualified"
          checked={form.is_qualified}
          onChange={handleChange}
          className="checkbox"
        />
        Qualified Lead?
      </label>

      <button type="submit" className="btn btn-primary btn-outline w-full py-3">
        Update Lead
      </button>
    </form>
  );
};

export default EditLead;
