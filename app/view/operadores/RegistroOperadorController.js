Ext.define('D7C.view.operadores.RegistroOperadorController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.registrooperador',
	stores: ['RegistroOperador'],
	models: ['RegistroOperador'],
	views: ['RegistroOperador', 'RegistroOperadorGrid'],

	requires: [
		'D7C.view.operadores.RegistroOperador',
        'D7C.view.operadores.RegistroOperadorGrid'
	],

    init: function() {
        // RowEditing not appropriate for touch devices
        /*if (!Ext.supports.Touch) {
            // Plugins are instantiated at this time, we must add an instantiated Plugin, not a config
            this.getView().getPlugins().push(Ext.create({
                xclass: 'Ext.grid.plugin.RowEditing',
                clicksToMoveEditor: 1,
                autoCancel: false
            }));
        }*/
    },

	onAddCustomerClick: function() {
			alert("HOLA MUNDO");
	}
});
