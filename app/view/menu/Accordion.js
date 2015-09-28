Ext.define('D7C.view.menu.Accordion', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainmenu',
    
    requires: [
        'Ext.layout.container.Accordion',
        'Ext.grid.*'
    ],
    xtype: 'layout-accordion',
    layout: 'accordion',
    title: 'Menu Principal',
    width: 500,
    height: 400,
    defaults: {
        bodyPadding: 10
    },
    
    initComponent: function() {
        Ext.apply(this, {
            items: [{
				title:'Modulo de Registro',
				items:[{
					xtype: 'button',
					width:220,
					text: 'Operadores',
					option: 'registrooperador'
				},
				{
					xtype: 'button',
					width:220,
					text: 'Propietarios',
					option: 'registropropietario'
					
				},{
					xtype: 'splitbutton',
					text: 'Unidades de Transporte',
					width:220,
					menuAlign:'tr',
					menu: {
						xtype: 'menu',
						width: 220,
						items:
						[
							{
								xtype: 'menuitem',
								text: 'Añadir/Modificar',
								option:'registrounidadtransporte'
							},
							{
								xtype: 'menuitem',
								text: 'Ampliacion de Unidades',
								option:'apliacionunidadtransporte'
							}
						]
					}
				},
				{
					xtype: 'splitbutton',
					width:220,
					text: 'Infracciones',
					menuAlign:'tr',
					menu: {
						xtype: 'menu',
						width: 220,
						items:
						[
							{
								xtype: 'menuitem',
								text: 'Añadir/Modificar',
								option:'registroinfraccion'
							},
							{
								xtype: 'menuitem',
								text: 'Infraccion de Unidades',
								option:'infraccionunidadtransporte'
							}
						]
					}
					
				},
				{
					xtype: 'button',
					width:220,
					text: 'Operarios',
					option: 'registrooperario'
					
				},
				{
					xtype: 'button',
					width:220,
					text: 'Tarjetas de Operacion',
					option: 'registrotarjetaoperacion'
					
				},
				{
					xtype: 'splitbutton',
					width:220,
					text: 'Resoluciones Administrativas',
					menuAlign:'tr',
					menu: {
						xtype: 'menu',
						width: 250,
						items:
						[
							{
								xtype: 'menuitem',
								text: 'Añadir/Modificar',
								option:'registroresolucionadministrativa'
							},
							{
								xtype: 'menuitem',
								text: 'Fecha Resolucion Administrativa',
								option:'fecharesolucionadministrativa'
							}
						]
					}
					
				}]
            }, {
				title: 'Modulo Reportes',
				items:[
					{
						xtype: 'splitbutton',
						text: 'Reportes',
						width:220,
						menuAlign:'tr',
						listeners:{
							'click':function(btn){
							   btn.showMenu(); 
							}
						},
						menu: {
							xtype: 'menu',
							width: 220,
							items:
							[
								{
									xtype: 'menuitem',
									option:'btnrptoperadores',
									text: 'Operadores'
								},
								{
									xtype: 'menuitem',
									option : 'btnrptoperarios',
									text   : 'Operarios'
								}
							]
						}					
					}
				]
            }, {
                title: 'Sistema',
                html: 'Empty'
            }]
        });
        this.callParent();
    },
    
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    
    pctChangeRenderer: function(val){
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
});
