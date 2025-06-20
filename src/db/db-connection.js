const dotenv = require('dotenv');
dotenv.config();
const mysql2 = require('mysql2');

// Move this above since it's used in query()
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        this.checkConnection();
        this.query = this.query.bind(this);
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                console.error('❌ Database connection error:', err);
            } else {
                console.log("✅ Database connected!");
                connection.release();
            }
        });
    }

    async query(sql, values) {
        return new Promise((resolve, reject) => {
            console.log("Running query:", sql, values); // Debug SQL execution
            this.db.execute(sql, values, (error, result) => {
                if (error) {
                    console.error("❌ Database Error:", error); // Log MySQL errors
                    error.status = HttpStatusCodes[error.code] || 500;
                    reject(error);
                    return;
                }
                // console.log("✅ Query Success:", result); // Log successful execution
                resolve(result);
            });
        });
    }
    
}

// Export a singleton instance
const dbConnection = new DBConnection();
module.exports = dbConnection.query;

