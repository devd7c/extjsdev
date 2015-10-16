Ext.define('D7C.store.infracciones.InfraccionRegistro', {
	extend: 'Ext.data.Store',
    alias: 'widget.infraccionregistrostore',
    model: 'D7C.model.infracciones.InfraccionRegistro',
	sorters: ['infractionregisterid'],
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_infractions_register.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelInfractionsRegister'
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
