
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const HttpException = require('../utils/HttpException.utils');
class UserModel {
    tableName = 'user';

    find = async (params = {}) => { 
        try {
            let sql = `SELECT * FROM ${this.tableName}`;

            if (!Object.keys(params).length) {
                return await query(sql);
            }

            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;
            return await query(sql, [...values]);
        } catch(error) {
            return {error:error.sqlMessage};
        }
    }

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params);
            const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;
    
            console.log("Executing SQL:", sql, values); // 🔍 Debugging output
    
            const result = await query(sql, [...values]);
    
            console.log("Query Result:", result); // 🔍 Debugging output
    
            return result.length > 0 ? result[0] : null; // Ensure proper return value
        } catch (error) {
            console.error("Database Error:", error);
            return { error: error.sqlMessage };
        }
    };

    create = async ({ email, password, country, invite_code, role = Role.General, get_bnb = false }) => {
        try {
            const sql = `INSERT INTO ${this.tableName} 
                         (email, password, country, invite_code, role, get_bnb) 
                         VALUES (?, ?, ?, ?, ?, ?)`;
    
            console.log("Executing SQL:", sql, [email, password, country, invite_code, role, get_bnb]); // 🔍 Log SQL query
    
            const result = await query(sql, [email, password, country, invite_code, role, get_bnb]);
            console.log("Insert Result:", result); // 🔍 Check insert result
    
            return result.affectedRows;
        } catch (error) {
            console.error("❌ User registration error:", error); // Log MySQL error
            return { error: error.sqlMessage || error };
        }
    };

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch(error) {
            return {error:error.sqlMessage};
        }
    }

    delete = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `DELETE FROM ${this.tableName}
            WHERE ${columnSet}`;

            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage};
        }
    }
}

module.exports = new UserModel();