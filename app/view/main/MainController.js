/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('D7C.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    requires: [
		'Ext.util.*',
		'Ext.grid.*',
		'Ext.data.*',
        'Ext.window.MessageBox',
		'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters',
		'Ext.tip.ToolTip',
		'D7C.util.Util',
		'D7C.ux.grid.Printer'
    ],
    views: [
		'Accordion',
        'Usuario',
		'UsuarioGrid',
        'Operador',
		'OperadorGrid',
		'TarjetaOperacion',
		'TarjetaOperacionGrid',
        'RegistroOperador',
		'RegistroOperadorGrid',
		'Infraccion',
		'InfraccionGrid',
		'InfraccionRegistro',
		'InfraccionRegistroGrid',
		'ResolucionAdministrativa',
		'ResolucionAdministrativaGrid',
		'Propietario',
		'PropietarioGrid',
		'UnidadPropietario',
		'UnidadPropietarioGrid'
    ],
	
	init: function() {

		this.control({

		    'mainmenu panel button':{
				click:this.actionButtonMenu
			},
			'mainmenu panel button menuitem':{
				click:this.actionButtonMenu
			}
		});
	},

	actionButtonMenu:function(button){
	var me=this;
	var fp=Ext.getCmp('content-panel');

		switch(button.option){
			case 'btnlistausuarios':

				var listUsers =Ext.getCmp('win-usuario');

                if(typeof listUsers=="undefined"){
                    var storeUser=Ext.create('D7C.store.sistema.Usuario',{autoLoad: true,start: 0, limit: 25, pageSize: 400});
                    var GridUser=Ext.create('D7C.view.sistema.UsuarioGrid',{store: storeUser});
                    GridUser.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeUser,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var videoview=Ext.create('D7C.view.sistema.Usuario',{id:'win-usuario'});

                    videoview.add(GridUser);
                    fp.add(videoview);
                    videoview.show();

                }else{
                    listUsers.show();
                }

			break;
			case 'btnListaOperadores':

				var listMageSoap =Ext.getCmp('win-operador');

                if(typeof listMageSoap=="undefined"){
                    var storeMage=Ext.create('D7C.store.operadores.Operador',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
					var storeMage=Ext.create('D7C.store.operadores.Operador');
                    var GridTest=Ext.create('D7C.view.operadores.OperadorGrid',{store: storeMage});
                    GridTest.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeMage,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var videoview=Ext.create('D7C.view.operadores.Operador',{id:'win-operador'});

                    videoview.add(GridTest);
                    fp.add(videoview);
                    videoview.show();

                }else{
                    listMageSoap.show();
                }

			break;
			case 'btnListaRegistroOperadores':

				var listMageSoap =Ext.getCmp('win-registrooperador');

                if(typeof listMageSoap=="undefined"){
                    var storeMage=Ext.create('D7C.store.operadores.RegistroOperador',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
					var storeMage=Ext.create('D7C.store.operadores.RegistroOperador');
                    var GridTest=Ext.create('D7C.view.operadores.RegistroOperadorGrid',{store: storeMage});
                    GridTest.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeMage,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var videoview=Ext.create('D7C.view.operadores.RegistroOperador',{id:'win-registrooperador'});

                    videoview.add(GridTest);
                    fp.add(videoview);
                    videoview.show();

                }else{
                    listMageSoap.show();
                }

			break;
			case 'btnListaInfracciones':

				var listInfraction =Ext.getCmp('win-infraccion');

                if(typeof listInfraction=="undefined"){
                    var storeInfraction=Ext.create('D7C.store.infracciones.Infraccion',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
					var storeInfraction=Ext.create('D7C.store.infracciones.Infraccion');
                    var GridInfraction=Ext.create('D7C.view.infracciones.InfraccionGrid',{store: storeInfraction});
                    GridInfraction.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeInfraction,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var infractionview=Ext.create('D7C.view.infracciones.Infraccion',{id:'win-infraccion'});

                    infractionview.add(GridInfraction);
                    fp.add(infractionview);
                    infractionview.show();

                }else{
                    listInfraction.show();
                }

			break;
			
			case 'btnListaInfraccionesUnidades':

				var listInfractionRegister =Ext.getCmp('win-infraccionregistro');

                if(typeof listInfractionRegister=="undefined"){
                    var storeInfractionRegister=Ext.create('D7C.store.infracciones.InfraccionRegistro',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
					var storeInfractionRegister=Ext.create('D7C.store.infracciones.InfraccionRegistro');
                    var GridInfractionRegister=Ext.create('D7C.view.infracciones.InfraccionRegistroGrid',{store: storeInfractionRegister});
                    GridInfractionRegister.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeInfractionRegister,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var infractionregisterview=Ext.create('D7C.view.infracciones.InfraccionRegistro',{id:'win-infraccionregistro'});

                    infractionregisterview.add(GridInfractionRegister);
                    fp.add(infractionregisterview);
                    infractionregisterview.show();

                }else{
                    listInfractionRegister.show();
                }

			break;
			
			case 'btnListaResolucionesAdministrativas':

				var listAdministrativeResolution =Ext.getCmp('win-resolucionadministrativa');

                if(typeof listAdministrativeResolution=="undefined"){
                    var storeAdministrativeResolution=Ext.create('D7C.store.resoluciones.ResolucionAdministrativa',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
                    var storeAdministrativeResolution=Ext.create('D7C.store.resoluciones.ResolucionAdministrativa');
					var GridAdministrativeResolution=Ext.create('D7C.view.resoluciones.ResolucionAdministrativaGrid',{store: storeAdministrativeResolution});
                    GridAdministrativeResolution.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeAdministrativeResolution,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var vresolucionadministrativaview=Ext.create('D7C.view.resoluciones.ResolucionAdministrativa',{id:'win-resolucionadministrativa'});

                    vresolucionadministrativaview.add(GridAdministrativeResolution);
                    fp.add(vresolucionadministrativaview);
                    vresolucionadministrativaview.show();

                }else{
                    listAdministrativeResolution.show();
                }

			break;
			case 'btnListaPropietarios':

				var listPropietary =Ext.getCmp('win-propietario');

                if(typeof listPropietary=="undefined"){
                    var storePropietary=Ext.create('D7C.store.propietarios.Propietario',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
					var storePropietary=Ext.create('D7C.store.propietarios.Propietario');
                    var GridPropietary=Ext.create('D7C.view.propietarios.PropietarioGrid',{store: storePropietary});
                    GridPropietary.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storePropietary,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var propietaryview=Ext.create('D7C.view.propietarios.Propietario',{id:'win-propietario'});

                    propietaryview.add(GridPropietary);
                    fp.add(propietaryview);
                    propietaryview.show();

                }else{
                    listPropietary.show();
                }

			break;
			case 'btnListaUnidadTransportes':

				var listVehiclePropietary =Ext.getCmp('win-unidadpropietario');

                if(typeof listVehiclePropietary=="undefined"){
                    var storeVehiclePropietary=Ext.create('D7C.store.propietarios.UnidadPropietario',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
					var storeVehiclePropietary=Ext.create('D7C.store.propietarios.UnidadPropietario');
                    var GridVehiclePropietary=Ext.create('D7C.view.propietarios.UnidadPropietarioGrid',{store: storeVehiclePropietary});
                    GridVehiclePropietary.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeVehiclePropietary,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var vehiclepropietaryview=Ext.create('D7C.view.propietarios.UnidadPropietario',{id:'win-unidadpropietario'});

                    vehiclepropietaryview.add(GridVehiclePropietary);
                    fp.add(vehiclepropietaryview);
                    vehiclepropietaryview.show();

                }else{
                    listVehiclePropietary.show();
                }

			break;
			case 'btnListaTarjetasOperacion':

				var listMageSoap =Ext.getCmp('win-tarjetaoperacion');

                if(typeof listMageSoap=="undefined"){
                    var storeMage=Ext.create('D7C.store.operadores.TarjetaOperacion',{autoLoad: true/*,start: 0, limit: 25, pageSize: 400*/});
					var storeMage=Ext.create('D7C.store.operadores.TarjetaOperacion');
                    var GridTest=Ext.create('D7C.view.operadores.TarjetaOperacionGrid',{store: storeMage});
                    GridTest.addDocked({

                        xtype       : 'pagingtoolbar',
                        //pageSize: 371,
                        store       : storeMage,
                        dock        : 'bottom',
                        displayInfo : true,
                        plugins: new Ext.ux.ProgressBarPager()
                    });
                    var videoview=Ext.create('D7C.view.operadores.TarjetaOperacion',{id:'win-tarjetaoperacion'});

                    videoview.add(GridTest);
                    fp.add(videoview);
                    videoview.show();

                }else{
                    listMageSoap.show();
                }

			break;
		}
	},
	
    onClickButton: function () {
        Ext.Msg.confirm('Confirmar', 'Esta Seguro?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'Si') {
            //
        }
    }
});
