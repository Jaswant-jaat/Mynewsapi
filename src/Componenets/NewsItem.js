import React from 'react'

 const NewsItem=(props)=> {
    let { title, description, imageUrl, newsUrl, author, date,source } =props
    return (
      <div>
        <div className="card">
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:0}}>
        <span className=" badge rounded-pill bg-danger">
              {source}
            </span>
          </div>
          <img src={!imageUrl ? "https://static.toiimg.com/thumb/msid-102964180,width-1070,height-580,imgsize-20642,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">read more</a>
          </div>
        </div>
      </div>
    )
  }


export default NewsItem