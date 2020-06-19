import React from 'react';

import { hot } from 'react-hot-loader/root';
import { StoreProvider } from '@src';
import exampleStore from './store';

let defaultStores = {
    exampleStore
};

const App = () => {
    return (
        <StoreProvider defaultStores={defaultStores}>
            test
        </StoreProvider>
    );
};

export default hot(App);
