import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { GeoDataContext } from "../contexts/GeoDataContext";
import { INPUT_TITLE, LATITUDE, LOCATE, LONGITUDE } from "../constants";
import { isEnter, stripFloatInput } from "../utils";

const Coordinates = (): JSX.Element => {
    const [localCoordinateX, setLocalCoordinateX] = useState("");
    const [localCoordinateY, setLocalCoordinateY] = useState("");

    const { setCoordinateX, setCoordinateY } = useContext(GeoDataContext);

    const coordinateXHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLocalCoordinateX(stripFloatInput(e.target.value));
    }

    const coordinateYHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setLocalCoordinateY(stripFloatInput(e.target.value));
    }

    const inputKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (isEnter(e)) {
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
            <span>{INPUT_TITLE}</span>
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
                    <button onClick={fetchDataHandler} disabled={!localCoordinateX || !localCoordinateY} className="locate">{LOCATE}</button>
                </div>
        </div>
    )
}

export default Coordinates;
