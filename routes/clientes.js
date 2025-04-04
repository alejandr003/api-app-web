import express from 'express';
import { ClienteModel } from '../app/model/cliente/cliente_model.js'; 
const router = express.Router();


router.get('/todos', async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes', details: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await ClienteModel.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente', details: error.message });
    }
});


router.post('/agregar', async (req, res) => {
    try {
        const nuevoCliente = await ClienteModel.create(req.body);
        res.status(201).json({ message: 'Cliente creado', cliente: nuevoCliente });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el cliente', details: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await ClienteModel.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        await cliente.update(req.body);
        res.json({ message: 'Cliente actualizado', cliente });
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el cliente', details: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await ClienteModel.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        await cliente.destroy();
        res.json({ message: 'Cliente eliminado', cliente });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente', details: error.message });
    }
});

export default router;