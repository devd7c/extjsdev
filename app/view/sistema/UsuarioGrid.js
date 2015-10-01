Ext.define('D7C.view.sistema.UsuarioGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.usuariogrid',

    requires: ['Ext.toolbar.Paging'],

    stateful: true,
    multiSelect: true,
    stateId: 'stateGrid',
    height: 350,
    viewConfig: {
        stripeRows: true
    },
    tbar: [{
        text: 'Añadir Usuario',
        handler: 'onAddUserClick'
    }, {
        text: 'Eliminar Usuario',
        handler: 'onRemoveUserClick',
        bind: {
            disabled: '{!customerGrid.selection}'
        }
    }],

    buttons: [{
        handler: 'onSessionChangeClick'
    }],
	selType: 'rowmodel',
    columns: [
        {header: 'ID',  dataIndex: 'userid',width:55, hidden:false, filter:false},
        {text: 'Nombre', dataIndex: 'name', flex: 1,filter:true,},
        {text: 'Nombre de Usuario', dataIndex: 'username', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
        },
		{text: 'Email', dataIndex: 'email', flex: 1,filter:false,}
    ],
    plugins: [{
        //ptype: 'gridfilters',
		ptype: 'rowediting',
		pluginId: 'modelCarsRowEditingPlugin',
		clicksToEdit: 1,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});