/*
 @autor:Pablo Garcia
 */
Ext.define('D7C.view.login.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',


    
    requires: [
        'D7C.view.login.LoginController',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],
    controller: 'login',
    //viewModel: {
    //    type: 'mywindow'
    //},
    autoShow: true,
    width: 400,
    title: 'Login',
    resizable: false,
    draggable: true,
	closable: false,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'form',
            title: '',
            defaults:{
                xtype       : 'textfield',
                anchor      : '100%',
                labelWidth  : 60,
                minLength   : 3,
                vtype       : 'alphanum',
                allowBlank  : false
            },
            items: [
                {
                    fieldLabel: 'Usuario',
                    name: 'user',
                    value: 'd7c',
                    maxLength: 25
                },
                {
                    fieldLabel: 'Password',
                    inputType: 'password',
                    value: 'd7c',
                    name: 'password',
                    maxLength: 15
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                /*{
                    xtype: 'combobox'
                },*/
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Aceptar',
                    formBind: true,
                    iconCls: 'fa fa-sign-in fa-lg',
                    listeners: {
                        click: 'onClickSubmit'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Cancelar',
                    iconCls: 'fa fa-times fa-lg',
                    listeners:{
                        click:'onClickCancel'
                    }
                }
            ]
        }
    ]

});