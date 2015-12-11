Ext.define('D7C.view.reportes.PropietariosOperadorBar', {
    extend: 'Ext.chart.CartesianChart',
    alias: 'widget.propietariosoperadorbar',

    bind: '{propietariosOperador}',

    insetPadding: 40,
    interactions: 'itemhighlight',
    flipXY: true,

    axes: [{
        type: 'numeric',
        position: 'bottom',
        fields: ['propietarios'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Total Sales',
        grid: true,
        minimum: 0
    }, {
        type: 'sindicato',
        position: 'left',
        fields: ['sindicato'],
        title: 'Sindicato'
    }],
    series: [{
        type: 'bar',
        highlight: {
            strokeStyle: 'black',
            //fillStyle: '#57cbd1',
            radius: 5
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            //width: 140,
            //height: 28,
            renderer: function(storeItem, item, attr) {
                this.setTitle(storeItem.get('sindicato') + ': ' + storeItem.get('propietarios') + ' $');
            }
        },
        label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'propietarios',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            contrast: true
        },
        xField: 'sindicato',
        yField: 'propietarios'
    }]
});