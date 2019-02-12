# GameTrendAnalytics

## What is it?
A data visualization web application that displays the trending game streams from Twitch. The user is allowed to view the trending game-streams and interact with graphs that visualize the fetched data.

Users will also be allowed to search for specific game stream analytics and then add a specific game to their own “watchlist”, which is a tool to help users keep track of the data of the games that the user is especially interested in.
Since every user will have their own “watchlist”, the application demands a login system that stores user-specific data.

### Frameworks used:
* ReactJS
* MeteorJS

### Libraries used:
* ApexChart
* Bootstrap

### API used:
* Twitch API

## How to install

1. Clone the git repo in the terminal.
2. Run `cd GameTrendAnalytics` in the terminal.
3. Run `meteor npm i` in the terminal.
4. Run `meteor` in the terminal.
5. The application should now be running on `http://localhost:3000`

## Architecture
`imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point
      routes.js                # set up all routes in the app
      useraccounts-configuration.js # configure login templates
    server/
      fixtures.js              # fill the DB with example data on startup
      index.js                 # import server startup through a single index entry point

  api/
    lists/                     # a unit of domain logic
      server/
        publications.js        # all list-related publications
        publications.tests.js  # tests for the list publications
      lists.js                 # definition of the Lists collection
      lists.tests.js           # tests for the behavior of that collection
      methods.js               # methods related to lists
      methods.tests.js         # tests for those methods

  ui/
    components/                # all reusable components in the application
                               # can be split by domain if there are many
    layouts/                   # wrapper components for behaviour and visuals
    pages/                     # entry points for rendering used by the router

client/
  main.js                      # client entry point, imports all client code

server/
  main.js                      # server entry point, imports all server code`
