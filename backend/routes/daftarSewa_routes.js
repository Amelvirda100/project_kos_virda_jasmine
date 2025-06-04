import express from "express";
import {
  getAllSewa,
  getSewabyId,
  createDaftarSewa,
  updateDaftarSewa,
  selesaiSewa,
  batalkanSewa,
} from "../controller/daftarSewa_controller.js";

const router = express.Router();

router.get("/sewa", getAllSewa);          // Ambil semua daftar sewa
router.get("/sewa/:id", getSewabyId);      // Ambil satu data sewa
router.post("/sewa", createDaftarSewa);      // Tambah data sewa
router.put("/sewa/:id", updateDaftarSewa); // Hapus data sewa
router.put('/sewa/:id/selesai', selesaiSewa);
router.put('/sewa/:id/batalkan', batalkanSewa);


export default router;