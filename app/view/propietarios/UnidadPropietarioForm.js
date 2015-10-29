Ext.define('D7C.view.propietarios.UnidadPropietarioForm', {
    extend: 'Ext.window.Window',
    xtype: 'unidad-propietarioform',

    bind: {
        title: '{title}'
    },
    layout: 'fit',
    modal: true,
    width: 500,
    height: 550,
    closable: true,

    items: {
        xtype: 'form',
        reference: 'form',
        bodyPadding: 10,
        border: false,
        modelValidation: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
		{
			xtype: 'filefield',
			fieldLabel: 'Imagen',
			anchor: '100%',
			name: 'picture',
			buttonText: 'Selecccionar Imagen...',
			afterLabelTextTpl: D7C.util.Util.required,
			listeners: {
				change: 'onFileFieldChange'
			}
		},
		{
			xtype: 'hiddenfield',
			name: 'vehicleid',
			fieldLabel: 'Label',
			bind : '{vehicleid}'
        },
		{
			xtype: 'fieldset',
			title: 'Imagen Vehiculo',
			width: 170,
			items: [
				{
					xtype: 'image',
					reference: 'vehiclePicture',
					height: '100%',
					width: '100%',
					bind:{
						src: 'resources/vehicles/{picture}'
					}
				}
			]
		}
		]
    },

    buttons: [{
        text: 'Guardar',
        listeners: {
			click: 'onSaveImg'
        }
    }, 
	{
        text: 'Cancelar',
		listeners: {
			click: 'onCancelImg'
		}
    }]
});