import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Leads from "./pages/leads";
import LeadEdit from "./pages/leadEdit";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import NewLead from "./pages/leadForm";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profilepage";
import { useEffect } from "react";
import ErrorPage from "./pages/404-page";

function App() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate()

  useEffect(() => {
    if(user == null) navigate('/login')
  }, [user])

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div
      className={`flex min-h-screen bg-base-200 overflow-x-hidden overflow-hidden max-h-screen`}
    >
      {user === null ? null : (
        <div className="md:w-64 md:block bg-base-100 border-r shadow-sm">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {user === null ? null : <Navbar />}
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/edit/:id" element={<LeadEdit />} />
            <Route path="/create" element={<NewLead />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
