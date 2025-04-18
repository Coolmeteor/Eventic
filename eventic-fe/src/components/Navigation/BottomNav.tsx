export function BottomNavbar() {
    return (
        <>
            <footer className="bottom-navbar">

                <div className="footer-content">

                    <div className="footer-links footer-nav">
                        <a href="/">Home</a>
                        <a>|</a>
                        <a href="/event">Events</a>
                        <a>|</a>
                        <a href="/dashboard">Dashboard</a>
                        <a>|</a>
                        <a href="/about">About Us</a>
                    </div>
                    <hr></hr>
                    <hr></hr>
                    <hr></hr>

                    <p>Eventic is a platform where we create communities through events.</p>

                    {/* <div className="footer-links">
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                        <p>LinkedIn</p>
                    </div> */}


                    <div className="footer-links">
                        <p className="legal-stuff">© Team 1</p>
                        <a>|</a>
                        <p>Privacy Policy</p>
                        <a>|</a>
                        <p>Terms of Service</p>
                    </div>

                </div>
            </footer>

            <style jsx>{`

    

.footer-nav {
    font-size: 1.3rem;
            }

    .footer-links {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .footer-links a {
                padding: 0.5rem;
    }
    .footer-links a:hover{
        cursor: pointer;
        color: var(--color-primary);
    }
    .footer-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        width: 100%;
        gap: 0.3rem;
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