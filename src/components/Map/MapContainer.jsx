import React, { useEffect, useState } from "react";
import pin from "./images/placemark.png";
import cluster from "./images/cluster.png";
import logoD from "./images/logo-dixy.png";
import MapAPI from "../../utils/MapAPI";


export default function MapContainer({ center, /*myMap*/ }) {
    const [userData, setUserData] = useState([]);
    const [myMap, setMyMap] = useState(null);


    let mapData;
    let init = async () => {
        let zoomControl = new window.ymaps.control.ZoomControl({
            options: {
                position: {
                    right: 50,
                    top: 50,
                },
                size: "large",
            },
        });

       let myMap = new window.ymaps.Map("map", {
            center: center,
            zoom: 12.2,
            controls: [zoomControl],
        });
        setMyMap(myMap)

        let objectManager = new window.ymaps.ObjectManager({
            clusterize: true,
            gridSize: 64,
            clusterDisableClickZoom: false,
        });
        let MyIconContentLayout = window.ymaps.templateLayoutFactory.createClass(
            '<div style="color: #fff; font-weight:bold;width:46px;vertical-align:middle;line-height:46px;">$[properties.iconContent]</div>'
        );
        objectManager.objects.options.set({
            iconLayout: "default#image",
            iconImageHref: pin,
            iconImageSize: [26, 36],
        });
        objectManager.clusters.options.set({
            clusterIconLayout: "default#imageWithContent",
            clusterIconImageHref: cluster,
            clusterIconImageSize: [46, 46],
            clusterIconImageOffset: [-23, -23],
            clusterIconContentLayout: MyIconContentLayout,
            clusterHideIconOnBalloonOpen: false,
            clusterDisableClickZoom: false,
        });

        myMap.geoObjects.add(objectManager);
        myMap.behaviors.disable("scrollZoom");
        let curMap = userData;


        let resultingObjects = curMap.map(async (item, index) => {
            return {
                type: "Feature",
                id: index,
                geometry: {
                    type: "Point",
                    coordinates: item.COORDS.split(","),
                },
                properties: {
                    balloonContentHeader: `<div class="flex gap-4 items-center justify-start shopHint">
                  <img src=${logoD} />Мой магазин ДИКСИ</div>`,
                    balloonContentFooter: item.SCHEDULE,
                    balloonContentBody: item.NAME,
                },
            };
        });
        let resultingData;
        Promise.all(resultingObjects).then((completed) => {
            resultingData = {
                type: "FeatureCollection",
                features: completed,
            };
            objectManager.add(resultingData);
        });
    };


    const fetchData = async () => {
        mapData = await MapAPI.get("/STORES?region_id=", {});
        mapData = mapData.data.ITEMS;
        let mass = [];
        for (var key in mapData) {
            mass.push(mapData[key]);
        }
        setUserData(mass)
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        userData.length && window.ymaps.ready(init);
    }, [userData])


     useEffect(() => {
       if (myMap) {
         myMap.setCenter(center);
         myMap.setZoom(8);
       }
     }, [center])


    return (
        <div className="row mapContainer">
            <div id="map"></div>
        </div>
    )
}
