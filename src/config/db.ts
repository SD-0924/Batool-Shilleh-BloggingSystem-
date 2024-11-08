import {Sequelize} from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'BloggingSystem',
    logging: false,
    dialectOptions: {
        charset: 'utf8mb4', 
      },
})

export default sequelize