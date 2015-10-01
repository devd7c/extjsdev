Ext.define('D7C.model.operadores.Operador', {
	extend: 'Ext.data.Model',
    idProperty: 'operatorid',
    fields: [
        {name: 'operatorid', type: 'int' },
        {name: 'syndicatename', type: 'string'},
        {name: 'operatorcode', type: 'string'}
    ]
});
