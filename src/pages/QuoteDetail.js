import { useState } from "react";
import { useParams, Route, useHistory, useRouteMatch } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
  {id:'1', author:'Shahzaib', text:'Koshish Karni hai, Kamiyabi Khuda Dega'},
  {id:'2', author:'Max', text:'React Seekh le Bhai'},
]

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();
  const [showComment, setShowComment] = useState(false);

  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  if(!quote) {
    return <p>No Quote Found</p>;
  }

  const showCommentHandler = () => {
    setShowComment(!showComment);

    if(!showComment) {
      history.push('/quotes/'+ params.quoteId +'/comments');
    } else {
      history.push('/quotes/'+ params.quoteId);
    }
  }

  return (
    <section>
      <HighlightedQuote text={quote.text} author={quote.author}/>
      <div className="centered">
        <button className="btn--flat" onClick={showCommentHandler}>{showComment ? 'Hide' : 'Show'}</button>
      </div>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
