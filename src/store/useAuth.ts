import { create } from "zustand";
import { AuthState } from "./types";

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  login: async (email, password) => {
    // fake API call (replace with real one)
    await new Promise((res) => setTimeout(res, 1000));

    set({
      user: { id: "1", email },
    });

    console.log("Logged in:", email, password);
  },

  register: async (email, password) => {
    await new Promise((res) => setTimeout(res, 1000));

    set({
      user: { id: "1", email },
      isLoading: false,
    });
    console.log("Registered:", email, password);
  },

  logout: () => {
    set({ user: null });
  },

  checkAuth: async () => {
    try {
      // Example: check token from storage
      // const token = await AsyncStorage.getItem("token");

      await new Promise((res) => setTimeout(res, 1000));

      // if token exists:
    //   set({ user: { id: "1", email: "test@test.com" } });

      set({ user: null }); // default for now
    } finally {
      set({ isLoading: false });
    }
  },
}));