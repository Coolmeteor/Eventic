# Prelude
This document details the steps required to set up, and run the Eventic frontend web server


# Installation
Eventic is build with React and Next, and this requires Node.js and such dependencies.
1. Install NodeJS from https://nodejs.org/en (we are using v22 LTS)
2. Clone the source code if you haven't already done so
3. cd into `eventic-fe`
4. Run `npm install` to install React and other dependencies required
5. Create a file titled `.env` in the front end root directory (`eventic-fe`) 
    - Here you add configuration details for the front end server.
    - It is MANDATORY to set the IP address and port for backend server. A sample file is provided:

For `.env` file:
```
NEXT_PUBLIC_API_HOST=127.0.0.1          # api host ip address or domain 
NEXT_PUBLIC_API_PORT=5000               # api host port 
NEXT_PUBLIC_DEV_MODE=false              # enable event id display
NEXT_PUBLIC_ENABLE_MOCK_EVENTS=false    # enable mock events, replacing events with id 100-102
```
NOTE: This configures the specifies the url for the backend server only. To configure the web server's IP and port, see "Changing server host IP address and port" below.

# Usage

To start a development server:
1. Run `npm run dev` or `npx next dev`

To start a production server:
1. Run `npx next build`
2. Run `npx next start`


Then, open [http://127.0.0.1:3000](http://127.0.0.1:3000) with your browser to see the result.



# Extra configuration

## Changing server host IP address and port
To run the web sever with a specific address and specific port, run the following command
```shell
npx next dev -H <host address> -p <port>
```

For example, this following runs it on a host address of 127.0.0.1, with a port of 2932
```shell
npx next dev -H 127.0.0.1 -p 2932
```

## Hosting over the internet
This is beyond the scope of this guide, however in general, you need to host the server on your computer's IP address, and then open a port and/or port forward on your network.


# Unit tests

To run unit tests, cd into `/eventic-fe`, then run:
```shell
npx jest # test everything
npx jest -- Horizontal # runs specific tests based on filter
```

Then update test documents in `/docs/frontend_tests/`
See Markdown files in `/docs/frontend_tests/` for more details

For general information about tests, see `/docs/README.md`
