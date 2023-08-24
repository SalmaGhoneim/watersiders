import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { GeoDataContext } from "../contexts/GeoDataContext";
import { NO_FEATURES_FOUND, PICK_FEATURES, RAW_DATA } from "../constants";

type GeoJSONFeature = GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>;

const featureNames = ["id", "timestamp", "changeset","uid", "user", "version", "admin_level" , "boundary", "land_area", "name", "type"];
const initialFeatureNames = ["id", "timestamp", "changeset","uid", "user", "version"];

const GeoJsonTable = (): JSX.Element => {
    const { geoData, geoDataLoading } = useContext(GeoDataContext);
    const [pickedFeatures, setPickedFeatures] = useState(initialFeatureNames);
    return (
        <div className={`tableContainer  ${!geoDataLoading && geoData ? 'visible': ''}`} data-testid="table-id">
            <div className="tableHeader">
                <h3>{RAW_DATA}</h3>
                <PickFeatures pickedFeatures={pickedFeatures} setPickedFeatures={setPickedFeatures}/>
            </div>
            <div className="table">
                <table className="feature-table">
                    <thead>
                        <tr>
                            {pickedFeatures.map(
                                (featureName: string) => {
                                    return (
                                        <th key={featureName}>{featureName}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {geoData && geoData.features.length ?
                        (
                                geoData.features.map((feature: GeoJSONFeature) => <TableRow key={`${feature.id}`} feature={feature} pickedFeatures={pickedFeatures} />)
                        )
                            :
                            <tr className="noFeatures">
                                <td>
                                    {NO_FEATURES_FOUND}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

interface ITableRow {
    feature: GeoJSONFeature;
    pickedFeatures: string[];
}
const TableRow = (props: ITableRow): JSX.Element => {
    return (
        <tr>
            {props.pickedFeatures.map(
                (featureName) => {
                    return (
                        <td key={`${props.feature?.id}-${featureName}`}>{props.feature?.properties?.[featureName]}</td>
                    )
                })
            }
        </tr>
    )
}

interface IPickFeatures {
    pickedFeatures: string[];
    setPickedFeatures: (pickedFeatures: string[]) => void;
}
const PickFeatures = (props: IPickFeatures): JSX.Element => {
    const [selectOpen, setSelectOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleFeatureChange = (e: ChangeEvent<HTMLInputElement>, changedFeatureName: string): void => {
        let newPickedFeatures = [...props.pickedFeatures]
        if (e.target.checked) {
            newPickedFeatures.push(changedFeatureName)
        } else {
            newPickedFeatures = newPickedFeatures.filter((featureName: string) => featureName !== changedFeatureName)
        }
        props.setPickedFeatures(newPickedFeatures);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setSelectOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={() => setSelectOpen(!selectOpen)}>{PICK_FEATURES}</button>
            <div className={`dropdown-content ${selectOpen ? 'show' : ''}`}>
                {featureNames.map((featureName) => (
                    <label key={`${featureName}-label`} className="container">
                        <input
                            type="checkbox"
                            key={`${featureName}-checkbox`}
                            checked={props.pickedFeatures.includes(featureName)}
                            onChange={(e) => handleFeatureChange(e, featureName)}
                        />
                        {featureName}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default GeoJsonTable;
