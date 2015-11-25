/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.operadores.TarjetaOperacionTemp', {
    extend: 'Ext.window.Window',
    alias: 'widget.wintarjetaoperaciontemp',
    id: 'win-tarjetaoperaciontemp',
    controller: 'tarjetaoperaciontemp',
    layout		: "fit",
    width		: 1000,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Tarjetas de Operacion Temporal',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
