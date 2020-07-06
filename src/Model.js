
export class Model {

    constructor(model, callback) {
        this.callback = callback;
        model.fields.forEach((rec) => {
            this[rec.name] = this.getInitialValue(rec.type)
        })
    }

    getInitialValue (type) {
        switch (type) {
            case 'string':
                return '';
            case 'object':
                return {};
            case 'array':
                return [];
            case 'number':
                return 0;
            default:
                return ''
        }
    }

    set(record) {
        Object.keys(record).forEach((key) => {
            this[key] = record[key];
        });
        if (this.callback) {
            this.callback();
        }
    }

    get(field) {
        return this[field]
    }

}
