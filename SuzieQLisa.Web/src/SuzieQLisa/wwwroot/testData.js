import {Database} from 'database';

export class TestData {
    static inject(){
        return [ Database ];
    }
    
    constructor(database) {
        this.database = database;

        this.students = this.database.getData();
    }
}