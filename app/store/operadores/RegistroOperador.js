Ext.define('D7C.store.operadores.RegistroOperador', {
	extend: 'Ext.data.Store',
    alias: 'widget.registrooperadorstore',
    model: 'D7C.model.operadores.RegistroOperador',
	sorters: ['operatorregisterid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_operators_register.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelOperatorsRegister'
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
