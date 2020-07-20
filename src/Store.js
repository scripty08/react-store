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
        this.updatedData = [];
        this.rawUpdatedData = [];
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

    present(response, rootProperty) {

        if (typeof response.pagination !== 'undefined') {
            this.pagination = response.pagination;
        }

        if (typeof response.updated !== 'undefined') {
            this.updatedData = this.getModelRecords(response.updated, this.model);
            this.rawUpdatedData = response.updated;
        }

        if (typeof response.deleted !== 'undefined') {
            this.deletedData = this.getModelRecords(response.deleted, this.model);
            this.rawDeletedData = response.deleted;
        }

        if (rootProperty) {
            response = response[rootProperty]
        }

        if (typeof response !== 'undefined') {
            this.rawData = response;
            this.data = this.getModelRecords(response, this.model);
            this.cachedData = this.getModelRecords(response, this.model);
        }

        this.saveGlobalStore();
    }

    callback() {
        if (this.saveGlobalStore) {
            this.saveGlobalStore();
        }
    }


    getModelRecords(data, model) {

        let bla = data.map((record, index) => {
            Object.keys(record).forEach((key) => {
                if (Array.isArray(record[key])) {
                    record[key].map((rec, idx) => {
                        if (typeof model.fields !== 'undefined') {
                            if (model.fields[idx].name === key) {
                                return this.getModelRecords(data, {fields: model.fields[idx].fields});
                            }
                        }
                    });
                }
            });

            console.log(model, ' model <------------');

            let newModel = new Model(model, this.callback.bind(this));
            newModel.set(record);

            return newModel;

        });


        console.log(bla, ' bla <------------');

        return bla;

    }

    /*getModelRecords(data) {

        let bla =  data.map((record) => {
            this.myArray = [];
            this.response = [];
            Object.keys(record).forEach((key) => {
                if (Array.isArray(record[key])) {
                    record[key].map((rec, idx) => {
                        console.log(key, ' key <------------');
                        if (typeof this.model.fields !== 'undefined') {
                            if (this.model.fields[idx].name === key) {
                                console.log(this.model.fields[idx], ' xxx <------------');
                                let model = new Model(this.model.fields[idx], this.callback.bind(this));
                                model.set(rec);
                                this.response.push(model);
                            }
                        }
                    });
                } else {
                    let model = new Model(this.model, this.callback.bind(this));
                    model.set(record);
                    this.response.push(model);
                }
            });

            return this.response;
        })

        console.log(bla, ' bla <------------');
        return bla;
    }*/

    getAt(index) {
        return this.data[index];
    }

    getDirtyRecords() {
        const dirtyData = this.data.map((record, idx) => {
            if (record.dirty) {
                return this.rawData[idx]
            }
        }).filter((rec) => {
            return typeof rec !== 'undefined'
        })

        if (dirtyData.length > 0) {
            return dirtyData;
        }

        return null;
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
        if (typeof model === 'array') {
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
