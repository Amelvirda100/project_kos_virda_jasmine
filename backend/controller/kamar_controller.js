import Kamar from "../models/kamar_model.js";

// GET (ambil semua atau by id)
async function getKamar(req, res) {
  const { id } = req.params;

  try {
    if (id) {
      // Ambil kamar by id
      const kamar = await Kamar.findByPk(id);
      if (!kamar) return res.status(404).json({ message: "Kamar tidak ditemukan" });
      return res.status(200).json(kamar);
    }

    // Ambil semua kamar jika id tidak ada
    const kamars = await Kamar.findAll();
    res.status(200).json(kamars);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

// CREATE
async function createKamar(req, res) {
  try {
    const result = await Kamar.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// UPDATE
// UPDATE (dengan validasi status)
async function updateKamar(req, res) {
  try {
    const { id } = req.params;
    const kamar = await Kamar.findByPk(id);
    if (!kamar) return res.status(404).json({ msg: "Kamar tidak ditemukan" });

    if (kamar.status === "Terisi") {
      return res.status(400).json({ msg: "Kamar sedang terisi dan tidak dapat diedit" });
    }

    await Kamar.update(req.body, { where: { kamar_id: id } });
    return res.status(200).json({ msg: "Kamar berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// DELETE
async function deleteKamar(req, res) {
  try {
    await Kamar.destroy({ where: { kamar_id: req.params.id } });
    return res.status(200).json({ msg: "Kamar berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export { getKamar, createKamar, updateKamar, deleteKamar };
