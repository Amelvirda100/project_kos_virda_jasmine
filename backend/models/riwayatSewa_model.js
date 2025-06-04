import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const RiwayatSewa = db.define("riwayat_sewa", {
  id_riwayat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_penyewa: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  alamat_penyewa: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  no_telp_penyewa: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  no_kamar: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  tipe_kamar: {
    type: DataTypes.ENUM("Ekonomi", "Standar", "VIP"),
    allowNull: false,
  },
  harga_kamar: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tanggal_mulai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tanggal_selesai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("aktif", "selesai", "dibatalkan", "diperpanjang"),
    allowNull: false,
    defaultValue: "aktif"
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

db.sync().then(() => console.log("Riwayat Sewa model tersinkron"));

export default RiwayatSewa;
