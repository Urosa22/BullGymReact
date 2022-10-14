require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = process.env;

const app = express();

app.use(cors());

// Middleware that makes use of the "morgan" logger.
app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static('./uploads'));

const fileUpload = require('express-fileupload');

// Middleware that deserializes the body and makes it available in "req.body".
app.use(express.json());

// Middleware that deserializes a body with "form-data" format.
app.use(fileUpload());

// MIDDLEWARES
const authUser = require('./middlewares/authUser');
const authUserOptional = require('./middlewares/authUserOptional');
const isAdmin = require('./middlewares/isAdmin.js');
const isNormal = require('./middlewares/isNormal.js');

// USERS ENDPOINTS
const { newUser, loginUser, getOwnUser } = require('./controllers/users');

// User registration.
app.post('/users', newUser);

// User login.
app.post('/users/login', loginUser);

// Info of a logged user.
app.get('/users', authUser, getOwnUser);

// EXERCISES ENDPOINTS
const {
    newExercise,
    listExercises,
    getExercise,
    likeExercise,
    favExercise,
    editExercise,
    deleteExercise,
} = require('./controllers/exercises');

// Create a new exercise.
app.post('/exercises', isAdmin, newExercise);

// List exercises.
app.get('/exercises', authUserOptional, listExercises);

// Info of a specific exercise.
app.get('/exercises/:idExercise', authUser, getExercise);

// Like an exercise.
app.post('/exercises/:idExercise/likes', isNormal, likeExercise);

// Favorite an exercise.
app.post('/exercises/:idExercise/favs', isNormal, favExercise);

// Modify an exercise.
app.put('/exercises/:idExercise', isAdmin, editExercise);

// Delete an exercise.
app.delete('/exercises/:idExercise', isAdmin, deleteExercise);

// MIDDLEWARE OF ERROR
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});
// MIDDLEWARE OF NOT FOUND
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'No encontrado',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:4000`);
});
