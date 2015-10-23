/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.propietarios.Propietario', {
    extend: 'Ext.window.Window',
    alias: 'widget.winpropietario',
    id: 'win-propietario',
    controller: 'propietario',
    layout		: "fit",
    width		: 950,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Propietarios',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
