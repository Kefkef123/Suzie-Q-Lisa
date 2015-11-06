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
            keyColumn: "id",
            columnSelection: {"id": true, "name": true, "class": true, "studentNumber": true}, 
            data: this.database['students'], 
            whereSelection: {1: true, 2: true, 3: true, 4: true, 5: true, 6: true,}
        };
    }

    updateTableContent() {
        var sqlQueryObject = this.sqlreader.readSql($('section#editor textarea').val());
        var table = {};
        
        table.data = this.database[sqlQueryObject.tableName];

        // Get a sample row to read column names from
        var sampleRow = Enumerable.From(table.data).First();
        table.columnNames = [];

        for (var key in sampleRow) {
            if (sampleRow.hasOwnProperty(key)) {
                table.columnNames.push(key);
            }
        }

        table.keyColumn = table.columnNames[0];

        table.whereSelection = {};
        if(typeof(sqlQueryObject.condition) !== "undefined") {
            // set whereSelection property true for all where-selected rows 
            Enumerable.From(table.data)
                .Where("$." + sqlQueryObject.condition)
                .Select(function(x) { return x[table.keyColumn] })
                .ForEach(function(x) {
                    table.whereSelection[x] = true;
                });

            // Set whereSelection property false for all non-selected rows
            Enumerable.From(table.data)
            .Select(function(x) { return x[table.keyColumn] })
            .ForEach(function(x){
                if (!table.whereSelection.hasOwnProperty(x)) {
                    table.whereSelection[x] = false;
                }
            });
        }
        else {
            // Simple set all columns true in whereselection since where clause is missing
            Enumerable.From(table.data)
            .Select(function(x) { return x[table.keyColumn] })
            .ForEach(function(x){
                table.whereSelection[x] = true;
            });
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