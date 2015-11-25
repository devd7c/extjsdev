Ext.define('D7C.view.login.CapsLockTooltip', {
    extend: 'Ext.tip.QuickTip',

    xtype: 'capslocktooltip',

    target: 'password',
    anchor: 'top',
    anchorOffset: 0,
    width: 300,
    dismissDelay: 0,
    autoHide: false,
    title: '<div class="fa fa-exclamation-triangle">La Tecla Mayuscula esta Activada</div>',
    html: '<div>Tener el bloqueo de mayúsculas puede causar que introduzca su contraseña de forma incorrecta.</div><br/>' +
        '<div>Usted debe presionar Bloq Mayús para apagarlo antes de ingresar su contraseña.</div>'

});
