import React from 'react';
import helpers from './utils/Helpers';
var Link = require("react-router").Link;
import Result from './Result'

export default class Search extends React.Component {
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

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.component_Update();
		this.setState({ term: "",
			rec_number: 5,
			start_year: "",
			end_year: "", 
		});
	}
	
	component_Update() {
		helpers.runQuery(this.state.term, this.state.start_year, 
			this.state.end_year, this.state.rec_number).then(function(data) {
				let article_data = []
				for(var i=0; i<this.state.rec_number ; i++){
					if(data[i].headline.main && data[i].pub_date && data[i].web_url) {
						article_data.push({
							"title" : data[i].headline.main,
							"date" : data[i].pub_date,
							"url": data[i].web_url
						});
					}
				}
				this.setState({ articles: article_data, results:true });
				
			}.bind(this));
		}
		render(){
			let resultPanel;
			if(this.state.results){
				resultPanel = <Result articles = {this.state.articles} showSave={true}/>
			}
			return(
				<div>
				<div className="row">
				<div className="col-sm-12">
				<div className="panel panel-primary">
				<div className="panel-heading">
				<h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
				</div>
				<div className="panel-body">
				<form role="form" onSubmit={this.handleSubmit}>
				<div className="form-group">
				<label for="search">Search Term:</label>
				<input type="text" className="form-control" id="term" value={this.state.term} onChange={this.handleChange}/>
				</div>
				<div className="form-group">
				<label for="pwd">Number of Records to Retrieve:</label>
				<select className="form-control" id="rec_number" onChange={this.handleChange}>
				<option value="1">1</option>
				<option value="5" selected>5</option>
				<option value="10">10</option>
				</select>
				</div>
				<div className="form-group">
				<label for="start-year">Start Year (Optional):</label>
				<input type="text" className="form-control" id="start_year" value={this.state.start_year} onChange={this.handleChange}/>
				</div>
				<div className="form-group">
				<label for="end-year">End Year (Optional):</label>
				<input type="text" className="form-control" id="end_year" value={this.state.end_year} onChange={this.handleChange}/>
				</div>
				<button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button>
				<button type="button" className="btn btn-default" id="clear-all"><i className="fa fa-trash"></i> Clear Results</button>
				</form>
				</div>
				</div>
				</div>
				</div>
				<div className="row">
				<div className="col-sm-12">
				<div className="panel panel-primary">
				<div className="panel-heading">
				<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
				</div>
				<div className="panel-body" id="well-section">

				{resultPanel}
				</div>
				</div>
				</div>
				</div>
				</div>
				);
		}
	}