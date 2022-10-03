import { Sequelize } from 'sequelize';
import { DBConfig } from "./database.config";

const dbConfig: DBConfig = new DBConfig();

export const db: Sequelize = dbConfig.connect();