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
	iconCls: 'fa fa-key fa-lg',
    //width: 400,
    title: 'Login',
    resizable: false,
    draggable: true,
	closable: false,
	items: [
		{
			xtype: 'panel',
			//bodyStyle: "background-image:url('resources/images/bg_2.png')",
			margins :   25,
			//frame: true,
			layout: {
				type: 'column'
			},
			items :[
				{   
					xtype: 'form',
					//columnWidth : 0.9,
					reference: 'form',
					bodyPadding: 25,
					title: '',
					defaults:{
						xtype       : 'textfield',
						//anchor      : '10%',
						//labelWidth  : 10,
						minLength   : 3,
						vtype       : 'alphanum',
						allowBlank  : false,
						enableKeyEvents: true,
						msgTarget : 'side',
						listeners: {
							specialKey: 'onTextFieldSpecialKey'
						}
						//msgTarget : 'side'
					},
					//border: 0,
					//frame: true,
					//height: 150,
					//bodyBorder: false,
					//bodyStyle: "background-image:url('resources/images/bg.png')",
					items: [
						{
							fieldLabel: 'Usuario',
							labelWidth : 60,
							name: 'user',
							//vtype: 'customEmail',
							maxLength: 25,
							value: 'superman',
							listeners: {
								keypress: 'onTextFieldKeyPress'
							}
						},
						{
							inputType: 'password',
							labelWidth : 60,
							name: 'password',
							fieldLabel: 'Password',
							id: 'password',
							vtype: 'customPass',
							value: '$Superman123',
							maxLength: 15,
							listeners: {
								keypress: 'onTextFieldKeyPress'
							}
						}
				   ]
			   },{
					xtype: 'toolbar',
					border: 0,
					columnWidth : 0.3,
					padding : 0,
					margin : 1,
					height: 95,
					layout: {
						align: 'center',
						pack: 'end',
						type: 'vbox'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							text: 'Aceptar',
							width:100,
							height : 41,
							formBind: true,
							iconCls: 'fa fa-sign-in fa-lg',
							listeners: {
								click: 'onClickSubmit'
							}
						},
						{
							xtype: 'button',
							text: 'Cancelar',
							width: 100,
							height : 41,
							iconCls: 'fa fa-times fa-lg',
							listeners:{
								click:'onClickCancel'
							}
						}
					]
				
				}
			]
		}
    ]
    

});