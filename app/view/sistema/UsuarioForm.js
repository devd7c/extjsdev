Ext.define('D7C.view.sistema.UsuarioForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.usuario-form',
    bind: {
        title: '{title}'
    },
    layout: 'fit',
    modal: true,
    width: 630,
    height: 400,
    closable: false,

    items: [
        {
            xtype: 'form',
            reference: 'form',
            bodyPadding: 5,
            modelValidation: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    title: 'Informacion de Usuario',
                    layout: 'anchor',
                    defaults: {
                        //afterLabelTextTpl: D7C.util.Util.required,
                        anchor: '100%',
                        xtype: 'textfield',
                        msgTarget: 'side',
                        labelWidth: 85
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'userid',
                            fieldLabel: 'Label',
                            bind : '{userid}'
                        },
                        {
                            fieldLabel: 'Nombre Completo',
                            name: 'name',
                            bind : '{name}',
							allowBlank  : false
                        },
                        {
                            fieldLabel: 'Nombre de Usuario',
                            name: 'username',
                            bind : '{username}',
							allowBlank  : false
                        },
                        {
                            fieldLabel: 'Contraseña',
							inputType: 'password',
                            name: 'password',
							vtype: 'customPass',
                            bind : '{password}',
							allowBlank  : false
                        },
                        {
							xtype: 'combobox',
							fieldLabel: 'Privilegios',
							allowBlank: false,
							forceSelection : true,
							enableKeyEvents :true,
							typeAhead: true,
							minChars        :5,
							displayField: 'privilegesdescription',
							valueField: 'privilegesid',
							queryMode: 'remote',
							publishes: 'value',
							name: 'privilegesid',
							store: Ext.create('D7C.store.sistema.Privilegios'),
                            bind: {
                                value: '{privilegesid}',
                                selection: '{privilegesdescription}'
                            }
							
                        },
                        {
                            fieldLabel: 'Fono/Celu',
                            name: 'phone',
                            bind : '{phone}',
							allowBlank  : false
                        },
                        {
                            fieldLabel: 'Domicilio',
                            name: 'address',
                            bind : '{address}'
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'email',
							vtype: 'customEmail',
                            bind : '{email}'
                        },
                        {
                            xtype: 'filefield',
                            fieldLabel: 'Foto',
                            anchor: '100%',
                            name: 'picture',
                            buttonText: 'Seleccione la imagen...',
                            afterLabelTextTpl: '',
                            listeners: {
                                change: 'onFileFieldChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Foto',
                    width: 170,
                    items: [
                        {
                            xtype: 'image',
                            reference: 'userPicture',
                            height: 150,
                            width: 150,
                            bind:{
                                src: 'resources/users/{picture}'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Guardar',
                    listeners: {
                        click: 'onSaveUser'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Cancelar',
                    listeners: {
                        click: 'onCancelUser'
                    }
                }
            ]
        }
    ]
});