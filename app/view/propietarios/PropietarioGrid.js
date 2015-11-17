Ext.define('D7C.view.propietarios.PropietarioGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.propietariogrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: true,
    //stateId: 'stateGrid',
	reference: 'propietaryGrid',
    height: 350,
    /*viewConfig: {
        stripeRows: true
    },*/
    tbar: [{
		xtype: 'button',
        text: 'Añadir Propietario',
		reference: 'newRecordButton',
        handler: 'onAddPropietaryClick'
    }, {
		xtype: 'button',
        text: 'Eliminar Propietario',
		reference: 'deleteRecordButton',
        handler: 'onRemovePropietaryClick',
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
        {text: 'ID',  dataIndex: 'propietaryid', width:55, hidden:false, filter:false},
        {text: 'Nombre', dataIndex: 'propietaryfirstname', flex: 1, filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Apellidos', dataIndex: 'propietarylastname', flex: 1, sortable: true, filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'C.I.', dataIndex: 'propietaryci', flex: 1, sortable: true, filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Domicilio', dataIndex: 'propietaryadress', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
        {text: 'Telefono/Celular', dataIndex: 'propietaryphone', xtype: 'numbercolumn', 
			format:'00', flex: 1, sortable: true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
		{text: 'Operador', dataIndex: 'operatorregisterid', flex: 1,
			editor: {
				xtype: 'combobox',
				reference: 'cb_operator',
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
				},
				listeners:{
					focus: 'onValidateComboBox'
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
		}
    ],
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	{
		ptype: 'rowediting',
		pluginId: 'propietaryRowEditingPlugin',
		clicksToEdit: 2,
		listeners: {
		   beforeedit: 'onGridEditorBeforeEdit',
		   canceledit: 'onGridEditorCancelEdit',
		   edit: 'onGridEditorEdit'
		}
    }]
});