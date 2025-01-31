import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      {/* Sonner Toast Container */}
      <Toaster position="top-center" expand={true} richColors theme="dark" />
    </BrowserRouter>
  );
}

export default App;
