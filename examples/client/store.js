import { createStore } from '@src';

export default createStore({
    name: 'exampleStore',
    model: {
        test: 0
    },
    proxy: {
        rootProperty: 'entries',
        pagination: false,
        api: {
            read: {
                url: '/example/read',
                method: 'get'
            },
            create: {
                url: '/example/create',
                method: 'post'
            },
            search: {
                url: '/example/search',
                method: 'post'
            }
        }
    }
});
