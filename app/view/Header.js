Ext.define('D7C.view.Header', {	
    extend: 'Ext.Container',
    xtype: 'appHeader',
    id: 'app-header',
    
    title: 'UNION',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    initComponent: function() {
        document.title = this.title;

        this.items = [{
            xtype: 'component',
            id: 'app-header-logo'
        },{
            xtype: 'component',
            id: 'app-header-title',
            html: this.title,
            flex: 1
        },
		{
			xtype: 'component',
			id: 'app-header-text',
			html: ' ' + D7C.Profile.getName() + ' <strong>X<strong> ',
			flex: 0.2,
			listeners: {
				render: function(c){
					c.getEl().on({
						click: 'onInfoProfileClick'
					});
				}
			}
		}];

        /*if (!Ext.getCmp('options-toolbar')) {
            this.items.push({
                xtype: 'themeSwitcher'
            });
        }*/

        this.callParent();
    }
});
