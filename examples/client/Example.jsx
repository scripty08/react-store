import React, { useEffect, Fragment } from 'react';
import { useStore } from '../../src';

export const Example = () => {

    const { exampleStore } = useStore('exampleStore');

    useEffect(() => {
        exampleStore.proxy.read();
    }, []);

    const onBtnClick = () => {
        exampleStore.proxy.create({ test: 6 });
    };

    const onInput = async (e) => {
        await exampleStore.proxy.search({ query: e.target.value });
    };

    const onRemoveBtnClick = () => {
        exampleStore.removeAt(1);
    }

    const onRemoveByIdBtnClick = () => {
        exampleStore.removeById('test_id');
    }

    const onRemoveAllBtnClick = () => {
        exampleStore.removeAll();
    }

    const onAddDataBtnClick = () => {
        let model = exampleStore.createModel({
            test: 8,
            bla: ['blub', 'ja']
        });
        exampleStore.add(model);
    }

    const onUpdateDataBtnClick = () => {
        let model = exampleStore.createModel({
            _id: 'test_id',
            test: 83333333,
            bla: ['blub', 'ja']
        });
        exampleStore.update(model);
    }

    const onFilterDataClick = (e) => {
        exampleStore.filter('test', e.target.value);
    }

    const onResetFilterBtnClick = () => {
        exampleStore.clearFilter();
    }

    const onChangeDataBtnClick = () => {
        exampleStore.getAt(0).set({ test: 100 })
    }

    console.log(exampleStore.data, ' exampleStore <------------');

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
            <div style={{ display: 'inline-block', width: 100, float: 'left' }}>
                <button onClick={onRemoveByIdBtnClick}>Remove By Id</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onRemoveAllBtnClick}>Remove All</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onAddDataBtnClick}>Add Data</button>
            </div>
            <br/><br/>
            <div style={{ display: 'inline-block', width: 130, float: 'left' }}>
                <button onClick={onUpdateDataBtnClick}>Edit Data</button>
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
