/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.sistema.Usuario', {
    extend: 'Ext.window.Window',
    alias: 'widget.winusuario',
    id: 'win-usuario',
    controller: 'usuario',
    layout		: "fit",
    width		: 780,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Usuarios',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
