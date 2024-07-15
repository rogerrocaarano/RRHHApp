import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutPrincipal from "./Layout/LayoutPrincipal";
import { OfferView } from "./Pages/OfferView";
import { UsersView } from "./Pages/UsersView";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

export default function App() {
	return (
		<Router>
			<Routes>
				{/* Rutas sin layout */}
				<Route path='/' element={<Login />} />
				<Route path='/register' element={<Register />} />

				{/* Rutas con layout */}
				<Route
					path='/offerView'
					element={
						<LayoutPrincipal>
							<OfferView />
						</LayoutPrincipal>
					}
				/>
				<Route
					path='/usersList'
					element={
						<LayoutPrincipal>
							<UsersView />
						</LayoutPrincipal>
					}
				/>

				{/* Agrega más rutas con layout aquí */}
			</Routes>
			<ToastContainer />
		</Router>
	);
}
