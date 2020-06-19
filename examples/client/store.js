import { createStore } from '@src';

export default createStore({
    name: 'exampleStore',
    model: {
        example2: []
    },
    proxy: {
        rootProperty: 'entries',
        pagination: false,
        api: {
            findRoutes: {
                url: '/example/read',
                method: 'get'
            }
        }
    }
});
