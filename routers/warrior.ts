import {Router} from "express";
import {WarriorRecord} from "../modules/warrior.record";

export const warriorRouter = Router();

warriorRouter

    .get('/', async (req, res) => {
        // console.log(await WarriorRecord.getAll());

        res.render('create-form')
    })

    .post('/add', async (req, res) => {


        const {name, healPoints, strength, defence, agility} = req.body as WarriorRecord;

        const newWarrior = new WarriorRecord(
            name,
            Number(strength),
            Number(defence),
            Number(healPoints),
            Number(agility)
        );
        console.log(newWarrior);

        await WarriorRecord.hasName(name);
        // newWarrior.totalPointsValidator();
        console.log(newWarrior);
        await newWarrior.insert();

        res.end()
    })