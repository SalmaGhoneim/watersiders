import axios, { AxiosResponse } from "axios";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { BBOX_PARAM, MARGIN_LAT, MARGIN_LON, OPEN_STREET_MAP_URL } from "../constants";
import osmtogeojson from "osmtogeojson";
type GeoJSONData = GeoJSON.FeatureCollection<GeoJSON.Geometry>;

interface IGeoDataContextProps {
    coordinateX: number;
    coordinateY: number;
    geoData: GeoJSONData | null;
    geoDataLoading: boolean;
    geoDataError: string;
    setCoordinateX: (coordinateX: number) => void;
    setCoordinateY: (coordinateY: number) => void;
}

interface IGeoDataContextProvider {
    children: ReactNode;
}

export const GeoDataContext = createContext<IGeoDataContextProps>({
    coordinateX: NaN,
    coordinateY: NaN,
    geoData: null,
    geoDataLoading: true,
    geoDataError: "",
    setCoordinateX: () => {},
    setCoordinateY: () => {},
});

export const GeoDataContextProvider = (props: IGeoDataContextProvider) => {
    const [coordinateX, setCoordinateX] = useState(NaN);
    const [coordinateY, setCoordinateY] = useState(NaN);
    const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
    const [geoDataLoading, setGeoDataLoading] = useState(false);
    const [geoDataError, setGeoDataError] = useState("");


    const fetchData = useCallback(
        (): void => {
            if(isNaN(coordinateX) || isNaN(coordinateY)) return;
            setGeoDataLoading(true);
            setGeoDataError("");
            axios.get(`${OPEN_STREET_MAP_URL}?${BBOX_PARAM}=${coordinateX-MARGIN_LAT},${coordinateY-MARGIN_LON},${coordinateX+MARGIN_LAT},${coordinateY+MARGIN_LON}`)
                .then(
                    (response: AxiosResponse<string>) => {
                        setGeoData(osmtogeojson(response.data));
                        setGeoDataLoading(false);
                    })
                .catch(
                    (err) => {
                        setGeoDataError(err.response?.data ?? err.message);
                        setGeoDataLoading(false);

                    })
        },
        [coordinateX, coordinateY, setGeoData, setGeoDataError, setGeoDataLoading]
    );

    useEffect(
        () => {
            fetchData();
        },
        [coordinateX, coordinateY, fetchData]
    );

    const value = {
        coordinateX,
        coordinateY,
        geoData,
        geoDataLoading,
        geoDataError,
        setCoordinateX,
        setCoordinateY,
    };
  
    return (
      <GeoDataContext.Provider value={value}>
        {props.children}
      </GeoDataContext.Provider>
    );
};
