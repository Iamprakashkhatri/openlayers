window.onload=init;
var map;
var Feature
var Style
function init(){
    
    //Define a view
    var view = new ol.View({
        center:[9153769.71814176, 3332446.201646742 ],
        zoom:7
    });
    //Define basemap
    var OSMBaseMap = new ol.layer.Tile({
        source: new ol.source.OSM({
            // wrapX: false
        })
    });

    //Define Stamen water color
    var waterStamen = new ol.layer.Tile({
        source : new ol.source.Stamen({
            layer:'toner'
        })
    });
    
    //Define array of layers
    var layerArray = [OSMBaseMap]
    
    map = new ol.Map({
        target:'lodha',
        layers:layerArray,
        view:view
    });

    // Static Image covering the given extent
    // Image sourceS
    var ImageSource = new ol.source.ImageStatic({
        attributions:'<b>ready</b>',
        url: 'static/images/Ready.png',
        imageExtent:[9262983.054224942, 3220827.060852472, 9287366.466247912, 3236573.088679218 ]
        // imageExtent:map.getView().calculateExtent()
        
    });
    // Image Layer

    var ImageLayer = new ol.layer.Image({
        source :ImageSource
    });
    //Adding layer to map
    // map.addLayer(ImageLayer)

    //Image source for another image

    /* var anotherImageSource = new ol.source.ImageStatic({
        attributions:'<b>another image</b>',
        url: './Ready_1.png',
        imageExtent:[9362983.054224942, 3320827.060852472, 9387366.466247912, 3336573.088679218]
        
    });
    const map_extent = map.getView().calculateExtent()

    //Layer for another image

    var anotherLayer = new ol.layer.Image({
        source:anotherImageSource
    })

    map.addLayer(anotherLayer)

    return map_extent
    */

    //Adding image based on coordinates
    // LAYER-> SOURCE -> FEATURE:CO-ORDINATE and image:
    Feature = new ol.Feature({
        geometry : new ol.geom.Point([9275174.760236427, 3228700.074765845 ])
    })

    style = new ol.style.Style({
        image: new ol.style.Icon({
            src:'static/images/Ready.png',
            scale:0.05
        })
    });
    Feature.setStyle(style)

    //Define a source
    var vectorSource = new ol.source.Vector({
        features:[Feature]
    });
    //Define a layer
    var vectorLayer = new ol.layer.Vector({
        source:vectorSource
    });
    map.addLayer(vectorLayer)

    //Adding MWS layer to the map
    //Tile: image is divided into different tile. eg in first sec first tile loaded, in 2nd second second tile, in 3 second 3rd tile and finally 4th one.
    //Define WMS source
    var tileSource = new ol.source.TileWMS({
        url:'http://localhost:8080/geoserver/tiger/wms',
        params:{'LAYERS':'tiger:poly_landmarks','TILED':true},
        serverType:'geoserver',
        crossOrigin: 'anonymous'
    })
    //Define tile layer
    var tileLayer = new ol.layer.Tile({
        source:tileSource
    })
    //adding layer to map
    // map.addLayer(tileLayer)
    //Image: image loads in some seconds. eg it took 4 second to load
    var imageSource = new ol.source.ImageWMS({
        url:'http://localhost:8080/geoserver/tiger/wms',
        params:{'LAYERS':'tiger:poly_landmarks'},
        serverType:'geoserver',
        crossOrigin: 'anonymous'
    })
    //Define tile layer
    var imageLayer = new ol.layer.Tile({
        source:imageSource
    })
    //adding layer to map
    // map.addLayer(imageLayer)

    map.on('click',function(e){
        console.log(e.coordinate);
    })


}
var n = new init()
// console.log(map)
// console.log('feature',Feature)
// console.log('style',style)
console.log('feature',Feature.get('geometry'))