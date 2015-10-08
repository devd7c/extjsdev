/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.resoluciones.ResolucionAdministrativa', {
    extend: 'Ext.window.Window',
    alias: 'widget.winresolucionadministrativa',
    id: 'win-resolucionadministrativa',
    controller: 'resolucionadministrativa',
    layout		: "fit",
    width		: 780,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Resoluciones Administrativas',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
