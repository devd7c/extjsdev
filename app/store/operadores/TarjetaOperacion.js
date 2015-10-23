Ext.define('D7C.store.operadores.TarjetaOperacion', {
	extend: 'Ext.data.Store',
    alias: 'widget.tarjetaoperacionstore',
    model: 'D7C.model.operadores.TarjetaOperacion',
	sorters: ['cardoperationid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_card_operations.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelCardOperations'
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
