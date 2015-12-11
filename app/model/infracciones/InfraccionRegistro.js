Ext.define('D7C.model.infracciones.InfraccionRegistro', {
	extend: 'Ext.data.Model',
    idProperty: 'infractionregisterid',
    fields: [
        {name: 'infractionregisterid', type: 'int' },
		{name: 'infractionid', type: 'int' },
		{name: 'vehicleid', type: 'int' },
        {name: 'infractionnumberticket', type: 'string'},
        {name: 'infractionregisterstate', type: 'string'}/*,
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}*/
    ],
    validators: {
        infractionid: { type: 'presence', allowEmpty: true },
        vehicleid: { type: 'presence', allowEmpty: true },
		infractionnumberticket: { type: 'presence', allowEmpty: false },
		infractionregisterstate: { type: 'presence', allowEmpty: true }/*,
		last_update: { type: 'presence'}*/
    }
});