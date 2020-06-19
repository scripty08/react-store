import { Server, IndexController } from '@scripty/server';
import { ExampleController } from './example';

const init = async () => {
    let app = new Server();
    await app.addController(new IndexController({ title: 'store' }));
    await app.addController(new ExampleController());
    app.start();
};

init().catch((err) => {
    console.error(err.message);
});
