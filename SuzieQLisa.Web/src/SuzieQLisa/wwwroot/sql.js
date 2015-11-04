import {SqlReader} from 'sqlreader';
import {Database} from 'database';

export class Sql {
    static inject() {
        return [ SqlReader, Database ];
    }

    constructor(sqlreader, database) {
        this.sqlreader = sqlreader;
        this.database = database;

        this.output = this.sqlreader.database['students'];
    }

    changeText(){
        var data = this.sqlreader.readSql();
        
        if(typeof(data.columns) === "undefined"){
            this.output = this.database[data.table];
        }
    }
}