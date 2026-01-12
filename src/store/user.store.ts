"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
	name: string;
	email?: string;
}

interface UserState {
	user: User | null;
	isLoading: boolean;
	setUser: (user: User | null) => void;
	hydrate: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			isLoading: true,

			setUser: (user) => {
				set({ user });
			},

			hydrate: () => {
				set({ isLoading: false });
			},
		}),
		{
			name: "user",
			partialize: (state) => ({ user: state.user }),
			onRehydrateStorage: () => (state) => {
				state?.hydrate();
			},
		},
	),
);
