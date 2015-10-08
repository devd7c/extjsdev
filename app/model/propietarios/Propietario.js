Ext.define('D7C.model.propietarios.Propietario', {
	extend: 'Ext.data.Model',
    idProperty: 'propietaryid',
    fields: [
        {name: 'propietaryid', type: 'int' },
        {name: 'propietaryfirstname', type: 'string'},
        {name: 'propietarylastname', type: 'string'},
		{name: 'propietaryci', type: 'string'},
		{name: 'propietaryadress', type: 'string'},
		{name: 'propietaryphone', type: 'string'}
    ],
    validators: {
        propietaryfirstname: { type: 'presence', allowEmpty: false },
        propietarylastname: { type: 'presence', allowEmpty: false },
		propietaryci: { type: 'presence', allowEmpty: false },
		propietaryadress: { type: 'presence', allowEmpty: false },
		propietaryphone: { type: 'presence', allowEmpty: false }
    }
});
