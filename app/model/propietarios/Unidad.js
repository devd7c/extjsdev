Ext.define('D7C.model.propietarios.Unidad', {
	extend: 'Ext.data.Model',
    idProperty: 'vehiclequantityid',
    fields: [
        {name: 'vehiclequantityid', type: 'int'},
		{name: 'vehiclequantitydescription', type: 'string'},
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}
    ],
    validators: {
        vehiclequantitydescription: { type: 'presence', allowEmpty: false },
		last_update: { type: 'presence'}
    }
});
