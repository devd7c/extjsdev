Ext.define('D7C.store.propietarios.Propietario', {
	extend: 'Ext.data.Store',
    alias: 'widget.propietariostore',
    model: 'D7C.model.propietarios.Propietario',
	pageSize: 35,
    remoteSort: true, 
	sorters: ['propietaryid'],
    autoLoad: {/*params:{start: 0, limit: 25, pageSize: 35}*/},
    autoSync: false,
    proxy: {
        type: 'ajax',
		enablePaging : true, 
        url: 'data/sis_union_proprietors.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelProprietors',
			totalProperty: 'total'
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
