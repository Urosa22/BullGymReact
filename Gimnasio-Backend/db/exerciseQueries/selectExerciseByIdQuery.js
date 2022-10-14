const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectExerciseByIdQuery = async (idExercise) => {
    let connection;

    try {
        connection = await getConnection();

        let [exercises] = await connection.query(
            `
                SELECT E.id, 
                    E.name,
                    E.type,
                    E.muscle_group,
                    E.description,                    
                    E.image,
                    E.modifiedAt,
                    E.createdAt
                FROM exercises E              
                WHERE E.id = ?                
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
            [idExercise]
        );

        if (exercises.length < 1) {
            throw generateError('No se ha encontrado ningún ejercicio', 404);
        }

        return exercises;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectExerciseByIdQuery;
