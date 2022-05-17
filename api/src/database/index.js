import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Contato from '../models/Contato';

const models = [Contato];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
