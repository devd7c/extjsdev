Ext.define('D7C.view.operadores.OperadorGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.operadorgrid',

    requires: ['Ext.toolbar.Paging'],

    stateful: true,
    multiSelect: true,
    //stateId: 'stateGrid',
	reference: 'modelCarsGrid',
    height: 350,
    /*viewConfig: {
        stripeRows: true
    },*/
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
    }],
	listeners: {
	   select: 'onGridSelect',
	   deselect: 'onGridDeselect'
	},
    columns: [
        {text: 'ID',  dataIndex: 'operatorid', width:55, hidden:false, filter:false},
        {text: 'Nombre del Operador', dataIndex: 'syndicatename', flex: 1,filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Codigo', dataIndex: 'operatorcode', flex: 1, sortable: true}
    ],
	selType: 'rowmodel',
    plugins: [{
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