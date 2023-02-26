import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imgUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left: '50%', zIndex: '1'}}>{source}</span>
                    <img src={imgUrl} className="card-img-top" alt="News"/>
                    <div className="card-body" style={{backgroundColor: '#969696'}}>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-dark">By <strong><i>{author ? author : "Unknown"}</i></strong> on <strong><i>{new Date(date).toGMTString()}</i></strong></small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem