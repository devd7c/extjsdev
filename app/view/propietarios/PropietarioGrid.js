Ext.define('D7C.view.propietarios.PropietarioGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.propietariogrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: true,
    //stateId: 'stateGrid',
	reference: 'propietaryGrid',
    height: 350,
    /*viewConfig: {
        stripeRows: true
    },*/
    tbar: [{
		xtype: 'button',
        text: 'Añadir Propietario',
		reference: 'newRecordButton',
        handler: 'onAddPropietaryClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Propietario',
		reference: 'deleteRecordButton',
        handler: 'onRemovePropietaryClick',
		disabled:true
    },
	{
		xtype: 'button',
		text: 'Imprimir',
		listeners: {
			click: 'onPrint'
		}
	},
	{
		xtype: 'button',
		text: 'Generar PDF',
		listeners: {
			click: 'onExportPDF'
		}
	}],
	listeners: {
	   select: 'onGridSelect',
	   deselect: 'onGridDeselect'
	},
    columns: [
        {text: 'ID',  dataIndex: 'propietaryid', width:55, hidden:false, filter:false},
        {text: 'Nombre', dataIndex: 'propietaryfirstname', flex: 1,filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Apellidos', dataIndex: 'propietarylastname', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'C.I.', dataIndex: 'propietaryci', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Domicilio', dataIndex: 'propietaryadress', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Telefono/Celular', dataIndex: 'propietaryphone', xtype: 'numbercolumn', 
			format:'00', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		}
    ],
	selType: 'rowmodel',
    plugins: [{
		ptype: 'rowediting',
		pluginId: 'propietaryRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});