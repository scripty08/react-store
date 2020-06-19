import { request } from '@src';

export const createStore = (store) => {

    store.records = [];
    store.model.set = (data) => {
        Object.keys(data).forEach((key) => {
            store.model[key] = data[key];
        });
        return store.model;
    };

    return {
        name: '',
        store: {},

        resetStore: () => {
            store.records = [];
            window.globalStorage.setStore({ data: window.globalStorage.data })
        },

        setRecords: (mapped) => {
            store.records = mapped;
            window.globalStorage.setStore({ data: window.globalStorage.data })
        },

        getRecords: () => {
            if (store.records.length > 0) {
                return store.records[0];
            }

            return store.model;
        },

        getRawRecords: () => {
            if (store.records.length > 0) {
                return store.records;
            }

            return [];
        },

        getPagination: () => {
            return store.pagination
        },

        getAt: (index) => {
            if (store.records.length > 0) {
                return store.records[index];
            }
            return store.model;
        },

        getRecord: (key, value) => {
            let filtered = store.records.filter((rec) => rec[key] === value);
            if (filtered.length > 0) return filtered[0];
            console.error(`[ERROR] record with key: "${key}" and value: "${value}" not found!`);
        },

        getProxy: () => {

            const presentResponse = (response) => {
                if (typeof response.entries !== 'undefined') {
                    store.records = response.entries.map((rec) => {
                        return store.model.set(rec);
                    });
                }

                if (typeof response.pagination !== 'undefined') {
                    store.pagination = response.pagination;
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
        }
    }
}
