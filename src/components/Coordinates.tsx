import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { GeoDataContext } from "../contexts/GeoDataContext";
import { INPUT_TITLE, LATITUDE, LOCATE, LONGITUDE } from "../constants";


const Coordinates = (): JSX.Element => {
    const [localCoordinateX, setLocalCoordinateX] = useState("");
    const [localCoordinateY, setLocalCoordinateY] = useState("");

    const { setCoordinateX, setCoordinateY } = useContext(GeoDataContext);

    const stripInput = (value: string): string => {
        return value.replace(/[^0-9|.]/g, "");
    }

    const coordinateXHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLocalCoordinateX(stripInput(e.target.value));
    }

    const coordinateYHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLocalCoordinateY(stripInput(e.target.value));
    }

    const inputKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            fetchDataHandler();
        }
    }

    const fetchDataHandler = (): void => {
        if (!!localCoordinateX && !!localCoordinateY) {
            setCoordinateX(parseFloat(localCoordinateX));
            setCoordinateY(parseFloat(localCoordinateY));
        }
    }

    return (
        <div className="coordinates">
            <h3>{INPUT_TITLE}</h3>
                <div className="input">
                    <input
                        onKeyDown={inputKeyDownHandler}
                        value={localCoordinateX}
                        aria-label={LONGITUDE}
                        placeholder={LONGITUDE}
                        onChange={coordinateXHandler}
                    />
                    <input
                        onKeyDown={inputKeyDownHandler}
                        value={localCoordinateY}
                        aria-label={LATITUDE}
                        placeholder={LATITUDE}
                        onChange={coordinateYHandler}
                    />
                    <button onClick={fetchDataHandler} disabled={!localCoordinateX || !localCoordinateY} className="go">{LOCATE}</button>
                </div>
        </div>
    )
}

export default Coordinates;
