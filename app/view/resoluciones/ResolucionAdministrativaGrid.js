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
        {text: 'ID',  dataIndex: 'adminresolutionid', width:55, hidden:false, filter:false},
        {header: 'Fecha Resolucion', xtype: 'datecolumn', dataIndex: 'adminresolutiondate', flex: 1,format: 'M d, Y',
			editor: {
				xtype: 'datefield', allowBlank: false,
				format: 'Y-m-d',
                minValue: '01/01/05'/*,
                disabledDays: [0, 6],
                disabledDaysText: 'Plants are not available on the weekends'*/
			}
		},
        {text: 'Codigo Resolucion', dataIndex: 'adminresolutioncode', flex: 1,filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		}
    ],
	selType: 'rowmodel',
    plugins: [{
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