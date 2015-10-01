Ext.define('D7C.view.operadores.OperadorController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.operador',
	stores: ['Operador'],
	models: ['Operador'],
	views: ['Operador', 'OperadorGrid'],

	requires: [
		'D7C.view.operadores.Operador',
        'D7C.view.operadores.OperadorGrid'
	],
	newRecordId: '',
    isNewRecord: false,
    //init: function() {
        // RowEditing not appropriate for touch devices
        /*if (!Ext.supports.Touch) {
            // Plugins are instantiated at this time, we must add an instantiated Plugin, not a config
            this.getView().getPlugins().push(Ext.create({
                xclass: 'Ext.grid.plugin.RowEditing',
                clicksToMoveEditor: 1,
                autoCancel: false
            }));
        }*/
    //},
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {
        this.lookupReference('newRecordButton').setDisabled(true);
        //var vendorColIdx = 2;
        //var combo = ctx.grid.columns[vendorColIdx].getEditor(ctx.record);
        //if (ctx.record.get('vendorId') === -1) {
        //    combo.emptyText = 'Select a vendor...';
        //}
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('operatorid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
        this.lookupReference('newRecordButton').setDisabled(false);
    },
    onGridEditorEdit: function (editor, ctx, eOpts) {
		//var grid = this.lookupReference('modelCarsGrid');
		//var row = grid.getSelectionModel().getSelection()[0];
		//console.log(row.get('operatorid'));
		//var rowid = row.get();
		
		ctx.record.set();
        ctx.grid.getStore().sync();  // Force a post with the updated data.
        this.isNewRecord = false;
        this.newRecordId = null;
        this.lookupReference('newRecordButton').setDisabled(false);
        this.lookupReference('deleteRecordButton').setDisabled(true);
    },
	onAddOperatorClick: function(button, evt) {
        var newCar = Ext.create('D7C.model.operadores.Operador', {
            operatorid: 0,
			operatorcode: '',
            syndicatename: ''
        });
        this.isNewRecord = true;
        this.newRecordId = newCar.get('operatorid');
        var grid = this.lookupReference('modelCarsGrid');
        grid.getStore().insert(0, newCar);
        grid.getPlugin('modelOperatorRowEditingPlugin').startEdit(newCar);
	},
	onRemoveOperatorClick: function (button, evt) {
        var grid = this.lookupReference('modelCarsGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore();
        store.remove(selectedRecords);
        store.sync(); this.lookupReference('deleteRecordButton').setDisabled(true);
    },
    onGridSelect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(false);
    },
    onGridDeselect: function (rowModel, record, idx, eOpts) {
        this.lookupReference('deleteRecordButton').setDisabled(true);
    }
});
