import { Model, DataTypes } from 'sequelize';
import { DatabaseConfig } from '../../database/database_config.js';

export class UserModel extends Model {}

UserModel.init({
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
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    estatus: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
            len: [0, 1]
        }
    },
}, {
    sequelize: DatabaseConfig, // Pass the sequelize instance
    modelName: 'usuarios',
    timestamps: false,
    tableName: 'usuarios'
});