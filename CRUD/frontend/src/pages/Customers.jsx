 import { useEffect, useState } from "react";

import {
  getCustomers,
  updateCustomer,
  startCampaign,
} from "../services/api";

import "./Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingCustomer, setEditingCustomer] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company_name: "",
    service_type: "",
    vehicle_number: "",
    last_service_date: "",
  });

  // Campaign state per customer
  const [campaignTypes, setCampaignTypes] = useState({});
  const [campaignLoading, setCampaignLoading] = useState({});
  const [campaignMessage, setCampaignMessage] = useState({});

  // =========================
  // LOAD CUSTOMERS
  // =========================

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers();

      setCustomers(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // =========================
  // EDIT CUSTOMER
  // =========================

  const handleEdit = (customer) => {
    setEditingCustomer(customer);

    setFormData({
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      company_name: customer.company_name || "",
      service_type: customer.service_type || "",
      vehicle_number: customer.vehicle_number || "",
      last_service_date: customer.last_service_date || "",
    });
  };

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // =========================
  // UPDATE CUSTOMER
  // =========================

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const updatedCustomer = await updateCustomer(
        editingCustomer.id,
        formData
      );

      setCustomers((currentCustomers) =>
        currentCustomers.map((customer) =>
          customer.id === updatedCustomer.id
            ? updatedCustomer
            : customer
        )
      );

      setEditingCustomer(null);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // =========================
  // CAMPAIGN TYPE
  // =========================

  const handleCampaignTypeChange = (customerId, value) => {
    setCampaignTypes((current) => ({
      ...current,
      [customerId]: value,
    }));
  };

  // =========================
  // START CAMPAIGN
  // =========================

  const handleStartCampaign = async (customerId) => {
    const type =
      campaignTypes[customerId] || "re-engagement";

    setCampaignLoading((current) => ({
      ...current,
      [customerId]: true,
    }));

    setCampaignMessage((current) => ({
      ...current,
      [customerId]: "",
    }));

    try {
      const campaign = await startCampaign({
        customer: customerId,
        campaign_type: type,
      });

      setCampaignMessage((current) => ({
        ...current,
        [customerId]: `Campaign #${campaign.id} created successfully.`,
      }));
    } catch (err) {
      setCampaignMessage((current) => ({
        ...current,
        [customerId]: err.message,
      }));
    } finally {
      setCampaignLoading((current) => ({
        ...current,
        [customerId]: false,
      }));
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search) ||
      customer.company_name?.toLowerCase().includes(search) ||
      customer.phone?.toLowerCase().includes(search) ||
      customer.vehicle_number?.toLowerCase().includes(search)
    );
  });

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="customers-loading">
        <div className="loading-spinner"></div>
        <p>Loading customers...</p>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="customers-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="customers-header">

        <div>
          <h1>Customers</h1>

          <p>
            Manage customers and start engagement campaigns
          </p>
        </div>

        {/* Search */}
        <div className="customer-search">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search customer..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

      </div>

      {error && (
        <div className="customer-error">
          {error}
        </div>
      )}

      {/* =========================
          CUSTOMER LIST
      ========================= */}

      <div className="customers-list">

        {filteredCustomers.length === 0 ? (
          <div className="no-customers">
            <h3>No customers found</h3>

            <p>
              Try searching with another name,
              email or vehicle number.
            </p>
          </div>
        ) : (
          filteredCustomers.map((customer) => {

            const initials =
              customer.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "CU";

            const selectedCampaign =
              campaignTypes[customer.id] ||
              "re-engagement";

            const isCampaignLoading =
              campaignLoading[customer.id];

            const message =
              campaignMessage[customer.id];

            return (
              <div
                key={customer.id}
                className="customer-card"
              >

                {/* =========================
                    CUSTOMER TOP
                ========================= */}

                <div className="customer-top">

                  <div className="customer-identity">

                    <div className="customer-avatar">
                      {initials}
                    </div>

                    <div className="customer-name-area">

                      <div className="customer-name-row">

                        <h2>
                          {customer.name}
                        </h2>

                        <span className="customer-id">
                          Customer ID: {customer.id}
                        </span>

                      </div>

                      <p>
                        {customer.company_name ||
                          "Automobile Customer"}
                      </p>

                    </div>

                  </div>

                  <div className="customer-status">
                    <span></span>
                    Active
                  </div>

                </div>

                {/* =========================
                    CUSTOMER DETAILS
                ========================= */}

               <div className="customer-details-grid">

  {/* Phone */}
  <div className="detail-item">
    <div className="detail-label">
      <span className="detail-icon">☎</span>
      <span>Phone</span>
    </div>

    <div className="detail-value">
      <input
        type="text"
        value={customer.phone || ""}
        readOnly
      />
    </div>
  </div>

  {/* Service */}
  <div className="detail-item">
    <div className="detail-label">
      <span className="detail-icon">🔧</span>
      <span>Service Used</span>
    </div>

    <div className="detail-value">
      <input
        type="text"
        value={customer.service_type || ""}
        readOnly
      />
    </div>
  </div>

  {/* Email */}
  <div className="detail-item">
    <div className="detail-label">
      <span className="detail-icon">✉</span>
      <span>Email</span>
    </div>

    <div className="detail-value">
      <input
        type="text"
        value={customer.email || ""}
        readOnly
      />
    </div>
  </div>

  {/* Date of Service */}
  <div className="detail-item">
    <div className="detail-label">
      <span className="detail-icon">▣</span>
      <span>Date of Service</span>
    </div>

    <div className="detail-value readonly">
      <input
        type="text"
        value={customer.last_service_date || ""}
        readOnly
      />
    </div>
  </div>

  {/* Company */}
  <div className="detail-item">
    <div className="detail-label">
      <span className="detail-icon">▦</span>
      <span>Company</span>
    </div>

    <div className="detail-value">
      <input
        type="text"
        value={customer.company_name || ""}
        readOnly
      />
    </div>
  </div>

  {/* Vehicle */}
  <div className="detail-item">
    <div className="detail-label">
      <span className="detail-icon">🚗</span>
      <span>Vehicle</span>
    </div>

    <div className="detail-value">
      <input
        type="text"
        value={customer.vehicle_number || ""}
        readOnly
      />
    </div>
  </div>

</div>

                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="customer-actions">

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() =>
                      handleEdit(customer)
                    }
                  >
                    ✎
                    <span>Edit</span>
                  </button>

                </div>

                {/* =========================
                    EDIT FORM
                ========================= */}

                {editingCustomer?.id === customer.id && (
                  <div className="edit-customer-panel">

                    <h3>Edit Customer</h3>

                    <form
                      onSubmit={handleUpdate}
                      className="edit-customer-form"
                    >

                      <div>
                        <label>Name</label>

                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label>Phone</label>

                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label>Email</label>

                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label>Company</label>

                        <input
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label>Service Type</label>

                        <input
                          name="service_type"
                          value={formData.service_type}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label>Date of Service</label>

                        <input
                          type="date"
                          name="last_service_date"
                          value={formData.last_service_date}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label>Vehicle Number</label>

                        <input
                          name="vehicle_number"
                          value={formData.vehicle_number}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="edit-form-actions">

                        <button
                          type="submit"
                          className="save-button"
                        >
                          Save Changes
                        </button>

                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() =>
                            setEditingCustomer(null)
                          }
                        >
                          Cancel
                        </button>

                      </div>

                    </form>

                  </div>
                )}

                {/* =========================
                    START CAMPAIGN
                ========================= */}

                <div className="campaign-section">

                  <div className="campaign-info">

                    <div className="campaign-icon">
                      📣
                    </div>

                    <div>
                      <h3>
                        Start Campaign
                      </h3>

                      <p>
                        Select a campaign type to
                        start customer engagement
                      </p>
                    </div>

                  </div>

                  <div className="campaign-control">

                    <label>
                      Campaign Type
                    </label>

                    <select
                      value={selectedCampaign}
                      onChange={(event) =>
                        handleCampaignTypeChange(
                          customer.id,
                          event.target.value
                        )
                      }
                    >
                      <option value="re-engagement">
                        Re-engagement
                      </option>

                      <option value="feedback">
                        Feedback
                      </option>

                      <option value="broadcast">
                        Broadcast
                      </option>
                    </select>

                  </div>

                  <button
                    type="button"
                    className="start-campaign-button"
                    onClick={() =>
                      handleStartCampaign(
                        customer.id
                      )
                    }
                    disabled={isCampaignLoading}
                  >
                    <span>▶</span>

                    {isCampaignLoading
                      ? "Starting..."
                      : "Start Campaign"}
                  </button>

                </div>

                {message && (
                  <div
                    className={
                      message.includes("successfully")
                        ? "campaign-success"
                        : "campaign-error"
                    }
                  >
                    {message}
                  </div>
                )}

              </div>
            );
          })
        )}

      </div>

      {/* =========================
          EDIT MODAL
      ========================= */}

    </div>
  );
}

export default Customers;