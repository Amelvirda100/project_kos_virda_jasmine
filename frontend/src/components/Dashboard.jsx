import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import '../styles/bentuk.css'; 
import { FaBed, FaUsers, FaClipboardList, FaBars, FaHistory } from "react-icons/fa";

const Dashboard = () => {
  const [totalKamar, setTotalKamar] = useState(0);
  const [totalPenyewa, setTotalPenyewa] = useState(0);
  const [totalSewaAktif, setTotalSewaAktif] = useState(0);
  const [sidebarActive, setSidebarActive] = useState(true);
  const [totalRiwayatSewa, setTotalRiwayatSewa] = useState(0);
  
  const location = useLocation();

  useEffect(() => {
    getTotalData();
  }, []);

  const getTotalData = async () => {
    try {
      const kamarRes = await axios.get("http://localhost:5000/kamar");
      const penyewaRes = await axios.get("http://localhost:5000/penyewa");
      const sewaRes = await axios.get("http://localhost:5000/sewa");
      const riwayatRes = await axios.get("http://localhost:5000/riwayat");

      setTotalKamar(kamarRes.data.length);
      setTotalPenyewa(penyewaRes.data.length);
      setTotalSewaAktif(sewaRes.data.filter(s => s.status_sewa === "Aktif").length);
      setTotalRiwayatSewa(riwayatRes.data.length);

    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
    }
  };

  

  const isActive = (path) =>
    location.pathname === path ? "active-menu" : "";

  return (
    <>
      {/* Sidebar toggle button */}
      <button
        id="sidebarToggleBtn"
        className={`btn btn-dark ${sidebarActive ? "active" : ""}`}
        style={{ marginTop: "70px" }}
        onClick={() => setSidebarActive(!sidebarActive)}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <ul>
          <li className={isActive("/dashboard")}>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
              <FaClipboardList style={{ marginRight: "10px" }} />
              Dashboard
            </Link>
          </li>
          <li className={isActive("/kamar")}>
            <Link to="/kamar" style={{ textDecoration: "none", color: "white" }}>
              <FaBed style={{ marginRight: "10px" }} />
              Data Kamar
            </Link>
          </li>
          <li className={isActive("/sewa")}>
            <Link to="/sewa" style={{ textDecoration: "none", color: "white" }}>
              <FaClipboardList style={{ marginRight: "10px" }} />
              Data Sewa
            </Link>
          </li>
          <li className={isActive("/penyewa")}>
            <Link to="/penyewa" style={{ textDecoration: "none", color: "white" }}>
              <FaUsers style={{ marginRight: "10px" }} />
              Data Penyewa
            </Link>
          </li>
          <li className={isActive("/riwayat")}>
            <Link to="/riwayat" style={{ textDecoration: "none", color: "white" }}>
              <FaHistory style={{ marginRight: "10px" }} />
              Riwayat Sewa
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <div className={`container-fluid ${sidebarActive ? "active" : ""}`} style={{ paddingTop: "70px" }}>


        

        <main className="p-4">
          <div className="noti-box bg-color-green panel-custom">
            <div className="icon-box bg-color-blue">
              <FaBed />
            </div>
            <div className="text-box">
              <p className="main-text">{totalKamar}</p>
              <p>Total Kamar</p>
            </div>
          </div>

          <div className="noti-box bg-color-red panel-custom" style={{ marginTop: "20px" }}>
            <div className="icon-box bg-color-green">
              <FaUsers />
            </div>
            <div className="text-box">
              <p className="main-text">{totalPenyewa}</p>
              <p>Total Penyewa</p>
            </div>
          </div>

          <div className="noti-box bg-color-brown panel-custom" style={{ marginTop: "20px" }}>
            <div className="icon-box bg-color-red">
              <FaClipboardList />
            </div>
            <div className="text-box">
              <p className="main-text">{totalSewaAktif}</p>
              <p>Sewa Aktif</p>
            </div>
            </div>

          <div className="noti-box bg-color-purple panel-custom" style={{ marginTop: "20px" }}>
            <div className="icon-box bg-color-brown">
              <FaHistory />
            </div>
            <div className="text-box">
              <p className="main-text">{totalRiwayatSewa}</p>
              <p>Riwayat Sewa</p>
            </div>
          </div>

          
        </main>
      </div>
    </>
  );
};

export default Dashboard;
