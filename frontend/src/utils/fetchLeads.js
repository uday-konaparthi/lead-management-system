
export const fetchLeads = async ({ page, limit, search }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/leads?page=${page}&limit=${limit}&search=${search}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
