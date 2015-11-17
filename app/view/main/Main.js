/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('D7C.view.main.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.main',

    plugins: 'viewport',

    requires: [
        'D7C.view.main.MainController',
        'D7C.view.main.MainModel',
        'D7C.view.Header',
        'D7C.view.ContentPanel',
        'D7C.view.menu.Accordion',
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
		//'D7C.util.Profile'
    ],
	xtype: 'app-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: 'border',

    items: [{
		    region: 'north',
            xtype: 'appHeader'
		},{
            xtype: 'mainmenu',
            width: 250,
            collapsible: true,
            region: 'west'
		},{
			region: 'center',
			xtype: 'contentPanel',
			reference: 'contentPanel'
		},{
			xtype: 'container',
			region: 'south',
			height: 5,
			style: 'border-top: 1px solid #4c72a4;'
		}]
});