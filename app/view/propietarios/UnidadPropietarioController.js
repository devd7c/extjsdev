Ext.define('D7C.view.propietarios.UnidadPropietarioController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.unidadpropietario',
	stores: ['UnidadPropietario'],
	models: ['UnidadPropietario', 'Propietario'],
	views: ['UnidadPropietario', 'UnidadPropietarioGrid'],

	requires: [
		'D7C.view.propietarios.UnidadPropietario',
        'D7C.view.propietarios.UnidadPropietarioGrid',
		'D7C.view.propietarios.UnidadPropietarioForm',
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

        me.dialog = view.add({
            xtype: 'unidad-propietarioform',
            viewModel: {
                data: {
                    title: record ? 'Vehiculo: ' + record.get('vehiclelicense') : 'title',
					picture: record.get('picture'),
					vehicleid: record.get('vehicleid')
                },
                links: {
                    theVehicle: record || Ext.create('D7C.model.propietarios.UnidadPropietario')
                }
            }
        });

        me.dialog.show();
    },
	onEditImgClick: function (button) {
        this.createDialog(button.getWidgetRecord());
    },
	onFileFieldChange: function(fileField, value, options) {

        var me = this,
            file = fileField.fileInputEl.dom.files[0],
            picture = this.lookupReference('vehiclePicture');
        if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        } else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Advertencia', 'Solo puede cargar imagenes!');
            fileField.reset();
        }
    },
    onGridEditorCancelEdit: function (editor, ctx, eOpts) {
        if (this.newRecordId && ctx.record.get('vehicleid') === this.newRecordId && this.isNewRecord) {
            ctx.grid.getStore().remove(ctx.record);
            this.isNewRecord = false;
            this.newRecordId = null;
        }
		this.isNewRecord = false;
		
        var grid = this.lookupReference('vehiclePropietaryGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('vehicleid');
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
	onAddVehiclePropietaryClick: function(button, ctx, evt) {
        var newVehiclePropietary = Ext.create('D7C.model.propietarios.UnidadPropietario', {
            vehicleid: 0,
			propietaryid: 0,
			vehiclecapacity: '',
			vehiclecategory: '',
			vehiclechasis: '',
			vehicleclass: '',
			vehiclebrand: '',
			vehiclestatus: 'NO',
			vehiclemodel: '',
			vehiclelicense: '',
			picture: '',
			last_update: new Date()
        });
        this.isNewRecord = true;
        this.newRecordId = newVehiclePropietary.get('vehicleid');
        var grid = this.lookupReference('vehiclePropietaryGrid');
        grid.getStore().insert(0, newVehiclePropietary);
		grid.getPlugin('vehiclePropietaryRowEditingPlugin').startEdit(newVehiclePropietary);
	},
	onRemoveVehiclePropietaryClick: function (button, evt) {
        var grid = this.lookupReference('vehiclePropietaryGrid'),
            selectedRecords = grid.getSelection(),
            store = grid.getStore('vehicleid');
		Ext.Msg.show({ 
			title: 'Eliminar Datos',
			//msg: 'Esta seguro que desea eliminar los datos?',
			msg: Ext.String.format('Si elimina el Vehiculo tambien se eliminara de los siguientes Modulos:<br><br> - <strong>Infracciones</strong><br> - <strong>Tarjeta de Operacion/Temporal</strong><br><br>Esta seguro que desea eliminar los datos?'),
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
        printer.print(this.lookupReference('vehiclePropietaryGrid'));
    },
    onExportPDF: function(button, e, options) {
		var fp=Ext.getCmp('content-panel');
		var pdfGrid =Ext.getCmp('win-pdf');
		
		if(typeof pdfGrid=="undefined"){	
			var pdfGrid=Ext.create('D7C.view.Pdf',{
				id:'win-pdf',
				items: [{
						xtype: 'uxiframe',
						src: 'data/pdf/vehiclesPdf.php'
					}]
				}
			);
			fp.add(pdfGrid);
			pdfGrid.show();

		}else{
			pdfGrid.show();
		}
    },
    onSaveImg: function(button, e, options){

        var me = this,
            form = me.lookupReference('form');

        if (form.isValid()) {
            form.submit({
                clientValidation: true,
                url: 'data/sis_union_vehicle_img.php',
                scope: me,
                success: 'onSaveSuccess',
                failure: 'onSaveFailure'
            });
        }
    },
    onCancelImg: function(button, e, options){
        var me = this;
        me.dialog = Ext.destroy(me.dialog);
    },
    onSaveSuccess: function(form, action) {
        var me = this;
		me.onCancelImg();
		me.refresh();
        D7C.util.Util.showToast('Exito! Imagen Guardada.');
    },
    refresh: function(button, e, options){

    },
    onSaveFailure: function(form, action) {
        D7C.util.Util.handleFormFailure(action);
    },
	onVehicleLicenseFilterKeyup: function() {
        var grid = this.lookupReference('vehiclePropietaryGrid'),
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
	onPropietorFilterKeyup: function() {
        var grid = this.lookupReference('vehiclePropietaryGrid'),
            filterField = this.lookupReference('propietorFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.propietorFilter = filters.add({
                id            : 'propietorFilter',
                property      : 'propietaryci',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.propietorFilter) {
            filters.remove(this.propietorFilter);
            this.propietorFilter = null;
        }
    }
});
