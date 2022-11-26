import {WarriorRecord} from "./warrior.record";

interface Log {
    text: string;
    warrior: "warrior-first-log" | "warrior-second-log" | "warrior-dead" | "warrior-wins" | "warrior-start";
    iconFirst: string;
    iconSecond: string;
}


export class ArenaRecord {

    private playerStart: number = 0;
    public logs: Log[] = [];

    constructor(public warrior1: WarriorRecord, public warrior2: WarriorRecord) {
    }

    randomStart(): number {

        return Math.floor((Math.random() * 2) + 1);
    }

    fight(): WarriorRecord {

        this.playerStart = this.randomStart();
        const {warrior1, warrior2} = this;

        const start = `${this.playerStart === 1 ? warrior1.name : warrior2.name}`

        this.logs.push({
            text: `${start} begins the fight!`,
            warrior: "warrior-start",
            iconFirst: "start",
            iconSecond: "start"
        });

        while (warrior1.healPoints > 0 && warrior2.healPoints > 0) {

            if (this.playerStart === 1) {

                if (warrior1.strength < (warrior2.agility + warrior2.defence)) {
                    const warriorFirstStrength = warrior1.strength;
                    const warriorSecondDefence = warrior2.defence;

                    warrior2.defence -= warrior1.strength;
                    this.logs.push({
                        text: `${warrior1.name} attacks but ${warrior2.name} uses his shield and blocks his attack`,
                        warrior: "warrior-first-log",
                        iconFirst: "sword",
                        iconSecond: "shield",
                    });

                    if (warriorFirstStrength > warriorSecondDefence) {
                        const diff = warriorFirstStrength - warriorSecondDefence;
                        warrior2.healPoints -= (warrior1.strength - warrior2.defence);
                        this.logs.push({
                            text: `But the shield breaks! And ${warrior2.name} also loses ${diff} HP!`,
                            warrior: "warrior-first-log",
                            iconFirst: "sword",
                            iconSecond: "broke"
                        });
                    } else {
                        this.logs.push({
                            text: `${warrior2.name} dodges the follow-up attack!`,
                            warrior: "warrior-first-log",
                            iconFirst: "sword",
                            iconSecond: "running",
                        });
                    }
                } else {
                    warrior2.healPoints -= warrior1.strength;
                    this.logs.push({
                        text: `${warrior2.name} has no chance and loses ${warrior1.strength} HP!`,
                        warrior: "warrior-first-log",
                        iconFirst: "sword",
                        iconSecond: "blood",
                    });
                }
                if (warrior2.healPoints <= 0) {
                    this.logs.push({
                        text: `${warrior2.name} is dead!`,
                        warrior: "warrior-dead",
                        iconFirst: "dead",
                        iconSecond: "dead"
                    });
                    this.logs.push({
                        text: `${warrior1.name} wins!`,
                        warrior: "warrior-wins",
                        iconFirst: "win",
                        iconSecond: "win"
                    });
                }
                this.playerStart = 2;
            } else {

                if (warrior2.strength < (warrior1.agility + warrior1.defence)) {

                    const warriorSecondStrength = warrior2.strength;
                    const warriorFirstDefence = warrior1.defence;

                    warrior1.defence -= warrior2.strength;
                    this.logs.push({
                        text: `${warrior1.name} saves his life but lost ${warrior2.strength} shield points!`,
                        warrior: "warrior-second-log",
                        iconFirst: "shield",
                        iconSecond: "sword",
                    });

                    if (warriorSecondStrength > warriorFirstDefence) {
                        const diff = warriorSecondStrength - warriorFirstDefence;
                        warrior1.healPoints -= diff;
                        this.logs.push({
                            text: `The attack was so strong that ${warrior1.name} also lost ${diff} heal points!`,
                            warrior: "warrior-second-log",
                            iconFirst: "broke",
                            iconSecond: "sword",
                        });
                    } else {
                        this.logs.push({
                            text: `${warrior1.name} is now ready to counter!`,
                            warrior: "warrior-second-log",
                            iconFirst: "running",
                            iconSecond: "sword",
                        });
                    }
                } else {

                    warrior1.healPoints -= warrior2.strength;
                    this.logs.push({
                        text: `${warrior1.name} gets hit and loses ${warrior2.strength} HP!`,
                        warrior: "warrior-second-log",
                        iconFirst: "blood",
                        iconSecond: "sword",
                    });

                }
                if (warrior1.healPoints <= 0) {
                    this.logs.push({
                        text: `${warrior1.name} is dead!`,
                        warrior: "warrior-dead",
                        iconFirst: "dead",
                        iconSecond: "dead"
                    });
                    this.logs.push({
                        text: `${warrior2.name} wins!`,
                        warrior: "warrior-wins",
                        iconFirst: "win",
                        iconSecond: "win"
                    });
                }
                this.playerStart = 1;
            }
        }
        return warrior1.healPoints <= 0 ? warrior2 : warrior1
    }
}
