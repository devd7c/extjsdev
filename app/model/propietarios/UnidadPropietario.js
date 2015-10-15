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
		{name: 'vehicleregistrationnumber', type: 'string'},
		{name: 'vehiclemodel', type: 'string'}
    ],
    validators: {
        propietaryid: { type: 'presence', allowEmpty: false },
		vehiclecapacity: { type: 'presence', allowEmpty: true },
        vehiclecategory: { type: 'presence', allowEmpty: true },
		vehiclechasis: { type: 'presence', allowEmpty: false },
		vehicleclass: { type: 'presence', allowEmpty: true },
		vehiclebrand: { type: 'presence', allowEmpty: false },
		vehicleregistrationnumber: { type: 'presence', allowEmpty: false },
		vehiclemodel: { type: 'presence', allowEmpty: true }
    }
});
