import { request } from './';
import { Model } from './Model';

export class Store {

    constructor(store) {

        const { name, model, proxy } = store;
        const { api, rootProperty } = proxy;

        this.name = name;
        this.model = model;
        this.proxy = this.getProxy(api, rootProperty);
        this.data = [new Model(model)];
        this.rawData = [];
        this.filteredData = [];
        this.pagination = {
            total: 0,
            page: 0,
            results: 0
        }
        this.updated = [];
        this.removed = [];
        this.created = [];
    }

    createModel(data) {
        const model = new Model(this.model);
        model.set(data);
        return model;
    }

    getProxy(api, rootProperty) {
        if (api) {
            let proxy = {};
            Object.keys(api).forEach((key) => {
                proxy[key] = async (data) => {
                    let response = await request(api[key].method, api[key].url, data);
                    this.present(response, rootProperty);
                    return response;
                }
            });
            return proxy;
        }
    }

    getDirtyRecords() {
        return {
            created: this.created,
            updated: this.updated,
            removed: this.removed
        };
    }

    present(response, rootProperty) {

        if (typeof response.pagination !== 'undefined') {
            this.pagination = response.pagination;
        }

        if (typeof response.updated !== 'undefined') {
            this.updatedData = this.getModelRecords(response.updated);
            this.rawUpdatedData = response.updated;
        }

        if (typeof response.destroyed !== 'undefined') {
            this.deletedData = this.getModelRecords(response.destroyed);
            this.rawDeletedData = response.destroyed;
        }

        if (rootProperty) {
            response = response[rootProperty]
        }

        if (typeof response !== 'undefined' && response.length > 0) {
            this.rawData = response;
            this.data = this.getModelRecords(response);
            this.cachedData = this.getModelRecords(response);
        } else {
            this.data = [new Model(this.model, this.callback.bind(this))];
            this.cachedData = [new Model(this.model, this.callback.bind(this))];
        }

        this.created = [];
        this.updated = [];
        this.removed = [];
        this.saveGlobalStore();
    }

    callback() {
        if (this.saveGlobalStore) {
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
            this.saveGlobalStore();
            return this.data[0];
        }

        this.data = this.cachedData;
        return this.data;
    }

    clearFilter() {
        this.data = this.cachedData;
        this.saveGlobalStore();
    }

    add(model) {
        if (typeof model === 'array') {
            model.forEach((record) => {
                this.data.push(record);
            })
        }
        this.data.push(model);

        if (!this.created.some(data => {
            return JSON.stringify(data) === JSON.stringify(model)
        })) {
            this.created.push(model);
        }

        this.saveGlobalStore();
    }

    update(model) {
        this.data = this.data.map((rec) => {
            if (rec._id === model._id) {
                return model;
            }
            return rec;
        }).filter(rec => typeof rec !== 'undefined');

        if (!this.updated.some(data => {
            return JSON.stringify(data) === JSON.stringify(model)
        })) {
            this.updated.push(model);
        }

        this.saveGlobalStore();
    }

    removeAt(index) {
        this.data.splice(index, 1);
        this.rawData.splice(index, 1);
        this.saveGlobalStore();
    }

    removeById(_id) {
        const removed = this.data.find(rec => rec._id === _id);
        this.data = this.data.filter(rec => rec._id !== _id);
        if (removed) {
            this.removed.push(removed);
        }
        this.saveGlobalStore();
    }

    removeAll() {
        this.data.splice(0, this.data.length);
        this.rawData.splice(0, this.rawData.length);
        this.saveGlobalStore();
    }

    saveGlobalStore() {
        window.globalStorage.setStore({ data: window.globalStorage.data });
    }
}
