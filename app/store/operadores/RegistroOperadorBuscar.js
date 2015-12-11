Ext.define('D7C.store.operadores.RegistroOperadorBuscar', {
    extend: 'Ext.data.Store',

    requires: [
        'D7C.model.resoluciones.ResolucionAdministrativa'
    ],

    alias: 'store.search-registers',

    model: 'D7C.model.resoluciones.ResolucionAdministrativa',

    pageSize: 2,

    proxy: {
        type: 'ajax',
        url: 'data/searchResolutions.php',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});