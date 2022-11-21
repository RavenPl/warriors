import {Router} from "express";
import {WarriorRecord} from "../modules/warrior.record";

export const createWarriorRouter = Router();

createWarriorRouter

    .get('/', (req, res) => {

        res.render('create-warrior');
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

        await WarriorRecord.hasName(name);
        await newWarrior.insert();

        res.redirect('/warriors')
    })

    .patch('/:id', async (req, res) => {

        const id = req.params.id;
        const winner = await WarriorRecord.getOne(id);
        const updatedVictories = winner.victories
        await WarriorRecord.updateVictories(id, updatedVictories + 1);
        // console.log(warrior.name);
        console.log(id, winner, updatedVictories);

        res.end();
    })