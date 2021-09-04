import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps= {
        pgSize: 8,
        country: 'in',
        category: 'general',
    }
    static propTypes = {
        pgSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        document.title = `NewsPaper - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews(){
        this.setState({loading: true})
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5849d23c67441a8bcbc80e68c20d1b7&page=${this.state.page}&pageSize=${this.props.pgSize}`);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles ,
            totRes: parsedData.totalResults ,
            loading: false
        })
    }

    async componentDidMount(){
        this.updateNews();
    }
    
    handlePrevClick = async ()=>{
        this.setState({page: this.state.page-1});
        this.updateNews();
    }
    handleNextClick = async ()=>{
        this.setState({page: this.state.page+1});
        this.updateNews();
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{margin: '30px 0px'}}><strong><i>NewsPaper - {this.capitalizeFirstLetter(this.props.category)} - Top Headlines</i></strong></h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {(!this.state.loading) && this.state.articles.map((elem)=>{
                        console.log(elem);
                        return  <div className="col-md-3"  key={elem.url}>
                                        <NewsItem title={elem.title ? elem.title : "Title"} description={elem.description ? elem.description : ""} imgUrl={elem.urlToImage ? elem.urlToImage : "https://wallpaperaccess.com/full/2112629.jpg"} newsUrl={elem.url} author={elem.author} date={elem.publishedAt} source={elem.source.name}/>
                                </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous Page</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totRes / this.props.pgSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next Page &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
