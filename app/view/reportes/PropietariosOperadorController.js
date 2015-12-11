Ext.define('D7C.view.reportes.PropietariosOperadorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.propietariosoperador',
	
    onChangeChart: function(item, e, options){
        var panel = this.getView();

        if (item.itemId == 'pie'){
            panel.getLayout().setActiveItem(0);
        } else if (item.itemId == 'column'){
            panel.getLayout().setActiveItem(1);
        } else if (item.itemId == 'bar'){
            panel.getLayout().setActiveItem(2);
        }
    },

    onChartDownload: function(item, e, options) {
        var panel = this.getView();
        var chart = panel.getLayout().getActiveItem();

        if (item.itemId == 'png'){
            Ext.MessageBox.confirm('Confirme Descarga', ' ¿Quieres descargar el gráfico como imagen?', function(choice){
                if(choice == 'yes'){
                    chart.download({
                        format: 'png',
                        filename: 'SalesXFilmCategory'
                    });
                }
            });
        } else if (item.itemId == 'pdf'){
            Ext.MessageBox.confirm('Confirme Descarga', '¿Quieres descargar el gráfico en PDF?', function(choice){
                if(choice == 'yes'){
                    chart.download({
                        //url: 'php/pdf/exportChartPdf.php',
                        format: 'pdf',
                        filename: 'SalesXFilmCategory',
                        pdf: {
                            format: 'A4',
                            orientation: 'landscape',
                            border: '1cm'
                        }
                    });
                }
            });
        }
    }
});
