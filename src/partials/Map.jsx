import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/style.css';

export function MapComponent(props) {
    const {nodeCount, nodes, weightedAdjacencyMatrix } = props.data;
    // const position = [-6.1753924, 106.8271528]; // koordinat Jakarta
    const position = [nodes[0].lat,nodes[0].lon];
    const markers = [];
    const polylines = [];
    let maxDist = 0;

    // Iterasi tiap simpul
    for (let i = 0; i < nodeCount; i++) {
        const { name: nama, lat, lon } = nodes[i];
        console.log(nodes[i]);
        console.log(nama);
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
                            {weightedAdjacencyMatrix[i][j] / 1000} km
                        </Tooltip>
                    </Polyline>
                );
            }
        }
    }

    console.log(maxDist);
    let zoom = 0;
    if (maxDist > 50000) {
        zoom = Math.sqrt(12500000 / maxDist);
    } else {
        zoom = Math.sqrt(4000000 / maxDist);
    }
    return (
        // <div className="map-wrapper">
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

            <div className="relative flex justify-center items-center" data-aos="fade-up" data-aos-delay="200">
                <MapContainer className = "map-container" center={position} zoom={zoom} style={{ width:`1024`, height:`504` }}>

                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="Map data © <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    />

                    {/* <Marker position={position}>
                        <Popup> {nodes[0].name} </Popup>
                    </Marker> */}
                    { markers }

                    { polylines }
                </MapContainer>
            </div>
        </div>
    )
}