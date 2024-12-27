import { createPool, Pool } from 'mysql2/promise';
require('dotenv').config();

class db {
    private pool: Pool;
    isProduction = process.env.NODE_ENV === 'production';

    constructor() {
        this.pool = createPool({
            host: this.isProduction ? process.env.DB_HOST : process.env.DB_HOST_DEV,
            user: this.isProduction ? process.env.DB_USER : process.env.DB_USER_DEV,
            password: this.isProduction ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_DEV,
            database: this.isProduction ? process.env.DB_DATABASE : process.env.DB_DATABASE_DEV,
            charset: 'utf8mb4',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        console.log('MySQL pool was created...');
        console.log(this.isProduction);
        console.log(process.env.DB_HOST, process.env.DB_HOST_DEV);
    }

    public async query(sql: string) {
        try {
            const connection = await this.pool.getConnection();
            console.log('MySQL connected...');

            const [rows, fields] = await connection.query(sql);
            connection.release();
            console.log('MySQL released...');

            return { rows, fields };
        } catch (error) {
            console.error(`
        !Error while mysql query. \n
        Error: ${error}.\n
        Query: ${sql}.\n
      `);
        }
    }

    public async close() {
        try {
            await this.pool.end();
            console.log('MySQL connection closed.');
        } catch (error) {
            console.log('Error while closing the connection: ', error);
        }
    }

    public async createTables() {
        await this.createUsersTable();
        await this.changeFormat();

        console.log('MySQL tables was created');
    }

    private async createUsersTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          password VARCHAR(255) NOT NULL
      );
    `;
        await this.query(sql);
    }

    private async changeFormat(){
        const sql1 = `ALTER DATABASE sql7752594 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`;
        const sql2 = `ALTER TABLE todos CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`;
        const sql3 = `ALTER TABLE todos MODIFY text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`;
        await this.query(sql1);
        await this.query(sql2);
        await this.query(sql3);
    }

}

export default new db();
