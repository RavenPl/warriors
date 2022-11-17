import express, {json, urlencoded} from 'express';
import 'express-async-errors';
import {engine} from "express-handlebars";
import {handleError} from "./utils/error";

import {hallOfFameRouter} from "./routers/hall-of-fame";
import {homeRouter} from "./routers/home";
import {arenaRouter} from "./routers/arena";
import {createWarriorRouter} from "./routers/create-warrior";

const app = express()

app.use(json());
app.use(express.static(__dirname + '/public'));
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.use(urlencoded({
    extended: true,
}));

app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/warriors', homeRouter);
app.use('/warriors/arena', arenaRouter);
app.use('/warriors/hall-of-fame', hallOfFameRouter);
app.use('/warriors/create', createWarriorRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('Listening to port 3000. http://localhost:3000/warriors')
});
