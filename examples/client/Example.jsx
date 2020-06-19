import React from 'react';
import { useStore } from '../../src';

export const Example = () => {

    const { exampleStore } = useStore('exampleStore');

    console.log(exampleStore, ' exampleStore <------------');

    return (
        <div>test</div>
    );
};

