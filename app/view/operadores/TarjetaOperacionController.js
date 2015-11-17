Ext.define('D7C.view.operadores.TarjetaOperacionController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.tarjetaoperacion',
	stores: ['TarjetaOperacion'],
	models: ['TarjetaOperacion'],
	views: ['TarjetaOperacion', 'TarjetaOperacionGrid'],
	requires: [
		'D7C.view.operadores.TarjetaOperacion',
        'D7C.view.operadores.TarjetaOperacionGrid'
	],
	newRecordId: '',
    isNewRecord: false,
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('cardoperationid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
		this.isNewRecord = false;		
        var grid = this.lookupReference('cardOperationGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('cardoperationid');
        store.remove(selectedRecords);
        this.lookupReference('newRecordButton').setDisabled(false);
    },
    onGridEditorEdit: function (editor, ctx, eOpts) {
        if(this.isNewRecord){
            ctx.grid.getStore().getProxy().setExtraParams({action:'insert'});
			D7C.util.Util.showToast('Los datos fueron ingresados correctamente!');
        }else{
            //ctx.grid.getStore().getProxy().setExtraParams({action:'update'});
			D7C.util.Util.showToast('Advetencia, Los Datos No Pueden ser Actualizados');
        }
        ctx.grid.getStore().sync();
        ctx.grid.getStore().getProxy().setExtraParams({action:'read'});
		this.isNewRecord = false;
		this.lookupReference('newRecordButton').setDisabled(false);
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
	onAddCardOperationClick: function(button, ctx, evt) {
        var newCar = Ext.create('D7C.model.operadores.TarjetaOperacion', {
            cardoperationid: 0,
			operatorregisterid: 0,
			vehicleid: 0,
			cardoperationstatus: 'Activo',
            cardoperationvalidity: '',
			nameprincipal: '',
			namesecretary: '',
			vehiclestatuscard: 'SI'
        });
        this.isNewRecord = true;
        this.newRecordId = newCar.get('cardoperationid');
        var grid = this.lookupReference('cardOperationGrid');
        grid.getStore().insert(0, newCar);
		grid.getPlugin('cardOperationRowEditingPlugin').startEdit(newCar);
		
		/*PRIVILEGES ENABLED*/
		var operatorCombo = this.lookupReference('operator');
		var vehicleCombo = this.lookupReference('cb_vehicle');
		operatorCombo.setDisabled(false);
		vehicleCombo.setDisabled(false);
	},
	onRemoveCardOperationClick: function (button, evt) {
        var grid = this.lookupReference('cardOperationGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('cardoperationid');
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
    onDisableClick: function(grid, rowIndex){
		var me = this,         
		gw = this.lookupReference('cardOperationGrid'),        
		store = gw.getStore('cardoperationid');
		
        grid = this.lookupReference('cardOperationGrid');			
		var rec = grid.getStore().getAt(rowIndex);
		if (rec.get('cardoperationstatus') == 'Baja')
		{D7C.util.Util.showToast('Aviso, No se Encontro Ningun Cambio');
		}else {
			if(D7C.Profile.getPrivilege() == 1 || D7C.Profile.getPrivilege() == 2){
				Ext.Msg.show({ 
					title: 'Modificar Estado',
					msg: 'Esta seguro que desea dar de BAJA?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function (buttonId) {
						if (buttonId == 'yes') {
							Ext.Ajax.request({
								url:'data/sis_union_card_operations_status.php',
								method:'POST',
								params:{
									cardoperationid:rec.get('cardoperationid'), 
									cardoperationstatus: rec.get('cardoperationstatus'), 
									vehicleid:rec.get('vehicleid')
								},
								success:function(transport){
									D7C.util.Util.showToast('Los Datos Fueron Modificados Correctamente');
								},
								failure:function(transport){
									D7C.util.Util.handleFormFailure(action);
								}
							});
						}
					}
				});
			}else{D7C.util.Util.showToast('Advertencia, Privilegios Insuficientes');}
		}
    },
    onActiveClick: function(grid, rowIndex){
		grid = this.lookupReference('cardOperationGrid');
		var rec = grid.getStore().getAt(rowIndex);
		if (rec.get('cardoperationstatus') == 'Activo')
		{D7C.util.Util.showToast('Aviso, No se Encontro Ningun Cambio');
		}else {			
			Ext.Ajax.request({
				url:'data/sis_union_card_operations_status.php',
				method:'POST',
				params:{
					cardoperationid:rec.get('cardoperationid'), 
					cardoperationstatus: rec.get('cardoperationstatus'), 
					vehicleid:rec.get('vehicleid')
				},
				success:function(transport){
					D7C.util.Util.showToast('Los Datos Fueron Modificados Correctamente');
				},
				failure:function(transport){
					D7C.util.Util.handleFormFailure(action);
				}
			});
		}
    },
    onGridSelect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(false);
    },
    onGridDeselect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
	onOperatorFilterKeyup: function() {
        var grid = this.lookupReference('cardOperationGrid'),
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
	onLicenceFilterKeyup: function() {
        var grid = this.lookupReference('cardOperationGrid'),
            filterField = this.lookupReference('licenceFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.licenceFilter = filters.add({
                id            : 'licenceFilter',
                property      : 'vehiclelicense',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.licenceFilter) {
            filters.remove(this.licenceFilter);
            this.licenceFilter = null;
        }
    },
    onPrint: function(button, e, options) {
        var printer = D7C.ux.grid.Printer;
        printer.printAutomatically = false;
        printer.print(this.lookupReference('cardOperationGrid'));
    },
    onExportPDF: function(button, e, options) {
		var fp=Ext.getCmp('content-panel');
		var pdfGrid =Ext.getCmp('win-pdf');
		
		if(typeof pdfGrid=="undefined"){	
			var pdfGrid=Ext.create('D7C.view.Pdf',{
				id:'win-pdf',
				items: [{
						xtype: 'uxiframe',
						src: 'data/pdf/card_operationPdf.php'
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
		var operatorCombo = this.lookupReference('operator');
		var vehicleCombo = this.lookupReference('cb_vehicle');
		if(this.isNewRecord)
		{operatorCombo.setDisabled(false);vehicleCombo.setDisabled(false);}
		else{
			if(D7C.Profile.getPrivilege() == 1)
			{
				operatorCombo.setDisabled(false);
				vehicleCombo.setDisabled(false);
				combo.getStore().getProxy().setExtraParams({action:'readvalid'});
				combo.getStore().reload();
			}else{operatorCombo.setDisabled(true);vehicleCombo.setDisabled(true);}
		}
    }
});
