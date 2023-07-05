import { useContext } from "react";
import { Context } from "./context/Context";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import ResetPassword from './pages/ResetPassword';
import Records from "./pages/Records";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/Patient";
import Profile from "./pages/Profile";
import AddPatient from "./pages/AddPatient";
import AddPatientMedication from "./pages/AddPatientMedication";
import GetTagID from "./pages/GetTagID";

function App() {
  const { user } = useContext(Context);
  const loginClient = new QueryClient();
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <QueryClientProvider client={loginClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="records" element={<Records />} />
            <Route path="records/:id" element={user ? <Patient /> : <Home />} />
            <Route path="records/addMedication/:id" element={user ? <AddPatientMedication /> : <Home />} />
            <Route path="about" element={<About />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="getPatientFacialId" element={<GetTagID />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addPatient" element={<AddPatient />} />
            <Route path="*"
              element={
                <div className="shadow-lg grid place-self-center mt-20 py-20 w-3/4 mx-auto text-white  justify-center text-center">
                  <p className="text-7xl pt-3 m-3">😮404😮</p>
                  <p className="text-lg  m-2">There's nothing here!</p>
                  <Link className="btn btn-accent text-2xl" to="/">
                    🏡Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </QueryClientProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
