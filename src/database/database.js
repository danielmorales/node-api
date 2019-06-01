import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'prueba2',
    'postgres',
    'postgres',
   
    {
        //omitNull: true,
        host:'localhost',
        dialect: 'postgres',
        port:5454,
        pool:{
            max:5,
            min:0,
            aquire:30000,
            idle:10000
        },
        logging: false
    }
)