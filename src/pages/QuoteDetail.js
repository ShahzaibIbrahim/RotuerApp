import { useParams, Route } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
  {id:'1', author:'Shahzaib', text:'Koshish Karni hai, Kamiyabi Khuda Dega'},
  {id:'2', author:'Max', text:'React Seekh le Bhai'},
]

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  if(!quote) {
    return <p>No Quote Found</p>;
  }

  return (
    <section>
      <HighlightedQuote text={quote.text} author={quote.author}/>
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
