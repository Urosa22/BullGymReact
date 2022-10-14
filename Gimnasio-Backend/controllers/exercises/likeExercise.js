const insertLikeQuery = require('../../db/exerciseQueries/insertLikeQuery');
const selectExerciseByIdQueryForLikes = require('../../db/exerciseQueries/selectExerciseByIdQueryForLikes');

const likeExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        await selectExerciseByIdQueryForLikes(req.user.id, idExercise);

        const like = await insertLikeQuery(idExercise, req.user.id);

        res.send({
            status: 'ok',
            message: like ? 'Like enviado' : 'Like eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = likeExercise;
