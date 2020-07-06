export class ExampleController {

    init(server, router) {
        router.get('/example/read', this.readAction);
        router.post('/example/create', this.createAction);
        router.post('/example/search', this.searchAction);
        server.use(router);
    }

    readAction(req, res) {
        res.json({
            entries: [
                {
                    test: 1
                },
                {
                    test: 2
                }
            ]
        })
    }

    createAction(req, res) {
        res.json({
            entries: [
                {
                    test: 1
                },
                {
                    test: 2
                },
                {
                    test: 3
                }
            ]
        })
    }

    searchAction(req, res) {
        res.json({
            entries: [
                {
                    test: req.body.query
                }
            ]
        })
    }
}
