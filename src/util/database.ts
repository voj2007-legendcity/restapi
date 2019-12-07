import { Sequelize } from 'sequelize-typescript';

const sequelize: Sequelize =  new Sequelize(<string>process.env.SEQ_DATABASE, <string>process.env.SEQ_USER, <string>process.env.SEQ_PASSWORD, 
  {
    host: 'mysql',
    dialect: 'mysql',
    storage: ':memory:',
    models: [__dirname + '/../models/*'],
    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    }
  }
);
export default sequelize;