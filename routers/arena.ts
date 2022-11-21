import {Router} from "express";
import {WarriorRecord} from "../modules/warrior.record";
import {ErrorValidation} from "../utils/error";


export const arenaRouter = Router();

arenaRouter
    .get('/', async (req, res) => {

        const {id1, id2, gameType} = req.query;

        if (id1 === id2) {
            throw new ErrorValidation(`You can't choose the same warrior!`)
        }

        const warrior1 = await WarriorRecord.getOne(id1 as string);
        const warrior2 = await WarriorRecord.getOne(id2 as string);
        // const area = new AreaRecord(warrior1, warrior2);
        // const winner = area.fight();

        res.render(`${gameType}`, {warrior1, warrior2})
    })