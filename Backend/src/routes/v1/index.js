const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const seabinRoute = require('./seabin.route');
const reservationRoute = require('./reservation.route');
const documentationRoute = require('./documentation.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [{
    path: '/auth',
    route: authRoute,
},
{
    path: '/users',
    route: userRoute,
},
{
    path: '/seabin',
    route: seabinRoute,
},
{
    path: '/reservation',
    route: reservationRoute,
},
{
    path: '/',
    route: documentationRoute,
},
];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;