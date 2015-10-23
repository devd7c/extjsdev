Ext.define('D7C.view.infracciones.InfraccionRegistroController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.infraccionregistro',
	stores: ['InfraccionRegistro'],
	models: ['InfraccionRegistro', 'Infraccion'],
	views: ['InfraccionRegistro', 'InfraccionRegistroGrid'],
	requires: [
		'D7C.view.infracciones.InfraccionRegistro',
        'D7C.view.infracciones.InfraccionRegistroGrid'
	],
	newRecordId: '',
    isNewRecord: false,
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('infractionregisterid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
		this.isNewRecord = false;
        var grid = this.lookupReference('infractionRegisterGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('infractionregisterid');
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
	onAddInfractionRegisterClick: function(button, ctx, evt) {
        var newCar = Ext.create('D7C.model.infracciones.InfraccionRegistro', {
            infractionregisterid: 0,
			infractionid: 0,
            vehicleid: 0,
			descriptioninfraction: '',
			amountinfraction: '',
			infractionnumberticket: '',
			infractionregisterstate: ''
        });
        this.isNewRecord = true;
        this.newRecordId = newCar.get('infractionregisterid');
        var grid = this.lookupReference('infractionRegisterGrid');
        grid.getStore().insert(0, newCar);
		grid.getPlugin('modelInfractionRegisterRowEditingPlugin').startEdit(newCar);
	},
	onRemoveInfractionRegisterClick: function (button, evt) {
        var grid = this.lookupReference('infractionRegisterGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('infractionregisterid');
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
        this.lookupReference('deleteRecordButton').setDisabled(false);
    },
    onGridDeselect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
    onPrint: function(button, e, options) {
        var printer = D7C.ux.grid.Printer;
        printer.printAutomatically = false;
        printer.print(this.lookupReference('infractionRegisterGrid'));
    },
    onExportPDF: function(button, e, options) {
		var fp=Ext.getCmp('content-panel');
		var pdfGrid =Ext.getCmp('win-pdf');
		
		if(typeof pdfGrid=="undefined"){	
			var pdfGrid=Ext.create('D7C.view.Pdf',{
				id:'win-pdf',
				items: [{
						xtype: 'uxiframe',
						src: 'data/pdf/infractionRegisterPdf.php'
					}]
				}
			);
			fp.add(pdfGrid);
			pdfGrid.show();

		}else{
			pdfGrid.show();
		}
    },
	onVehicleLicenseFilterKeyup: function() {
        var grid = this.lookupReference('infractionRegisterGrid'),
            filterField = this.lookupReference('vehicleLicenseFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.vehicleLicenseFilter = filters.add({
                id            : 'vehicleLicenseFilter',
                property      : 'vehiclelicense',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.vehicleLicenseFilter) {
            filters.remove(this.vehicleLicenseFilter);
            this.vehicleLicenseFilter = null;
        }
    },
	onPropietaryCiFilterKeyup: function() {
        var grid = this.lookupReference('infractionRegisterGrid'),
            filterField = this.lookupReference('propietaryCiFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.propietaryCiFilter = filters.add({
                id            : 'propietaryCiFilter',
                property      : 'propietaryci',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.propietaryCiFilter) {
            filters.remove(this.propietaryCiFilter);
            this.propietaryCiFilter = null;
        }
    }
});
