/*
 @autor:Pablo Garcia
 */
Ext.define('D7C.view.login.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    controller: 'login',
    
    requires: [
        'D7C.view.login.LoginController',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    //viewModel: {
    //    type: 'mywindow'
    //},
    autoShow: true,
    width: 400,
    title: 'Login',

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            title: '',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults:{
                xtype: 'textfield'
            },
            items: [
                {
                    flex: 1,
                    fieldLabel: 'Usuario',
                    name: 'user',
                    minLength: 3,
                    maxLength: 25
                },
                {
                    flex: 1,
                    fieldLabel: 'Password',
                    inputType: 'password',
                    name: 'password',
                    minLength: 3,
                    maxLength: 15
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'combobox'
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Aceptar',
                    listeners: {
                        click: 'onLogin'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Cancelar'
                }
            ]
        }
    ]

});