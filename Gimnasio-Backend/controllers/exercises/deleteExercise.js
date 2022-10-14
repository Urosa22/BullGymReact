const selectExerciseByIdQuery = require('../../db/exerciseQueries/selectExerciseByIdQuery');
const deleteExerciseByIdQuery = require('../../db/exerciseQueries/deleteExerciseByIdQuery');

const { deletePhoto, generateError } = require('../../helpers');

const deleteExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        const exercise = await selectExerciseByIdQuery(idExercise);

        // If the exercise has an image linked, we delete it.
        if (exercise.image) {
            await deletePhoto(exercise.image);
        }

        await deleteExerciseByIdQuery(idExercise);

        res.send({
            status: 'ok',
            message: 'Ejercicio eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteExercise;
