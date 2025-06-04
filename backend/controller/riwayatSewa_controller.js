import RiwayatSewa from "../models/riwayatSewa_model.js";

// GET (Ambil semua data riwayat sewa)
async function getRiwayatSewa(req, res) {
  try {
    const result = await RiwayatSewa.findAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Gagal mengambil data riwayat sewa" });
  }
}

export { getRiwayatSewa };
