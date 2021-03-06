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
		'D7C.view.operadores.RegistroOperadorExpandController',
		'D7C.view.operadores.TarjetaOperacionController',
		'D7C.view.operadores.TarjetaOperacionControllerTemp',
		'D7C.view.resoluciones.ResolucionAdministrativaController',
		'D7C.view.propietarios.PropietarioController',
		'D7C.view.propietarios.UnidadPropietarioController',
		'D7C.view.infracciones.InfraccionController',
		'D7C.view.infracciones.InfraccionRegistroController',
		'D7C.view.reportes.PropietariosOperadorController'
    ],

    launch: function () {
        //Ext.widget(loggedIn ? 'app-main' : 'login');

        var me = this;
		me.wrapper = Ext.getBody('wrapper');
		me.wrapper.addCls('wrapperoff');
		
        Ext.widget('login');
		
		
    }
});
