Ext.define('D7C.model.propietarios.UnidadPropietario', {
	extend: 'Ext.data.Model',
    idProperty: 'vehicleid',
    fields: [
        {name: 'vehicleid', type: 'int' },
        {name: 'propietaryID', type: 'int'},
		{name: 'propietaryCI', type: 'string'}/*,
        {name: 'propietarylastname', type: 'string'},
		{name: 'propietaryci', type: 'string'},
		{name: 'propietaryadress', type: 'string'},
		{name: 'propietaryphone', type: 'string'}*/
    ],
    validators: {
        propietaryID: { type: 'presence', allowEmpty: false },
        propietaryCI: { type: 'presence', allowEmpty: false }/*,
		propietaryci: { type: 'presence', allowEmpty: false },
		propietaryadress: { type: 'presence', allowEmpty: false },
		propietaryphone: { type: 'presence', allowEmpty: false }*/
    }
});
