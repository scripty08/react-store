import React from 'react';

import { hot } from 'react-hot-loader/root';
import { StoreProvider } from '@src';
import exampleStore from './store';
import { Example } from './Example';

let defaultStores = {
    exampleStore
};

const App = () => {
    return (
        <StoreProvider defaultStores={defaultStores}>
            <Example />
        </StoreProvider>
    );
};

export default hot(App);
