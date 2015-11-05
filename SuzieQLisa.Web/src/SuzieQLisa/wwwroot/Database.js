export class Database {
    constructor() {
        this.tables = ["students"]

        var studentsTable = [
            {"id": 1, "name": "Kevin van Hulst", "class": "LPICO15L1", "studentNumber": 99016948},
            {"id": 2, "name": "Rik Pronk", "class": "LPICO15L1", "studentNumber": 99016312},
            {"id": 3, "name": "Pietje van Genderen", "class": "LPICO15L1", "studentNumber": 99045674},
            {"id": 4, "name": "Jan-Willen Willemszoon", "class": "LPICO12A3", "studentNumber": 99012345},
            {"id": 5, "name": "Willie-Alex van Oranje", "class": "LPICO14L1", "studentNumber": 99034561},
            {"id": 6, "name": "Bjørn Bjørnsson", "class": "LPICO12A3", "studentNumber": 99079864}
        ];

        var classTable = [
            {"id": 1, "name": "LPICO15L1"},
            {"id": 2, "name": "LPICO12A3"},
            {"id": 3, "name": "LPICO14L1"}
        ];

        this.database = {
            "students": studentsTable,
            "classes": classTable
        }
    }

    getData(table) {
        if(this.tables.indexOf(table) === -1){
            throw "Table doesn't exist";
        }

        return this.database[table];
    }
}