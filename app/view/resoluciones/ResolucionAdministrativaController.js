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
	onAddAdministrativeResolutionClick: function(button, ctx, evt) {
        var newAdministrativeResolution = Ext.create('D7C.model.resoluciones.ResolucionAdministrativa', {
            adminresolutionid: 0,
			adminresolutioncode: '',
			adminresolutiondate: ''
        });
        this.isNewRecord = true;
        this.newRecordId = newAdministrativeResolution.get('adminresolutionid');
        var grid = this.lookupReference('modelAdministrativeResolutionGrid');
        grid.getStore().insert(0, newAdministrativeResolution);
		grid.getPlugin('modelAdministrativeResolutionRowEditingPlugin').startEdit(newAdministrativeResolution);
		
		console.log(grid);
		grid.getStore().getProxy().setExtraParams({action:'insert'});
		grid.getStore().sync();
        //grid.getPlugin('modelOperatorRowEditingPlugin').startEdit(newInfraction);
		grid.getStore().getProxy().setExtraParams({action:'read'});
	},
	onRemoveAdministrativeResolutionClick: function (button, evt) {
        var grid = this.lookupReference('modelAdministrativeResolutionGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('adminresolutionid');
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
