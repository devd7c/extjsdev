Ext.define('D7C.view.infracciones.InfraccionController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.infraccion',
	stores: ['Infraccion'],
	models: ['Infraccion'],
	views: ['Infraccion', 'InfraccionGrid'],

	requires: [
		'D7C.view.infracciones.Infraccion',
        'D7C.view.infracciones.InfraccionGrid'
	],
	newRecordId: '',
    isNewRecord: false,

	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('infractionid') === this.newRecordId && this.isNewRecord) {
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
	onAddInfractionClick: function(button, ctx, evt) {
        var newCar = Ext.create('D7C.model.infracciones.Infraccion', {
            infractionid: 0,
			descriptioninfraction: '',
            amountinfraction: ''
        });
        this.isNewRecord = true;
        this.newRecordId = newCar.get('infractionid');
        var grid = this.lookupReference('infractionGrid');
        grid.getStore().insert(0, newCar);
		grid.getPlugin('modelInfractionRowEditingPlugin').startEdit(newCar);
		
		grid.getStore().getProxy().setExtraParams({action:'insert'});
		grid.getStore().sync();
		grid.getStore().getProxy().setExtraParams({action:'read'});
	},
	onRemoveInfractionClick: function (button, evt) {
        var grid = this.lookupReference('infractionGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('infractionid');
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
