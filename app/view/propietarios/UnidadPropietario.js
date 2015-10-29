/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.propietarios.UnidadPropietario', {
    extend: 'Ext.window.Window',
    alias: 'widget.winunidadpropietario',
    id: 'win-unidadpropietario',
    controller: 'unidadpropietario',
    layout		: "fit",
    width		: 1100,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Unidades de Transporte',
    maximized: false,
    maximizable:true,
	closeAction: "destroy",
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
