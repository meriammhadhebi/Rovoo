const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const http = require('http');

const app = express();
const server = http.createServer(app);


if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());


// enable cors
app.use(cors());
app.options('*', cors());

app.use('/v1', routes);
app.get("/", async function (req, res, next) {
  res.send('Hello To Rovoo Documentation \
----------------------------- \
  I-Authentification \
  I.1-Se connecter : /v1/auth/login \
  I.3-Créer un compte : /v1/auth/register \
  I.4-Se déconnecter : /v1/auth/logout \
  I.5-Mot de passe oublier : /v1/auth/forgot-password \ I.6-Regenerer le mot de passe : /v1/auth/reset-password \
  ----------------------------- \
  II-User \
  II.1-Creer un utilisateur : /v1/users/ \
  II.2-Liste des utilisateurs : /v1/users/ \
  II.3-Creer driver : /v1/users/driver \
  II.4-utilisateur par id : /v1/users/:userID \
  II.5-MAJ d un utilisateur : /v1/users/:userID \
  II.6-Supprimer un utilisateur : /v1/users/:userID \
  ----------------------------- \
  III-Seabin  \
  III.1-Ajouter un seabin : /v1/seabin/ \
  III.2-Liste des seabins : /v1/seabin/ \
  III.3-Supprimer un seabin : /v1/seabin/:id \
  III.3-Modifier le statut d un seabin : /v1/seabin/:id \
  -----------------------------  \
  IV-Reservation    \
  IV.1-Passer une commande : /v1/reservation/ \
  IV.2-Liste des reservations : /v1/reservation/ \
  IV.3-liste des reservations d un seabin donné : /v1/reservation/:id \
  IV.3-Affecter une reservation à un seabin et un driver : /v1/reservation/:id \
  IV.3-liste des reservations d un driver donné : /v1/reservation/driver/:iddriver ');
  
});

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}



// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


module.exports = app;
