import {SqlReader} from 'sqlreader';
import {Database} from 'database';

export class Sql {
    static inject() {
        return [ SqlReader, Database ];
    }

    constructor(sqlreader, database) {
        this.sqlreader = sqlreader;
        this.database = database.database;

        this.output = this.database['students'];
    }

    changeText(){
        var data = this.sqlreader.readSql();
        
                this.output = this.database[data.table];

        if(typeof(data.columns) === "undefined"){
            $("td").removeClass("lowlight").addClass("highlight");
        }
        else{
            $("td").removeClass("highlight").addClass("lowlight");

            data.columns.forEach(function(value, index, arr){
                $("td[data-column=" + value + "]").removeClass("lowlight").addClass("highlight");
            });
        }
    }
}