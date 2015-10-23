/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.operadores.TarjetaOperacion', {
    extend: 'Ext.window.Window',
    alias: 'widget.wintarjetaoperacion',
    id: 'win-tarjetaoperacion',
    controller: 'tarjetaoperacion',
    layout		: "fit",
    width		: 1000,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Tarjetas de Operacion',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
