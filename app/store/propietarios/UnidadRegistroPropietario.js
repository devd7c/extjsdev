Ext.define('D7C.store.propietarios.UnidadRegistroPropietario', {
	extend: 'Ext.data.Store',
    alias: 'widget.unidadregistropropietariostore',
    model: 'D7C.model.propietarios.UnidadPropietario',
	sorters: ['vehicleid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_vehicle_proprietors.php',
        extraParams:{action:'readValidROP'},
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
