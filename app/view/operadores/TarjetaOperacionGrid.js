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
				displayField: 'syndicatename',
				valueField: 'operatorregisterid',
				queryMode: 'local',
				publishes: 'value',
				store: Ext.create('D7C.store.operadores.RegistroOperadorValido')
			},
			renderer: function(value, metaData, record ){
				return record.data.syndicatename;
			}
        },
		{text: 'Placa Vehiculo', dataIndex: 'vehicleid', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
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
				store: Ext.create('D7C.store.propietarios.UnidadRegistroPropietario')
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclelicense;
			}
        },
        {text: 'Nombre Presidente', dataIndex: 'nameprincipal', flex: 1,filter:true,
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Nombre Secretaria', dataIndex: 'namesecretary', flex: 1, sortable: true,
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
			},
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
			},
			renderer: function(value, metaData, record ){
				return record.data.cardoperationstatus;
			}
		}
    ],
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	/*{
        ptype: 'rowexpander',
        // dblclick invokes the row editor
        expandOnDblClick: false,
        rowBodyTpl: 'Codigo Operador: <b>{operatorcode}</b> - Fecha Resolucion Administrativa: <b>{adminresolutiondate}</b><br>Informe Tecnico: <b>{adminresolutiontechnical}</b><br></b>Informe Legal: <b>{adminresolutionlegal}</b><br></b>Cantidad Autorizada: <b>{vehiclequantitydescription}</b>'
    },*/
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