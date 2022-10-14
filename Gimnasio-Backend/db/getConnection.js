const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un pool (un listado) de conexiones.
let pool;

// Función que retorna una conexión libre.
const getConnection = async () => {
    try {
        // If there is no connection pool, we create it.
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z', // All dates are stored in the same time zone.
            });
        }

        // We return a free connection.
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
        throw new Error('Error al conectar con MySQL');
    }
};

module.exports = getConnection;
