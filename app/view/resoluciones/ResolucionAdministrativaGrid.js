Ext.define('D7C.view.resoluciones.ResolucionAdministrativaGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.resolucionadministrativagrid',

    requires: ['Ext.toolbar.Paging',
		'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*'
	],
	xtype: 'cell-editing',
    stateful: true,
    multiSelect: true,
	reference: 'modelAdministrativeResolutionGrid',
    height: 350,
    tbar: [{
		xtype: 'button',
        text: 'Añadir Resolucion Administrativa',
		reference: 'newRecordButton',
        handler: 'onAddAdministrativeResolutionClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Resolucion Administrativa',
		reference: 'deleteRecordButton',
        handler: 'onRemoveAdministrativeResolutionClick',
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
        {text: 'ID',  dataIndex: 'adminresolutionid', width:55, hidden:false, filter:false},
        {header: 'Fecha Resolucion', xtype: 'datecolumn', dataIndex: 'adminresolutiondate', flex: 1, format: 'Y-m-d',
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'datefield', allowBlank: false,
				format: 'Y-m-d',
                minValue: '01/01/15'/*,
                disabledDays: [0, 6],
                disabledDaysText: 'Plants are not available on the weekends'*/
			},
			renderer: function(value, metaData, record ){
				return Ext.util.Format.date(record.data.adminresolutiondate, 'Y-m-d');
				//return record.data.adminresolutiondate;
			}
		},
        {text: 'Codigo Resolucion', dataIndex: 'adminresolutioncode', flex: 1,filter:true,
			filter: {
				//type: 'list'
			},
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Informe Tecnico', dataIndex: 'adminresolutiontechnical', flex: 1,filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Informe Legal', dataIndex: 'adminresolutionlegal', flex: 1,filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Cantidad Autorizada', dataIndex: 'vehiclequantityid', flex: 1,
			editor: {
				xtype: 'combobox',
				reference: 'cb_quantity',
				allowBlank: false,
				displayField: 'vehiclequantitydescription',
				valueField: 'vehiclequantityid',
				queryMode: 'local',
				store: Ext.create('D7C.store.propietarios.Unidad'),
				listeners:{
					focus: 'onValidateComboBox'
				}
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclequantitydescription;
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
		pluginId: 'modelAdministrativeResolutionRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});