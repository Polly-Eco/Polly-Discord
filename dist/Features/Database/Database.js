"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = require("sequelize");
class Database extends sequelize_1.Sequelize {
    constructor(options) {
        super(options);
    }
    async tryConn() {
        try {
            await this.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    async setupDatabase() {
        const CREATE_DATABASE = 'CREATE DATABASE "local-dev";';
        try {
            await this.query(CREATE_DATABASE);
        }
        catch {
            console.log('the database already exists');
        }
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map