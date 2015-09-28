Ext.define('D7C.store.operadores.RegistroOperador', {
	extend: 'Ext.data.Store',
    alias: 'widget.registroperadorstore',
    model: 'D7C.model.operadores.RegistroOperador',
    pageSize: 25,
    remoteFilter: true,
    proxy:{

        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        extraParams:{
            xaction:'readitemstock',
            yaction:''
        },
        reader:{
            type:'json',
            rootProperty: 'mageItem'
            //totalProperty: 'total'
        },
        url: 'resources/classes/sis_app_item.php'
    },
    folderSort:true,
    autoLoad: false
});
