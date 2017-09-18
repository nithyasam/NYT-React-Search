import axios from 'axios';

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
authKey + "&q=";

var helper = {
  runQuery(searchTerm, startdate, enddate, numarticle) {

   var queryURL = queryURLBase + searchTerm;
   if (parseInt(startdate)) {
    queryURL = queryURL + "&begin_date=" + startdate.trim() + "0101";
  }
  if (parseInt(enddate)) {
    queryURL = queryURL + "&end_date=" + enddate.trim() + "0101";
  }

  return axios.get(queryURL).then(function(response) {
    if (response.data.response.docs) {

      return response.data.response.docs;
    }
    return "";
  });
},

getArticles() {
  return axios.get("/api/saved");
},

postArticle(article) {
  return axios.post("/api/saved", article);
},

deleteArticle(article) {
  return axios.delete("/api/saved", {params: article});
}
};

module.exports = helper;
