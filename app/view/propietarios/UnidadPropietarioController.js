Ext.define('D7C.view.propietarios.UnidadPropietarioController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.unidadpropietario',
	stores: ['UnidadPropietario'],
	models: ['UnidadPropietario'],
	views: ['UnidadPropietario', 'UnidadPropietarioGrid'],

	requires: [
		'D7C.view.propietarios.UnidadPropietario',
        'D7C.view.propietarios.UnidadPropietarioGrid'
	],
	newRecordId: '',
    isNewRecord: false,
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('vehicleid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
        this.lookupReference('newRecordButton').setDisabled(false);
    },
    onGridEditorEdit: function (editor, ctx, eOpts) {
        if(this.isNewRecord){
            ctx.grid.getStore().getProxy().setExtraParams({action:'insert'});
			this.isNewRecord = false;
        }else{
            ctx.grid.getStore().getProxy().setExtraParams({action:'update'});
        }
        ctx.grid.getStore().sync();
        ctx.grid.getStore().getProxy().setExtraParams({action:'read'});

        this.lookupReference('newRecordButton').setDisabled(false);
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
	onAddVehiclePropietaryClick: function(button, ctx, evt) {
        var newVehiclePropietary = Ext.create('D7C.model.propietarios.UnidadPropietario', {
            vehicleid: 0,
			propietaryID: -1,
            propietaryCI: ''
        });
        this.isNewRecord = true;
        this.newRecordId = newVehiclePropietary.get('vehicleid');
        var grid = this.lookupReference('vehiclePropietaryGrid');
        grid.getStore().insert(0, newVehiclePropietary);
		grid.getPlugin('vehiclePropietaryRowEditingPlugin').startEdit(newVehiclePropietary);
		
		grid.getStore().getProxy().setExtraParams({action:'insert'});
		grid.getStore().sync();
		grid.getStore().getProxy().setExtraParams({action:'read'});
	},
	onRemoveVehiclePropietaryClick: function (button, evt) {
        var grid = this.lookupReference('vehiclePropietaryGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('vehicleid');
        store.remove(selectedRecords);
		
		store.getProxy().setExtraParams({action:'destroy'});
		store.sync();		
		store.getProxy().setExtraParams({action:'read'});
		this.lookupReference('deleteRecordButton').setDisabled(true);
    },
    onGridSelect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(false);
    },
    onGridDeselect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(true);
    }
});
