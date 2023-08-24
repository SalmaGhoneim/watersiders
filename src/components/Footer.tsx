import { CV, CV_URL, LINKEDIN_ACCOUNT, LINKEDIN_ACCOUNT_URL, MEDIUM_ACCOUNT, MEDIUM_ACCOUNT_URL, NAME } from "../constants";

const Footer = (): JSX.Element => {
    return (
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
    )
}

export default Footer;
