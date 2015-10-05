Ext.define('D7C.store.operadores.Operador', {
	extend: 'Ext.data.Store',
    alias: 'widget.operadorstore',
    model: 'D7C.model.operadores.Operador',
	sorters: ['operatorid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_operators.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        //api: {
        //    read    : 'data/sis_union_operators.php',
        //    create  : 'data/sis_union_operators.php',
        //    update  : 'data/sis_union_operators.php',
        //    destroy : 'data/sis_union_operators.php'
        //},
        reader: {
            type: 'json',
            rootProperty: 'modelOperators'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            rootProperty: 'data',
            allowSingle: false
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
