Ext.define('D7C.model.resoluciones.ResolucionAdministrativa', {
	extend: 'Ext.data.Model',
    idProperty: 'adminresolutionid',
    fields: [
        {name: 'adminresolutionid', type: 'int' },
		{name: 'vehiclequantityid', type: 'int' },
        {name: 'adminresolutioncode', type: 'string'},
		{name: 'adminresolutiondate', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'adminresolutiontechnical', type: 'string'},
		{name: 'adminresolutionlegal', type: 'string'},
		{name: 'last_update', type: 'date', dateFormat: 'Y-m-j H:i:s'}
    ],
    validators: {
        adminresolutioncode: { type: 'presence', allowEmpty: false },
		adminresolutiondate: { type: 'presence', allowEmpty: false },
		adminresolutiontechnical: { type: 'presence', allowEmpty: false },
		adminresolutionlegal: { type: 'presence', allowEmpty: false },
		last_update: { type: 'presence'}
    }
});
