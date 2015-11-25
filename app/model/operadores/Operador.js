Ext.define('D7C.model.operadores.Operador', {
	extend: 'Ext.data.Model',
    idProperty: 'operatorid',
    fields: [
        {name: 'operatorid', type: 'int' },
        {name: 'syndicatename', type: 'string'},
        {name: 'operatorcode', type: 'string'},
		{name: 'operatorstate', type: 'string'},
		{name: 'operatormatrix', type: 'string'},
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}
    ],
    validators: {
        syndicatename: { type: 'presence', allowEmpty: false },
        operatorcode: { type: 'presence', allowEmpty: false },
		operatorstate: { type: 'presence', allowEmpty: false },
		operatormatrix: { type: 'presence', allowEmpty: false },
		last_update: 'presence'
    }
});
