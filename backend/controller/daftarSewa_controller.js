import DaftarSewa from "../models/daftarSewa_model.js";
import Penyewa from "../models/penyewa_model.js";
import Kamar from "../models/kamar_model.js";
import RiwayatSewa from "../models/riwayatSewa_model.js";
import { Op } from "sequelize";

// ======================= GET SEMUA =======================
export const getAllSewa = async (req, res) => {
  try {
    await checkExpiredSewa();

    const data = await DaftarSewa.findAll({
      include: [
        { model: Penyewa, attributes: ['id_penyewa', 'nama'] },
        { model: Kamar, attributes: ['kamar_id', 'no_kamar'] }
      ],
      order: [['id_sewa', 'ASC']]
    });

    const hasil = data.map(item => ({
      id_sewa: item.id_sewa,
      id_penyewa: item.id_penyewa,
      kamar_id: item.kamar_id,
      tgl_mulai: item.tgl_mulai,
      tgl_selesai: item.tgl_selesai,
      status_sewa: item.status_sewa,
      nama: item.penyewa?.nama,
      no_kamar: item.kamar?.no_kamar
    }));

    res.json(hasil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ======================= GET BY ID =======================
export const getSewabyId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await DaftarSewa.findOne({
      where: { id_sewa: id },
      include: [
        { model: Penyewa, attributes: ['id_penyewa', 'nama'] },
        { model: Kamar, attributes: ['kamar_id', 'no_kamar'] }
      ]
    });

    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    const hasil = {
      id_sewa: data.id_sewa,
      id_penyewa: data.id_penyewa,
      kamar_id: data.kamar_id,
      tgl_mulai: data.tgl_mulai,
      tgl_selesai: data.tgl_selesai,
      status_sewa: data.status_sewa,
      nama: data.penyewa?.nama,
      no_kamar: data.kamar?.no_kamar
    };

    res.json(hasil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ======================= CREATE =======================
export const createDaftarSewa = async (req, res) => {
  const { id_penyewa, kamar_id, tgl_mulai, tgl_selesai } = req.body;

  try {
    const kamar = await Kamar.findByPk(kamar_id);
    if (!kamar) return res.status(404).json({ message: "Kamar tidak ditemukan" });
    if (kamar.status === "Terisi") return res.status(400).json({ message: "Kamar sedang terisi" });

    const sewaAktif = await DaftarSewa.findOne({
      where: { kamar_id, status_sewa: "Aktif" }
    });
    if (sewaAktif) return res.status(400).json({ message: "Kamar ini sedang disewa oleh penyewa lain" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tglSelesai = new Date(tgl_selesai);
    tglSelesai.setHours(0, 0, 0, 0);
    if (tglSelesai < today) return res.status(400).json({ message: "Tanggal selesai tidak boleh kurang dari hari ini" });

    const sewaBaru = await DaftarSewa.create({ id_penyewa, kamar_id, tgl_mulai, tgl_selesai, status_sewa: "Aktif" });
    await kamar.update({ status: "Terisi" });

    const sewaLengkap = await DaftarSewa.findOne({
      where: { id_sewa: sewaBaru.id_sewa },
      include: [
        { model: Penyewa, required: true },
        { model: Kamar, required: true }
      ]
    });

    await simpanRiwayat(sewaLengkap, "aktif");

    res.status(201).json({ message: "Sewa berhasil dibuat", sewa: sewaBaru });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat membuat sewa" });
  }
};

// ======================= UPDATE =======================
export const updateDaftarSewa = async (req, res) => {
  const { id } = req.params;
  const { tgl_mulai, tgl_selesai, id_penyewa } = req.body;

  try {
    const sewa = await DaftarSewa.findByPk(id, {
      include: [
        { model: Penyewa, required: true },
        { model: Kamar, required: true }
      ]
    });
    if (!sewa) return res.status(404).json({ message: "Sewa tidak ditemukan" });

    let perubahan = false;

    if (tgl_selesai) {
      const tglBaru = new Date(tgl_selesai);
      const tglLama = new Date(sewa.tgl_selesai);
      if (tglBaru <= tglLama)
        return res.status(400).json({ message: "Tanggal selesai baru harus lebih besar dari sebelumnya" });

      sewa.tgl_selesai = tgl_selesai;
      perubahan = true;
    }

    if (tgl_mulai) {
      sewa.tgl_mulai = tgl_mulai;
      perubahan = true;
    }

    if (id_penyewa) {
      sewa.id_penyewa = id_penyewa;
      perubahan = true;
    }

    if (!perubahan)
      return res.status(400).json({ message: "Tidak ada perubahan dilakukan" });

    await sewa.save();

    // Setelah data diperbarui, simpan ke riwayat dengan tanggal baru
    await simpanRiwayat(sewa, "diperpanjang");

    res.json({ message: "Data sewa berhasil diperbarui", sewa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui data sewa" });
  }
};


// ======================= SELESAIKAN =======================
export const selesaiSewa = async (req, res) => {
  try {
    const { id } = req.params;

    const sewa = await DaftarSewa.findOne({
      where: { id_sewa: id },
      include: [
        { model: Penyewa, required: true },
        { model: Kamar, required: true }
      ]
    });
    if (!sewa) return res.status(404).json({ msg: "Sewa tidak ditemukan" });

    await simpanRiwayat(sewa, "selesai");

    await Kamar.update({ status: "Kosong" }, { where: { kamar_id: sewa.kamar_id } });
    await DaftarSewa.destroy({ where: { id_sewa: id } });

    res.json({ msg: "Sewa selesai dan data dipindahkan ke riwayat_sewa." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// ======================= BATALKAN =======================
export const batalkanSewa = async (req, res) => {
  try {
    const { id } = req.params;

    const sewa = await DaftarSewa.findOne({
      where: { id_sewa: id },
      include: [
        { model: Penyewa, required: true },
        { model: Kamar, required: true }
      ]
    });
    if (!sewa) return res.status(404).json({ msg: "Sewa tidak ditemukan" });

    await simpanRiwayat(sewa, "dibatalkan");

    await Kamar.update({ status: "Kosong" }, { where: { kamar_id: sewa.kamar_id } });
    await DaftarSewa.destroy({ where: { id_sewa: id } });

    res.json({ msg: "Sewa dibatalkan dan dipindah ke riwayat_sewa." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// ======================= CEK EXPIRED =======================
export const checkExpiredSewa = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const expiredSewa = await DaftarSewa.findAll({
      where: {
        tgl_selesai: { [Op.lt]: today },
        status_sewa: "Aktif"
      },
      include: [
        { model: Penyewa, required: true },
        { model: Kamar, required: true }
      ]
    });

    for (const sewa of expiredSewa) {
      await simpanRiwayat(sewa, "otomatis selesai");
      await Kamar.update({ status: "Kosong" }, { where: { kamar_id: sewa.kamar_id } });
      await DaftarSewa.destroy({ where: { id_sewa: sewa.id_sewa } });
    }

    if (expiredSewa.length > 0) {
      console.log(`${expiredSewa.length} sewa otomatis dipindahkan ke riwayat`);
    }
  } catch (error) {
    console.error("Gagal cek sewa otomatis:", error.message);
  }
};

// ======================= SIMPAN RIWAYAT (HELPER) =======================
async function simpanRiwayat(sewa, statusDesc) {
  if (!sewa.penyewa || !sewa.kamar) {
    throw new Error("Relasi penyewa atau kamar tidak ditemukan!");
  }

  return await RiwayatSewa.create({
    nama_penyewa: sewa.penyewa.nama,
    alamat_penyewa: sewa.penyewa.alamat,
    no_telp_penyewa: sewa.penyewa.no_telp,
    no_kamar: sewa.kamar.no_kamar,
    tipe_kamar: sewa.kamar.tipe_kamar,
    harga_kamar: sewa.kamar.harga,
    tanggal_mulai: sewa.tgl_mulai,
    tanggal_selesai: sewa.tgl_selesai,
    status: statusDesc
  });
}
