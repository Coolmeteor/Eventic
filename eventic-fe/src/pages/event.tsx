import DefaultButton from "@/components/DefaultButton";
import DefaultInputForm from "@/components/DefaultInputForm";
import { PriceInput } from "@/components/Event/PriceInput";
import EventCard from "@/components/EventCard";
import Section from "@/components/Section";
import { API, eventCategories, EventData, mockEvents } from "@/constants";
import { useEffect, useState } from "react";


export type SearchParams = {
    query: string,
    ascending: boolean,
    category: string,
    tags: string[],
    sortType: "name" | "date" | "price" | "proximity",
    priceMin: number | undefined,
    priceMax: number | undefined
}

const defaultSearchParams: SearchParams = {
    query: "",
    ascending: true,
    category: "",
    tags: [],
    sortType: "name",
    priceMin: undefined,
    priceMax: undefined
}

export default function Event() {

    const [eventData, setEventData] = useState<EventData[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [searchParams, setSearchParams] = useState<SearchParams>({ ...defaultSearchParams })

    async function searchRequest() {
        let fetchUrl = `${API}/events`
        if (searchParams != defaultSearchParams) {
            fetchUrl = `${API}/events/search`
            console.log("Sending event with params", searchParams)
        }

        try {
            // use data from, api
            // const response = await fetch(fetchUrl, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(searchParams),
            //     mode: "no-cors"
            // });

            // if (!response.ok) {
            //     throw new Error(`Failed search query to server for events: ${response.statusText}`);
            // }
            // console.log(response)

            // const data: EventData = (await response.json())[0]
            // setEventData(data) // expect an array of data


            // use mock data instead
            setEventData([...mockEvents, ...mockEvents, ...mockEvents, ...mockEvents])
            console.log("Using mock data instead of backend")

        } catch (error) {
            setError((error as Error).message)
            console.error("Error in search request:", error)
        }
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
        border: "2px solid gray"
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
                {loading && <p>Please wait</p>}
                {error && <p>Error loading event: {error}</p>}
                {eventData.length > 0 &&
                    <div>
                        <div className="top-header">
                            {/* <h1 className="search-title">Search Eventic</h1> */}

                            {/* search bar */}
                            <div className="search-bar">
                                <div className="full-w">
                                    <DefaultInputForm
                                        style={searchBarStyle}
                                        type="text"
                                        placeholder="Type to search"
                                        value={searchParams.query}
                                        onChange={(e) => {
                                            setSearchParams({ ...searchParams, query: e.target.value })
                                        }}
                                    />
                                </div>

                                <DefaultButton onClick={searchRequest}>Search</DefaultButton>
                            </div>
                        </div>


                        {/* sort order and uh... */}
                        <div className="sort-order">
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

                            <div className="event-list">

                                {eventData.map((event) => (
                                    <EventCard key={event.id} event={event} large={false} />

                                ))}

                                {error && <p className="errortext">{error}</p>}

                            </div>

                            <div className="rsb">
                                {/*  put some extra stuff here */}

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
                                                    checked={eventData[0].category === category}
                                                    onChange={(e) => {

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
                }
            </Section>


            <style jsx>{`

.full-w {
    width: 100%;
    flex-direction: column;
    display: flex;
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