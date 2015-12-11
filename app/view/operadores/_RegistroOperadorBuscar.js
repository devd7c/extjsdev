Ext.define('D7C.view.operadores.RegistroOperadorBuscar', {
    extend: 'Ext.window.Window',
    xtype: 'registro-operador-buscar',

    requires: [
        'D7C.store.operadores.RegistroOperadorBuscar'
    ],

    width: 600,
    bodyPadding: 10,
    layout: {
        type: 'anchor'
    },
    title: 'Busqueda',
    autoShow: true,
    closable: false,
    //glyph: Packt.util.Glyphs.getGlyph('searchAndAdd'),
    reference: 'registro-operador-buscar',

    items: [
        {
            xtype: 'combo',
            reference: 'comboSearch',
            displayField: 'adminresolutioncode',
            valueField: 'adminresolutionid',
            typeAhead: false,
            hideLabel: true,
            hideTrigger:true,
            anchor: '100%',
            minChars: 2,
            store: {
                type: 'search-registers'
            },

            displayTpl: new Ext.XTemplate(
                    '<tpl for=".">' +
                    '{[typeof values === "string" ? values : values["adminresolutioncode"]]}, ' +
                    '{[typeof values === "string" ? values : values["adminresolutionlegal"]]}' +
                    '</tpl>'
            ),

            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No se encontro ninguna coincidencia.',

                // Custom rendering template for each item
                getInnerTpl: function() {
                    return '<h3><span>{adminresolutioncode}, {adminresolutionlegal}</span></h3></br>' +
                        'Informe Tecnico: {adminresolutiontechnical}<br>Cantidad Autorizada: {vehiclequantityid}<br>Fecha de la Resolucion: {adminresolutiondate:date("Y-m-d")}';
                }
            },
            pageSize: 2
        }, {
            xtype: 'component',
            style: 'margin-top:10px',
            html: 'La Búsqueda en vivo requiere un mínimo de 2 caracteres'
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        layout: {
            pack: 'end',
            type: 'hbox'
        },
        items: [
            {
                xtype: 'button',
                text: 'Cancelar',
                //glyph: Packt.util.Glyphs.getGlyph('cancel'),
                listeners: {
                    click: 'onCancelSearch'
                }
            },
            {
                xtype: 'button',
                text: 'Limpiar',
                //glyph: Packt.util.Glyphs.getGlyph('clear'),
                listeners: {
                    click: 'onClearSearch'
                }
            },
            {
                xtype: 'button',
                text: 'Agregar Resolucion',
                //glyph: Packt.util.Glyphs.getGlyph('save'),
                listeners: {
                    click: 'onSaveSearch'
                }
            }
        ]
    }]
});