import { Store } from './Store';

export const createStore = (store) => {
    return new Store(store);
}
