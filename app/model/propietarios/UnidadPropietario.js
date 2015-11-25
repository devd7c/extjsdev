Ext.define('D7C.model.propietarios.UnidadPropietario', {
	extend: 'Ext.data.Model',
    idProperty: 'vehicleid',
    fields: [
        {name: 'vehicleid', type: 'int'},
		{name: 'propietaryid', type: 'int'},
		{name: 'vehiclecapacity', type: 'string'},
		{name: 'vehiclecategory', type: 'string'},
		{name: 'vehiclechasis', type: 'string'},
		{name: 'vehicleclass', type: 'string'},
        {name: 'vehiclebrand', type: 'string'},
		{name: 'vehiclestatus', type: 'string'},
		{name: 'vehiclemodel', type: 'string'},
		{name: 'vehiclelicense', type: 'string'},
		{name: 'picture', type: 'string'},
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}
    ],
    validators: {
        propietaryid: { type: 'presence', allowEmpty: false },
		vehiclecapacity: { type: 'presence', allowEmpty: true },
        vehiclecategory: { type: 'presence', allowEmpty: true },
		vehiclechasis: { type: 'presence', allowEmpty: false },
		vehicleclass: { type: 'presence', allowEmpty: true },
		vehiclebrand: { type: 'presence', allowEmpty: false },
		vehiclestatus: { type: 'presence', allowEmpty: false },
		vehiclemodel: { type: 'presence', allowEmpty: true },
		vehiclelicense: { type: 'presence', allowEmpty: true },
		picture: { type: 'presence', allowEmpty: true },
		last_update: { type: 'presence'}
    }
});
