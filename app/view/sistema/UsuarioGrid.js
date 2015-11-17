Ext.define('D7C.view.sistema.UsuarioGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.usuariogrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: true,
	reference: 'userGrid',
    height: 350,
    tbar: [{
		xtype: 'button',
        text: 'Añadir',
		reference: 'newRecordButton',
        handler: 'onAddUserClick'
    },
	{
		xtype: 'button',
        text: 'Eliminar',
		reference: 'deleteRecordButton',
        handler: 'onRemoveUserClick',
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
        {text: 'ID',  dataIndex: 'userid', width:55, hidden:false, filter:false},
        {text: 'Nombre Completo', dataIndex: 'name', flex: 1,filter:true,
			filter: {
				//type: 'list'
			}
		},
        {text: 'E-mail', dataIndex: 'email', flex: 1,filter:true,
			filter: {
				//type: 'list'
			}
		},
		{text: 'Privilegios', dataIndex: 'privilegesdescription', flex: 1,
			filter: {
				type: 'list'
			}
		},
		{
            xtype: 'widgetcolumn',
            width: 45,
            widget: {
                xtype: 'button',
                icon: 'resources/images/icons/fam/user_edit.png',
				tooltip: 'Modificar Datos',
                handler: 'onEditUserClick'
            }
        }
    ],
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	/*{
		ptype: 'rowediting',
		pluginId: 'userRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }*/]
});