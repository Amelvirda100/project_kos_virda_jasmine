import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddKamar = () => {
  const [no_kamar, setNoKamar] = useState('');
  const [tipe_kamar, setTipeKamar] = useState('Ekonomi');
  const [harga, setHarga] = useState('');
  const navigate = useNavigate();

  const saveKamar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://projek-kos-backend-171192151600.us-central1.run.app/kamar', {
        no_kamar,
        tipe_kamar,
        harga,
      });
      navigate('/kamar');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan kamar');
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveKamar} className="box">
          <h3 className="title is-4">Tambah Kamar</h3>

          <div className="field">
            <label className="label">Nomor Kamar</label>
            <input className="input" type="text" value={no_kamar} onChange={(e) => setNoKamar(e.target.value)} />
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
            <input className="input" type="number" value={harga} onChange={(e) => setHarga(e.target.value)} />
          </div>

          <div className="field">
            <label className="label">Status Kamar</label>
            <input className="input" type="text" value="Kosong" disabled />
          </div>

          <button type="submit" className="button is-primary is-light mt-4">💾 Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AddKamar;
