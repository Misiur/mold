'use strict';

function Model (name, fields)
{
    fields.forEach(function (field, i) {
        this.addField(field);
    }, this);

    Object.defineProperty(this, '_propertiesChanged', {
        enumerable: false,
        writable: true,
        value: []
    });
}

Model.prototype.addField = function (name) {
    const valueHolder = '_' + name;
    const self = this;

    self[valueHolder] = null;

    Object.defineProperty(self, name, {
        set: function (value) {
            if (value !== self[valueHolder]) {
                self._propertiesChanged.push(name);
                self[valueHolder] = value;
            }
        },
        get: function () {
            return self[valueHolder];
        }
    });
};

Model.prototype.preparePacket = function (changesOnly, flush) {
    if (changesOnly === undefined) {
        changesOnly = true;
    }

    if (flush === undefined) {
        flush = false;
    }

    let values = {};
    
    if (changesOnly) {
        this._propertiesChanged.forEach(function (prop, i) {
            values[prop] = this[prop];
        }, this);

        if (flush) {
            this._propertiesChanged = [];
        }
    }

    return values;
};

module.exports = Model;