import express, {json, urlencoded} from 'express';
import 'express-async-errors';
import {warriorRouter} from "./routers/warrior";
import {hallOfFameRouter} from "./routers/hall-of-fame";
import {engine} from "express-handlebars";
import {homeRouter} from "./routers/home";
import {handleError} from "./utils/error";
import {arenaRouter} from "./routers/arena";

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

app.use('/', homeRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);
app.use('/warrior', warriorRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('Listening to port 3000. http://localhost:3000')
});
