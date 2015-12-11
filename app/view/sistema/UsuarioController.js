Ext.define('D7C.view.sistema.UsuarioController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.usuario',
	stores: ['Usuario'],
	models: ['Usuario'],
	views: ['Usuario', 'UsuarioGrid'],
	requires: [
		'D7C.view.sistema.Usuario',
        'D7C.view.sistema.UsuarioGrid',
		'D7C.view.sistema.UsuarioForm',
		'D7C.util.Util'
	],
//if(D7C.Profile.getPrivilege() == 1 || D7C.Profile.getPrivilege() == 2){
//}else{D7C.util.Util.showToast('Advertencia, Privilegios Insuficientes');}
	newRecordId: '',
    isNewRecord: false,
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
	createDialog: function(record) {
        var me = this,
            view = me.getView();
        console.log(record);
		if(this.isNewRecord){ 
			me.dialog = view.add({
				xtype: 'usuario-form',
				viewModel: {
					data: {

							title: 'Nuevo Usuario'
						}
					},
					links: {
						currentUser: record || Ext.create('D7C.model.sistema.Usuario')
					}
			});
		}else {
			me.dialog = view.add({
				xtype: 'usuario-form',
				viewModel: {
					data: {

							title: record ? 'Usuario: ' + record.get('name') : 'Nuevo Usuario',
							userid: record.get('userid'),
							picture: record.get('picture'),
							name: record.get('name'),
							username: record.get('username'),
							privilegesid: record.get('privilegesid'),
							privilegesdescription: record.get('privilegesdescription'),
							phone: record.get('phone'),
							password: record.get('password'),
							email: record.get('email'),
							address: record.get('address')	
						}
					},
					links: {
						currentUser: record || Ext.create('D7C.model.sistema.Usuario')
					}
			});
		}
        me.dialog.show();
    },
	onAddUserClick: function(button, e, options){
			this.isNewRecord = true;
			this.createDialog(null);
    },
	onEditUserClick: function (button) {
		if(D7C.Profile.getPrivilege() == 1 || D7C.Profile.getPrivilege() == 2){
			this.isNewRecord = false;
			this.createDialog(button.getWidgetRecord());
		}else{D7C.util.Util.showToast('Advertencia, Privilegios Insuficientes');}
    },
	onFileFieldChange: function(fileField, value, options) {

        var me = this,
            file = fileField.fileInputEl.dom.files[0],
            picture = this.lookupReference('userPicture');
        if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        } else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            fileField.reset();
        }
    },
    onSaveUser: function(button, e, options){

        var me = this,
            form = me.lookupReference('form');

        if (form.isValid()) {
            form.submit({
                clientValidation: true,
                url: 'data/sis_union_users_save.php',
                scope: me,
				success: 'onSaveSuccess',
                failure: 'onSaveFailure'
            });
        }
    },
    onCancelUser: function(button, e, options){
        var me = this;
        me.dialog = Ext.destroy(me.dialog);
		this.isNewRecord = false;
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('userid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
		this.isNewRecord = false;		
        var grid = this.lookupReference('userGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('userid');
        store.remove(selectedRecords);
        this.lookupReference('newRecordButton').setDisabled(false);
    },
    onGridEditorEdit: function (editor, ctx, eOpts) {
        if(this.isNewRecord){
            ctx.grid.getStore().getProxy().setExtraParams({action:'insert'});
			D7C.util.Util.showToast('Los datos fueron ingresados correctamente!');
        }else{
            ctx.grid.getStore().getProxy().setExtraParams({action:'update'});
			D7C.util.Util.showToast('Los datos fueron modificados correctamente!');
        }
        ctx.grid.getStore().sync();
        ctx.grid.getStore().getProxy().setExtraParams({action:'read'});
		this.isNewRecord = false;
		this.lookupReference('newRecordButton').setDisabled(false);
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
	onRemoveUserClick: function (button, evt) {
		if(D7C.Profile.getPrivilege() == 1){
			var grid = this.lookupReference('userGrid'),
				selectedRecords = grid.getSelection(),
				store = grid.getStore('userid');
			Ext.Msg.show({ 
				title: 'Eliminar Datos',
				msg: 'Esta seguro que desea eliminar los datos?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function (buttonId) {
					if (buttonId == 'yes') {
						store.remove(selectedRecords);
						store.getProxy().setExtraParams({action:'destroy'});
						store.sync();
						store.getProxy().setExtraParams({action:'read'});
						D7C.util.Util.showToast('Eliminacion Satisfactoria! Los datos fueron eliminados');
					}
				}
			});
			this.lookupReference('deleteRecordButton').setDisabled(true);
		}else{D7C.util.Util.showToast('Advertencia, Privilegios Insuficientes');}
    },
    onGridSelect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(false);
    },
    onGridDeselect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
    onPrint: function(button, e, options) {
        var printer = D7C.ux.grid.Printer;
        printer.printAutomatically = false;
        printer.print(this.lookupReference('userGrid'));
    },
    onExportPDF: function(button, e, options) {
		var fp=Ext.getCmp('content-panel');
		var pdfGrid =Ext.getCmp('win-pdf');
		
		if(typeof pdfGrid=="undefined"){	
			var pdfGrid=Ext.create('D7C.view.Pdf',{
				id:'win-pdf',
				items: [{
						xtype: 'uxiframe',
						src: 'data/pdf/userssytemPdf.php'
					}]
				}
			);
			fp.add(pdfGrid);
			pdfGrid.show();

		}else{
			pdfGrid.show();
		}
    },
    onSaveSuccess: function(form, action) {
		var me = this;
		me.onCancelUser();
        D7C.util.Util.showToast('Exito!');
    },
    onSaveFailure: function(form, action) {
        D7C.util.Util.handleFormFailure(action);
    }
});
