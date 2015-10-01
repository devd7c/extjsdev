Ext.define('D7C.view.sistema.UsuarioController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.usuario',
	stores: ['Usuario'],
	models: ['Usuario'],
	views: ['Usuario', 'UsuarioGrid'],

	requires: [
		'D7C.view.sistema.Usuario',
        'D7C.view.sistema.UsuarioGrid'
	],

    init: function() {
        // RowEditing not appropriate for touch devices
        /*if (!Ext.supports.Touch) {
            // Plugins are instantiated at this time, we must add an instantiated Plugin, not a config
            this.getView().getPlugins().push(Ext.create({
                xclass: 'Ext.grid.plugin.RowEditing',
                clicksToMoveEditor: 1,
                autoCancel: false
            }));
        }*/
    },

	onAddUserClick: function() {
			alert("HOLA MUNDO");
	},
	onGridEditorBeforeEdit: function (editor, ctx, eOpts) {

    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        /*if (this.newRecordId && ctx.record.get('id') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
        this.lookupReference('newRecordButton').setDisabled(false);*/
    },
    onGridEditorEdit: function (editor, ctx, eOpts) {
        //var vendorColIdx = 2;
        //var combo = ctx.grid.columns[vendorColIdx].getEditor(ctx.record);
        //var vendorRecord = combo.findRecord('name', ctx.record.get('vendorName'));
        //ctx.record.set('vendorId', vendorRecord.get('id'));
        /*ctx.grid.getStore().sync();  // Force a post with the updated data.
        this.isNewRecord = false;
        this.newRecordId = null;
        this.lookupReference('newRecordButton').setDisabled(false);
        this.lookupReference('deleteRecordButton').setDisabled(true);*/
    }
});
