Ext.define('D7C.store.propietarios.UnidadPropietario', {
	extend: 'Ext.data.Store',
    alias: 'widget.unidadpropietariostore',
    model: 'D7C.model.propietarios.UnidadPropietario',
	sorters: ['vehicleid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_vehicle_proprietors.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelVehicleProprietors'
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
