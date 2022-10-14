const selectAllExercisesQuery = require('../../db/exerciseQueries/selectAllExercisesQuery');

const listExercises = async (req, res, next) => {
    try {
        const { name, type, muscle_group } = req.query;

        const exercises = await selectAllExercisesQuery(
            req.user?.id,
            name,
            type,
            muscle_group
        );

        res.send({
            status: 'ok',
            data: {
                exercises,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listExercises;
