import axios from 'axios';

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery(searchTerm, startdate, enddate, numarticle) {

     var queryURL = queryURLBase + searchTerm;
     console.log("numarticle: ", numarticle);
    return axios.get(queryURL).then(function(response) {
      // // If get get a result, return that result's formatted address property
      if (response.data.response.docs) {

        return response.data.response.docs;
      }
      // // If we don't get any results, return an empty string
      console.log("response from nyt: " + JSON.stringify(response.data.response.docs));
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticles() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  postArticle(article) {
    return axios.post("/api/saved", article);
  },

  deleteArticle(article) {
    return axios.delete("/api/saved", {params: article});
  }
};

// We export the API helper
module.exports = helper;
