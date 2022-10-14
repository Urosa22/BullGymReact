const getConnection = require('../getConnection');

const updateExerciseQuery = async (
    name,
    type,
    muscle_group,
    description,
    image,
    id
) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE exercises SET name = ?, type = ?, muscle_group = ?, description = ?, image = ?, modifiedAt = ? WHERE id = ?`,
            [name, type, muscle_group, description, image, new Date(), id]
        );
    } finally {
        if (connection) connection.release();
    }
    return { name, type, muscle_group, description, image, id };
};

module.exports = updateExerciseQuery;
