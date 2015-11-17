Ext.define('D7C.view.operadores.RegistroOperadorGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.registrooperadorgrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: true,
	reference: 'operatorRegisterGrid',
    height: 350,
    tbar: [{
		xtype: 'button',
        text: 'Añadir Registro',
		reference: 'newRecordButton',
        handler: 'onAddOperatorRegisterClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Registro',
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
    columns: [
		{xtype: 'rownumberer'},
        {text: 'ID',  dataIndex: 'operatorregisterid', width:55, hidden:false, filter:false},
		{text: 'Operador', dataIndex: 'operatorid', flex: 1,
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
				valueField: 'operatorid',
				queryMode: 'remote',
				store: Ext.create('D7C.store.operadores.OperadorValido'),
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
		{text: 'Zona Inicio', dataIndex: 'operatorregisterzonestart', width:110,
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
				return record.data.operatorregisterzonestart;
			}
		},
        {text: 'Ruta Inicio', dataIndex: 'operatorregisterroutestart', flex: 1,filter:true,
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Zona Final', dataIndex: 'operatorregisterzonefinish', width:110,
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
				return record.data.operatorregisterzonefinish;
			}
		},
        {text: 'Ruta Final', dataIndex: 'operatorregisterroutefinish', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Estado', dataIndex: 'operatorregisterstate', width:100,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				reference: 'combobox_status',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Activo',
					'Pendiente',
					'Baja'
				],
				listeners: {
                    focus: 'onValidateComboBox'
                }
			},
			renderer: function(value, metaData, record ){
				return record.data.operatorregisterstate;
			}
		},
		{text: 'Entidad Matriz', dataIndex: 'operatormatrix', flex: 1, hidden:true, 
			filter: {
				type: 'list'
			}
		}
    ],
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	{
        ptype: 'rowexpander',
        // dblclick invokes the row editor
        expandOnDblClick: false,
        rowBodyTpl: 'Codigo Operador: <b>{operatorcode}</b> - Fecha Resolucion Administrativa: <b>{adminresolutiondate}</b><br>Informe Tecnico: <b>{adminresolutiontechnical}</b><br></b>Informe Legal: <b>{adminresolutionlegal}</b><br></b>Cantidad Autorizada: <b>{vehiclequantitydescription}</b>'
    },
	{
		ptype: 'rowediting',
		pluginId: 'operatorRegisterRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});