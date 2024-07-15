import { apiUSers } from "./BaseApi";
//Servicio de manejo de APi sobre Ofertas

//Traer todas las Offertas
export const registerUser = async (newUser) => {
	console.log("llega al register", newUser);
	try {
		const { data } = await apiUSers.post("/register", newUser);
		console.log("Response de Register", data);
		return "succes";
	} catch (err) {
		console.log("Error al usar el Register:", err);
		return err;
	}
};

//Crear Oferta
export const loginUser = async (userToLog) => {
	console.log("el usuario para logear en services", userToLog);
	try {
		const { data } = await apiUSers.post(
			"/login?useCookies=true&useSessionCookies=true",
			userToLog
		);
		console.log("Response de login", data);
		return data;
	} catch (err) {
		console.log("Error al del login:", err);
		return err;
	}
};
