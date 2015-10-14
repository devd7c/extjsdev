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
		{text: 'Operador', dataIndex: 'propietaryid', width:100,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				displayField: 'propietaryci',
				valueField: 'propietaryid',
				queryMode: 'local',
				store: Ext.create('D7C.store.propietarios.Propietario')
			},
			renderer: function(value, metaData, record ){
				return record.data.propietaryci;
			}
        },
        {text: 'Capacidad', dataIndex: 'vehiclecapacity', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'2TN/20 Personas',
					'4TN/40 Personas',
					'6TN/50 Personas',
					'8TN/60 Personas',
					'10TN/70 Personas',
					'12TN/80 Personas',
					'14TN/90 Personas',
					'16TN/100 Personas',
					'18TN/110 Personas',
					'20TN/120 Personas',
					'22TN/130 Personas',
					'24TN/140 Personas',
					'26TN/150 Personas'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclecapacity;
			}
		}/*,
		{text: 'Categoria', dataIndex: 'vehiclecategory', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Categoria A',
					'Categoria B',
					'Categoria C',
					'Categoria D',
					'Categoria E'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclecategory;
			}
		},
		{text: 'No. Chasis', dataIndex: 'vehiclechasis', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Clase', dataIndex: 'vehicleclass', width:80,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Clase A',
					'Clase B',
					'Clase C',
					'Clase D',
					'Clase E'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehicleclass;
			}
		},
		{text: 'Marca', dataIndex: 'vehiclebrand', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'No. de Registro', dataIndex: 'vehicleregistrationnumber', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Modelo', dataIndex: 'vehiclemodel', width:70,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'1980',
					'1981',
					'1983',
					'1984',
					'1985'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclemodel;
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