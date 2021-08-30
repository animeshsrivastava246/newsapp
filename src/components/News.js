import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let data = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=c5849d23c67441a8bcbc80e68c20d1b7&page=1");
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles , totalResult: parsedData.totalResult})
    }
    
    handlePrevClick = async ()=>{
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=c5849d23c67441a8bcbc80e68c20d1b7&page=${this.state.page - 1}&pageSize=20`);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
    handleNextClick = async ()=>{
        if(this.state.page+1 > Math.ceil(this.state.totalResult/20)){}
        else{
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=c5849d23c67441a8bcbc80e68c20d1b7&page=${this.state.page + 1}&pageSize=20`);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center"><strong><i>NewsPaper - Top Headlines</i></strong></h2>
                <div className="row">
                    {this.state.articles.map((elem)=>{
                        console.log(elem);
                        return  <div className="col-md-3"  key={elem.url}>
                                        <NewsItem title={elem.title ? elem.title : "Title"} description={elem.description ? elem.description : ""} imgUrl={elem.urlToImage ? elem.urlToImage : "https://wallpaperaccess.com/full/2112629.jpg"} newsUrl={elem.url}/>
                                </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous Page</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResult/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next Page &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
