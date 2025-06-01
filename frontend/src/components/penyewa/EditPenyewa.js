import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPenyewa = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [no_hp, setNoHp] = useState('');

  useEffect(() => {
    const fetchPenyewa = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/penyewa/${id}`);
        setNama(res.data.nama);
        setAlamat(res.data.alamat);
        setNoHp(res.data.no_hp);
      } catch (err) {
        console.error(err);
        alert('Gagal mengambil data penyewa');
      }
    };
    fetchPenyewa();
  }, [id]);

  const updatePenyewa = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/penyewa/${id}`, {
        nama,
        alamat,
        no_hp
      });
      navigate('/penyewa');
    } catch (err) {
      console.error(err);
      alert('Gagal mengupdate data penyewa');
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updatePenyewa} className="box">
          <h3 className="title is-4">Edit Penyewa</h3>

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
            <input className="input" type="text" value={no_hp} onChange={(e) => setNoHp(e.target.value)} required />
          </div>

          <button type="submit" className="button is-warning is-light mt-4">🔄 Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditPenyewa;
