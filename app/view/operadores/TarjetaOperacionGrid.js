Ext.define('D7C.view.operadores.TarjetaOperacionGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.tarjetaoperaciongrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: true,
	reference: 'cardOperationGrid',
    height: 350,
    tbar: [{
		xtype: 'button',
        text: 'Añadir Tarjeta de Operacion',
		reference: 'newRecordButton',
        handler: 'onAddCardOperationClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Tarjeta de Operacion',
		reference: 'deleteRecordButton',
        handler: 'onRemoveCardOperationClick',
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
        {text: 'ID',  dataIndex: 'cardoperationid', width:55, hidden:false, filter:false},
		{text: 'Operador', dataIndex: 'operatorregisterid', flex: 1,
			editor: {
				xtype: 'combobox',
				reference: 'operator',
				allowBlank: false,
				forceSelection : true,
				matchFieldWidth :true,
				enableKeyEvents :true,
				typeAhead: true,
				hideLabel: true,
				hideTrigger:true,
				minChars        :5,
				displayField: 'syndicatename',
				valueField: 'operatorregisterid',
				queryMode: 'remote',
				publishes: 'value',
				store: Ext.create('D7C.store.operadores.RegistroOperadorValido')
			},
			renderer: function(value, metaData, record ){
				return record.data.syndicatename;
			},
			listeners:{
				focus:function(cbo){
					cbo.getStore().getProxy().setExtraParams({action:'readvalid'});
					cbo.getStore().reload();
				}
			},
			items    : {
				xtype: 'textfield',
				reference: 'operatorFilterField',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
					keyup: 'onOperatorFilterKeyup',
					buffer: 500
				}
			}
        },
		{text: 'Placa Vehiculo', dataIndex: 'vehicleid', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				forceSelection : true,
				matchFieldWidth :true,
				enableKeyEvents :true,
				typeAhead: true,
				hideLabel: true,
				hideTrigger:true,
				minChars        :1,
				displayField: 'vehiclelicense',
				valueField: 'vehicleid',
				queryMode: 'remote',
				bind: {
					visible: '{operator.value}',
					filters: {
						property: 'operatorregisterid',
						value: '{operator.value}'
					}
				},
				store: Ext.create('D7C.store.propietarios.UnidadRegistroPropietario'),
				listConfig   : {
					itemTpl :
					'<div data-qtip="Propietario: <strong>{propietaryfirstname} {propietarylastname}</strong><br></b>Marca Vehiculo: <strong>{vehiclebrand}</strong><br></b>Capacidad: <strong>{vehiclecapacity}</strong><br></b>Categoria: <strong>{vehiclecategory}</strong><br></b>Clase: <strong>{vehicleclass}</strong><br></b>Modelo: <strong>{vehiclemodel}</strong>">{vehiclelicense}</div>'
				}
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclelicense;
			},
			listeners:{
				focus:function(cbo){
					cbo.getStore().getProxy().setExtraParams({action:'readValidROP'});
					cbo.getStore().reload();
				}
			},
			items    : {
				xtype: 'textfield',
				reference: 'licenceFilterField',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
					keyup: 'onLicenceFilterKeyup',
					buffer: 500
				}
			}
        },
        {text: 'Nombre Presidente', dataIndex: 'nameprincipal', flex: 1,filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Nombre Secretaria', dataIndex: 'namesecretary', flex: 1, filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {header: 'Vigencia Tarjeta', xtype: 'datecolumn', dataIndex: 'cardoperationvalidity', flex: 1, format: 'Y-m-d',
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'datefield', allowBlank: false,
				format: 'Y-m-d',
                minValue: '01/01/15'
			},
			renderer: function(value, metaData, record ){
				return Ext.util.Format.date(record.data.cardoperationvalidity, 'Y-m-d');
			}
		},
		{text: 'Estado', dataIndex: 'cardoperationstatus', width:100,
			filter: {
				type: 'list'
			},/*,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Activo',
					'Pendiente',
					'Baja'
				]
			},*/
			renderer: function(value, metaData, record ){
				return record.data.cardoperationstatus;
			}
		},
		{
			xtype: 'actioncolumn',
			width: 30,
			sortable: false,
			menuDisabled: true,
			items: [{
				icon: 'resources/images/icons/fam/cross.gif',
				tooltip: 'Dar de Baja',
				//scope: this/*,
				handler: 'onDisableClick'
			}]
		},
		{
			xtype: 'actioncolumn',
			width: 30,
			sortable: false,
			menuDisabled: true,
			items: [{
				icon: 'resources/images/icons/fam/accept.png',
				tooltip: 'Activar',
				//scope: this/*,
				handler: 'onActiveClick'
			}]
		}
    ],
	viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) { 
            return record.get('cardoperationstatus') == 'Activo' ? 'valid-row' : record.get('infractionregisterstate') == 'Baja' ? 'invalid-row' : ''; 
        } 
    },
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	{
        ptype: 'rowexpander',
        // dblclick invokes the row editor
        expandOnDblClick: false,
        rowBodyTpl: '<img src="resources/vehicles/{picture}" height="100px" style="float:left;margin:0 10px 5px 0">Propietario: <b>{propietaryfirstname} {propietarylastname}</b> - C.I.: <b>{propietaryci}</b><br></b>Marca Vehiculo: <b>{vehiclebrand}</b><br></b>Capacidad: <b>{vehiclecapacity}</b><br></b>Categoria: <b>{vehiclecategory}</b><br></b>Clase: <b>{vehicleclass}</b><br></b>Modelo: <b>{vehiclemodel}</b>'
    },
	{
		ptype: 'rowediting',
		pluginId: 'cardOperationRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});