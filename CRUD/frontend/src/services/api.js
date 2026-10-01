 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/customers/`);

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
};

export const updateCustomer = async (id, customerData) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  return response.json();
};

export const getCampaign = async (id) => {
  const response = await fetch(`${API_BASE_URL}/campaigns/${id}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch campaign");
  }

  return response.json();
};

export const startCampaign = async (campaignData) => {
  const response = await fetch(`${API_BASE_URL}/campaigns/start/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaignData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || "Failed to start campaign"
    );
  }

  return response.json();
};
export const getCampaigns = async () => {
  const response = await fetch(`${API_BASE_URL}/campaigns/`);

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return response.json();
};