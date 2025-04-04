import express from 'express';
import cors from 'cors';


import clientesRoutes from './routes/clientes.js';
import usuariosRoutes from './routes/usuarios.js';


import { Database } from './app/database/database_config.js';
const database = new Database();
database.connection();

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));


app.use('/api/clientes', clientesRoutes);
app.use('/api/usuarios', usuariosRoutes);

export default app;