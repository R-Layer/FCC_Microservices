const express = require('express');

// Session libraries
const session = require('express-session');
const memoryStore = require('memorystore')(session);
const uuidv4 = require('uuid/v4');

// Controllers
const parseHeader = require('./components/header-parser/headerParser');
const getMetadata = require('./components/local-metadata/locaMetadata');
const timestampModule = require('./components/timestamp/timestamp');
const urlShortener = require('./components/urlShortener/urlShortener');
const imageSearch = require('./components/imageSearch/imageSearch');
const imageArchive = require('./components/imageSearch/imageArchive');
const errController = require('./components/errors/errorController');

const servicesInfo = require('./servicesDescription');

const app = express();

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
};

const port = process.env.PORT || 5000;

app.use(session({
    store: new memoryStore({
        checkPeriod: 24 * 60 * 60 * 1000 // one day
    }),
    genid: req => uuidv4(),
    name: 'microservice.tmp',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(parseHeader);

app.use((req, res, next) => {
    res.locals.servicesInfo = servicesInfo;
    res.locals.headerParser = req.session.headerParser;
    res.locals.metadata = req.session.metadata;
    res.locals.timestamp = req.session.timestamp;
    res.locals.shortener = req.session.shortener;
    res.locals.shortener_addr = req.session.shortener_addr;
    res.locals.images = req.session.images;
    next();
});

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'pug');

app.post('/upload', getMetadata);

app.post('/api/shorturl/new/:urlToCheck', urlShortener);

app.get('/api/timestamp/:date_string', timestampModule);
// Handle 'no param sent' cases
app.get('/api/timestamp', (req, res) => {
    res.redirect('/api/timestamp/ ')
});

app.get('/api/imagesearch/:name', imageSearch);
app.get('/api/latest/imagesearch', imageArchive);


app.get('/metadata', (req, res) => {
    res.render('main');
});

app.get('/shorten', (req, res) => {
    res.render('main');
});

app.get('/', (req, res) => {
    res.render('main');
});

app.use(errController.send404);
app.use(errController.send500);

app.listen(port, () => console.log(`Server listening on port ${port}`));