Ext.define('D7C.store.propietarios.Unidad', {
	extend: 'Ext.data.Store',
    alias: 'widget.unidadstore',
    model: 'D7C.model.propietarios.Unidad',
	sorters: ['vehiclequantityid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_vehicles.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelVehicles'
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
