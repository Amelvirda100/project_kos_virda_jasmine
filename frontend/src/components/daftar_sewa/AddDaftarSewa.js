import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDaftarSewa = () => {
  const [penyewaList, setPenyewaList] = useState([]);
  const [kamarList, setKamarList] = useState([]);
  const [id_penyewa, setIdPenyewa] = useState('');
  const [kamar_id, setKamarId] = useState('');
  const [tgl_mulai, setTglMulai] = useState('');
  const [tgl_selesai, setTglSelesai] = useState('');
  const [status_sewa, setStatusSewa] = useState('Aktif');

  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const resPenyewa = await axios.get('https://projek-kos-backend-171192151600.us-central1.run.app/penyewa');
      setPenyewaList(resPenyewa.data);

      const resKamar = await axios.get('https://projek-kos-backend-171192151600.us-central1.run.app/kamar');
      console.log('Data kamar dari backend:', resKamar.data);
      setKamarList(resKamar.data.filter(kamar => kamar.status.toLowerCase() === 'kosong'));
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil data penyewa atau kamar');
    }
  };
  fetchData();
}, []);


  const saveDaftarSewa = async (e) => {
    e.preventDefault();

    if (!id_penyewa || !kamar_id || !tgl_mulai) {
      alert('Pilih penyewa, kamar, dan isi tanggal mulai sewa');
      return;
    }

    try {
      // Cek status kamar sebelum buat sewa
      const resKamar = await axios.get(`https://projek-kos-backend-171192151600.us-central1.run.app/kamar/${kamar_id}`);
      if (resKamar.data.status.toLowerCase() !== 'kosong') {
        alert('Kamar tidak tersedia');
        return;
      }

      // Buat entri daftar_sewa
      await axios.post('https://projek-kos-backend-171192151600.us-central1.run.app/sewa', {
        id_penyewa,
        kamar_id,
        tgl_mulai,
        tgl_selesai: tgl_selesai,
        status_sewa
      });

      alert('Data sewa berhasil disimpan');
      navigate('/sewa');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data sewa');
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveDaftarSewa} className="box">
          <h3 className="title is-4">Tambah Daftar Sewa</h3>

          <div className="field">
            <label className="label">Pilih Penyewa</label>
            <div className="select is-fullwidth">
              <select
                value={id_penyewa}
                onChange={(e) => setIdPenyewa(e.target.value)}
                required
              >
                <option value="">-- Pilih Penyewa --</option>
                {penyewaList.map((p) => (
                  <option key={p.id_penyewa} value={p.id_penyewa}>
                    {p.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Pilih Kamar</label>
            <div className="select is-fullwidth">
              <select
                value={kamar_id}
                onChange={(e) => setKamarId(e.target.value)}
                required
              >
                <option value="">-- Pilih Kamar (Nomor) --</option>
                {kamarList.map((k) => (
                  <option key={k.kamar_id} value={k.kamar_id}>
                    {k.no_kamar}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="field">
            <label className="label">Tanggal Mulai Sewa</label>
            <input
              type="date"
              className="input"
              value={tgl_mulai}
              onChange={(e) => setTglMulai(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">Tanggal Selesai Sewa </label>
            <input
              type="date"
              className="input"
              value={tgl_selesai}
              onChange={(e) => setTglSelesai(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Status Sewa</label>
            <input className="input" type="text" value="Aktif" disabled />
          </div>

          <button type="submit" className="button is-primary is-light mt-4">
            💾 Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDaftarSewa;
