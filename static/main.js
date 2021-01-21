window.onload = init;
function init(){
    const map = new ol.Map({
      view:new ol.View({
          center:[9275174.760236427,3228700.074765845],
          zoom:7,
          maxZoom:10,
          minZoom:2,
        //   rotation:0.5
      }),
    //   layers:[
    //       new ol.layer.Tile({
    //           source: new ol.source.OSM()
    //       })
    //   ],
      target: 'js-map'
    })

    // map.on('click',function(e){
    //     console.log(e.coordinate);
    // })

    //Basemaps Layers
    const openStreetMapStandard = new ol.layer.Tile({
        source : new ol.source.OSM(),
        visible:false,
        title:'OSMStandard'
    })

    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url:'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible:false,
        title:'OSMHumanitarian'
    })
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
            openStreetMapStandard,openStreetMapHumanitarian,stamenTerrian
        ]

    })
    map.addLayer(baseLayerGroup);

    // Layer Switcher logic for Basemaps
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change',function(){
        let baseLayerElementValue = this.value;
        // console.log(baseLayerElement)
        baseLayerGroup.getLayers().forEach(function(element,index,array){
         let baseLayerTitle = element.get('title');
         element.setVisible(baseLayerTitle===baseLayerElementValue)
        //  console.log('baselayertitle:'+ baseLayerTitle,'baseLayerElementValue:'+baseLayerElementValue)
        })
    })
    }
    // Vector Layers

    const EUCountriesGeoJSON = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./data/vector_data/map1.geojson',
            format: new ol.format.GeoJSON()

        }),
        visible:true,
        title:'EUcountriesGeoJSON',
        // console.log('url',url)
    });
    map.addLayer(EUCountriesGeoJSON);


    // var vectorLayerJSON_3 = new ol.layer.Vector({
    //     renderMode: 'image',
    //     source: new ol.source.Vector({
    //         loader: function() {
    //             $.ajax({
    //                 type: 'GET',
    //                 url: './data/vector_data/map.geojson',
    //                 context: this
    //             }).done(function(data) {
    //                 var format = new ol.format.GeoJSON();
    //                 this.addFeatures(format.readFeatures(data));
    //             });
    //         }
    //     }),
    //     // style: myDefinedStyle 
    // });
    
    // map.addLayer(vectorLayerJSON_3);


    // var wms_layer=new ol.layer.VectorImage({
    //     // extent: [-13884991, 2870341, -7455066, 6338219],
    //     source: new ol.source.Vector({
    //       url: './data/vector_data/map.json',
    //       params: {'LAYERS': 'topp:states', 'TILED': true},
    //       serverType: 'geoserver',
    //       crossOrigin: 'anonymous'
    //     }),
    //     visible:true,
    //     title:'EUcountriesGeoJSON'

    //   })
    //     map.addLayer(wms_layer)

    const overlayContainerElement = document.querySelector('.overlay-container');
    const overlayLayer = new ol.Overlay({
        element:overlayContainerElement
    })
    map.addOverlay(overlayLayer);
    const overlayFeatureName = document.getElementById('feature-name')
    const layFeatureAdditionInfo = document.getElementById('feature-additional-info')


    map.on('click',function(e){
        map.forEachFeatureAtPixel(e.pixel,function(feature,layer){
            let clickCoordinate = e.coordinate;
            let clickedFeatureName = feature.get('name');
            let clickedFeatureAdditionInfo = feature.get('additionalInfo');
            overlayLayer.setPosition(clickedCoordinate);
            overlayFeatureName.innerHTML = clickedFeatureName;
            overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionInfo;


        })
    })


}