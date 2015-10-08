Ext.define('D7C.view.infracciones.InfraccionGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.infracciongrid',

    requires: ['Ext.toolbar.Paging'],

    stateful: true,
    multiSelect: true,
    //stateId: 'stateGrid',
	reference: 'infractionGrid',
    height: 350,
    /*viewConfig: {
        stripeRows: true
    },*/
    tbar: [{
		xtype: 'button',
        text: 'Añadir Infraccion',
		reference: 'newRecordButton',
        handler: 'onAddInfractionClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Infraccion',
		reference: 'deleteRecordButton',
        handler: 'onRemoveInfractionClick',
		disabled:true
    }],
	listeners: {
	   select: 'onGridSelect',
	   deselect: 'onGridDeselect'
	},
    columns: [
        {text: 'ID',  dataIndex: 'infractionid', width:55, hidden:false, filter:false},
        {text: 'Descripcion de la Infraccion', dataIndex: 'descriptioninfraction', flex: 1,filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Monto Infraccion', dataIndex: 'amountinfraction', xtype: 'numbercolumn', 
			format: '0.00', width:155, align: 'right', sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		}
    ],
	selType: 'rowmodel',
    plugins: [{
		ptype: 'rowediting',
		pluginId: 'modelInfractionRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});