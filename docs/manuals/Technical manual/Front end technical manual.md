# Technical Manual (Front end)

This document serves of an overview for the front end Eventic system's architecture and other technical parts.


# Architecture

## General overview
Eventic's front end is built with NEXT and React frameworks.

## File structure

All the frontend code is located in the eventic-fe directory in the Github repository. We will refer to this as root, and/or: `/`

The following is a directory tree, with parts repetitive removed for simplicity
```
`/`
│   .env
│   .eslintrc.json
│   .gitignore
│   jest.config.js
│   jest.setup.js
│   login.tsx
│   next-env.d.ts
│   next.config.js
│   package-lock.json
│   package.json
│   postcss.config.js
│   README.md
│   tailwind.config.js
│   tsconfig.json
│   
├───public
│       [image resources ex png, svg]
│       
└───src
    │   constants.tsx
    │   constants_mockimages.tsx
    │   reset.js
    │   
    ├───components
    │   │   [many components, tsx files]
    │   │   
    │   │       
    │   ├───Event
    │   │       CustomDatePicker.tsx
    │   │       EventItem.tsx
    │   │       PriceInput.tsx
    │   │       
    │   ├───Profile
    │   │   │   DashboardList.tsx
    │   │   │   RightContainer.tsx
    │   │   │   
    │   │   ├───EditComponents
    │   │   │       [many components, tsx files]
    │   │   │       
    │   │   └───Order
    │   │           OrderCard.tsx
    │   │           
    │   │       
    │   └───__tests__
    │       │   Hello.test.tsx
    │       │   
    │       ├───Account
    │       │       RegisterForm.test.tsx
    │       │       
    │       └───Event
    │               PriceInput.test.tsx
    │               
    ├───fonts
    │       [font files]
    │       
    ├───pages
    │   │   checkout.tsx
    │   │   dashboard.tsx
    │   │   event.tsx
    │   │   _app.tsx
    │   │   _document.tsx
    │   │   
    │   ├───customer
    │   │   │   orders.tsx
    │   │   │   upcoming.tsx
    │   │   │   
    │   │   └───ticket
    │   │           [id].tsx
    │   │           
    │   ├───event
    │   │   │   create.tsx
    │   │   │   [id].tsx
    │   │   │   
    │   │   └───edit
    │   │           [id].tsx
    │   │           
    │           
    ├───styles
    │   │   [many css style files]
    │           
    └───utils
        [many auth components, ts files]
```


## Components
As we are using React, we are taking full advantage of the component system. In the components directory, it houses a bunch of components used throughout the app. There are folders for categories of components such as `Event` and `Profile`.


`/src/components` Is the root directory for components.


In addition, the `__test` folder houses the test files for Jest.

<hr/>

Below, is a sample component.
```tsx
export function EventItem({
    name,
    thumbnail,
    date,
    location,
    id,
    isSimple=false
}: EventItemProps){
    [...]
}
```
Several props are passed, this included data for rendering the component, and other fields used for variant selection, for example `isSimple`

<hr/>

Props are defined explicitly to minimize type related runtime issues, as we are taking full advantage of TypeScript.
```ts
export type EventItemProps = {
    name: string;
    thumbnail: string; // URL or data string
    description: string;
    date: number;
    id: number;
    location: string;
    isSimple?: Boolean;
}
```

<hr/>

In terms of HTML and CSS, those are written within one tsx file.
```tsx
return(
        <>
        // HTML Here
            <div className="card">
                <p className="title">{name}</p>
                <ImageFromString imageStr={thumbnail}/>
            </div>
   
        // CSS here in the style tag
            <style jsx>{`
            
            .card{
                width: 450px;
                padding: 0 2rem 0 2rem;
                overflow:hidden;
                white-space:nowrap;
            }

            .title {
            display:block;
                font-size: 2rem;
                margin: 1rem;
                margin-right: 0.2em;
     
                // max-width: 300px;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            `}</style>
        </>
    )
```
This structure is similar to how pages are coded as well. This is done to keep code in one place, instead of having to import and manage .css files alongside the rest of the code. css files are used in some global style scenarios, but aren't frequently used.

## Pages

Pages follow a format that maps to url. For example, refer to the event file structure

## Communicating with API

The majority of page data is fetch on page load.

```tsx
// State variables
const [eventData, setEventData] = useState<EventData[]>([])
const [error, setError] = useState<string | null>(null)
const [loading, setLoading] = useState(false)

// main use effect for loading page content
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
```
This setup allows for fast page loading (since the front end server sends pages without content), and async data fetching from the API server. Content is loaded when the data is ready, via state variables.

If content needs to be re-fetched, for example on the search/browse page, the state variable also allows for this to be done easily, as updating it triggers a reload of the affected parts of the page.


Communication is done with the backend API via GET/POST requests mainly.
```tsx
// create a response
let response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(searchParams),
})

// notify if there is an error
if (!response.ok) throw new Error(`Failed to fetch event`)

// update the state variable with the date returned
const data: EventData[] = await response.json()
setEventData(data) // expect an array of data
```
For example, EventData is a shared JSON format definition between front end and API server.



## Pages
`/src/pages/` is where the code for the pages are located
```
    ├───pages
    │   │   checkout.tsx
    │   │           
    │   ├───event
    │   │   │   create.tsx
    │   │   │   [id].tsx
    │   │   │   
    │   │   └───edit
    │   │           [id].tsx
```
Per this example, the checkout page would be `http://<host>/checkout`, the event details page for event with id of 21 would be `http://<host>/event/21`, and the event create page would be `http://<host>/event/create`, and editing event with id 21 would be `http://<host>/event/edit/21`.




## Authentication




