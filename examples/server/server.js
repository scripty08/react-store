import { Server, IndexController, Logger } from '@scripty/server';

const init = async () => {
    Logger.info('server is initializing');
    let app = new Server();
    await app.addController(new IndexController({ title: 'store' }));
    app.start();
};

init().catch((err) => {
    console.error(err.message);
});
