export function TopNavbar() {
    return (
        <>

            <header className="top-navbar">
                <div className="horiz">
                    <img src="globe.svg" alt="Eventic Logo" width={28}/>
                    <h1>Eventic</h1>

                    <h1>SEARCH HERE</h1>
                </div>
                <nav>
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>


            <style jsx>{`
                .horiz {
                    display: flex;
                    flex-direction: row;        
                }
                .top-navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background-color: var(--color-onPrimary);
                    color: white;
                }

                .top-navbar h1 {
                    font-size: 1.5rem;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                }

                .top-navbar nav a {
                    margin-right: 1rem;
                    color: white;
                    text-decoration: none;
                }

                .top-navbar nav a:hover {
                    text-decoration: underline;
                }

                .top-navbar nav a:last-child {
                    margin-right: 0;
                }

                .top-navbar nav {
                    display: flex;
                }   

            `}</style>
        </>
    );
}