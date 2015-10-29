Ext.define('D7C.store.propietarios.Propietario', {
	extend: 'Ext.data.Store',
    alias: 'widget.propietariostore',
    model: 'D7C.model.propietarios.Propietario',
	sorters: ['propietaryid'],
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_proprietors.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelProprietors'
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
