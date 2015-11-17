/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.sistema.Usuario', {
    extend: 'Ext.window.Window',
    alias: 'widget.winusuario',
	requires: [
		'D7C.util.Profile'
	],
    id: 'win-usuario',
    controller: 'usuario',
    layout		: "fit",
    width		: 780,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Usuarios del Sistema',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
