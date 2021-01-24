window.onload = init;
function init(){
    const map = new ol.Map({
      view:new ol.View({
          center:[9275174.760236427,3228700.074765845],
          zoom:10,
          maxZoom:18,
          minZoom:2,
        //   rotation:0.5
      }),
    
      target: 'js-1-map'
    })
    console.log('----------------------------')

    //Basemaps Layers
    const stamenTerrian = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
            attributions:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible:true,
        title:'StamenTerrain'
    })
    //Layer Group

    const baseLayerGroup = new ol.layer.Group({
        layers: [
            stamenTerrian
        ]

    })
    map.addLayer(baseLayerGroup);

    var source = new ol.source.Vector({

    });

    var vector = new ol.layer.Vector({
        source:source
    });
    map.addLayer(vector);
    
    var pointStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius:5,
            fill:new ol.style.Fill({
                color: 'rgb(255,0,0)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgb(255,0,0)',
                width: 0.5
            }),
        })
    });

    function addRandomPoint() {
        var x = Math.random()*360 -100;
        console.log('x',x)
        var y = Math.random()*180 -90;
        var geom = new ol.geom.Point(ol.proj.fromLonLat([x,y]));
        var feat = new ol.Feature(geom);
        feat.setStyle(pointStyle);
        source.addFeature(feat);
    }

    var duration = 2000;
    function flashFeature(feature) {
        var startTime = new Date().getTime();
        var listener = stamenTerrian.on('postrender',animate);

        function animate(event) {
            var vectorContext = ol.render.getVectorContext(event);
            var frameState = event.frameState();
            var geom = feature.getGeometry().clone();
            var elapsed = frameState.time - startTime;
            var timeRatio = elapsed /duration;
            var radius = ol.easing.easeOut(timeRatio)*30;
            var opacity = ol.easing.easeOut(1 - timeRatio);

            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(255,0,0'+ opacity + ')',
                        width:0.25 + opacity
                    })
                })
            });

            vectorContext.setStyle(style);
            vectorContext.drawGeometry(geom);

            if (elapsed > duration) {
                ol.Observable.unByKey(listener);
                return;
            }
            map.render();

        }


    }; 
    source.on('addFeature',function(e){
        flashFeature(e.feature);
    });
    window.setInterval(addRandomPoint,1000);

}