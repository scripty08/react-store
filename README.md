# @scripty/react-store

# Description

This global react store is inspired by the extjs store architecture.

# Usage

App.jsx
```javascript

import React from 'react';
import { StoreProvider } from '@scripty/react-store';
import exampleStore from './store';
import { Example } from './Example';

export const App = () => {

    const defaultStores = {
        exampleStore
    };

    return (
        <StoreProvider defaultStores={defaultStores}>
            <Example />
        </StoreProvider>
    );
};
```

store.js
```javascript
import { createStore } from '@scripty/react-store';

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

```

Example.jsx

```javascript
import React, { useEffect, Fragment } from 'react';
import { useStore } from '@scripty/react-store';

export const Example = () => {

    const { exampleStore } = useStore('exampleStore');

    useEffect(() => {
        exampleStore.getProxy().read({})
    }, []);

    let records = exampleStore.getRecords();

    const onBtnClick = () => {
        exampleStore.getProxy().create({test: 3})
    };

    const onInput = (e) => {
        exampleStore.getProxy().search({query: e.target.value})
    };

    return (
        <Fragment>
            <div>
                Ergebnis: { records.map(rec => rec.test + ',') }
            </div>
            <br/>
            <div style={{display: 'inline-block', width: 100, float: 'left'}}>
                <button onClick={onBtnClick}>Update Data</button>
            </div>
            <br/><br/>
            <div style={{display: 'inline-block', width: 100, float: 'left'}}>
                <input placeholder={'Suche'} onInput={onInput}/>
            </div>
        </Fragment>
    );
};
```

server.js

```javascript
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
```
