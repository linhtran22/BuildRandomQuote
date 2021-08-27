import './App.css';
import { Component } from 'react';

const API =  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends Component{

  state = {
    myQuotes: [],
    index: 0
  }

  componentDidMount(){
    //console.log("start");
    fetch(API).then(response => response.json())
      .then(response => this.setState({
      myQuotes:response.quotes
    }));
  }

  getRandomQuote = () => {
    const {myQuotes} = this.state;

    if (myQuotes.length > 0){
      const index = Math.floor(Math.random()*myQuotes.length);
      this.setState({index})
    }

    // console.log("here");
  }

  render(){
    const {myQuotes,index} = this.state;
    //   console.log(myQuotes);

    const printQuote = myQuotes[index];  
    // console.log("first");
    // console.log(index);
    // console.log(myQuotes[index])

    const tweetURL = `https://twitter.com/intent/tweet?text={printQuote.quote}-{printQuote.author}`;

    return(
      <div className = " d-flex align-items-center justify-content-center vh-100">
        <div className = "col-7 box p-4 shadow-lg mb-5 bg-yellow rounded" id = "quote-box">
          {
            printQuote && (
              <div className = "mb-4 ">
                <h5 className = "text-warning" id = "text">{printQuote.quote}</h5>
                <cite className = "font-italic text-white text-right" id = "author">-{printQuote.author}</cite>
              </div>
            )
          }
          <div className = "d-flex justify-content-between">
            <a className = "btn btn-primary" href = {tweetURL} id = "tweet-quote">Tweet</a>
            <button className = "btn btn-primary" 
              onClick = {this.getRandomQuote} id = "new-quote">Get Quote</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
