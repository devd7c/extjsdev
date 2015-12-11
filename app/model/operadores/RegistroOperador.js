Ext.define('D7C.model.operadores.RegistroOperador', {
	extend: 'Ext.data.Model',
    idProperty: 'operatorregisterid',
    fields: [
        {name: 'operatorregisterid', type: 'int' },
		{name: 'operatorid', type: 'int' },
		{name: 'adminresolutionid', type: 'int' },
        {name: 'operatorregisterzonestart', type: 'string'},
        {name: 'operatorregisterroutestart', type: 'string'},
		{name: 'operatorregisterzonefinish', type: 'string'},
		{name: 'operatorregisterroutefinish', type: 'string'},
		{name: 'operatorregisterstate', type: 'string'}/*,
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}*/
    ],
    validators: {
        operatorregisterzonestart: { type: 'presence', allowEmpty: false },
        operatorregisterroutestart: { type: 'presence', allowEmpty: false },
		operatorregisterzonefinish: { type: 'presence', allowEmpty: false },
		operatorregisterroutefinish: { type: 'presence', allowEmpty: false },
		operatorregisterstate: { type: 'presence', allowEmpty: false }/*,
		last_update: { type: 'presence'}*/
    }
});
