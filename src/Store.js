import { request } from '@src';
import { Model } from './Model';

export class Store {

    constructor(store) {

        const { name, model, proxy} = store;
        const { api } = proxy;

        this.name = name;
        this.model = model;
        this.proxy = this.getProxy(api);
        this.data = [new Model(model)];
        this.rawData = [];
        this.filteredData = [];
    }

    createModel(data) {
        const model = new Model(this.model);
        model.set(data);
        return model;
    }

    getProxy(api) {
        if (api) {
            let proxy = {};
            Object.keys(api).forEach((key) => {
                proxy[key] = async (data) => {
                    let response = await request(api[key].method, api[key].url, data);
                    this.present(response);
                    return response;
                }
            });
            return proxy;
        }
    }

    present (response) {
        if (typeof response.entries !== 'undefined') {
            this.rawData = response.entries;
            this.data = this.getModelRecords(response.entries);
            this.cachedData = this.getModelRecords(response.entries);
        }

        if (typeof response.pagination !== 'undefined') {
            this.pagination = response.pagination;
        }

        if (typeof response.pagination !== 'undefined') {
            this.updated = response.updated;
        }

        this.saveGlobalStore();
    }

    callback() {
        if(this.saveGlobalStore) {
            this.saveGlobalStore();
        }
    }

    getModelRecords(data) {
        return data.map((record) => {
            let model = new Model(this.model, this.callback.bind(this));
            model.set(record);
            return model;
        })
    }

    getAt(index) {
        return this.data[index];
    }

    filter(field, value) {

        this.filteredData = this.data.filter((record) => {
            if (record[field].toString() === value) {
                return record;
            }
        });

        if (this.filteredData.length > 0) {
            this.data = this.filteredData;
            return this.saveGlobalStore();
        }

        this.data = this.cachedData;
        return this.data;
    }

    clearFilter() {
        this.data = this.cachedData;
        this.saveGlobalStore();
    }

    removeAt(index) {
        this.data.splice(index, 1);
        this.rawData.splice(index, 1);
        this.saveGlobalStore();
    }

    removeAll() {
        this.data.splice(0, this.data.length);
        this.rawData.splice(0, this.rawData.length);
        this.saveGlobalStore();
    }

    setData(model) {
        if(typeof model === 'array') {
            model.forEach((record) => {
                this.data.push(record);
            })
        }
        this.data.push(model);
        this.saveGlobalStore();
    }

    saveGlobalStore() {
        window.globalStorage.setStore({ data: window.globalStorage.data });
    }
}