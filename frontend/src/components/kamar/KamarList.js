import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const KamarList = () => {
  const [kamar, setKamar] = useState([]);
  const navigate = useNavigate();

  const authHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    getKamar();
  }, []);

  const getKamar = async () => {
    try {
      const response = await axios.get('https://projek-kos-backend-171192151600.us-central1.run.app/kamar', authHeader());
      setKamar(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKamar = async (kamar_id, status) => {
    if (status === "Terisi") {
      alert("Kamar sedang terisi dan tidak dapat dihapus.");
      return;
    }

    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus kamar ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://projek-kos-backend-171192151600.us-central1.run.app/kamar/${kamar_id}`, authHeader());
      getKamar();
    } catch (error) {
      alert(error.response?.data?.msg || "Gagal menghapus kamar");
      console.log(error);
    }
  };

  const handleEdit = (kamar_id, status) => {
    if (status === "Terisi") {
      alert("Kamar sedang terisi dan tidak dapat diedit.");
      return;
    }

    navigate(`/kamar/edit/${kamar_id}`);
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

        <Link to={'/kamar/add'} className="button is-primary is-light" style={{ marginBottom: '20px' }}>
          Tambah Kamar
        </Link>

        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nomor Kamar</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kamar.map((item, index) => (
              <tr key={item.kamar_id}>
                <td>{index + 1}</td>
                <td>{item.no_kamar}</td>
                <td>{item.tipe_kamar}</td>
                <td>{item.harga}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item.kamar_id, item.status)}
                    className="button is-small is-info is-light"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteKamar(item.kamar_id, item.status)}
                    className="button is-small is-danger is-light"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KamarList;
