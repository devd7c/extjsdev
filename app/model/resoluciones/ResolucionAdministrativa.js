Ext.define('D7C.model.resoluciones.ResolucionAdministrativa', {
	extend: 'Ext.data.Model',
    idProperty: 'adminresolutionid',
    fields: [
        {name: 'adminresolutionid', type: 'int' },
        {name: 'adminresolutioncode', type: 'string'},
		{name: 'adminresolutiondate', type: 'string'}
    ],
    validators: {
        adminresolutioncode: { type: 'presence', allowEmpty: false },
		adminresolutiondate: { type: 'presence', allowEmpty: false }
    }
});
