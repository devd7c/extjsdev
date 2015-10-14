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
        {text: 'ID',  dataIndex: 'vehicleid', width:55, hidden:false, filter:false},
		{text: 'Operador C.I.', dataIndex: 'propietaryid', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				displayField: 'propietaryci',
				valueField: 'propietaryid',
				queryMode: 'local',
				store: Ext.create('D7C.store.propietarios.Propietario')
			},
			renderer: function(value, metaData, record ){
				var storePropietary=Ext.create('D7C.store.propietarios.Propietario');
				var propietaryStore = storePropietary;
				var propietary = propietaryStore.findRecord('propietaryid', value);
				return propietary != null ? propietary.get('propietaryci') : value;
			}
        }
        /*{text: 'Operador C.I.', dataIndex: 'propietaryCI', flex: 1,filter:true,
			editor: {
				xtype: 'combobox',
				store: Ext.create('D7C.store.propietarios.Propietario', {}),
				displayField: 'propietaryci',
				valueField: 'propietaryid',
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