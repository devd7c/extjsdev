Ext.define('D7C.view.infracciones.InfraccionRegistroGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.infraccionregistrogrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
	reference: 'infractionRegisterGrid',
    height: 350,
    tbar: [{
		xtype: 'button',
        text: 'Registrar Infraccion',
		reference: 'newRecordButton',
        handler: 'onAddInfractionRegisterClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Registro',
		reference: 'deleteRecordButton',
        handler: 'onRemoveInfractionRegisterClick',
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
        {text: 'ID',  dataIndex: 'infractionregisterid', width:55, hidden:false, filter:false},
		//{text: 'ID Infraccion',  dataIndex: 'infractionid', width:55, hidden:false, filter:false},
		{text: 'Infraccion', dataIndex: 'infractionid', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				displayField: 'descriptioninfraction',
				valueField: 'infractionid',
				queryMode: 'local',
				store: Ext.create('D7C.store.infracciones.Infraccion')
			},
			renderer: function(value, metaData, record ){
				return record.data.descriptioninfraction;
			}
        },
		{text: 'Monto',  dataIndex: 'amountinfraction', width:110, xtype: 'numbercolumn', format: '0.00 Bs',
			renderer: function(value, metaData, record ){
				return record.data.amountinfraction;
			}
		},
		{text: 'ID Unidad',  dataIndex: 'vehicleid', width:55, hidden:false, filter:false},
        {text: 'No. Boleta Infraccion', dataIndex: 'infractionnumberticket', flex: 1, filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Estado Infraccion', dataIndex: 'infractionregisterstate', flex: 1,
			editor: {
				xtype: 'combobox',
				allowBlank: false,
				editable: false,
				forceSelection: true,
				store: [
					'Pagado',
					'Pendiente',
					'Cancelado'
				]
			},
			renderer: function(value, metaData, record ){
				return record.data.infractionregisterstate;
			}
		}/*,
        {text: 'Monto Infraccion', dataIndex: 'amountinfraction', xtype: 'numbercolumn',
			format: '0.00 Bs', width:155, align: 'right', sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		}*/
    ],
	selType: 'rowmodel',
    plugins: [{
		ptype: 'rowediting',
		pluginId: 'modelInfractionRegisterRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});