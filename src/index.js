// import dependencies and libraries
// import $ from 'jquery';
// import * as d3 from "d3";
import * as esriLoader from 'esri-loader';
import * as calcite from 'calcite-web';

// import style files
import "./style/index.scss";
import { rejects } from 'assert';

import WeatherViewer from './components/weather-viewer';

// import other files

// app configs
const ITEM_ID_HURRICANE_WEB_MAP = 'c500379cb42d4ba28407502563505e3e'; 
const LAYER_ID_FORECAST_POSITION = '0';
const LAYER_ID_OBSERVED_POSITION = '1';

const URL_HURRICANE_LAYER = 'https://utility.arcgis.com/usrsvcs/servers/4693f2a1d2e348c193ce5ec4d1d887a5/rest/services/LiveFeeds/Hurricane_Active/MapServer';

const FIELD_NAME_STORM_NAME = 'STORMNAME';
const FIELD_NAME_STORM_ID = 'STORMID';

const DOM_ID_MAP_VIEW_CONTAINER = 'viewDiv';


esriLoader.loadModules([
    'esri/views/MapView', 
    'esri/WebMap',
    "esri/request"
]).then(([
    MapView, 
    WebMap,
    esriRequest
])=>{

    // map view and controls
    const HurricaneMap = function(){

        // private variables
        let mapView = null;

        const init = ()=>{
            mapView = initMapView();
            initMapEventHandlers();
        };

        // private methods
        const initMapView = ()=>{
                    
            const webmap = new WebMap({
                portalItem: { 
                    id: ITEM_ID_HURRICANE_WEB_MAP
                }
            });

            return new MapView({
                map: webmap,
                container: DOM_ID_MAP_VIEW_CONTAINER
            });
        };

        const initMapEventHandlers = ()=>{
            console.log('init map view event handlers', mapView);
        };

        return {
            init
        };

    };

    const AppDataModel = function(){

        let visibleStormName = '';
        let activeStormNames = null; // lookup table for all active storm names
        let observedPosition = null;
        let forecastPosition = null;

        const init = ()=>{
            queryActiveStoreNames();
        };

        const setVisibleStormName = (name='')=>{
            visibleStormName = name;
        };

        const setActiveStormNames = (features=[])=>{

            activeStormNames = features.map(d=>{
                const stormName = d.attributes[FIELD_NAME_STORM_NAME];
                return {
                    key: stormName.toLowerCase(),
                    value: stormName,
                };
            });

            console.log(activeStormNames);
        };

        const setObservedPosition = ()=>{

        };

        const setForecastPosition = ()=>{

        };

        const getVisibleStormName = ()=>{
            return visibleStormName;
        };

        const queryActiveStoreNames = ()=>{
            const LayerURL = URL_HURRICANE_LAYER + '/' + LAYER_ID_FORECAST_POSITION;

            const queryParam = {
                where: '1=1',
                outFields: FIELD_NAME_STORM_NAME,
                returnDistinctValues: true,
                returnGeometry: false,
                f: 'json',
            };

            queryFeatures(LayerURL, queryParam).then(res=>{
                console.log('distinct storm names', res);
                setActiveStormNames(res.features);
            }).catch(err=>{
                console.error("cannot get distinct storm names", err);
            });
        };

        const queryObservedPosition = ()=>{

        };

        const queryForecastPosition = ()=>{

        };

        const queryFeatures = (layerURL, queryParams)=>{
            const requestUrl = layerURL +  '/query';

            const options = { 
                responseType: "json" 
            };

            if(queryParams){
                options.query = queryParams;
            }

            return new Promise((resolve, reject)=>{
                
                esriRequest(requestUrl, options).then(function(response){
                    // The requested data
                    // console.log(response);
                    if(response.data){
                        resolve(response.data);
                    } 
                }).catch(error=>{
                    // console.error("query operation is failed", error);
                    reject(error);
                })
            });
        };

        return {
            init: init
        }

    };

    const AppView = function(){

    };

    const AppViewModel = function(){

    };

    const Helper = function(){
        this.capitalizeFirstLetter= (string)=>{
            string = string.toLowerCase();
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
    };

    // initiate core modules
    const dataModel = new AppDataModel();
    const hurricaneMap = new HurricaneMap();
    const helper = new Helper();
    const weatherViewer = new WeatherViewer();

    hurricaneMap.init();
    dataModel.init();
    weatherViewer.init();

    // weatherViewer.queryByLatLon();

}).catch(err => {
    // handle any errors
    console.error(err);
});