Ext.define('D7C.store.operadores.OperadorValido', {
	extend: 'Ext.data.Store',
    alias: 'widget.operadorvalidostore',
    model: 'D7C.model.operadores.Operador',
	sorters: ['operatorid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_operators.php',
        extraParams:{action:'readvalid'},
        actionMethods: {
            read: 'POST'
        },
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
});
