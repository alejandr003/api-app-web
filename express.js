import 'dotenv/config';



import app from './app.js';


const port = process.env.PORT || 4001;

if (!port) {
    console.error('Error: El puerto no está definido en las variables de entorno.');
    process.exit(1);
}


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor', details: err.message });
});


app.listen(port, () => {
    console.log(`El backend está escuchando desde el puerto: ${port}`);
});