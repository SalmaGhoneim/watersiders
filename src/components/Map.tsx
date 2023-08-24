import { useContext } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { GeoDataContext } from "../contexts/GeoDataContext";
import { COPY_RIGHT, DATA_INCOMPLETE, TILE_LAYER_URL, YOUR_COORDINATES, ZOOM_LEVEL } from "../constants";
import Loading from "./Loading";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = (): JSX.Element => {
    const {coordinateX, coordinateY, geoData, geoDataLoading, geoDataError} = useContext(GeoDataContext);
    
    return (
        <div className="map">
            {
                isNaN(coordinateX) || isNaN(coordinateY) ?
                (
                    <div data-testid="incomplete-id">{DATA_INCOMPLETE}</div>
                )
                :
                geoDataLoading ?
                (
                    <Loading />
                )
                :
                geoDataError ?
                (
                    <div data-testid="error-id">{geoDataError}</div>
                )
                :
                (
                    <div data-testid="map-id" className="container">
                        <MapContainer
                            center={[coordinateX, coordinateY]}
                            zoom={ZOOM_LEVEL}
                            style={{ width: "100%", height: "600px" }}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                url={TILE_LAYER_URL}
                                attribution={COPY_RIGHT}
                            />
                            <Marker position={[coordinateX, coordinateY]}>
                                <Popup>
                                    {YOUR_COORDINATES}
                                </Popup>
                            </Marker>
                            {geoData && <GeoJSON data={geoData} />}
                        </MapContainer>
                    </div>
                )
            }
        </div>
    )  
}

export default Map;
