import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDaftarSewa = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [daftarSewa, setDaftarSewa] = useState(null);
  const [tglSelesaiBaru, setTglSelesaiBaru] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [errorTgl, setErrorTgl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSewa = await axios.get(`http://localhost:5000/sewa/${id}`);
        setDaftarSewa(resSewa.data);
        setTglSelesaiBaru(resSewa.data.tgl_selesai || '');
      } catch (error) {
        console.error(error);
        alert('Gagal mengambil data');
      }
    };
    fetchData();
  }, [id]);

  const handleSimpanPerubahan = async () => {
    if (tglSelesaiBaru < daftarSewa.tgl_mulai) {
      setErrorTgl('Tanggal selesai tidak boleh lebih awal dari tanggal mulai!');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/sewa/${id}`, {
        tgl_selesai: tglSelesaiBaru
      });
      alert('Data sewa berhasil diperbarui.');
      navigate('/sewa');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan perubahan');
    }
  };

  const updateStatusSewa = async (statusBaru) => {
    try {
      const endpoint = statusBaru === 'Selesai' ? 'selesai' : 'batalkan';
      await axios.put(`http://localhost:5000/sewa/${id}/${endpoint}`);
      alert(`Sewa berhasil di${statusBaru === 'Selesai' ? 'akhiri' : 'batalkan'}.`);
      navigate('/sewa');
    } catch (error) {
      console.error(error);
      alert(`Gagal ${statusBaru === 'Selesai' ? 'menyelesaikan' : 'membatalkan'} sewa`);
    }
  };

  if (!daftarSewa) {
    return <div className="has-text-centered mt-6">⏳ Memuat data...</div>;
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <div className="box">
          <h3 className="title is-4">Kelola Sewa</h3>

          <div className="content">
            <p><strong>Nama Penyewa:</strong> {daftarSewa.nama}</p>
            <p><strong>Status Sewa Saat Ini:</strong> {daftarSewa.status_sewa}</p>
            <p><strong>Tanggal Mulai:</strong> {daftarSewa.tgl_mulai}</p>
            <p><strong>Nomor Kamar:</strong> {daftarSewa.no_kamar}</p>

            <div className="field">
              <label className="label">Tanggal Selesai</label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={tglSelesaiBaru}
                  onChange={(e) => {
                    setTglSelesaiBaru(e.target.value);
                    setErrorTgl('');
                  }}
                  disabled={!isEditMode || daftarSewa.status_sewa !== 'Aktif'}
                />
              </div>
              {errorTgl && <p className="help is-danger">{errorTgl}</p>}
            </div>
          </div>

          {daftarSewa.status_sewa === 'Aktif' ? (
            <div className="buttons">
              <button
                onClick={() => updateStatusSewa('Selesai')}
                className="button is-danger is-light"
              >
                ❌ Akhiri Sewa
              </button>

              <button
                onClick={() => {
                  const konfirmasi = window.confirm('Yakin ingin membatalkan sewa ini?');
                  if (konfirmasi) {
                    updateStatusSewa('Dibatalkan');
                  }
                }}
                className="button is-danger is-light"
              >
                🚫 Batalkan Sewa
              </button>

              {!isEditMode ? (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="button is-warning is-light"
                >
                  ✏️ Edit Daftar Sewa
                </button>
              ) : (
                <button
                  onClick={handleSimpanPerubahan}
                  className="button is-success is-light"
                >
                  💾 Simpan Perubahan
                </button>
              )}
            </div>
          ) : daftarSewa.status_sewa === 'Selesai' ? (
            <div className="notification is-success is-light">
              Sewa sudah selesai.
            </div>
          ) : (
            <div className="notification is-danger is-light">
              Sewa telah dibatalkan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDaftarSewa;