require('dotenv').config();

const getConnection = require('./getConnection');

const bcrypt = require('bcrypt');

async function main() {
    // Variable that will store a free connection to the database.
    let connection;

    try {
        connection = await getConnection();

        await connection.query('DROP TABLE IF EXISTS favs');
        await connection.query('DROP TABLE IF EXISTS likes');
        await connection.query('DROP TABLE IF EXISTS exercises');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL, 
                role ENUM('admin', 'normal', 'employee') NOT NULL DEFAULT 'normal',
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS exercises (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                type ENUM('cardio', 'sala de musculación') NOT NULL,
                muscle_group VARCHAR(50) NOT NULL,
                description TEXT NOT NULL,
                image VARCHAR(100),
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                value BOOLEAN DEFAULT true,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                idExercise INT UNSIGNED NOT NULL,
                FOREIGN KEY (idExercise) REFERENCES exercises (id),
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS favs (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                value BOOLEAN DEFAULT true,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                idExercise INT UNSIGNED NOT NULL,
                FOREIGN KEY (idExercise) REFERENCES exercises (id),
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);

        console.log('¡Tablas creadas!');

        // We encrypt the password of the administrator user.
        const hashedPassword = await bcrypt.hash('123456', 10);

        await connection.query(
            `
            INSERT INTO users (username, email, password, role, createdAt)
            VALUES ('admin', 'admin@admin.com', ?, 'admin', ?)         
            `,
            [hashedPassword, new Date()]
        );
        console.log('¡Usuario administrador creado!');

        // We encrypt the trainer's password.
        const hashedPassword1 = await bcrypt.hash('123456', 10);

        await connection.query(
            `
            INSERT INTO users (username, email, password, role, createdAt)
            VALUES ('david', 'durosa22@gmail.com', ?, 'normal', ?)
            `,
            [hashedPassword1, new Date()]
        );
        console.log('¡Usuario David creado!');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
