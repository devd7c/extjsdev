Ext.define('D7C.model.operadores.TarjetaOperacion', {
	extend: 'Ext.data.Model',
    idProperty: 'cardoperationid',
    fields: [
        {name: 'cardoperationid', type: 'int' },
		{name: 'operatorregisterid', type: 'int' },
		{name: 'vehicleid', type: 'int' },
        {name: 'cardoperationstatus', type: 'string'},
        {name: 'cardoperationvalidity', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'nameprincipal', type: 'string'},
		{name: 'namesecretary', type: 'string'},
		{name: 'vehiclestatuscard', type: 'string'}
    ],
    validators: {
        cardoperationstatus: { type: 'presence', allowEmpty: false },
        cardoperationvalidity: { type: 'presence', allowEmpty: false },
		nameprincipal: { type: 'presence', allowEmpty: false },
		namesecretary: { type: 'presence', allowEmpty: false }
    }
});
