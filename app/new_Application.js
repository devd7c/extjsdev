/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
 
Ext.define('D7C.Application', {
    extend: 'Ext.app.Application',
    
    name: 'D7C',

    stores: [
		//'D7C.store.propietarios.Propietario'
        // TODO: add global / shared stores here
    ],
    views: [
        'D7C.view.login.Login'
        //'D7C.view.main.Main'
    ],
    requires: [
		'D7C.view.sistema.UsuarioController',
        'D7C.view.operadores.OperadorController',
        'D7C.view.operadores.RegistroOperadorController',
		'D7C.view.operadores.TarjetaOperacionController',
		'D7C.view.resoluciones.ResolucionAdministrativaController',
		'D7C.view.propietarios.PropietarioController',
		'D7C.view.propietarios.UnidadPropietarioController',
		'D7C.view.infracciones.InfraccionController',
		'D7C.view.infracciones.InfraccionRegistroController'
    ],
	init: function () {
		var me = this;
		me.splashscreen = Ext.getBody().mask('', 'splashscreen');
		me.splashscreen.addCls('splashscreen');
		Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {cls: 'x-splash-icon'});
	},
    launch: function () {
        //Ext.widget(loggedIn ? 'app-main' : 'login');
		
		var me = this;
        var task = new Ext.util.DelayedTask(function() {

            //Fade out the body mask
            me.splashscreen.fadeOut({
                duration: 100,
                remove:true
            });

            //Fade out the icon and message
            me.splashscreen.next().fadeOut({
                duration: 100,
                remove:true,
                listeners: {
                    afteranimate: function(el, startTime, eOpts ){
						Ext.widget('login');
                    }
                }
            });
		});
		task.delay(150);
    }
});
