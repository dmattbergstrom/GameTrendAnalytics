# GameTrendAnalytics

## What is it?
A data visualization web application that displays the trending game streams from Twitch. The user is allowed to view the trending game-streams and interact with graphs that visualize the fetched data.

Users will also be allowed to search for specific game stream analytics and then add a specific game to their own “watchlist”, which is a tool to help users keep track of the data of the games that the user is especially interested in.
Since every user will have their own “watchlist”, the application demands a login system that stores user-specific data.

## What have we done so far?
0. Implemented API calls every 24 h to get game data.
1. We've set up a database to store the fetched data, and to store user-specific information.
2. Implemented a login system which then allows you to use additional features on the site.
3. Implemented all Chart Components used to visualize data from API.
4. Implemented the "Watchlist" which allows you to keep track of your favorite games while logged in
5. Implemented a "Get Specific Game Info" page, which with the help of an ID in the URL gets specific data for a game and visualizes it.
6. Added links to all game names displayed on the site, allowing the user to always view specific data from a game. (Users get redirected to page described in the previous point).
7. Implemented a loading spinner which waits until all data is loaded in to the application.
8. Implemented a dynamic navbar which changes depending on user info / being signed in or not.
9. Setup a Heroku Application.
10. Implemented search functionality.
11. Implemented autosuggest in search.

## How to test each page:
**Do not use your localhost for testing pages. Use the herokuapp linked below when testing the application**
1. Frontpage / Overview page: This one is pretty straight forward, just look at the visualized data!
2. Gameinfo page: This page displays data for a specific game. We listed three game ID's for simplicity's sake, which you can view:
  * https://game-trend-analytics.herokuapp.com/gameinfo/32982
  * https://game-trend-analytics.herokuapp.com/gameinfo/21779
  * https://game-trend-analytics.herokuapp.com/gameinfo/29595
3. The Watchlist page: Add some games to your watchlist on the Gameinfo page. Then, proceed to the navigation bar, and click "Show All" under the Watchlist dropdown menu.
4. Play around! It isn't fully bug-free experience yet, but do make note of what improvements you think are most important to make.

## Link to running application:
[CLICK HERE](https://game-trend-analytics.herokuapp.com/)

### Frameworks used:
* ReactJS
* MeteorJS

### Libraries used:
* ApexChart
* Bootstrap

### API used:
* Twitch API

## How to install
Download the application as a .zip. The architecture and a short desciption of files and folders is presented below.

## Architecture
```
imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point.
      accounts-config.js       # configuration of login template.
    server/
      fixtures.js              # fills the DB with Game data, with intervals, and keeps the app from sleeping, by pinging itself!
      index.js                 # import server startup through a single index entry point.
      security.js              # contains collection-specific security. (Don't allow faulty inserts and such)

  api/
    collections/               
      */                         # a unit of domain logic for a given collection. (E.g. Games / Watchlist collection)
        server/
          publications.js        # all collection publications. Defines what data each user can take part of.
          publications.tests.js  # tests for the collection publications. (TODO)
        *.js                     # definition of the given collection. (TODO)
        methods.js               # Methods related to this collection. (Calls that need to be made server-side are defined here).
        methods.tests.js         # tests for those methods. (TODO)

    model.js                     # a unit of domain logic for the entire application. (Get:ers, Set:ers, and so on).
    api-client.js                # API imports only for the client.
    api.js                       # All API imports. (For both client and server).

  ui/
    components/                # all reusable components in the application split by domain 
      AccountsUIWrapper/
        AccountsUIWrapper.css  # Component-specific styling.
        AccountsUIWrapper.jsx  # contains the wrapper for the login system component.
      chart-types/
        Area.jsx               # Area chart type component.
        Line.jsx               # Line chart type component.
        Pie.jsx                # Pie chart type component.
      GameInfoComp/
        OtherInformation.jsx   # Component that contains other information regarding a game.
      Navbar/
        Navbar.css             # Component-specific styling.
        Navbar.jsx             # Navbar component. Contains universal navbar functionality used in entire App.
      OverviewComponents/
        GameTable.jsx          # Component visualizing the top 5 games table.
      Watchlist/
        Item/
          Item.css             # Component-specific styling.
          Item.jsx             # Each item in the Watchlist Table component.
        Table/
          Table.css            # Component-specific styling.
          Table.jsx            # A smart component that handles some watchlist data and displays it.
      
    pages/                     # entry points for rendering used by the router split by domain 
      Gameinfo/
        Gameinfo.css            # Page-specific styling.
        Gameinfo.jsx            # Gameinfo page-logic.
      Overview/
        Overview.css            # Page-specific styling.
        Overview.jsx            # Overview page-logic.
      Watchlist/
        Watchlist.css           # Page-specific styling.
        Watchlist.jsx           # Watchlist page-logic.

    App.jsx                    # Defines the routes of the app, and is a universal component for all pages.

client/
  main.js                      # client entry point, imports all client code

server/

  main.js                      # server entry point, imports all server code
```

## ERROR: "Data-load was insufficient. Refresh the page to retrieve complete data."
Sometimes the collections doesn't get to load before the components render in. This seems to be a data-race on the backend of our storage. Since backend wasn't graded, we didn't bother to fully data-proof the the loaded data. Instead, we show the user, visually, when the data fetch was incomplete - adding to the user experience / interactivity quality of the app.