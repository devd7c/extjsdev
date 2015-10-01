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
        'Ext.window.MessageBox',
		'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    views: [
		'Accordion',
        'Operador',
		'OperadorGrid',
        'Usuario'
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
                    var storeMage=Ext.create('D7C.store.operadores.Operador',{autoLoad: true,/*start: 0, limit: 25, pageSize: 400*/});
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
			/*case 'btnListaRegistroOperadores':

				var listMageSoap =Ext.getCmp('win-registrooperador');

                if(typeof listMageSoap=="undefined"){
                    var storeMage=Ext.create('D7C.store.operadores.RegistroOperador',{autoLoad: true,start: 0, limit: 25, pageSize: 400});
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

			break;*/
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
