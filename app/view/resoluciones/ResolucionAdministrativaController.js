Ext.define('D7C.view.resoluciones.ResolucionAdministrativaController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.resolucionadministrativa',
	stores: ['ResolucionAdministrativa'],
	models: ['ResolucionAdministrativa'],
	views: ['ResolucionAdministrativa', 'ResolucionAdministrativaGrid'],

	requires: [
		'D7C.view.resoluciones.ResolucionAdministrativa',
        'D7C.view.resoluciones.ResolucionAdministrativaGrid'
	],
	newRecordId: '',
    isNewRecord: false,
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('adminresolutionid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
		this.isNewRecord = false;
        var grid = this.lookupReference('modelAdministrativeResolutionGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('adminresolutionid');
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
	onAddAdministrativeResolutionClick: function(button, ctx, evt) {
        var newAdministrativeResolution = Ext.create('D7C.model.resoluciones.ResolucionAdministrativa', {
            adminresolutionid: 0,
			vehiclequantityid: 0,
			adminresolutioncode: '',
			adminresolutiondate: '',
			adminresolutiontechnical: '',
			adminresolutionlegal: '',
			last_update: new Date()
        });
        this.isNewRecord = true;
        this.newRecordId = newAdministrativeResolution.get('adminresolutionid');
        var grid = this.lookupReference('modelAdministrativeResolutionGrid');
        grid.getStore().insert(0, newAdministrativeResolution);
		grid.getPlugin('modelAdministrativeResolutionRowEditingPlugin').startEdit(newAdministrativeResolution);
		
		var quantityCombo = this.lookupReference('cb_quantity');
		quantityCombo.setDisabled(false);
	},
	onRemoveAdministrativeResolutionClick: function (button, evt) {
        var grid = this.lookupReference('modelAdministrativeResolutionGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('adminresolutionid');
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
    },
    onGridSelect: function (rowModel, record, idx, eOpts) {
		if(D7C.Profile.getPrivilege() == 1){
			this.lookupReference('deleteRecordButton').setDisabled(false);
		}
    },
    onGridDeselect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
    onPrint: function(button, e, options) {
        var printer = D7C.ux.grid.Printer;
        printer.printAutomatically = false;
        printer.print(this.lookupReference('modelAdministrativeResolutionGrid'));
    },
    onExportPDF: function(button, e, options) {
		var fp=Ext.getCmp('content-panel');
		var pdfGrid =Ext.getCmp('win-pdf');
		
		if(typeof pdfGrid=="undefined"){	
			var pdfGrid=Ext.create('D7C.view.Pdf',{
				id:'win-pdf',
				items: [{
						xtype: 'uxiframe',
						src: 'data/pdf/propietariesPdf.php'
					}]
				}
			);
			fp.add(pdfGrid);
			pdfGrid.show();

		}else{
			pdfGrid.show();
		}
    },
	onValidateComboBox: function(combo) {
		var quantityCombo = this.lookupReference('cb_quantity');
		if(this.isNewRecord)
		{quantityCombo.setDisabled(false);}
		else{
			if(D7C.Profile.getPrivilege() == 1 || D7C.Profile.getPrivilege() == 2)
			{quantityCombo.setDisabled(false);}
			else{quantityCombo.setDisabled(true);}	
		}
    }
});
