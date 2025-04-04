import { Sequelize } from 'sequelize';

export const DatabaseConfig = new Sequelize({
    host: 'localhost',
    database: 'cobranzank',
    username: 'root',
    password: '',
    dialect: 'mysql',
    timezone: '-05:00',
    port: 3306,
    logging: false,
    pool: {
        max: 5,
        min: 5,
        acquire: 60000,
        idle: 15000
    }
});

export class Database {
    /**
     * Start the database connection
     * @returns {Promise<{ok: boolean, message: string}>}
     */
    async connection() {
        try {
            await DatabaseConfig.authenticate();
            console.log('la conexion al servidor fue exitosa');
            return { ok: true, message: 'Connection to the database established correctly' };
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return { ok: false, message: `Could not connect to the database. Please check the following: ${error}` }
        }
    }
}