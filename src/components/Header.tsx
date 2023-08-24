import { MOI, NAME } from "../constants";

const Header = (): JSX.Element => {
    return (
        <div className="header">
            <div className="content">
                <span>{NAME}</span>
                <span>{MOI}</span>
            </div>
        </div>
    )
}

export default Header;
