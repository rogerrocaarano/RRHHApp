import { apiUSers } from "./BaseApi";
//Servicio de manejo de APi sobre Ofertas

//Registra el usuario
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

//Logea el usuario, no devuelve, solo trae cookie
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
		return "fail in loggin"; // Asegura devolver un valor en caso de error
	}
};
// export const loginUser = async (userToLog) => {
// 	console.log("el usuario para logear en services", userToLog);
// 	try {
// 		const { data } = await apiUSers.post(
// 			"/login?useCookies=true&useSessionCookies=true",
// 			userToLog
// 		);
// 		console.log("Response de login", data);
// 		data &&
// 		return data;
// 	} catch (err) {
// 		console.log("Error al del login:", err);
// 		return "fail in loggin";
// 	}

// };
//Informacion del usuario logeado
export const getUserLoggedData = async () => {
	try {
		const { data } = await apiUSers.get("api/v1/Users/MyUser");
		console.log("Response de oferta", data);
		return data;
	} catch (err) {
		console.log("Error al trater las Ofertas:", err);
	}
};

//Traer todos los usuarios, si soy Admin
export const getAllUserFromdb = async () => {
	try {
		const { data } = await apiUSers.get("api/v1/Users");
		console.log("Response de oferta", data);
		return data;
	} catch (err) {
		console.log("Error al trater las Ofertas:", err);
	}
};
