import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RiwayatList = () => {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    getRiwayatSewa();
  }, []);

  const getRiwayatSewa = async () => {
    try {
      const response = await axios.get('https://projek-kos-backend-171192151600.us-central1.run.app/riwayat');
      setRiwayat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-full">
        {/* Tombol Back */}
        <Link
          to="/dashboard"
          className="button is-success is-light is-small mb-4"
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          Back
        </Link>

        {/* Judul Tengah */}
        <h1
          className="title is-4"
          style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "30px",
          }}
        >
          Riwayat Sewa
        </h1>

        {/* Tabel */}
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Penyewa</th>
              <th>Alamat</th>
              <th>No. Telepon</th>
              <th>No Kamar</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.map((item, index) => (
              <tr key={item.id_riwayat}>
                <td>{index + 1}</td>
                <td>{item.nama_penyewa}</td>
                <td>{item.alamat_penyewa}</td>
                <td>{item.no_telp_penyewa}</td>
                <td>{item.no_kamar}</td>
                <td>{item.tipe_kamar}</td>
                <td>{item.harga_kamar}</td>
                <td>{item.tanggal_mulai}</td>
                <td>{item.tanggal_selesai}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatList;
