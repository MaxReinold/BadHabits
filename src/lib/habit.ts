export default class Habit {
    key: number;
    name: string;
    description: string;
    date: string;

    static initial() {
        return new Habit(0,
        "",
        "",
        (new Date()).toLocaleDateString());
    }

    constructor(key: number, name: string, description: string, date: string) {
        this.key = key;
        this.name = name;
        this.description = description;
        this.date = date;
    }

    static generateNewKey() {
        return Math.floor(Math.random() * 10000000);
    }
}
