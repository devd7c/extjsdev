/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.infracciones.Infraccion', {
    extend: 'Ext.window.Window',
    alias: 'widget.wininfraccion',
    id: 'win-infraccion',
    controller: 'infraccion',
    layout		: "fit",
    width		: 780,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Infracciones',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
