Ext.define('D7C.model.operadores.RegistroOperadorExpand', {
	extend: 'Ext.data.Model',
    idProperty: 'oprexpandid',
    fields: [
		{name: 'oprexpandid', type: 'int' },
        {name: 'operatorregisterid', type: 'int' },
		{name: 'adminresolutionid', type: 'int' },
        {name: 'oprexpandzonestart', type: 'string'},
        {name: 'oprexpandroutestart', type: 'string'},
		{name: 'oprexpandzonefinish', type: 'string'},
		{name: 'oprexpandroutefinish', type: 'string'}/*,
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}*/
    ],
    validators: {
        oprexpandzonestart: { type: 'presence', allowEmpty: false },
        oprexpandroutestart: { type: 'presence', allowEmpty: false },
		oprexpandzonefinish: { type: 'presence', allowEmpty: false },
		oprexpandroutefinish: { type: 'presence', allowEmpty: false }/*,
		last_update: { type: 'presence'}*/
    }
});
