Ext.define('D7C.store.operadores.RegistroOperadorExpand', {
	extend: 'Ext.data.Store',
    alias: 'widget.registrooperadorexpandstore',
    model: 'D7C.model.operadores.RegistroOperadorExpand',
	sorters: ['oprexpandid'],
	groupField: 'syndicatename',
    autoLoad: true,
    autoSync: false,    // Make sure that autosync is disabled to avoid posting invalid vendorName.
    proxy: {
        type: 'ajax',
        url: 'data/sis_union_operators_register_expand.php',
        extraParams:{action:'read'},
        actionMethods: {
            read: 'POST'
        },
        reader: {
            type: 'json',
            rootProperty: 'modelOperatorsRegisterExpand'
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
