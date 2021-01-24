const stamenTerrian = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url:'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
        attributions:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
        attributionsCollabsible:false,
        maxZoom:23,
    }),
    visible:true,
    title:'StamenTerrain'
})

var map = new ol.map({
    layers:[stamenTerrian],
    target:"js-map",
    view: new ol.view({
        center:[0,0],
        zoom:1,
    })
})