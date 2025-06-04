import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PenyewaList = () => {
  const [penyewa, setPenyewa] = useState([]);
  const [sewaAktif, setSewaAktif] = useState([]);

  const authHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    getPenyewa();
    getSewaAktif();
  }, []);

  const getPenyewa = async () => {
    try {
      const response = await axios.get('http://localhost:5000/penyewa', authHeader());
      setPenyewa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSewaAktif = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sewa', authHeader());
      const aktif = response.data.filter(sewa => sewa.status_sewa !== "Selesai");
      setSewaAktif(aktif);
    } catch (error) {
      console.log(error);
    }
  };

  const isPenyewaSedangSewa = (id_penyewa) => {
    return sewaAktif.some(sewa => sewa.id_penyewa === id_penyewa);
  };

  const deletePenyewa = async (id_penyewa) => {
    if (isPenyewaSedangSewa(id_penyewa)) {
      alert("Penyewa sedang menyewa kamar dan tidak dapat dihapus.");
      return;
    }

    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus penyewa ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/penyewa/${id_penyewa}`, authHeader());
      getPenyewa();
    } catch (error) {
      alert(error.response?.data?.msg || "Gagal menghapus penyewa");
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <Link 
          to="/dashboard" 
          className="button is-success is-light is-small mb-4"
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          Back
        </Link>

        <Link to={'/penyewa/add'} className="button is-primary is-light" style={{ marginBottom: '20px' }}>Tambah Penyewa</Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>No HP</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penyewa.map((item, index) => {
              const sedangSewa = isPenyewaSedangSewa(item.id_penyewa);

              return (
                <tr key={item.id_penyewa}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.alamat}</td>
                  <td>{item.no_telp}</td>
                  <td>
                    <Link
                      to={`/penyewa/edit/${item.id_penyewa}`}
                      className="button is-small is-info is-light"
                      disabled={sedangSewa}
                      style={{ pointerEvents: sedangSewa ? "none" : "auto", opacity: sedangSewa ? 0.5 : 1 }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePenyewa(item.id_penyewa)}
                      className="button is-small is-danger is-light"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenyewaList;
