Ext.define('D7C.model.sistema.Usuario', {
	extend: 'Ext.data.Model',
    idProperty: 'userid',
    fields: [
        {name: 'userid', type: 'int' },
		{name: 'privilegesid', type: 'int' },
        {name: 'address', type: 'string'},
        {name: 'email', type: 'string'},
		{name: 'name', type: 'string'},
		{name: 'password', type: 'string'},
		{name: 'phone', type: 'string'},
		{name: 'username', type: 'string'},
		{name: 'privilegesdescription', type: 'string'},
		{name: 'picture' }
    ],
    validators: {
        address: { type: 'presence', allowEmpty: false },
        email: { type: 'presence', allowEmpty: false },
		name: { type: 'presence', allowEmpty: false },
		password: { type: 'presence', allowEmpty: false },
		phone: { type: 'presence', allowEmpty: false },
		username: { type: 'presence', allowEmpty: false }		
    }
});
