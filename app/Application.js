/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('D7C.Application', {
    extend: 'Ext.app.Application',
    
    name: 'D7C',

    stores: [
        // TODO: add global / shared stores here
    ],
    views: [
        'D7C.view.login.Login'
        //'D7C.view.main.Main'
    ],
    requires: [
        'D7C.view.operadores.RegistroOperadorController'
    ],
    launch: function () {
        //Ext.widget(loggedIn ? 'app-main' : 'login');
        var me = this;
        Ext.widget('login');
    }
});
