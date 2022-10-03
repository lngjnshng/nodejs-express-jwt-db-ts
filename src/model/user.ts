import { Sequelize, Model, DataTypes, CreationOptional } from 'sequelize';
import { db } from '../database';

export interface IUser {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    activated: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class User extends Model {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare activated: boolean;
    declare createdAt: Date | null;
    declare updatedAt: Date | null;
}

User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        activated: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize: db,
        tableName: 'users'
    }
);