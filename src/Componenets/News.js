import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResult] = useState(0)
  const Capitale = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updatedNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(60)
    setarticles(parsedData.articles)
    settotalResult(parsedData.settotalResult)
    setloading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${Capitale(props.category)}---news api`;
    updatedNews();
  }, [])
  // const hndlPri = async () => {
  //   setpage(page-1)
  //   updatedNews();
  // };
  // const hndlNxt = async () => {
  //   setpage(page+1)
  //   updatedNews();
  // };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setpage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalResult(parsedData.totalResults)
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "55px" }}>
        News App- on Top {Capitale(props.category)}-Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
