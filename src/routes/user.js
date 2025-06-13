import express from 'express';
import bcrypt from 'bcryptjs'; 
import User from '../models/user.model.js'; 
import { userSchema } from '../validation/user.schema.js'; 

const router = express.Router();

// Crear usuario
router.post('/usuario', async (req, res) => {
  try {
    await userSchema.validate(req.body); // validación con Yup

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: passwordHash });
    const savedUser = await newUser.save();
    console.log('Usuario ingresado correctamente')
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Ha ocurrido un error => ', error);
    res.status(400).json({ mensaje: error.message });
  }
});

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
  User.find()
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ mensaje: error.message }));
});

// Obtener un usuario por ID
router.get('/usuario/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(data => {
      if (!data) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      res.json(data);
    })
    .catch(error => res.status(500).json({ mensaje: error.message }));
});

// Eliminar usuario
router.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(data => {
      if (!data) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      res.json({ mensaje: 'Usuario eliminado', data });
    })
    .catch(error => res.status(500).json({ mensaje: error.message }));
});

export default router;
