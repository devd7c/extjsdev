Ext.define('D7C.view.operadores.RegistroOperadorExpandGrid',{
    extend: 'Ext.grid.Panel',
	xtype: 'grouped-grid',
    alias: 'widget.registrooperadorexpandgrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: false,
	reference: 'operatorRegisterExpandGrid',
    height: 350,
    tbar: [{
		xtype: 'button',
        text: 'Añadir Ampliacion',
		reference: 'newRecordButton',
        handler: 'onAddOperatorRegisterClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Ampliacion',
		reference: 'deleteRecordButton',
        handler: 'onRemoveOperatorRegisterClick',
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
	features: [{
		id: 'group',
		ftype: 'groupingsummary',
		groupHeaderTpl: '{name}',
		hideGroupedHeader: true,
		enableGroupingMenu: false
    }],
    columns: [
		{xtype: 'rownumberer'},
        {text: 'ID',  dataIndex: 'oprexpandid', width:55, hidden:true, filter:false},
		{text: 'Operador', dataIndex: 'operatorregisterid', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				forceSelection : true,
				matchFieldWidth :false,
				enableKeyEvents :true,
				typeAhead: true,
				hideLabel: true,
				hideTrigger:true,
				minChars        :5,
				displayField: 'syndicatename',
				valueField: 'operatorregisterid',
				queryMode: 'remote',
				store: Ext.create('D7C.store.operadores.RegistroOperadorValido'),
				listConfig   : {
					itemTpl :
					'<div data-qtip="Codigo: {operatorcode}">{syndicatename}</div>'
				}
			},
			listeners:{
				focus:function(cbo){
					cbo.getStore().getProxy().setExtraParams({action:'readvalid'});
					cbo.getStore().reload();
				}
			},
			renderer: function(value, metaData, record ){
				return record.data.syndicatename;
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
			},
			summaryType: 'count',
			summaryRenderer: function(value, summaryData, dataIndex) {
				return ((value === 0 || value > 1) ? '(' + value + ' Resoluciones)' : '(1 Resolucion)');
			}
        },
		{text: 'Resolucion Administrativa', dataIndex: 'adminresolutionid', flex: 1,
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
				displayField: 'adminresolutioncode',
				valueField: 'adminresolutionid',
				queryMode: 'remote',
				store: Ext.create('D7C.store.resoluciones.ResolucionAdministrativa'),
				listConfig   : {
					itemTpl :
					'<div data-qtip="Fecha: <strong>{adminresolutiondate:date("Y-m-d")}</strong><br>Cod Resolucion: <strong>{adminresolutioncode}</strong><br>Informe Tecnico: <strong>{adminresolutiontechnical}</strong><br>Informe Legal: <strong>{adminresolutionlegal}</strong><br>Cantidad Autorizada: <strong>{vehiclequantitydescription}</strong>">{adminresolutioncode}</div>'
				}
			},
			listeners:{
				focus:function(cbo){
					cbo.getStore().getProxy().setExtraParams({action:'read'});
					cbo.getStore().reload();
				}
			},
			renderer: function(value, metaData, record ){
				return record.data.adminresolutioncode;
			}
        },
		{text: 'Zona Inicio', dataIndex: 'oprexpandzonestart', width:110,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Zona Tropico',
					'Zona Valle Alto',
					'Zona Sud',
					'Zona Andina',
					'Cercado'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.oprexpandzonestart;
			}
		},
        {text: 'Ruta Inicio', dataIndex: 'oprexpandroutestart', flex: 1,filter:true,
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Zona Final', dataIndex: 'oprexpandzonefinish', width:110,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Zona Tropico',
					'Zona Valle Alto',
					'Zona Sud',
					'Zona Andina',
					'Cercado'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.oprexpandzonefinish;
			}
		},
        {text: 'Ruta Final', dataIndex: 'oprexpandroutefinish', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Ultima Modificacion', xtype: 'datecolumn', width: 160, dataIndex: 'last_update',
            format: 'Y-m-j H:i:s', filter: true, hidden:true
        }
    ],
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	{
		ptype: 'rowediting',
		pluginId: 'operatorRegisterExpandRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});