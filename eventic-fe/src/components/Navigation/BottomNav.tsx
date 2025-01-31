export function BottomNavbar() {
    return (
        <>
            <footer className="bottom-navbar">

                <div className="footer-content">

                    <div className="footer-links">
                        <p>Home</p>
                        <p>About</p>
                        <p>Services</p>
                        <p>Contact</p>
                    </div>

                    <p>Eventic is a site that is a software as a serveice project by Team 1. Blah blah blah more information here</p>

                    <div className="footer-links">
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                        <p>LinkedIn</p>
                    </div>
                </div>

                <p className="legal-stuff">© Team 1 | Privacy Policy | Terms of Service | Some other thing here</p>
            </footer>

            <style jsx>{`

    

    .footer-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        width: 100%;
    }

    .bottom-navbar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background-color: var(--color-onPrimary);
        color: white;
    }

    .legal-stuff {
        font-size: 1rem;
    }

`}</style>

        </>
    );
}