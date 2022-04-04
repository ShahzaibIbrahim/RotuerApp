import { useState } from "react";
import { useParams, Route, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();
  const [showComment, setShowComment] = useState(false);

  const {
    sendRequest,
    error,
    status,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found</p>;
  }

  const showCommentHandler = () => {
    setShowComment(!showComment);

    if (!showComment) {
      history.push("/quotes/" + params.quoteId + "/comments");
    } else {
      history.push("/quotes/" + params.quoteId);
    }
  };

  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <div className="centered">
        <button className="btn--flat" onClick={showCommentHandler}>
          {showComment ? "Hide" : "Show"}
        </button>
      </div>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
