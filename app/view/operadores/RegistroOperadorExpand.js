Ext.define('D7C.view.operadores.RegistroOperadorExpand', {
    extend: 'Ext.window.Window',
    alias: 'widget.winregistrooperadorexpand',
    id: 'win-registrooperadorexpand',
    controller: 'registrooperadorexpand',
    layout		: "fit",
    width		: 1100,
    height		: 450,
    minHeight           : 450,
    constrainHeader : true,
    title: 'Ampliar Registro de Operadores',
    maximized: false,
    maximizable:true,
    initComponent: function() {
        var me = this;

        me.callParent();
        //me.callParent(arguments);
    }

});