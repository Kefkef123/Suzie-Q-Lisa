export class App {
    constructor() {
        this.message = "Hello world!";  
    }

    configureRouter(config, router) {
        config.map([
            { route: "testData", name: "testData", moduleId: "testData", nav: true}
        ])
    }
}