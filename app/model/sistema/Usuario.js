Ext.define('D7C.model.sistema.Usuario', {
	extend: 'Ext.data.Model',
    fields: [
        {name: 'userid'},
        {name: 'name'},
        {name: 'username'},
		{name: 'password'},
		{name: 'phone'},
		{name: 'address'},
		{name: 'email'}
    ]
});
