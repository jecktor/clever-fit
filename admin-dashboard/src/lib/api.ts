import type { Analytics } from "../types";

const { VITE_BASE_URL } = import.meta.env;

export const deleteUser = async (
  id: string,
  adminEmail: string,
): Promise<{ message: string }> =>
  (
    await fetch(`${VITE_BASE_URL}/users/${id}/${adminEmail}`, {
      method: "DELETE",
    })
  ).json();

export const getAnalytics = async (): Promise<Analytics> =>
  (await fetch(`${VITE_BASE_URL}/analytics`)).json();
