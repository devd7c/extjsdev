Ext.define('D7C.view.propietarios.UnidadPropietarioGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.unidadpropietariogrid',

    requires: ['Ext.toolbar.Paging'],

    stateful: true,
    multiSelect: true,
    //stateId: 'stateGrid',
	reference: 'vehiclePropietaryGrid',
    height: 350,
    /*viewConfig: {
        stripeRows: true
    },*/
    tbar: [{
		xtype: 'button',
        text: 'Añadir Unidad de Transporte',
		reference: 'newRecordButton',
        handler: 'onAddVehiclePropietaryClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Unidad de Transporte',
		reference: 'deleteRecordButton',
        handler: 'onRemoveVehiclePropietaryClick',
		disabled:true
    }],
	listeners: {
	   select: 'onGridSelect',
	   deselect: 'onGridDeselect'
	},
    columns: [
        {text: 'ID',  dataIndex: 'vehicleid', width:55, hidden:false, filter:false,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		}/*,
        {text: 'Operador C.I.', dataIndex: 'propietaryCI', flex: 1,filter:true,
			editor: {
				xtype: 'combobox', 
				displayField: 'propietaryci',
				valueField: 'propietaryci',
				editable: false,
				queryMode: 'local',
				forceSelection: true,
				triggerAction: 'all',
				allowBlank: false
			}
		}*/
    ],
	selType: 'rowmodel',
    plugins: [{
		ptype: 'rowediting',
		pluginId: 'vehiclePropietaryRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});