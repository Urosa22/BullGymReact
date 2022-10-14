const insertUserQuery = require('../../db/userQueries/insertUserQuery');

const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        // We get the fields of the body.
        const { name, email, password } = req.body;

        // If any field is missing we throw an error.
        if (!name || !email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // We insert a new user in the database.
        await insertUserQuery(name, email, password);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
