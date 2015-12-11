Ext.define('D7C.view.reportes.PropietariosOperadorPie', {
    extend: 'Ext.chart.PolarChart',
    alias: 'widget.propietariosoperadorpie',

    legend: {
        docked: 'left'
    },
    interactions: ['rotate', 'itemhighlight'],

    bind: '{propietariosOperador}',
	xtype: 'polar',
           //theme: 'default-gradients',
    insetPadding: 40,
    innerPadding: 20,
	legend: {
                docked: 'left'
            },
			interactions: ['rotate', 'itemhighlight'],
    series: {
        type: 'pie',
        highlight: true,
        donut: 20,
        distortion: 0.6,
        style: {
            strokeStyle: 'white',
            opacity: 0.90
        },
        label: {
            field: 'sindicato',
            display: 'rotate'
        },
        tooltip: {
            trackMouse: true,
            renderer: function(storeItem, item) {
                this.setHtml(storeItem.get('sindicato') + ': ' + storeItem.get('propietarios') + ' Propietario(s)');
            }
        },
        xField: 'propietarios'
    }
});