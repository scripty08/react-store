import React, { useEffect, Fragment } from 'react';
import { useStore } from '../../src';

export const Example = () => {

    const { exampleStore } = useStore('exampleStore');

    useEffect(() => {
        exampleStore.proxy.read();
    }, []);

    const onBtnClick = () => {
        exampleStore.proxy.create({ test: 3 });
    };

    const onInput = async (e) => {
        await exampleStore.proxy.search({ query: e.target.value });
    };

    const onRemoveBtnClick = () => {
        exampleStore.removeAt(1);
    }

    const onRemoveAllBtnClick = () => {
        exampleStore.removeAll();
    }

    const onSetDataBtnClick = () => {
        let model = exampleStore.createModel({
            test: 8,
            bla: ['blub', 'ja']
        });
        exampleStore.setData(model)
    }

    const onFilterDataClick = (e) => {
        exampleStore.filter('test', e.target.value);
    }

    const onResetFilterBtnClick = () => {
        exampleStore.clearFilter();
    }

    const onChangeDataBtnClick = () => {
        let record = exampleStore.getAt(0);
        record.set({ test: 100 })
        record.setDirty();
    }

    console.log(exampleStore.data, ' data <------------');

    return (
        <Fragment>
            <div>
                Ergebnis: {exampleStore.data.map(rec => rec.test + ',')}
            </div>
            <br/>
            <div style={{ display: 'inline-block', width: 100, float: 'left' }}>
                <button onClick={onBtnClick}>Update Data</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 100, float: 'left' }}>
                <input placeholder={'Search'} onInput={onInput}/>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 100, float: 'left' }}>
                <button onClick={onRemoveBtnClick}>Remove</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onRemoveAllBtnClick}>Remove All</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onSetDataBtnClick}>Set Data</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <input placeholder={'Filter'} onInput={onFilterDataClick}/>
            </div>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onResetFilterBtnClick}>Reset Filter</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onChangeDataBtnClick}>Change data</button>
            </div>
        </Fragment>
    );
};
