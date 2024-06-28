import { Aside } from "./Components/CommonComponents/Aside";
import { Navbar } from "./Components/CommonComponents/Navbar.1";

function App() {
  return (
    <main className="w-svw h-svh overflow-x-hidden bg-slate-100">
      <Navbar />
      <Aside />
    </main>
  );
}

export default App;
