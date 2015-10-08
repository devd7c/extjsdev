Ext.define('D7C.store.infracciones.Infraccion', {
	extend: 'Ext.data.Store',
    alias: 'widget.infraccionstore',
    model: 'D7C.model.infracciones.Infraccion',
	sorters: ['infractionid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_infractions.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelInfractions'
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
