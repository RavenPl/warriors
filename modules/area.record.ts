import {WarriorRecord} from "./warrior.record";

export class AreaRecord {

    private playerStart: number = 0;

    constructor(public warrior1: WarriorRecord, public warrior2: WarriorRecord) {
    }

    static hello() {
    }

    randomStart(): number {

        return Math.floor((Math.random() * 2) + 1);
    }

    fight(): WarriorRecord {

        this.playerStart = this.randomStart();
        const {warrior1, warrior2} = this;

        const intro = `Zaczyna ${this.playerStart === 1 ? warrior1.name : warrior2.name}!`
        console.log(intro);
        while (warrior1.healPoints > 0 && warrior2.healPoints > 0) {
            console.log(warrior1.healPoints, warrior2.healPoints);
            if (this.playerStart === 1) {

                if (warrior1.strength < (warrior2.agility + warrior2.defence)) {
                    if (warrior1.strength > warrior2.defence) {
                        warrior2.healPoints -= (warrior1.strength - warrior2.defence);
                        console.log(`${warrior2.name} stracił ${(warrior1.strength - warrior2.defence)} punktów życia!`);
                        warrior2.defence -= warrior1.strength;
                        console.log(`${warrior2.name} stracił ${warrior1.strength} punktów tarczy!`);
                    } else {
                        warrior2.defence -= warrior1.strength;
                        console.log(`${warrior2.name} uniknął ciosu i nie stracił życia! ale stracił ${warrior1.strength} punktów tarczy!)}`);
                    }
                } else {
                    warrior2.healPoints -= warrior1.strength;
                    console.log(`${warrior2.name} stracił ${warrior1.strength} punktów życia i ma teraz ${warrior2.healPoints}.`);
                }

                this.playerStart = 2;
            } else {

                if (warrior2.strength > (warrior1.agility + warrior1.defence)) {
                    warrior1.healPoints -= warrior2.strength;
                    console.log(`${warrior1.name} stracił ${warrior2.strength} punktów życia i ma teraz ${warrior1.healPoints}.`);
                } else {
                    if (warrior2.strength > warrior1.defence) {
                        warrior1.healPoints -= (warrior2.strength - warrior1.defence);
                        console.log(`${warrior1.name} stracił ${(warrior2.strength - warrior1.defence)} punktów życia!`);
                        warrior1.defence -= warrior2.strength;
                        console.log(`${warrior1.name} stracił ${warrior2.strength} punktów tarczy!`);
                    } else {
                        warrior1.defence -= warrior2.strength;
                        console.log(`${warrior1.name} uniknął ciosu i nie stracił życia! ale stracił ${warrior2.strength} punktów tarczy!)}`);
                    }
                }
                this.playerStart = 1;
            }
        }
        return warrior1.healPoints <= 0 ? warrior2 : warrior1
    }
}
