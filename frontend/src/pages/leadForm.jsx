import React, { useState } from "react";
import toast from "react-hot-toast";

const LeadForm = () => {
  const initialFormState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    leadValue: "",
    score: "",
    status: "",
    source: "",
    last_activity_at: "",
    is_qualified: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitForm = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();
      toast.success("New Lead added");
      setFormData(initialFormState);
    } catch (error) {
      toast.error("Error adding New Lead");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="place-self-center w-full px-10 py-7"
    >
      {/* --- Personal Info --- */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="input"
          placeholder="First Name *"
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="input"
          placeholder="Last Name *"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          placeholder="Email *"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input"
          placeholder="Phone number*"
          required
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="input"
          placeholder="Company Name *"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="input"
          placeholder="City *"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="input"
          placeholder="State *"
          required
        />
        <input
          type="text"
          name="leadValue"
          value={formData.leadValue}
          onChange={handleChange}
          className="input"
          placeholder="Lead Value *"
          required
        />
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          className="input"
          placeholder="Score (0-100) *"
          min="0"
          max="100"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="select"
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
          value={formData.source}
          onChange={handleChange}
          required
          className="select"
        >
          <option value="">Select Source</option>
          <option value="website">Website</option>
          <option value="facebook_ads">Facebook Ads</option>
          <option value="google_ads">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="events">Events</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <input
          type="datetime-local"
          name="last_activity_at"
          value={formData.last_activity_at}
          onChange={handleChange}
          className="input"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_qualified"
            checked={formData.is_qualified}
            onChange={handleChange}
          />
          Qualified Lead?
        </label>
      </div>

      <button className="btn btn-primary btn-outline my-5 px-8">Submit</button>
    </form>
  );
};

export default LeadForm;
