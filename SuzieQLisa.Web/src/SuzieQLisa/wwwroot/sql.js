import {SqlReader} from 'sqlreader';
import {Database} from 'database';

export class Sql {
    static inject() {
        return [ SqlReader, Database ];
    }

    constructor(sqlreader, database) {
        this.sqlreader = sqlreader;
        this.database = database.database;

        this.table = { 
            columnNames: ["id", "name", "class", "studentNumber"], 
            columnSelection: {"id": true, "name": true, "class": true, "studentNumber": true}, 
            data: this.database['students'] 
        };
    }

    updateTableContent() {
        var sqlQueryObject = this.sqlreader.readSql($('section#editor textarea').val());
        var table = {};

        table.data = this.database[sqlQueryObject.tableName]

        // Get a sample row to read column names from
        var sampleRow = Enumerable.From(table.data).First();
        table.columnNames = [];

        for (var key in sampleRow) {
            if (sampleRow.hasOwnProperty(key)) {
                table.columnNames.push(key);
            }
        }

        table.columnSelection = {};
        if (typeof(sqlQueryObject.columns) === "undefined")
        {
            table.columnNames.forEach(function(value, index, array) {
                table.columnSelection[value] = true;
            });
        }
        else {
            table.columnNames.forEach(function(value, index, array) {
                table.columnSelection[value] = sqlQueryObject.columns.indexOf(value) !== -1;
            });
        }

        this.table = table;
    }
}