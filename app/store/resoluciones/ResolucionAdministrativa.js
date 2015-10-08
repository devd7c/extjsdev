Ext.define('D7C.store.resoluciones.ResolucionAdministrativa', {
	extend: 'Ext.data.Store',
    alias: 'widget.resolucionadministrativastore',
    model: 'D7C.model.resoluciones.ResolucionAdministrativa',
	sorters: ['adminresolutionid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_date_administrative_resolutions.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelAdministrativeResolutions'
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
