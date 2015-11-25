Ext.define('D7C.view.propietarios.PropietarioController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.propietario',
	stores: ['Propietario'],
	models: ['Propietario'],
	views: ['Propietario', 'PropietarioGrid'],
	requires: [
		'D7C.view.propietarios.Propietario',
        'D7C.view.propietarios.PropietarioGrid'
	],
	newRecordId: '',
    isNewRecord: false,
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('propietaryid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
		this.isNewRecord = false;
        var grid = this.lookupReference('propietaryGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('propietaryid');
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
	onAddPropietaryClick: function(button, ctx, evt) {
        var newPropietary = Ext.create('D7C.model.propietarios.Propietario', {
            propietaryid: 0,
			propietaryfirstname: '',
            propietarylastname: '',
			propietaryci: '',
			propietaryadress: '',
			propietaryphone: '',
			last_update: new Date()
        });
        this.isNewRecord = true;
        this.newRecordId = newPropietary.get('propietaryid');
        var grid = this.lookupReference('propietaryGrid');
        grid.getStore().insert(0, newPropietary);
		grid.getPlugin('propietaryRowEditingPlugin').startEdit(newPropietary);
		
		var operatorCombo = this.lookupReference('cb_operator');
		operatorCombo.setDisabled(false);
	},
	onRemovePropietaryClick: function (button, evt) {
		var grid = this.lookupReference('propietaryGrid'),
			selectedRecords = grid.getSelection(),
			store = grid.getStore('propietaryid');
		Ext.Msg.show({ 
			title: 'Eliminar Datos',
			//msg: 'Esta seguro que desea eliminar los datos?',
			msg: Ext.String.format('Si elimina al Propietario tambien se eliminaran los vehiculos asociados al propietario, de los siguientes Modulos:<br><br> - <strong>Unidades de Transporte</strong><br> - <strong>Infracciones</strong><br> - <strong>Tarjeta de Operacion/Temporal</strong><br><br>Esta seguro que desea eliminar los datos?'),
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
        printer.print(this.lookupReference('propietaryGrid'));
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
	onCiFilterKeyup: function() {
        var grid = this.lookupReference('propietaryGrid'),
            filterField = this.lookupReference('ciFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.ciFilter = filters.add({
                id            : 'ciFilter',
                property      : 'propietaryci',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.ciFilter) {
            filters.remove(this.ciFilter);
            this.ciFilter = null;
        }
    },
	onOperatorFilterKeyup: function() {
        var grid = this.lookupReference('propietaryGrid'),
            filterField = this.lookupReference('operatorFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.operatorFilter = filters.add({
                id            : 'operatorFilter',
                property      : 'syndicatename',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.operatorFilter) {
            filters.remove(this.operatorFilter);
            this.operatorFilter = null;
        }
    },
	onValidateComboBox: function(combo) {		
		var operatorCombo = this.lookupReference('cb_operator');
		if(this.isNewRecord)
		{operatorCombo.setDisabled(false);}
		else{
			if(D7C.Profile.getPrivilege() == 1)
			{operatorCombo.setDisabled(false);
			}else{operatorCombo.setDisabled(true);}
		}
    }
});
