Ext.define('D7C.store.sistema.Privilegios', {
	extend: 'Ext.data.Store',
    alias: 'widget.privilegiosstore',
    model: 'D7C.model.sistema.Usuario',
	sorters: ['privilegesid'],
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_users.php',
        extraParams:{action:'readPrivileges'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelUser'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            rootProperty: 'data',
            allowSingle: false
        }
    }
});
