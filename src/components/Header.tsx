import { MOI, NAME } from "../constants";

const Header = (): JSX.Element => {
    return (
        <div className="header">
            <div className="content">
                <h1>{NAME}</h1>
                <span>{MOI}</span>
            </div>
        </div>
    )
}

export default Header;
