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

function checkIn(idx, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (idx == arr[i]) {
            return true;
        }
    }

    return false
}
   
export function MapComponent(props) {
    console.log(" ascoi", props.result);
    console.log(13 in props.result);
    console.log(13 == props.result[0]);
    if (!props.data) {
        let position = [-6.1753924, 106.8271528]; // koordinat Jakarta
        return (
            <div className='map-wrapper'>
              {/* <MapContainer className="map-container" center={position} zoom={zoom} style={{ width:`100vh`, height:`80vh` }}> */}
              <MapContainer className="map-container" center={position} zoom={13}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="Map data © <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                  />
                  {/* <RecenterAutomatically position={position}/> */}
              </MapContainer>
            </div>            
        )
    }

    const {nodeCount, nodes, weightedAdjacencyMatrix } = props.data;
    const [ result, setResult ] = useState([]);
    // const [ counter, setCounter ] = useState(0);


    let color = "green";
    
    // useEffect(() => {
    //     setCounter((prev) => prev+1);
    //     // setClr("red");
    // }, [color]);
    
    useEffect(() => {
        setResult(props.result);
        // setClr("red");
    }, [props.result]);

    // const mapRef = useRef(null);
    const position = [nodes[0].lat,nodes[0].lon];
    const markers = [];
    const polylines = [];
    let maxDist = 0;

    // Iterasi tiap simpul
    for (let i = 0; i < nodeCount; i++) {
        const { name: nama, lat, lon } = nodes[i];
        markers.push(
            <Marker key={nama} position={[lat, lon]}>
                <Popup>{i+1}. {nama}</Popup>
            </Marker>
        );
    }


    // Iterasi pada matriks ketetanggaan berbobot untuk membuat ruler
    for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < i; j++) {
            if (weightedAdjacencyMatrix[i][j] > 0) {
                color = "green";
                if ((result.length != 0 && checkIn(i+1, result) && checkIn(j+1, result))) {
                    maxDist = Math.max(maxDist, weightedAdjacencyMatrix[i][j]);
                    const startPoint = [nodes[i].lat, nodes[i].lon];
                    const endPoint = [nodes[j].lat, nodes[j].lon];
                    color = "purple";
    
                    polylines.push(
                        <Polyline
                            key={`${i}-${j}`}
                            positions={[startPoint, endPoint]}
                            // color={"green"}
                            pathOptions={{ color }}
                            weight={3}
                            >
                            <Tooltip sticky
                                direction="center"
                                offset={[0, -10]}
                            >
                                {nodes[i].name} - {nodes[j].name} <br></br>
                                {(weightedAdjacencyMatrix[i][j] / 1000).toFixed(4)} km
                            </Tooltip>
                        </Polyline>
                    );
                } else {
                    maxDist = Math.max(maxDist, weightedAdjacencyMatrix[i][j]);
                    const startPoint = [nodes[i].lat, nodes[i].lon];
                    const endPoint = [nodes[j].lat, nodes[j].lon];
    
                    polylines.push(
                        <Polyline
                            key={`${i}-${j}`}
                            positions={[startPoint, endPoint]}
                            // color={color}
                            pathOptions={{ color }}
                            weight={3}
                            >
                            <Tooltip sticky
                                direction="center"
                                offset={[0, -10]}
                            >
                                {nodes[i].name} - {nodes[j].name} <br></br>
                                {(weightedAdjacencyMatrix[i][j] / 1000).toFixed(4)} km
                            </Tooltip>
                        </Polyline>
                    );   
                }
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
        <div className='map-wrapper'>
            {/* <MapContainer className="map-container" center={position} zoom={zoom} style={{ width:`100vh`, height:`80vh` }}> */}
            <MapContainer className="map-container" center={position} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data © <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                />
                { markers }

                { polylines }
                <RecenterAutomatically position={position} result={props.result}/>
            </MapContainer>
        </div>
    )

}