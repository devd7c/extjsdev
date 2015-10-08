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
	onAddPropietaryClick: function(button, ctx, evt) {
        var newPropietary = Ext.create('D7C.model.propietarios.Propietario', {
            propietaryid: 0,
			propietaryfirstname: '',
            propietarylastname: '',
			propietaryci: '',
			propietaryadress: '',
			propietaryphone: ''
        });
        this.isNewRecord = true;
        this.newRecordId = newPropietary.get('propietaryid');
        var grid = this.lookupReference('propietaryGrid');
        grid.getStore().insert(0, newPropietary);
		grid.getPlugin('propietaryRowEditingPlugin').startEdit(newPropietary);
		
		grid.getStore().getProxy().setExtraParams({action:'insert'});
		grid.getStore().sync();
		grid.getStore().getProxy().setExtraParams({action:'read'});
	},
	onRemovePropietaryClick: function (button, evt) {
        var grid = this.lookupReference('propietaryGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('propietaryid');
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
