import React from 'react';
import helpers from './utils/Helpers';
import Result from './Result'

export default class Saved extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			term: "",
			rec_number: 5,
			start_year: "",
			end_year: "",
			articles: [],
			results: false
		};
	}

	componentDidMount() {
    // Get the latest history.
	    console.log("Inside component mount");
	    helpers.getArticles().then(function(response) {
	      console.log(response.data);
	      if (response.data !== this.state.articles) {
	        console.log("Articles", response.data);
	        this.setState({ articles: response.data, results: true });
	        console.log("Articles after get:" + JSON.stringify(this.state.articles[0]));
	      }
	      
	    }.bind(this));
	  }

	render(){
		let resultPanel;
		if(this.state.results){
			resultPanel = <Result articles = {this.state.articles} showSave={false}/>
		}
		return(
			<div className="row">
			<div className="col-sm-12">
			<div className="panel panel-primary">
			<div className="panel-heading">
			<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
			</div>
			<div className="panel-body" id="well-section">
				{resultPanel}
			</div>
			</div>
			</div>
			</div>
			);
	}
}