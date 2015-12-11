/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
Ext.define('D7C.view.reportes.PropietariosOperadorReport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.propietariosoperadorReport',
    requires: [
        'D7C.view.reportes.PropietariosOperadorModel',
        'D7C.view.reportes.PropietariosOperadorController',
        'D7C.view.reportes.PropietariosOperadorPie',
        'D7C.view.reportes.PropietariosOperadorColumn',
        'D7C.view.reportes.PropietariosOperadorBar'
        //'D7C.util.Glyphs'
    ],

    controller: 'propietariosoperador',
    viewModel: {
        type: 'propietariosoperador'
    },

    layout: 'card',
    activeItem: 0,
    items: [{
        xtype: 'propietariosoperadorpie'
    },{
        //xtype: 'propietariosoperadorcol'
    },{
        //xtype: 'propietariosoperadorbar'
    }],

    dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'top',
        items: [
            {
                text: 'Seleccione Tipo',
                //glyph: Packt.util.Glyphs.getGlyph('menuReports'),
                menu: {
                    xtype: 'menu',
                    defaults: {
                        listeners: {
                            click: 'onChangeChart'
                        }
                    },
                    items: [
                        {
                            xtype: 'menuitem',
                            text: 'Pie',
                            itemId: 'pie'
                            //glyph: Packt.util.Glyphs.getGlyph('chartPie')
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Column',
                            itemId: 'column'
                            //glyph: Packt.util.Glyphs.getGlyph('chartBar')
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Bar',
                            itemId: 'bar'
                            //glyph: Packt.util.Glyphs.getGlyph('chartColumn')
                        }
                    ]
                }
            },
            {
                text: 'Descargar Tipo',
                //glyph: Packt.util.Glyphs.getGlyph('download'),
                menu: {
                    xtype: 'menu',
                    defaults: {
                        listeners: {
                            click: 'onChartDownload'
                        }
                    },
                    items: [
                        {
                            xtype: 'menuitem',
                            text: 'Descargar en Imagen',
                            itemId: 'png'
                            //glyph: Packt.util.Glyphs.getGlyph('image')
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Descargar en Pdf',
                            itemId: 'pdf'
                            //glyph: Packt.util.Glyphs.getGlyph('pdf')
                        }
                    ]
                }
            }
        ]
    }]
});
