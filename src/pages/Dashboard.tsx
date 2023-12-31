import { useContext, useRef } from "react";
import Coordinates from "../components/Coordinates";
import GeoJsonTable from "../components/GeoJsonTable";
import Map from "../components/Map";
import { GeoDataContext } from "../contexts/GeoDataContext";
import { SEE_RAW_DATA, SUBTITLE, TITLE } from "../constants";
import '../Dashboard.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

const Arrowsvg = (<svg height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 330 330">
    <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
        c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
        s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
</svg>);

const Dashboard = (): JSX.Element => {
    const tableRef = useRef<HTMLDivElement | null>(null);
    const { geoDataLoading, geoData } = useContext(GeoDataContext);

    const goToTable = (): void => {
        tableRef?.current?.scrollIntoView({behavior: "smooth"});
    }
    
    return (
        <div className="dashboard">
            <Header />
            <div className="geo panel">
                <h4>{TITLE}</h4>
                <span className="subtitle">{SUBTITLE}</span>
                <Coordinates />
                <button onClick={goToTable} className={`rawData ${!geoDataLoading && geoData ? 'visible' : ''}`}>{SEE_RAW_DATA}{Arrowsvg}</button>
                <Map />
            </div>
            <div ref={tableRef}>
                <GeoJsonTable />
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;
