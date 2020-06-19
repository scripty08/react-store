export const addStore = (store, name) => {
    if (!window.globalStorage.data.some(person => {
        return person.name === name
    })) {
        window.globalStorage.data.push(store);
    }
    return window.globalStorage;
};

export const getStore = (store, name) => {
    return store.data.map((rec) => {
        if (rec.name === name) {
            return rec;
        }
        return [];
    }).filter(rec => Object.keys(rec).length > 0 || rec.length > 0)[0];
};
