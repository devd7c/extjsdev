/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.infracciones.InfraccionRegistro', {
    extend: 'Ext.window.Window',
    alias: 'widget.wininfraccionregistro',
    id: 'win-infraccionregistro',
    controller: 'infraccionregistro',
    layout		: "fit",
    width		: 880,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Registro de Infracciones',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
