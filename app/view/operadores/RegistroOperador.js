/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.operadores.RegistroOperador', {
    extend: 'Ext.window.Window',
    alias: 'widget.winregistrooperador',
    id: 'win-registrooperador',
    controller: 'registrooperador',
    layout		: "fit",
    width		: 1100,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Registro de Operadores',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});
