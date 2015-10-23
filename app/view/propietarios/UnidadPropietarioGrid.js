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
		{xtype: 'rownumberer'},
        {text: 'ID',  dataIndex: 'vehicleid', width:55, hidden:false, filter:false},
		{text: 'Propietario', dataIndex: 'propietaryid', width:250,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				displayField: 'propietaryci',
				valueField: 'propietaryid',
				queryMode: 'local',
				store: Ext.create('D7C.store.propietarios.Propietario')
			},
			/*renderer: function(value, metaData, record ){
				return record.data.propietaryci;
			},*/
			renderer : function(value, metadata, record) {
				 myToolTipText = record.data.propietaryfirstname + " " + record.data.propietarylastname;
				 return myToolTipText;
			}
        },
		{text: 'Categoria', dataIndex: 'vehiclecategory', width:80,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Pasajeros',
					'Carga'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclecategory;
			}
		},
        {text: 'Capacidad', dataIndex: 'vehiclecapacity', width:120,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'5 Personas',
					'6 Personas',
					'7 Personas',
					'8 Personas',
					'9 Personas',
					'10 Personas',
					'12 Personas',
					'14 Personas',
					'16 Personas',
					'18 Personas',
					'20 Personas',
					'25 Personas',
					'35 Personas',
					'40 Personas',
					'45 Personas',
					'50 Personas',
					'1 Tonelada',
					'2 Toneladas',
					'3 Toneladas'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclecapacity;
			}
		},
		{text: 'Clase', dataIndex: 'vehicleclass', width:90,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Camion',
					'Camioneta',
					'Minibus',
					'Omnibus',
					'Taxi',
					'Vagoneta'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehicleclass;
			}
		},
		{text: 'Marca', dataIndex: 'vehiclebrand', width:100, sortable: true,
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'textfield', allowBlank: false
			}/*,
			renderer : function(value, metadata, record) {
				 myToolTipText = "<b>Annotation</b>";
				 myToolTipText = myToolTipText + "<br/>"+ record.data.propietaryfirstname;
				 metadata.tdAttr = 'data-qtip="' + myToolTipText + '"';
				 return value;
			}*/
		},
		{text: 'Modelo', dataIndex: 'vehiclemodel', width:70,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'1980',
					'1981',
					'1982',
					'1983',
					'1984',
					'1985',
					'1986',
					'1987',
					'1988',
					'1989',
					'1990',
					'1991',
					'1992',
					'1993',
					'1994',
					'1995',
					'1996',
					'1997',
					'1998',
					'1999',
					'2000',
					'2001',
					'2002',
					'2003',
					'2004',
					'2005',
					'2006',
					'2007',
					'2008',
					'2009',
					'2010',
					'2011',
					'2012',
					'2013',
					'2014',
					'2015',
					'2016',
					'2017',
					'2018',
					'2019',
					'2020'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclemodel;
			}
		},
		{text: 'No. de Placa', dataIndex: 'vehiclelicense', width:100, sortable: true,
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'No. Chasis', dataIndex: 'vehiclechasis', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Habilitado', dataIndex: 'vehiclestatus', flex: 1, sortable: true,
			filter: {
				type: 'list'
			}
		}
		
    ],
	viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) { 
            return record.get('vehiclestatus') == 'NO' ? 'invalid-row' : 'valid-row'; 
        } 
    },
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	{
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