import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Landing />} />

        {/* Protected routes with sidebar layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detection" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>

        {/* Redirect any unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Sonner Toast Container */}
      <Toaster position="bottom-right" expand={true} richColors theme="dark" />
    </Router>
  );
}

export default App;
