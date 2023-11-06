import React, {useState, useRef, useCallback} from "react";
import IssueApi from './IssueApi';
import './style/style.css';

const BackgroundSection = () => (
  <section className="background">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</section>
);

const MainSection = () => (
  <section className="main">
    <div className="logo-holder">
      <img src="/asset/logo-holder.svg" alt="로고" />
    </div>
    <div className="heart-holder">
      <img src="/asset/heart.svg" alt="" />
    </div>
    <h1>UTILIZING GitHub REST API</h1>
    <div className="door-line"></div>
  </section>
);

const ContentsSection = () => (
  <section className="contents">
  <p><span>This is a website where you can check Facebook's react repository issues.</span></p>
  </section>
);

const IssueListPage = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const {issue, error} = IssueApi(pageNumber);
  const adImageURL = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100";
  const observer = useRef();

  const lastIssueElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && issue.length < 120) {
        setpageNumber(prevpageNumber => prevpageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [pageNumber, observer]);

  return (
    <div>
      <BackgroundSection />
      <MainSection />
      <ContentsSection />
    <div className="table-container">
      <section className="contents">
      <h2>facebook / react</h2>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Issue Title</th>
            <th>Creator</th>
            <th>Date</th>
            <th>Comments</th>
            <th className="thead-empty"></th>
          </tr>
        </thead>
        <tbody>
        {issue.map((item, index) => {
            if (issue.length === index + 1) {
              return (
                <tr ref={lastIssueElementRef} key={item.id}>
                  <td>{item.number}</td>
                  <td><a href={`/issuelist/${item.number}`} target="_blank" rel="noopener noreferrer">{item.title}</a></td>
                  <td>{item.user.login}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>{item.comments}</td>
                </tr>
                );
            } else {
              return (
                <React.Fragment key={item.id}>
                  <tr>
                  <td>{item.number}</td>
                  <td><a href={`/issuelist/${item.number}`} target="_blank" rel="noopener noreferrer">{item.title}</a></td>
                  <td>{item.user.login}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>{item.comments}</td>
                  </tr>
                {(index + 1) % 5 === 0 && (
                  <tr>
                    <td colSpan="5">
                      <a href="https://www.wanted.co.kr/" target="_blank" rel="noopener noreferrer">
                        <img src={adImageURL} alt="Advertisement" />
                      </a>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
                }
          })}
        </tbody>
      </table>
      </section>
      <section className="background-footer">
        <span></span>
      </section>
    </div>
  </div>

  );
}

export default IssueListPage;




