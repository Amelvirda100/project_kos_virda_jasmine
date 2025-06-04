import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route
import AdminRoute from "./routes/admin_routes.js";
import KamarRoute from "./routes/kamar_routes.js";
import PenyewaRoute from "./routes/penyewa_routes.js";
import DaftarSewaRoute from "./routes/daftarSewa_routes.js";
import RiwayatSewaRoute from "./routes/riwayatSewa_routes.js";

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "https://g-13-450802.uc.r.appspot.com",
  credentials: true,
}));
app.use(express.json());

// Tes endpoint
app.get("/", (req, res) => res.send("API berjalan"));

// Pakai semua route
app.use(AdminRoute);
app.use(KamarRoute);
app.use(PenyewaRoute);
app.use(DaftarSewaRoute);
app.use(RiwayatSewaRoute);

app.listen(5000, () => console.log("Server nyambung di port 5000"));
