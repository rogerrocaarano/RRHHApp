import { useState } from "react";
export function useJobOffer() {
	const [toggleForm, setToggleForm] = useState(false);

	const toggleJobFormModal = () => {
		setToggleForm((prevToggleForm) => !prevToggleForm);
	};

	return { toggleForm, toggleJobFormModal };
}
