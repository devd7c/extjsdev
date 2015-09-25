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
        'Ext.menu.Menu',
        'Ext.menu.Item'
    ],
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region: 'north',
            //height: 100,
            itemId: 'headerPanel',
            //title: 'System',
            //collapsible:true,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'label',
                            style: 'font-size:15px;',
                            text: 'System D7C'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '',
                            blankText: 'Select language'
                        },
                        {
                            xtype: 'button',
                            text: 'Logout'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            collapsible: true,
            itemId: 'menuPanel',
            //width: 250,
            layout: 'accordion',
            collapseDirection: 'left',
            title: 'Main Menu',
            items: [
                {
                    xtype: 'panel',
                    title: 'Registros',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu1',
                            style:'border:none;',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    text: 'Registro de Operaciones',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Propietarios',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Unidades de Propietarios',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Registro de Infracciones',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Registro de Tarjeta de Operaci&oacute;n',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Operadores',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Resoluci&oacute;n Administrativa',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Registro para Ampliaci&oacute;n de Unidades',
                                    focusable: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Reportes',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu2',
                            style:'border:none;',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    text: 'Menu Item',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Menu Item',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Menu Item',
                                    focusable: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Configuraciones',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            style:'border:none;',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    text: 'Usuarios',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Roles',
                                    focusable: true
                                },
                                {
                                    xtype: 'menuitem',
                                    text: 'Otros',
                                    focusable: true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            flex: 1,
            region: 'center',
            itemId: 'contentPanel',
            title: 'Home'
        }
    ]

});