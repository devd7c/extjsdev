Ext.define('D7C.model.operadores.TarjetaOperacion', {
	extend: 'Ext.data.Model',
    idProperty: 'cardoperationid',
    fields: [
        {name: 'cardoperationid', type: 'int' },
		{name: 'operatorregisterid', type: 'int' },
		{name: 'vehicleid', type: 'int' },
        {name: 'cardoperationstatus', type: 'string'},
        {name: 'cardoperationvalidity', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'cardoperationexpire', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'nameprincipal', type: 'string'},
		{name: 'namesecretary', type: 'string'},
		{name: 'vehiclestatuscard', type: 'string'}/*,
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}*/
    ],
    validators: {
        cardoperationstatus: { type: 'presence', allowEmpty: false },
        cardoperationvalidity: { type: 'presence', allowEmpty: false },
		//cardoperationexpire: { type: 'presence', allowEmpty: false },
		nameprincipal: { type: 'presence', allowEmpty: false },
		namesecretary: { type: 'presence', allowEmpty: false }/*,
		last_update: { type: 'presence'}*/
    }
});
