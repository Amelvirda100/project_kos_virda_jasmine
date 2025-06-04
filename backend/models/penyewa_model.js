import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Penyewa = db.define("penyewa", {
  id_penyewa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  no_telp: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

db.sync().then(() => console.log("Penyewa model tersinkron"));

export default Penyewa;
