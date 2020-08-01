import { createStore } from '@src';

export default createStore({
    name: 'exampleStore',
    model: {
        fields: [
            { name: '_id', type: 'string'},
            { name: 'test', type: 'number', default: 5000 },
            { name: 'bla', type: 'array', default: ['arrayValue1', 'arrayValue2'] }
        ]
    },
    proxy: {
        rootProperty: 'data',
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
