# @scripty/react-store

# Description

This lightweight global react hook store is inspired by the extjs store architecture.
Share your stores through your application with only a few lines of code!

# Usage

##
##### Client: App.jsx
This is an example App. You have to set the StoreProvider and set also all stores you want to provide
 to the app.
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

##
##### Client: store.js
You can add as many custom api methods as you like in your store. The name of the store is important.
The instantiated store will have that name (see Example.jsx).
```javascript
import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'exampleStore',
    model: {
        fields: [
            { name: 'test', type: 'number' },
            { name: 'bla', type: 'array' }
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

```

##
##### Client: Example.jsx
This example shows all available store methods and properties.

```javascript
import React, { useEffect, Fragment } from 'react';
import { useStore } from '@scripty/react-store';

export const Example = () => {

    const { exampleStore } = useStore('exampleStore');

    useEffect(() => {
        exampleStore.proxy.read();
    }, []);

    const onBtnClick = () => {
        exampleStore.proxy.create({ test: 3 });
    };

    const onInput = async (e) => {
        await exampleStore.proxy.search({ query: e.target.value });
    };

    const onRemoveBtnClick = () => {
        exampleStore.removeAt(1);
    }

    const onRemoveAllBtnClick = () => {
        exampleStore.removeAll();
    }

    const onSetDataBtnClick = () => {
        let model = exampleStore.createModel({
            test: 8,
            bla: ['blub', 'ja']
        });
        exampleStore.setData(model)
    }

    const onFilterDataClick = (e) => {
        exampleStore.filter('test', e.target.value);
    }

    const onResetFilterBtnClick = () => {
        exampleStore.clearFilter();
    }

    const onChangeDataBtnClick = () => {
        exampleStore.getAt(0).set({ test: 100 })
    }

    return (
        <Fragment>
            <div>
                Ergebnis: {exampleStore.data.map(rec => rec.test + ',')}
            </div>
            <br/>
            <div style={{ display: 'inline-block', width: 100, float: 'left' }}>
                <button onClick={onBtnClick}>Update Data</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 100, float: 'left' }}>
                <input placeholder={'Search'} onInput={onInput}/>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 100, float: 'left' }}>
                <button onClick={onRemoveBtnClick}>Remove</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onRemoveAllBtnClick}>Remove All</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onSetDataBtnClick}>Set Data</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <input placeholder={'Filter'} onInput={onFilterDataClick}/>
            </div>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onResetFilterBtnClick}>Reset Filter</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onChangeDataBtnClick}>Change data</button>
            </div>
        </Fragment>
    );
};
```
##
##### Server: ExampleController.js
This is an example controller to show how the data structure has to look like.
if you add an "pagination" property it will be available as a property in the store.
For "updated" or "deleted" records you can add each property as well. Please be aware that you have to
set the rootProperty in the store in that case. In the following example the rootProperty "data" is given.

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
            data: [
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
            data: [
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
            data: [
                {
                    test: req.body.query
                }
            ]
        })
    }
}
```
