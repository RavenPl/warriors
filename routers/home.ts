import {Router} from "express";
import {WarriorRecord} from "../modules/warrior.record";

export const homeRouter = Router();

homeRouter
    .get('/', async (req, res) => {

        const names = (await WarriorRecord.getAll()).map(obj => {
            const {id, name} = obj;
            return {id, name}
        });

        res.render('home', {names});
    })