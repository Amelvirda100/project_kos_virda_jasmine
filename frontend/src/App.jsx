import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import KamarList from './components/kamar/KamarList';
import AddKamar from './components/kamar/AddKamar';
import EditKamar from './components/kamar/EditKamar';
import PenyewaList from './components/penyewa/PenyewaList';
import AddPenyewa from './components/penyewa/AddPenyewa';
import EditPenyewa from './components/penyewa/EditPenyewa';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import Register from "./components/Register";
import SewaList from "./components/daftar_sewa/SewaList";
import AddDaftarSewa from "./components/daftar_sewa/AddDaftarSewa";
import EditDaftarSewa from "./components/daftar_sewa/EditDaftarSewa";
import RiwayatList from './components/riwayat_sewa/RiwayatList';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <>
                <Navbar />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Kamar Routes */}
        <Route path="/kamar" element={token ? <KamarList /> : <Navigate to="/login" replace />} />
        <Route path="/kamar/add" element={token ? <AddKamar /> : <Navigate to="/login" replace />} />
        <Route path="/kamar/edit/:id" element={token ? <EditKamar /> : <Navigate to="/login" replace />} />

        {/* Penyewa Routes */}
        <Route path="/penyewa" element={token ? <PenyewaList /> : <Navigate to="/login" replace />} />
        <Route path="/penyewa/add" element={token ? <AddPenyewa /> : <Navigate to="/login" replace />} />
        <Route path="/penyewa/edit/:id" element={token ? <EditPenyewa /> : <Navigate to="/login" replace />} />

        {/* Penyewaan Routes */}
        <Route path="/sewa" element={token ? <SewaList /> : <Navigate to="/login" replace />} />
        <Route path="/sewa/add" element={token ? <AddDaftarSewa /> : <Navigate to="/login" replace />} />
        <Route path="/sewa/edit/:id" element={token ? <EditDaftarSewa /> : <Navigate to="/login" replace />} />

        {/* Riwayat Routes */}
        <Route path="/riwayat" element={token ? <RiwayatList /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
