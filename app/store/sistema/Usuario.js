Ext.define('D7C.store.sistema.Usuario', {
	extend: 'Ext.data.Store',
    alias: 'widget.usuariostore',
    model: 'D7C.model.sistema.Usuario',
    pageSize: 25,
    remoteFilter: true,
    proxy:{

        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        extraParams:{
            xaction:'read',
            yaction:''
        },
        reader:{
            type:'json',
            rootProperty: 'users',
            totalProperty: 'total',
			successProperty: 'success'
        },
        url: 'resources/classes/sis_union_users.php'
    },
    folderSort:true,
    autoLoad: false
});
