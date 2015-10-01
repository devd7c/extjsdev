Ext.define('D7C.store.operadores.Operador', {
	extend: 'Ext.data.Store',
    alias: 'widget.operadorstore',
    model: 'D7C.model.operadores.Operador',
	sorters: ['operatorid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'resources/classes/sis_union_operators.php',
        api: {
            create: 'resources/classes/sis_union_operators.php?action=create',
            read: 'resources/classes/sis_union_operators.php?action=read',
            update: 'resources/classes/sis_union_operators.php?action=update',
            destroy: 'resources/classes/sis_union_operators.php?action=destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelCars'
        }
    }
    /*pageSize: 25,
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
            rootProperty: 'operators',
            totalProperty: 'total',
			successProperty: 'success'
        },
        url: 'resources/classes/sis_union_operators.php'
    },
    folderSort:true,
    autoLoad: false*/
});
