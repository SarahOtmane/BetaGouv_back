import { Sequelize } from 'sequelize';

const getDbConfig = () => {
    const isTestEnv = process.env.NODE_ENV === 'test';

    return {
        dbName: isTestEnv ? process.env.MYSQL_DATABASE_TEST! : process.env.MYSQL_DATABASE!,
        dbDialect: process.env.DB_DIALECT as any || 'mysql',
    };
};

const { dbName, dbDialect } = getDbConfig();

const sequelize = new Sequelize(dbName, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: dbDialect,
    logging: (msg) => console.log(`SQL Query: ${msg}`),
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to the ${process.env.NODE_ENV === 'test' ? 'test' : 'development'} database!`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;
