Ext.define('D7C.store.operadores.TarjetaOperacionTemp', {
	extend: 'Ext.data.Store',
    alias: 'widget.tarjetaoperacionstoretemp',
    model: 'D7C.model.operadores.TarjetaOperacionTemp',
	sorters: ['cardoperationid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_card_operations_temp.php',
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
