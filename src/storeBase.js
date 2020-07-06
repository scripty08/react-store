import { request } from '@src';
import { Store } from './Store';

export const createStore = (store) => {
    return new Store(store);
}

/*const setModelEvents = (store) => {
    let model = store.model;

    model.set = (data) => {
        Object.keys(data).forEach((key) => {
            model[key] = data[key];
        });
        return model;
    };

    return store;
}*/

/*const setStoreEvents = (store) => {

        store.records = [];
        store.updated = [];

        store.setRecords = (mapped) => {
            store.records = mapped;
            window.globalStorage.setStore({ data: window.globalStorage.data })
        };

        store.getRecords = () => {
            if (store.records.length > 0) {
                return store.records;
            }
            return [store.model];
        };

        store.getRawRecords = () => {
            if (store.records.length > 0) {
                return store.records;
            }

            return [];
        };

        store.getPagination = () => {
            return store.pagination;
        };

        store.getUpdatedRecords = () => {
            return store.updated;
        };

        store.getAt = (index) => {
            if (store.records.length > 0) {
                return store.records[index];
            }
            return store.model;
        };

        store.getRecord = (key, value) => {
            let filtered = store.records.filter((rec) => rec[key] === value);
            if (filtered.length > 0) return filtered[0];
            console.error(`[ERROR] record with key: "${key}" and value: "${value}" not found!`);
        };

        store.getProxy = () => {

            const presentResponse = (response) => {
                if (typeof response.entries !== 'undefined') {
                    store.records = response.entries;
                }

                if (typeof response.pagination !== 'undefined') {
                    store.pagination = response.pagination;
                }

                if (typeof response.pagination !== 'undefined') {
                    store.updated = response.updated;
                }

                window.globalStorage.setStore({ data: window.globalStorage.data })
            };

            let api = store.proxy.api;
            let proxy = {};

            Object.keys(api).forEach((key) => {
                proxy[key] = async (data) => {
                    let response = await request(api[key].method, api[key].url, data);
                    presentResponse(response);
                }
            });

            return proxy;
        };


    return store;
}*/
