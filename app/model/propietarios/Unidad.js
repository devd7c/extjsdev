Ext.define('D7C.model.propietarios.Unidad', {
	extend: 'Ext.data.Model',
    idProperty: 'vehiclequantityid',
    fields: [
        {name: 'vehiclequantityid', type: 'int'},
		{name: 'vehiclequantitydescription', type: 'string'}
    ],
    validators: {
        vehiclequantitydescription: { type: 'presence', allowEmpty: false }
    }
});
