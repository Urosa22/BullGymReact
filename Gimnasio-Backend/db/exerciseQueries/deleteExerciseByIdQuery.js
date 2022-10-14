const getConnection = require('../getConnection');

const deleteExerciseByIdQuery = async (idExercise) => {
    let connection;

    try {
        connection = await getConnection();
        //Primero eliminamos los likes si tiene
        await connection.query(`DELETE FROM likes WHERE idExercise = ?`, [
            idExercise,
        ]);
        //Eliminamos los favs si tiene para poder luego borrar el ejercicio
        await connection.query(`DELETE FROM favs WHERE idExercise = ?`, [
            idExercise,
        ]);

        await connection.query(`DELETE FROM exercises WHERE id = ?`, [
            idExercise,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteExerciseByIdQuery;
