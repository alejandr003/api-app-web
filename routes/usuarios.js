import express from 'express';
import { UserModel } from '../app/model/usuario/usuario_model.js';
const router = express.Router();
import bcrypt from 'bcrypt';


router.get('/todos', async (req, res) => {
    try {
        const usuarios = await UserModel.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await UserModel.findByPk(id); 
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
    }
});


router.post('/agregar', async (req, res) => {
    try {
        const nuevoUsuario = await UserModel.create(req.body);
        res.status(201).json({ message: 'Usuario creado', usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario', details: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await UserModel.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await usuario.update(req.body);
        res.json({ message: 'Usuario actualizado', usuario });
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el usuario', details: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await UserModel.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        res.json({ message: 'Usuario eliminado', usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
    }
});



router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await UserModel.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(404).send('<h1>Usuario no encontrado</h1>');
        }

        const passwordValida = contraseña === usuario.contraseña;

        if (!passwordValida) {
            return res.status(401).send('<h1>Credenciales inválidas</h1>');
        }

        res.send(`<h1>Bienvenido usuario: ${usuario.nombre}</h1>`);
    } catch (error) {
        res.status(500).send('<h1>Error al procesar el login</h1>');
    }
});

export default router;