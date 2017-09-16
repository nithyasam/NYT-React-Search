import React from 'react';
import Saved from './Saved';
import Search from './Search';
import helpers from './utils/Helpers';
var Link = require("react-router").Link;

export default class Main extends React.Component{
	

	render(){
		return (
			<div>
			<div className="container">
			<div className="row">
			<div className="jumbotron">
			<h2 className="text-center">NYT React Search!</h2>
			</div>
			<div className="col-md-12">
			<p>
			<Link to="/Search"><button className="btn btn-primary btn-lg">Search Articles</button></Link>
			<Link to="/Saved" replace><button className="btn btn-danger btn-lg">Saved Articles</button></Link>
			</p>
			<div className="row">
			<div className="col-md-12">
			{this.props.children}
			</div>
			</div>
			</div>
			</div>
			</div>
			</div>
			);
	}
}
