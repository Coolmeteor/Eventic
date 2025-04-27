import DefaultButton from "@/components/DefaultButton";
import DefaultInputForm from "@/components/DefaultInputForm";
import { PriceInput } from "@/components/Event/PriceInput";
import { EventCard } from "@/components/EventCard";
import Section from "@/components/Section";
import { API, eventCategories, EventData, mockEvents } from "@/constants";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


export type SearchParams = {
    name: string, // aka query
    ascending: boolean,
    category: string,
    tags: string[],
    sortType: "name" | "date" | "price" | "proximity" | "",
    priceMin: number | undefined,
    priceMax: number | undefined
}

const defaultSearchParams: SearchParams = {
    name: "",
    ascending: true,
    category: "",
    tags: [],
    sortType: "",
    priceMin: undefined,
    priceMax: undefined
}

export default function Event() {

    const [eventData, setEventData] = useState<EventData[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [searchParams, setSearchParams] = useState<SearchParams>({ ...defaultSearchParams })

    /**
     * Get data from backend for the page to load.
     * This also sends the search parameters for database queries
     */
    async function searchRequest() {
        const fetchCount = 10
        setLoading(true)
        let isSearch = JSON.stringify(searchParams) != JSON.stringify(defaultSearchParams)
        let fetchUrl = `${API}/event/recommendation/${fetchCount}`
        if (isSearch) {
            fetchUrl = `${API}/event/search`
            console.log("Sending event with params", searchParams)
        }

        try {
            // use data from, api
            console.log(`fetching event ${fetchUrl}`)
            let response

            if (isSearch) {
                response = await fetch(fetchUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(searchParams),
                })
            } else {
                response = await fetch(fetchUrl)
            }
            console.log(response)
            if (!response.ok) throw new Error(`Failed to fetch event ${isSearch ? "search" : "recommendation"}`)
            console.log(response)

            const data: EventData[] = await response.json()
            setEventData(data) // expect an array of data
            setError(""); // Delete error message


            // use mock data instead
            // setEventData([...mockEvents, ...mockEvents, ...mockEvents, ...mockEvents])
            // console.log("Using mock data instead of backend")

        } catch (error) {
            setError((error as Error).message + ": " + (error as Error).name)
            console.error("Error in search request:", error)
        } finally {
            setLoading(false)
        }
    }

    /**
     * Reload the backend data
     */
    const refreshContent = () => {
        setEventData([])
        searchRequest()
    }


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true)
                await searchRequest()
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        };

        fetchEvent();
    }, [])

    const searchBarStyle: React.CSSProperties = {
        fontSize: "20px",
        margin: "0",
        textAlign: "left",
        width: "100%",
        border: "2px solid gray",
        color: "black"
    };

    const priceInputStyle: React.CSSProperties = {
        fontSize: "var(--font-size-body-L)",
        margin: "0 0.5rem 0 0rem",
        textAlign: "right",
        width: "150px",
        border: "1px solid gray"
    };

    return (
        <>
            <Section fullWidth={true} usePadding={false}>
                <div className="full-h">
                    <div className="top-header">
                        {/* <h1 className="search-title">Search Eventic</h1> */}

                        {/* search bar */}
                        <div className="search-bar">
                            <div className="full-w">
                                <DefaultInputForm
                                    style={searchBarStyle}
                                    type="text"
                                    placeholder="Type to search"
                                    value={searchParams.name}
                                    onChange={(e) => {
                                        setSearchParams({ ...searchParams, name: e.target.value })
                                    }}
                                />
                            </div>

                            <DefaultButton className="sharp-edge" onClick={searchRequest}>Search</DefaultButton>
                        </div>
                    </div>


                    {/* sort order and uh... */}
                    <div className="sort-order">
                        <div className="refrest-btn">
                            <DefaultButton onClick={refreshContent}>
                                <FontAwesomeIcon icon={faRefresh} />
                            </DefaultButton>

                        </div>
                        <label>
                            <input
                                type="radio"
                                name="sortType"
                                value="name"
                                checked={searchParams.sortType === "name"}
                                onChange={(e) => {
                                    setSearchParams({ ...searchParams, sortType: "name" })
                                }
                                }
                            />
                            Name
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sortType"
                                value="price"
                                checked={searchParams.sortType === "price"}
                                onChange={(e) => {
                                    setSearchParams({ ...searchParams, sortType: "price" })
                                }
                                }
                            />
                            Price
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="sortType"
                                value="date-upload"
                                checked={searchParams.sortType === "date"}
                                onChange={(e) => {
                                    setSearchParams({ ...searchParams, sortType: "date" })
                                }
                                }
                            />
                            Date posted
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="sortType"
                                value="proximity"
                                checked={searchParams.sortType === "proximity"}
                                onChange={(e) => {
                                    setSearchParams({ ...searchParams, sortType: "proximity" })
                                }
                                }
                            />
                            Close to me
                        </label>


                        <div className="vertical-spacer"></div>


                        <label>
                            <input
                                type="radio"
                                name="sort"
                                value="ascending"
                                checked={searchParams.ascending === true}
                                onChange={(e) => {
                                    setSearchParams({ ...searchParams, ascending: true })
                                }
                                }
                            />
                            Ascending
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="sort"
                                value="descending"
                                checked={searchParams.ascending === false}
                                onChange={(e) => {
                                    setSearchParams({ ...searchParams, ascending: false })
                                }
                                }
                            />
                            Descending
                        </label>
                    </div>


                    <div className="main-content">
                        {/* load all data */}
                        <div className="full-w">
                            {loading && <p>Please wait</p>}
                            {eventData.length <= 0 && !loading && <p>No events found</p>}
                            {error && <p className="errortext">{error}</p>}

                            <div className="event-list">
                                {eventData.length > 0 && eventData.map((event) => (
                                    <EventCard btn={{ href: `/event/${event.id}`, text: "View more" }}
                                        key={event.id} event={event} large={false} />
                                ))
                                }
                            </div>
                        </div>


                        <div className="rsb">
                            {/*  extra search filters */}

                            {/* category and tags in a horztoal list for both */}
                            <div className="category-tags">
                                <h2>Price</h2>

                                <div className="price-row">
                                    <h3>Max</h3>
                                    <PriceInput
                                        className="price-input"
                                        data={searchParams.priceMax}
                                        setData={value => setSearchParams({ ...searchParams, priceMax: value.valueOf() })}
                                        formStyle={priceInputStyle}
                                    />
                                </div>
                                <div className="price-row">
                                    {/* hack for spacing. ignore the big red box vscode is complaining about kthx */}
                                    <h3>Min ‎</h3>
                                    <PriceInput
                                        className="price-input"
                                        data={searchParams.priceMin}
                                        setData={value => setSearchParams({ ...searchParams, priceMin: value.valueOf() })}
                                        formStyle={priceInputStyle}
                                    />
                                </div>
                            </div>

                            <div className="spacer"></div>


                            <div className="category-tags">
                                <h2>Category</h2>

                                <div className="category-selector">
                                    {eventCategories.map((category) => (
                                        <label key={category} className="radio-label">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category}
                                                checked={searchParams.category === category}
                                                onChange={() => {
                                                    setSearchParams({ ...searchParams, category: category })
                                                }
                                                }
                                                className="radio-input"
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>


                            </div>

                            <div className="spacer"></div>


                            <div className="action-buttons">
                                <DefaultButton onClick={() => { setSearchParams({ ...defaultSearchParams }) }}>Reset filters</DefaultButton>
                            </div>

                        </div>
                    </div>
                </div>
            </Section>


            <style jsx>{`

.full-w {
    width: 100%;
    flex-direction: column;
    display: flex;
}
.full-h {
    min-height: 100vh
}
.spacer {
    height: 2em;
}

.vertical-spacer {
    width: 2em;
}


h1 {
    font-size: var(--font-size-header-S);
    margin-bottom: 1em;
    padding-top: 28px;
}

.search-title {
    font-size: var(--font-size-header-XS);
    margin-bottom: 1em;
}

.search-bar {
    display: flex;
    width: 100%;
    max-width: 1600px;
    flex-direction: row;

    // background-color: var(--color-background-dark);
    // padding: 1em;
}

.top-header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;

    color: white;
    background-color: var(--color-onPrimary);
    padding: 1em;
}
    

.sort-order {
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin-top: 1em;
    margin-left: 1em;
}

.sort-order label {
    display: flex;
    gap: 0.5em;
    align-items: center;
}



.main-content {
    display: flex;
    flex-direction: row;
    width: 100%;

    padding: 1em;
}

.event-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
    gap: 1em;
    justify-content: left;
    align-items: top;
    width: 100%;
    padding: 1em;
}





.rsb {
    min-width: 400px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-mid);

    padding: 1em;
    }
.rsb div  {
    // margin-bottom: 3em;
}
@media (max-width: 1000px) {
    .rsb {
        min-width: 250px;
    }
}
.rsb h2 {
    padding: 0.4em;
    padding-left: 0;
    font-size: var(--font-size-header-XS);
}
.rsb p {
    padding-left: 1em;
    padding-right: 1em;
    font-size: var(--font-size-body-L);
}


.category-selector {
    display: flex;
    flex-direction: column;
    gap: 8px;
    }

    .radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    }

    .radio-input {
    accent-color: #3b82f6; /* Tailwind blue-500 */
}

.price-row {
    display: flex;
    flex-direction: row;
    margin: 1em 0.1em;
    gap: 1em;

    align-items: center;   
}

.price-row h3 {
    font-size: var(--font-size-body-XL);    
}

.action-buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: top;
    margin: 1em;
    gap: 1em;
}
.errortext {
    color: red;
    font-size: var(--font-size-body-L);
}
             
            `}</style>

        </>


    )

}