import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Penyewa from "./penyewa_model.js";
import Kamar from "./kamar_model.js";

const { DataTypes } = Sequelize;

const DaftarSewa = db.define("daftar_sewa", {
  id_sewa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_penyewa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Penyewa,
      key: "id_penyewa",
    },
  },
  kamar_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Kamar,
      key: "kamar_id",
    },
  },
  tgl_mulai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tgl_selesai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status_sewa: {
    type: DataTypes.ENUM("Aktif", "Selesai", "Dibatalkan"),
    defaultValue: "Aktif",
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

// Relasi (Associations)
DaftarSewa.belongsTo(Penyewa, { foreignKey: "id_penyewa" });
DaftarSewa.belongsTo(Kamar, { foreignKey: "kamar_id" });

Penyewa.hasMany(DaftarSewa, { foreignKey: "id_penyewa" });
Kamar.hasMany(DaftarSewa, { foreignKey: "kamar_id" });

db.sync().then(() => console.log("Daftar Sewa model tersinkron"));

export default DaftarSewa;