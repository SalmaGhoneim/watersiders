import { useContext, useRef } from "react";
import Coordinates from "../components/Coordinates";
import GeoJsonTable from "../components/GeoJsonTable";
import Map from "../components/Map";
import { GeoDataContext } from "../contexts/GeoDataContext";
import { CV, CV_URL, LINKEDIN_ACCOUNT, LINKEDIN_ACCOUNT_URL, MEDIUM_ACCOUNT, MEDIUM_ACCOUNT_URL, MOI, NAME, SEE_RAW_DATA, SUBTITLE, TITLE } from "../constants";

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
            <div className="header">
                <div className="content">
                    <h1>{NAME}</h1>
                    <span>{MOI}</span>
                </div>
            </div>
            <div className="geo panel">
                <h1>{TITLE}</h1>
                <h4>{SUBTITLE}</h4>
                <Coordinates />
                <button onClick={goToTable} className={`rawData ${!geoDataLoading && geoData ? 'visible' : ''}`}>{SEE_RAW_DATA}{Arrowsvg}</button>
                <Map />
            </div>
            <div ref={tableRef}>
                <GeoJsonTable />
            </div>
            <div className="footer">
                <div className="content">
                    <span>{NAME}</span>
                    <div className="links">
                        <a target="_blank" rel="noreferrer" href={LINKEDIN_ACCOUNT_URL}>{LINKEDIN_ACCOUNT}</a>
                        <a target="_blank" rel="noreferrer" href={MEDIUM_ACCOUNT_URL}>{MEDIUM_ACCOUNT}</a>
                        <a target="_blank" rel="noreferrer" href={CV_URL}>{CV}</a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;
