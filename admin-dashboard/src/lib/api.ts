const { VITE_BASE_URL } = import.meta.env;

export const deleteUser = async (id: string): Promise<{ message: string }> =>
  (
    await fetch(`${VITE_BASE_URL}/users/${id}`, {
      method: "DELETE",
    })
  ).json();
