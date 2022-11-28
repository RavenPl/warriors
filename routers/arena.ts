import {Router} from "express";
import {WarriorRecord} from "../modules/warrior.record";
import {ErrorValidation} from "../utils/error";
import {ArenaRecord} from "../modules/arena.record";

export const arenaRouter = Router();

arenaRouter
    .get('/', async (req, res) => {

        const {id1, id2, gameType} = req.query;

        if (id1 === id2) {
            throw new ErrorValidation(`You can't choose the same warrior!`)
        }

        const warrior1 = await WarriorRecord.getOne(id1 as string);
        const warrior2 = await WarriorRecord.getOne(id2 as string);

        const war1 = {...warrior1};
        const war2 = {...warrior2};

        if (gameType === "text") {
            const arena = new ArenaRecord(warrior1, warrior2);
            const winner = arena.fight();
            const fightLogs = arena.logs;
            await WarriorRecord.updateVictories(winner.id, winner.victories + 1);

            res.render("text-arena", {war1, war2, fightLogs})
        } else {

            res.render("arena", {war1, war2})
        }

    })