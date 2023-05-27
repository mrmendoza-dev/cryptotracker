import { useEffect, useState, useMemo } from "react";
import "./NewsPage.scss";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function NewsPage({news}: any) {

  const [currentVideo, setCurrentVideo] = useState();
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);
  const coingeckoUrl = "https://www.coingecko.com/en/coins/";


  const articles = useMemo(
    () => news.filter((item: any) => item.type === "Article"),
    [news]
  );
  const videos = useMemo(
    () => news.filter((item: any) => item.type === "Video"),
    [news]
  );
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  }


  useEffect(() => {
    setCurrentVideo(videos[0])
  }, [videos]);

  function bookmarkArticle(article: any) {
    setBookmarks((prevBookmarks: any[]) => {
      if (prevBookmarks.includes(article)) {
        return prevBookmarks.filter((e: any) => e !== article);
      } else {
        return [...prevBookmarks, article];
      }
    });
  }
  return (
    <div className="NewsPage">
      <div className="news-video">
        {videos.slice(0, 1).map((article: any) => {
          let videoLink = article.news_url.replace("watch?v=", "embed/");

          return (
            <div key={nanoid()} className="">
              <iframe className="video-frame" src={videoLink}></iframe>
            </div>
          );
        })}
      </div>
      <div className="news-latest">
        <p className="news-heading">Latest News</p>
        <div className="news-list">
          {articles.map((article: any) => {
            return (
              <div key={nanoid()} className="news-card">
                <a
                  className="news-img-box"
                  href={article.news_url}
                  target="_blank"
                  rel="noopener"
                >
                  <img className="news-img" src={article.image_url} />
                </a>

                <div className="news-info">
                  <a href={article.news_url} target="_blank" rel="noopener">
                    <p className="news-title">{article.title}</p>
                  </a>
                  <div className="news-subheader">
                    <p className="news-source">{article.source_name}</p>
                    <p className="news-date">{formatDate(article.date)}</p>
                  </div>
                  <p className="news-text">{article.text}</p>

                  <div className="news-bottom-row">
                    <div className="news-tickers">
                      {article.tickers.map((ticker: any) => {
                        return <p key={nanoid()}>{ticker}</p>;
                      })}
                    </div>

                    <button
                      className="news-bookmark"
                      onClick={() => {
                        bookmarkArticle(article.news_url);
                      }}
                    >
                      {bookmarks.includes(article.news_url) ? (
                        <FontAwesomeIcon
                          icon={icons.faBookmarkFilled}
                          className="bookmarked"
                        />
                      ) : (
                        <FontAwesomeIcon icon={icons.faBookmarkEmpty} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
