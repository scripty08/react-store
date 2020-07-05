import React, { useEffect, Fragment } from 'react';
import { useStore } from '../../src';

export const Example = () => {

    const { exampleStore } = useStore('exampleStore');

    useEffect(() => {
        exampleStore.getProxy().read({})
    }, []);

    let records = exampleStore.getRecords();

    const onBtnClick = () => {
        exampleStore.getProxy().create({test: 3})
    };

    const onInput = (e) => {
        exampleStore.getProxy().search({query: e.target.value})
    };

    return (
        <Fragment>
            <div>
                Ergebnis: { records.map(rec => rec.test + ',') }
            </div>
            <br/>
            <div style={{display: 'inline-block', width: 100, float: 'left'}}>
                <button onClick={onBtnClick}>Update Data</button>
            </div>
            <br/><br/>
            <div style={{display: 'inline-block', width: 100, float: 'left'}}>
                <input placeholder={'Suche'} onInput={onInput}/>
            </div>
        </Fragment>
    );
};
