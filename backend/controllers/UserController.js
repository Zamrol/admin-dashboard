import User from "../model/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['user_id', 'name', 'email', 'address', 'role'],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['user_id', 'name', 'email', 'address', 'role'],
      where: { user_id: req.params.id },
    });
    if (!response) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confPassword, address, role } = req.body;

    if (!name || !email || !password || !confPassword || !address || !role) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    const hashPassword = await argon2.hash(password);

    await User.create({
      name,
      email,
      password: hashPassword,
      address,
      role,
    });

    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.error("Error saat membuat user:", error.message); // Tambahkan log
    res.status(400).json({ msg: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.params.id },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const { name, email, password, confPassword, address, role } = req.body;
    let hashPassword = user.password;

    if (password) {
      if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
      }
      hashPassword = await argon2.hash(password);
    }

    await User.update(
      {
        name: name || user.name,
        email: email || user.email,
        password: hashPassword,
        address: address || user.address,
        role: role || user.role,
      },
      { where: { user_id: req.params.id } }
    );
    res.status(200).json({ msg: "User berhasil diubah" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.params.id },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    await User.destroy({
      where: { user_id: req.params.id },
    });
    res.status(200).json({ msg: "User Berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
