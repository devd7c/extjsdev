Ext.define('D7C.view.operadores.RegistroOperadorGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.registrooperadorgrid',
    requires: ['Ext.toolbar.Paging'],
    stateful: true,
    multiSelect: true,
    stateId: 'stateGrid',
    height: 350,
    viewConfig: {
        stripeRows: true
    },
    tbar: [{
        text: 'Añadir Operador',
        handler: 'onAddCustomerClick'
    }, {
        text: 'Eliminar Operador',
        handler: 'onRemoveCustomerClick',
        bind: {
            disabled: '{!customerGrid.selection}'
        }
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
    buttons: [{
        text: 'Visualizar Cambios',
        handler: 'onSessionChangeClick'
    }],
    columns: [
        {header: 'ID',  dataIndex: 'product_id',width:55, hidden:true},
        {text: 'Codigo',
            flex: 1,
            dataIndex: 'sku',filter:true,
            renderer : function(value, metadata, record) {
                myToolTipText = '<image style=\'min-height:160px;min-width:160px;\' src=http://www.freeshi.com/v/vspfiles/photos/'+ record.data.image +'></image>';
                metadata.tdAttr = 'data-qtip="' + myToolTipText + '"';
                return value;
            }
        },
        {text: 'Descripcion',
            sortable: true,
            dataIndex: 'name',
            width: 450,
            editor: {
                xtype: 'textfield'
            }
        }
    ],
    plugins: [{
        ptype: 'gridfilters'
    }]
});