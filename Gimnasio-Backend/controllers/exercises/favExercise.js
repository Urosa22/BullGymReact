const insertFavQuery = require('../../db/exerciseQueries/insertFavQuery');
const selectExerciseByIdQueryForLikes = require('../../db/exerciseQueries/selectExerciseByIdQueryForLikes');

const favExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;
        //Modifico y pongo el const exercise para extraer el exercise y así poder
        //devolverlo al front y mostrarlo.
        await selectExerciseByIdQueryForLikes(req.user.id, idExercise);

        const fav = await insertFavQuery(idExercise, req.user.id);

        res.send({
            status: 'ok',
            message: fav ? 'Añadido a favoritos' : 'Eliminado de favoritos',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = favExercise;
