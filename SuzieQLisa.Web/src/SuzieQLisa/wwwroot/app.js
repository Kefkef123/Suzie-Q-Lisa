﻿export class App {
    constructor() {
        this.message = "Hello world!";
    }

    configureRouter(config, router) {
        config.map([
            { route: "sql", name: "sql", moduleId: "sql", nav: true}
        ])
    }
}