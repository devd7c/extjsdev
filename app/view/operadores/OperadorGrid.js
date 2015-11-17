Ext.define('D7C.view.operadores.OperadorGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.operadorgrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: true,
	reference: 'operatorGrid',
    height: 350,
    tbar: [{
		xtype: 'button',
        text: 'Añadir Operador',
		reference: 'newRecordButton',
        handler: 'onAddOperatorClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Operador',
		reference: 'deleteRecordButton',
        handler: 'onRemoveOperatorClick',
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
        {text: 'ID',  dataIndex: 'operatorid', width:55, hidden:false, filter:false},
        {text: 'Nombre del Operador', dataIndex: 'syndicatename', flex: 1,filter:true,
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Codigo', dataIndex: 'operatorcode', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Entidad Matriz', dataIndex: 'operatormatrix', flex: 1,
			filter: {
				type: 'list'
			},
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Libre',
					'Federado'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.operatormatrix;
			}
		},
		{text: 'Estado', dataIndex: 'operatorstate', width:100,
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
					'Valido',
					'Pendiente',
					'Invalido'
				],
				listeners: {
                    focus: 'onValidateComboBox'
                }
			},
			renderer: function(value, metaData, record ){
				return record.data.operatorstate;
			}
		}
    ],
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	{
		ptype: 'rowediting',
		pluginId: 'modelOperatorRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});