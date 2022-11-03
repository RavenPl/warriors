import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {ErrorValidation} from "../utils/error";

type GetAllWarriorsType = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {

    public id?: string;
    public victories = 0;
    private readonly totalPoints = 10;

    constructor(
        public name: string,
        public strength = 1,
        public defence = 1,
        public healPoints = 1,
        public agility = 1,
    ) {
        if (name.length < 3 || name.length > 20) {
            throw new ErrorValidation('The name should contain at least 3 and no more than 20 characters!')
        }
        if (typeof this.strength !== "number" ||
            typeof this.defence !== "number" ||
            typeof this.agility !== "number" ||
            typeof this.healPoints !== "number"
        ) {
            throw new ErrorValidation('The name should contain at least 3 and no more than 20 characters!')
        }
        this.totalPointsValidator()
    }

    static async hasName(name: string) {
        const warriorsNames = (await this.getAll()).map(obj => obj.name.toLowerCase());
        if (warriorsNames.includes(name.toLowerCase())) {
            throw new ErrorValidation(`The name you used - ${name} is already taken!`);
        }
    }

    static async getAll(): Promise<WarriorRecord[]> {

        const [result] = await pool.execute('SELECT * FROM `warriors`') as GetAllWarriorsType;

        return result
    }

    static async getOne(id: string): Promise<WarriorRecord> {

        const [found] = (await pool.execute('SELECT * FROM `warriors` WHERE `id` = :id', {
            id
        })) as GetAllWarriorsType;

        return found[0]
    }

    totalPointsValidator(): void {
        const summary = this.totalPoints - this.addStats();

        if (summary < 0) {
            throw new ErrorValidation('You have assigned too many points!')
        } else if (summary > 0) {
            throw new ErrorValidation(`You still have ${summary} ${summary === 1 ? 'point' : 'points'} to assign!`)
        }
        this.healPoints *= 10;
    }

    async insert(): Promise<void> {

        if (!this.id) {
            this.id = uuid();
        }

        try {
            await pool.execute('INSERT INTO `warriors` VALUES( :id, :name, :healPoints, :strength, :defence, :agility, :victories)', {
                id: this.id,
                name: this.name.trim(),
                healPoints: this.healPoints,
                strength: this.strength,
                defence: this.defence,
                agility: this.agility,
                victories: this.victories,
            })
        } catch (e) {
            console.log(e);
        }
    }

    private addStats(): number {
        return this.agility + this.defence + this.strength + this.healPoints
    }
}

