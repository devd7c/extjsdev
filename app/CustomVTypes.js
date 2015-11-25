Ext.apply(Ext.form.field.VTypes, {
    //  vtype validation function
    customPass: function(val, field) {
        return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/.test(val);
    },
    // vtype Text property: The error text to display when the validation function returns false
    customPassText: 'Contraseña no válida. La longitud debe ser de al menos 6 caracteres y un máximo de 20. La contraseña debe contener un dígito, ' +
                    'un letra minúscula, una letra mayúscula, un símbolo especial de @#$% y entre 6 y 20 caracteres.',
	customEmail: function(val, field){
		return /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+/=?^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/.test(val);
    },
	customEmailText: 'Este campo debe ser una dirección de correo electrónico en el siguiente formato "usuario@ejemplo.com"'
});