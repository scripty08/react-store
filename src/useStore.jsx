 import { useContext } from 'react';
import { StoreContext, addStore, getStore } from '@src';

export const useStore = (storeName) => {
    let { store, setStore } = useContext(StoreContext);
    const mStore = window.globalStorage.config[storeName];

    window.globalStorage.setStore = (e) => {
        setStore(e)
    };

    addStore({ name: storeName, store: mStore }, storeName);

    let records = getStore(store, storeName);

    return {
        [storeName]: records.store,
    };
};
