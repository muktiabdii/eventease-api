const UserService = require('../services/UserService');

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password, profile_picture } = req.body;
      const result = await UserService.register({ name, email, password, profile_picture });
      res.status(201).json({ message: 'Registrasi berhasil', data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login({ email, password });
      res.status(200).json({ message: 'Login berhasil', data: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getProfile(req, res) {
    try {
      res.json({ message: 'Berhasil mengambil profil', user: req.user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UserController;
