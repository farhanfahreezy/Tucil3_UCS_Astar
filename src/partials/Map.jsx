import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/style.css';

function RecenterAutomatically (props) {
    const map = useMap();
    console.log("ppp");
    console.log(props.position);
    
    useEffect(() => {
        map.setView(props.position);
    }, [props.position]);
    // return null;
   }
   
export function MapComponent(props) {
    const {nodeCount, nodes, weightedAdjacencyMatrix } = props.data;
    // const mapRef = useRef(null);
    const position = [nodes[0].lat,nodes[0].lon];
    const markers = [];
    const polylines = [];
    let maxDist = 0;

    // const [position, setPosition] = useState([nodes[0].lat,nodes[0].lon]);
    // const [position, setPosition] = useState(nodes?.[0]?.lat && nodes?.[0]?.lon ? [nodes[0].lat, nodes[0].lon] : [0, 0]);

    // // useEffect(() => {
    // //     setPosition([nodes[0].lat, nodes[0].lon]);
    // // }, [props]);
    // // console.log(position)
    // useEffect(() => {
    //     if (nodes?.[0]?.lat && nodes?.[0]?.lon) {
    //         setPosition([nodes[0].lat, nodes[0].lon]);
    //     }
    // }, [props]);
    
    // Panggil setView ketika posisi berubah
    // useEffect(() => {
    //     mapRef.current.setView(position);
    // }, [position]);
    

    // Iterasi tiap simpul
    for (let i = 0; i < nodeCount; i++) {
        const { name: nama, lat, lon } = nodes[i];
        markers.push(
            <Marker key={nama} position={[lat, lon]}>
                <Popup>{nama}</Popup>
            </Marker>
        );
    }

    // Iterasi pada matriks ketetanggaan berbobot untuk membuat ruler
    for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < i; j++) {
            if (weightedAdjacencyMatrix[i][j] > 0) {
                maxDist = Math.max(maxDist, weightedAdjacencyMatrix[i][j]);

                const startPoint = [nodes[i].lat, nodes[i].lon];
                const endPoint = [nodes[j].lat, nodes[j].lon];
                polylines.push(
      
                //     <Polyline
                //         key={`${i}-${j}`}
                //         positions={[startPoint, endPoint]}
                //         color={'green'}
                //         weight={3}
                //         distance={weightedAdjacencyMatrix[i][j] / 1000}
                //         eventHandlers={{
                //         mouseover: (e) => {
                //             // e.target.openTooltip();
                //             e.target.closeTooltip();
                //         },
                //         mouseout: (e) => {
                //             e.target.openTooltip();
                //             // e.target.closeTooltip();
                //         },
                //         }}
                //     >
                //         <Tooltip className="tooltip-custom" permanent={true} direction="center" offset={[0, -15]}>
                //         {weightedAdjacencyMatrix[i][j] / 1000} km
                //         </Tooltip>
                //   </Polyline>

                    <Polyline
                        key={`${i}-${j}`}
                        positions={[startPoint, endPoint]}
                        color={"green"}
                        weight={3}
                        >
                        <Tooltip sticky
                            direction="center"
                            offset={[0, -10]}
                            icon={{
                            className: "leaflet-tooltip-custom",
                            }}
                        >
                            {nodes[i].name} - {nodes[j].name} <br></br>
                            {(weightedAdjacencyMatrix[i][j] / 1000).toFixed(4)} km
                        </Tooltip>
                    </Polyline>
                );
            }
        }
    }

    let zoom = 0;
    if (maxDist > 50000) {
        zoom = Math.sqrt(12500000 / maxDist);
    } else {
        zoom = Math.sqrt(4000000 / maxDist);
    }
    return (       
        <MapContainer className="map-container" center={position} zoom={zoom} style={{ width:`1024`, height:`504` }}>

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data © <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            />

            {/* <Marker position={position}>
                <Popup> {nodes[0].name} </Popup>
            </Marker> */}
            { markers }

            { polylines }
            <RecenterAutomatically position={position}/>
        </MapContainer>

    )
}