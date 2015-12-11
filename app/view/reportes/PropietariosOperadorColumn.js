Ext.define('D7C.view.reportes.PropietariosOperadorColumn', {
    extend: 'Ext.chart.CartesianChart',
    alias: 'widget.propietariosoperadorcol',

    bind: '{propietariosOperador}',

    insetPadding: {
        top: 40,
        bottom: 40,
        left: 20,
        right: 40
    },
    interactions: 'itemhighlight',

    axes: [{
        type: 'numeric',
        position: 'left',
        fields: ['propietarios'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        titleMargin: 20,
        title: {
            text: 'Total Sales',
            fontSize: 14
        },
        grid: true,
        minimum: 0
    }, {
        type: 'sindicato',
        position: 'bottom',
        fields: ['sindicato'],
        titleMargin: 20,
        title: {
            text: 'Sindicato',
            fontSize: 14
        }
    }],
    series: [{
        type: 'bar3d',
        //axis: 'left',
        highlight: true,
        style: {
            minGapWidth: 20
        },
        label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'propietarios',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            renderer: function(storeItem, item, attr) {
                this.setTitle(storeItem.get('sindicato') + ': ' + storeItem.get('propietarios') + ' $');
            }
        },
        xField: 'sindicato',
        yField: 'propietarios'
    }]
});