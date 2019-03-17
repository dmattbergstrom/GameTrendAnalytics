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

## What's next?
0. In general, work on interactivity features. Meaning, more intuitive features that tell the user what is actually going on in the application. If data fails to load, and so on and so forth.
1. Data proof the application further. Handle cases wher eunexpected or shortage of data occurs.
2. (Maybe) implement dynamic comparisions between games in the watchlist. Allowing users to compare two, three, or more specific games to one another.
3. (Maybe) implement search functionality.
4. Clean up code & Overlook Architecture.

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
1. Clone the git repo in the terminal.
2. Run `cd GameTrendAnalytics` in the terminal.
3. Run `meteor npm i` in the terminal.
4. Run `meteor` in the terminal.
5. The application should now be running on `http://localhost:3000`

## Architecture
```
imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point.
      routes.js                # set up all routes in the app.
      accounts-config.js       # configuration of login template.
    server/
      fixtures.js              # fill the DB with example data on startup.
      index.js                 # import server startup through a single index entry point.
      security.js              # contains collection-specific security.

  api/
    collections/               
      */                         # a unit of domain logic for a given collection.
        server/
          publications.js        # all collection-related publications.
          publications.tests.js  # tests for the collection publications.
        *.js                     # definition of the given collection.
        *.tests.js               # tests for the behavior of that collection.
        methods.js               # methods related to this collection.
        methods.tests.js         # tests for those methods.

    model.js                     # a unit of domain logic for the entire application.
    api-client.js                # API imports only for the client.
    api.js                       # All API imports. (For both client and server).

  ui/
    components/                # all reusable components in the application
                               # can be split by domain if there are many
    layouts/                   # wrapper components for behaviour and visuals
    pages/                     # entry points for rendering used by the router

client/
  main.js                      # client entry point, imports all client code

server/
  main.js                      # server entry point, imports all server code
```

## Nifty Bash Files (For UNIX systems)
```
  ./run_unix                  # Runs the program from the terminal.

  ./git_push_unix "<MSG>"     # Pushes all changes in current dir to current branch, with a commit message as parameter.

  ./git_merge_unix
    "<MSG>"
    "<MERGE_TO>"
    "<MERGE_FROM>"            # Does the same as the file above, and checks out a new branch <MERGE_TO> and attempts a merge with
                              # <MERGE_FROM> branch.
```
