import { Model, DataTypes } from 'sequelize';
import { DatabaseConfig } from '../../database/database_config.js';

export class ClienteModel extends Model {}

ClienteModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    edad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    }
}, {
    sequelize: DatabaseConfig,
    modelName: 'clientes',
    timestamps: false,
    tableName: 'clientes'
});