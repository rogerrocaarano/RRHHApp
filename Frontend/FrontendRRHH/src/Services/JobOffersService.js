import axios from "axios";

//Crear Oferta

export function createOffer(data) {
	console.log("esto llega al service", data);
	axios
		.post("http://localhost:5112/api/v1/JobOffers/Create", data)
		.then((response) => {
			console.log("Respeusta satisfactoria creacion de oferta", response.data);
		})
		.catch((error) => {
			console.error("Error en la creacion de oferta:", error);
		});
}
