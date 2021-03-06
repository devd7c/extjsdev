Ext.define('D7C.view.operadores.RegistroOperadorController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.registrooperador',
	stores: ['RegistroOperador'],
	models: ['RegistroOperador'],
	views: ['RegistroOperador', 'RegistroOperadorGrid'],
	requires: [
		'Ext.window.Window',
		'D7C.view.operadores.RegistroOperador',
        'D7C.view.operadores.RegistroOperadorGrid',
		'D7C.util.Util'
	],
	newRecordId: '',
    isNewRecord: false,
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
	createDialog: function(record) {
        var me = this,
            view = me.getView();
        console.log(record);
		me.isEdit = !!record;
		me.dialog = view.add({
			xtype: 'registro-operador-form',
			viewModel: {
				data: {
					title: record ? 'Sindicato: ' + record.get('syndicatename') : '',
					operatorregisterzonestart: record.get('operatorregisterzonestart'),
					id: record.get('operatorregisterid'),
					oprexpandid: record.get('oprexpandid')
				},
				// If we are passed a record, a copy of it will be created in the newly spawned session.
				// Otherwise, create a new phantom customer in the child.
				links: {
					//theCustomer: record
					//theCustomer: record || Ext.create('D7C.model.operadores.RegistroOperador')
				}
			},

			// Creates a child session that will spawn from the current session
			// of this view.
			//session: true
		});
        me.dialog.show();
    },
	onExpandUnitsClick: function(button, e, options){
			this.createDialog(button.getWidgetRecord());
    },
    /*onAddSearch: function(button, e, options){
        var me = this;
        me.searchRegister = Ext.create('D7C.view.operadores.RegistroOperadorBuscar');
        me.dialog.add(me.searchRegister);
    },
    onCancelSearch: function(button, e, options){
        var me = this;
        me.searchRegister = Ext.destroy(me.searchRegister);
    },
    onClearSearch: function(button, e, options){
        this.lookupReference('comboSearch').clearValue();
    },

    onSaveSearch: function(button, e, options){
        var me = this,
            value = me.lookupReference('comboSearch').getValue(),
            //store = me.getStore('actors'),
            store = Ext.create('D7C.store.resoluciones.ResolucionAdministrativa'),
			model = store.findRecord('adminresolutionid', value),
            actorsGrid = this.lookupReference('searchGrid'); //me.lookupReference('searchGrid'),
            actorsStore = actorsGrid.getStore();

        if (model){
            actorsStore.add(model);
        }

        me.onCancelSearch();
    },
    onCancelSearch: function(button, e, options){
        var me = this;
        me.searchRegister = Ext.destroy(me.searchRegister);
    },*/
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('operatorregisterid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
		this.isNewRecord = false;		
        var grid = this.lookupReference('operatorRegisterGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('operatorregisterid');
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
	onAddOperatorRegisterClick: function(button, ctx, evt) {
        var newCar = Ext.create('D7C.model.operadores.RegistroOperador', {
            operatorregisterid: 0,
			operatorid: 0,
			adminresolutionid: 0,
			operatorregisterzonestart: '',
            operatorregisterroutestart: '',
			operatorregisterzonefinish: '',
			operatorregisterroutefinish: '',
			operatorregisterstate: '',
			last_update: new Date()
        });
        this.isNewRecord = true;
        this.newRecordId = newCar.get('operatorregisterid');
        var grid = this.lookupReference('operatorRegisterGrid');
        grid.getStore().insert(0, newCar);
		grid.getPlugin('operatorRegisterRowEditingPlugin').startEdit(newCar);
		
		var statusCombo = this.lookupReference('combobox_status');
		statusCombo.setDisabled(false);
	},
	onRemoveOperatorRegisterClick: function (button, evt) {
        var grid = this.lookupReference('operatorRegisterGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('operatorregisterid');
		Ext.Msg.show({ 
			title: 'Eliminar Datos',
			//msg: 'Esta seguro que desea eliminar los datos?',
			msg: Ext.String.format('Si elimina al Operador tambien se eliminaran de los siguientes Campos:<br><br>Propietarios Asociados al Operador<br> - <strong>Modulo Propietarios</strong><br>Vehiculos Asociados al Operador<br> - <strong>Modulo Unidad de Transporte</strong><br> - <strong>Modulo Registro Infracciones</strong><br> - <strong>Modulo Tarjeta de Operacion/Temporal</strong><br><br>Esta seguro que desea eliminar los datos?'),
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
        printer.print(this.lookupReference('operatorRegisterGrid'));
    },
    onExportPDF: function(button, e, options) {
		var fp=Ext.getCmp('content-panel');
		var pdfGrid =Ext.getCmp('win-pdf');
		
		if(typeof pdfGrid=="undefined"){	
			var pdfGrid=Ext.create('D7C.view.Pdf',{
				id:'win-pdf',
				items: [{
						xtype: 'uxiframe',
						src: 'data/pdf/recordoperatorPdf.php'
					}]
				}
			);
			fp.add(pdfGrid);
			pdfGrid.show();

		}else{
			pdfGrid.show();
		}
    },
	onOperatorFilterKeyup: function() {
        var grid = this.lookupReference('operatorRegisterGrid'),
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
		var statusCombo = this.lookupReference('combobox_status');
		if(this.isNewRecord)
			{statusCombo.setDisabled(false);}
		else{
			if(D7C.Profile.getPrivilege() == 1 || D7C.Profile.getPrivilege() == 2)
			{statusCombo.setDisabled(false);}
			else{statusCombo.setDisabled(true);}	
		}
    }
});
