import { create } from "zustand";
import {
	loginUser,
	getAllUserFromdb,
	getUserLoggedData,
} from "../Services/UserService";

export const UserStore = create((set) => ({
	userLogged: {},
	allUsers: [],
	loading: false,
	error: null,
	loginUserRequest: async (userToLog) => {
		console.log("llega al store", userToLog);
		set({ loading: true });
		try {
			const response = await loginUser(userToLog);
			console.log("lo que viene del service al store", response);
			// set({ userLogged: response });
			const newResponse = await getUserLoggedData();
			console.log("esto responde el login", newResponse);
			set({ userLogged: newResponse.user });
			return "succes";
		} catch (error) {
			set({ error: error });
			console.log("error en el store", error);
		} finally {
			set({ loading: false });
		}
	},
	logoutStore: () => {
		set({ userLogged: {} });
	},
	getAllUsers: async () => {
		set({ loading: true });
		try {
			const response = await getAllUserFromdb();
			console.log("repuesta en store de todos usuarios");
			set({ allUsers: response });
		} catch (error) {
			console.log(error);
			set({ error: error });
		} finally {
			set({ loading: false });
		}
	},
}));
