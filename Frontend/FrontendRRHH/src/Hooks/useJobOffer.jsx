import { useState } from "react";
export function useJobOffer() {
	const [toggleForm, setToggleForm] = useState(false);

	const toggleJobFormModal = () => {
		console.log("cambio el estado");
		setToggleForm((prevToggleForm) => !prevToggleForm);
	};
	console.log(toggleForm);

	return { toggleForm, toggleJobFormModal };
}
