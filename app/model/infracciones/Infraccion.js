Ext.define('D7C.model.infracciones.Infraccion', {
	extend: 'Ext.data.Model',
    idProperty: 'infractionid',
    fields: [
        {name: 'infractionid', type: 'int' },
        {name: 'descriptioninfraction', type: 'string'},
        {name: 'amountinfraction', type: 'string'}
    ],
    validators: {
        descriptioninfraction: { type: 'presence', allowEmpty: false },
        amountinfraction: { type: 'presence', allowEmpty: false }
    }
});
