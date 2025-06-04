import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditKamar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [no_kamar, setNoKamar] = useState('');
  const [tipe_kamar, setTipeKamar] = useState('Ekonomi');
  const [harga, setHarga] = useState('');
  const [status, setStatus] = useState('Kosong');

  useEffect(() => {
    const fetchKamar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/kamar/${id}`);
        setNoKamar(res.data.no_kamar);
        setTipeKamar(res.data.tipe_kamar);
        setHarga(res.data.harga);
        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
        alert('Gagal mengambil data kamar');
      }
    };
    fetchKamar();
  }, [id]);

  const updateKamar = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/kamar/${id}`, {
        no_kamar,
        tipe_kamar,
        harga,
        status
      });
      navigate('/kamar');
    } catch (err) {
      console.error(err);
      alert('Gagal mengupdate kamar');
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateKamar} className="box">
          <h3 className="title is-4">Edit Kamar</h3>

          <div className="field">
            <label className="label">Nomor Kamar</label>
            <input className="input" type="text" value={no_kamar} onChange={(e) => setNoKamar(e.target.value)} required />
          </div>

          <div className="field">
            <label className="label">Tipe Kamar</label>
            <div className="select is-fullwidth">
              <select value={tipe_kamar} onChange={(e) => setTipeKamar(e.target.value)}>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Standar">Standar</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Harga</label>
            <input className="input" type="number" value={harga} onChange={(e) => setHarga(e.target.value)} required />
          </div>

          <div className="field">
            <label className="label">Status</label>
            <div className="select is-fullwidth">
              <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="Kosong">Kosong</option>
                <option value="Terisi">Terisi</option>
              </select>
            </div>
          </div>

          <button type="submit" className="button is-warning is-light mt-4">🔄 Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditKamar;