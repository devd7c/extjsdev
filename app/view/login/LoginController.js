/*
 @autor:Pablo Garcia
 */
Ext.define('D7C.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'D7C.view.main.Main',
		'D7C.util.Profile'
    ],

    onClickCancel: function(button, e, options){
        this.lookupReference('form').reset();
    },

    onClickSubmit: function(button, e, options){
		var form = this.lookupReference('form');
        var me = this;

        if (me.lookupReference('form').isValid()){
            me.doLogin(form.getValues());
        }
    },
    onTextFieldSpecialKey: function(field, e, options){
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },
    onTextFieldKeyPress: function(field, e, options){

        var charCode = e.getCharCode(),
            me = this;

        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){

            if(me.capslockTooltip === undefined){
                me.capslockTooltip = Ext.widget('capslocktooltip');
            }

            me.capslockTooltip.show();

        } else {

            if(me.capslockTooltip !== undefined){
                me.capslockTooltip.hide();
            }
        }
    },

    doLogin: function(loginCredentials) {

        var me = this,
            form = me.lookupReference('form');

        me.getView().mask('Verificando... Espere Por favor...');

        form.submit({
            clientValidation: true,
            url: 'data/login.php',
            scope: me,
			//method : 'POST', 
            success: function(form, action){
				var  x = Ext.decode(action.response.responseText);
				//console.log(x.data[0], x.data[1]);
				D7C.Profile = Ext.create("D7C.util.Profile", {
    					name: x.data[0],
    					privilege: x.data[1],
						privilegeName: x.data[2]
    			});
				console.log(D7C.Profile.getPrivilege());
				var view = this.getView();
				view.unmask();
				view.close();
				Ext.create('D7C.view.main.Main');
			},
            failure: 'onLoginFailure'
        });
    },

    onLoginFailure: function(form, action) {

        this.getView().unmask();

    }/*,

    onLoginSuccess: function(form, action) {
        var view = this.getView();
        view.unmask();
        view.close();
        Ext.create('D7C.view.main.Main');
    }*/










});