export const deleteLead = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to delete lead");
    return await response.json();
  } catch (error) {
    return error;
  }
};
