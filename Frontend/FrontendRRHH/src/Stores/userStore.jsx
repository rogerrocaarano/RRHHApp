import { create } from "zustand";
import { loginUser } from "../Services/UserService";

export const UserStore = create((set) => ({
	userLogged: {},
	loading: false,
	error: null,
	loginUserRequest: async (userToLog) => {
		console.log("llega al store", userToLog);
		set({ loading: true });
		try {
			const response = await loginUser(userToLog);
			console.log("lo que viene del service al store", response);
			set({ userLogged: response });
		} catch (error) {
			set({ error: error });
			console.log("error en el store", error);
		} finally {
			set({ loading: false });
		}
	},
}));
