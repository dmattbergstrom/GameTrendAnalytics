/**
*  This file defines all the collections, publications and methods that the application provides
*  as an API to the client.
**/
// Define all collections: (IN API-CLIENT.JS)
import "./api-client.js";

// Publish all collections:
import "./collections/tasks/server/publications.js";

// Define all collection-specific methods:
import "./collections/tasks/methods.js";
