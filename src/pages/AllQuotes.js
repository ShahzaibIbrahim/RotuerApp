import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
    {id:'1', author:'Shahzaib', text:'Koshish Karni hai, Kamiyabi Khuda Dega'},
    {id:'2', author:'Max', text:'React Seekh le Bhai'},
]

const QuotesList = () => {
    return <QuoteList quotes={DUMMY_QUOTES}/>
}

export default QuotesList;