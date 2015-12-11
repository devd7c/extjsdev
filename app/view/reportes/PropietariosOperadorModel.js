Ext.define('D7C.view.reportes.PropietariosOperadorModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.propietariosoperador',

    stores: {
        propietariosOperador: {
            fields: [
                {name: 'sindicato'},
                {name: 'propietarios'}
            ],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'data/proprietors_by_operator.php',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});