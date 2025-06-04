import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPenyewa = () => {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [no_telp, setNoHp] = useState('');
  const navigate = useNavigate();

  const savePenyewa = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/penyewa', {
        nama,
        alamat,
        no_telp
      });
      navigate('/penyewa');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data penyewa');
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={savePenyewa} className="box">
          <h3 className="title is-4">Tambah Penyewa</h3>

          <div className="field">
            <label className="label">Nama</label>
            <input className="input" type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>

          <div className="field">
            <label className="label">Alamat</label>
            <input className="input" type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
          </div>

          <div className="field">
            <label className="label">No. HP</label>
            <input className="input" type="text" value={no_telp} onChange={(e) => setNoHp(e.target.value)} required />
          </div>

          <button type="submit" className="button is-primary is-light mt-4">💾 Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AddPenyewa;
