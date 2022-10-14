const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectExerciseByIdQueryForLikes = async (idUser, idExercise) => {
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
                    E.createdAt,
                    BIT_OR(L.idUser = ? AND L.value = 1) AS likedByMe,
                    BIT_OR(F.idUser = ? AND F.value = 1) AS favsByMe
                FROM exercises E 
                LEFT JOIN likes L ON  L.idExercise = E.id 
                LEFT JOIN favs F ON  F.idExercise = E.id                
                WHERE E.id = ?                
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
            [idUser, idUser, idExercise]
        );

        if (exercises.length < 1) {
            throw generateError('No se ha encontrado ningún ejercicio', 404);
        }

        return exercises;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectExerciseByIdQueryForLikes;
