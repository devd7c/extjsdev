Ext.define('D7C.view.Footer', {	
    extend: 'Ext.Container',
    xtype: 'appFooter',
    id: 'app-footer',
    
    //title: 'UNION',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    initComponent: function() {
        //document.title = this.title;

        this.items = [
		{
			xtype: 'button',
			text: 'Salir',
			handler: 'onClickButtonLogout'
		}];

        /*if (!Ext.getCmp('options-toolbar')) {
            this.items.push({
                xtype: 'themeSwitcher'
            });
        }*/

        this.callParent();
    }
});
