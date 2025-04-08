import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });
    return res.status(200).json({ message: 'Login exitoso', user: { _id: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role } });
  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  return res.status(200).json(req.user);
});

export default router;