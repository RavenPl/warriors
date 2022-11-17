import {Router} from "express";
import {pool} from "../utils/db";
import {WarriorRecord} from "../modules/warrior.record";
import {FieldPacket} from "mysql2";

export const hallOfFameRouter = Router();

hallOfFameRouter
    .get('/', async (req, res) => {

        const [data] = await pool.execute('SELECT * FROM `warriors` ORDER BY `victories` DESC , `name` ASC LIMIT 10 ') as [WarriorRecord[], FieldPacket[]];

        const list = data.map((obj, i) => {
            const {victories, name} = obj;
            return {
                victories,
                name,
                position: i + 1
            }
        });

        res.render('hall-of-fame', {list});
    })