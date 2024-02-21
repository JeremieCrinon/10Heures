export default function Header() {
    return (
        <header className="website--header">
            <svg width="400px" height="400px" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" className="website--header--logo">
                <path d="M0 200C0 89.543 89.543 0 200 0C310.457 0 400 89.543 400 200C400 310.457 310.457 400 200 400C89.543 400 0 310.457 0 200Z" id="Oval" fill="#000000" fillRule="evenodd" stroke="none" />
                <path d="M133 92L204.122 189.891L191.987 198.708L120.865 100.817L133 92Z" id="Rectangle" fill="#FFFFFF" fillRule="evenodd" stroke="none" />
                <path d="M196 12L204 12L204 204L196 204L196 12Z" id="Rectangle-3" fill="#FFFFFF" fillRule="evenodd" stroke="none" />
            </svg>

            <nav className="website--header--nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/discover">Discover</a></li>
                    <li><a href="/playlists">Playlists</a></li>
                </ul>
            </nav>

        </header>
    );
}