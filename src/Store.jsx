import React, { useState } from 'react';
import PropTypes from 'prop-types';

window.globalStorage = {
    config: {},
    data: [
        {
            name: '',
            entries: []
        }
    ],
    setStore: () => {}
};

export const StoreContext = React.createContext({
    store: [],
    setStore: () => {}
});

export const StoreProvider = (props) => {
    const { defaultStores } = props;
    window.globalStorage.config = defaultStores;
    let [store, setStore] = useState(window.globalStorage);

    return (
        <StoreContext.Provider value={{ store: store, setStore: setStore }}>
            {props.children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.string
};
