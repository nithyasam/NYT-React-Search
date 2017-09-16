import React from 'react';
import helpers from './utils/Helpers';

export default class Result extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			articles: this.props.articles
		};
		this.handleClick = this.handleClick.bind(this);
		this.addSaveButton = this.addSaveButton.bind(this);


	}
	handleClick(article, index, func){
		let newArticles = this.state.articles;
		newArticles.splice(index, 1);
		this.setState({articles: newArticles});	
		func(article).then(function() {
			console.log("Updated!");
		}.bind(this));
	}
	addSaveButton(article, visibility, index){

		if(visibility){
		return(
			<button onClick={() => this.handleClick(article, index,helpers.postArticle)}>Save</button>
			);
		}
		else {
			return(
			<button onClick={() => this.handleClick(article, index, helpers.deleteArticle)}>Delete</button>
			);
		}
	}

	render(){
		const articles = this.state.articles;
		const showSave = this.props.showSave;

		
		const listItems = articles.map((article, i) => 
			<p>
			<h2>{article.title}</h2>
			<h3>{article.date}</h3>
			<h4>{article.date}</h4>
			{this.addSaveButton(article, showSave, i)}
			</p>
			);
		return (
			<div>
			{listItems}
			</div>
			);
	}
}