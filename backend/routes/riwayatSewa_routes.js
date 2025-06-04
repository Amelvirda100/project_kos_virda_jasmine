import express from "express";
import {
  getRiwayatSewa,
} from "../controller/riwayatSewa_controller.js";

const router = express.Router();

router.get("/riwayat", getRiwayatSewa);
export default router;