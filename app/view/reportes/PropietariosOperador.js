/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.reportes.PropietariosOperador', {
    extend: 'Ext.window.Window',
    alias: 'widget.winpropietariosoperador',
    id: 'win-propietariosoperador',
    //controller: 'propietariosoperador',
    layout		: "fit",
    width		: 780,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Reportes',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});