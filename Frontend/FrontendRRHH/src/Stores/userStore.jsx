import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	loginUser,
	getAllUserFromdb,
	getUserLoggedData,
} from "../Services/UserService";

export const UserStore = create(
	persist(
		(set, get) => ({
			userLogged: { user: [], roles: [] },
			allUsers: [],
			loading: false,
			error: null,
			loginUserRequest: async (userToLog) => {
				get().logoutStore();
				console.log("llega al store", userToLog);
				set({ loading: true });
				try {
					const response = await loginUser(userToLog);
					console.log("lo que viene del service al store", response);
					const finallyResponse = get().getUserLoggedData();
					return finallyResponse;
				} catch (error) {
					set({ error: error });
					console.log("error en el store", error);
				} finally {
					set({ loading: false });
				}
			},
			getUserLoggedData: async () => {
				set({ loading: true });
				try {
					const newResponse = await getUserLoggedData();
					console.log("esto responde el login", newResponse);
					set({ userLogged: newResponse });
					return "succes";
				} catch (error) {
					set({ error: error });
					console.log("error en el store", error);
				} finally {
					set({ loading: false });
				}
			},
			logoutStore: () => {
				document.cookie =
					".AspNetCore.Identity.Application=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				set({ userLogged: {} });
			},
			getAllUsers: async () => {
				set({ loading: true });
				try {
					const response = await getAllUserFromdb();
					console.log("repuesta en store de todos usuarios", response);
					set({ allUsers: response });
				} catch (error) {
					console.log(error);
					set({ error: error });
				} finally {
					set({ loading: false });
				}
			},
		}),
		{
			name: "user-store", // Nombre de la clave en localStorage
			getStorage: () => localStorage, // Puedes cambiar esto si deseas usar otro almacenamiento
		}
	)
);
