import { createStore } from '@src';

export default createStore({
    name: 'exampleStore',
    model: {
        fields: [
            {
                name: 'test',
                type: 'number'
            },
            {
                name: 'bla',
                type: 'array',
                fields:
                    [
                        {
                            name: 'ja',
                            type: 'string'
                        },
                        {
                            name: 'jo',
                            type: 'string'
                        }
                    ]
            }
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
