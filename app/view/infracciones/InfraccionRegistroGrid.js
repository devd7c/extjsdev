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
		{xtype: 'rownumberer'},
        {text: 'ID',  dataIndex: 'infractionregisterid', width:55, hidden:false, filter:false},
		//{text: 'ID Infraccion',  dataIndex: 'infractionid', width:55, hidden:false, filter:false},
        {text: 'No. Boleta Infraccion', dataIndex: 'infractionnumberticket', flex: 1, filter:true,
			editor: {
				xtype: 'textfield', allowBlank: false
			}
		},
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
		{text: 'Monto',  dataIndex: 'amountinfraction', width:110, xtype: 'numbercolumn', format: '0.00 Bs'},
		{text: 'No. de Placa', dataIndex: 'vehicleid', flex: 1,
			editor: {
				xtype: 'combobox',
				reference: 'combobox_vehicle',
				allowBlank: false,
				forceSelection : true,
				matchFieldWidth :true,
				enableKeyEvents :true,
				typeAhead: true,
				hideLabel: true,
				hideTrigger:true,
				minChars        :1,
				displayField: 'vehiclelicense',
				valueField: 'vehicleid',
				queryMode: 'remote',
				store: Ext.create('D7C.store.propietarios.UnidadPropietario'),
				listConfig   : {
					itemTpl :
					'<div data-qtip="Propietario: <strong>{propietaryfirstname} {propietarylastname}</strong><br>Sindicato: <strong>{syndicatename}</strong><br></b>Marca Vehiculo: <strong>{vehiclebrand}</strong><br></b>Capacidad: <strong>{vehiclecapacity}</strong><br></b>Categoria: <strong>{vehiclecategory}</strong><br></b>Clase: <strong>{vehicleclass}</strong><br></b>Modelo: <strong>{vehiclemodel}</strong>">{vehiclelicense}</div>'
				},
				listeners: {
                    focus: 'onValidateComboBox'
                }
			},
			listeners:{
				focus:function(cbo){
					cbo.getStore().getProxy().setExtraParams({action:'read'});
					cbo.getStore().reload();
				}
			},
			renderer: function(value, metaData, record ){
				return record.data.vehiclelicense;
			},
			items    : {
				xtype: 'textfield',
				reference: 'vehicleLicenseFilterField',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
					keyup: 'onVehicleLicenseFilterKeyup',
					buffer: 500
				}
			}
        },
		{text: 'C.I. Propietario', dataIndex: 'propietaryci', flex: 1, filter:true,
			items    : {
				xtype: 'textfield',
				reference: 'propietaryCiFilterField',
				flex : 1,
				margin: 2,
				enableKeyEvents: true,
				listeners: {
					keyup: 'onPropietaryCiFilterKeyup',
					buffer: 500
				}
			}
		},
		{text: 'Estado', dataIndex: 'infractionregisterstate', width:100,
			filter: {
				type: 'list'
			},
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
	viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) { 
            return record.get('infractionregisterstate') == 'Pagado' ? 'valid-row' : record.get('infractionregisterstate') == 'Cancelado' ? 'invalid-row' : ''; 
        } 
    },
	selType: 'rowmodel',
    plugins: [
	{ptype: 'gridfilters'},
	{
        ptype: 'rowexpander',
        // dblclick invokes the row editor
        expandOnDblClick: false,
        rowBodyTpl: '<img src="resources/vehicles/{picture}" height="100px" style="float:left;margin:0 10px 5px 0">Propietario: <b>{propietaryfirstname} {propietarylastname}</b><br>Sindicato: <b>{syndicatename}</b><br>Entidad Matriz: <b>{operatormatrix}</b><br></b>Marca Vehiculo: <b>{vehiclebrand}</b><br></b>Capacidad: <b>{vehiclecapacity}</b><br></b>Categoria: <b>{vehiclecategory}</b><br></b>Clase: <b>{vehicleclass}</b><br></b>Modelo: <b>{vehiclemodel}</b>'
    },
	{
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