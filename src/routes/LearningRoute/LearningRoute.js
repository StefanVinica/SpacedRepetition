import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
class LearningRoute extends Component {
  
  state = {
    head : {},
    guess : '',
    response: [],
    hide: 'hidden',
    hidebtn: 'hidden',
    nextWord: '',
    wordCorrectCount: '',
    wordIncorrectCount: '',
    isCorrect: '',
    isFalse: 'hidden',
    answer: '',
  }

  componentDidMount(){
    LanguageApiService.getHead()
    .then(head => {
      this.setState({
        head,
        nextWord : head.nextWord,
        wordCorrectCount: head.wordCorrectCount,
        wordIncorrectCount: head.wordIncorrectCount
      })
    })
  }
  

  handleGuessChange = event =>{
    this.setState({
      guess: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    LanguageApiService.postGuess(this.state.guess)
    .then(response =>{
      if(!response.isCorrect){
        this.setState({
          hide:'hidden',
          isFalse: 'visible',
          hidebtn : 'visible'
        })
      }
      else{
        this.setState({
          hide: 'visible',
          isFalse : 'hidden',
          hidebtn: 'visible',
         })
      }
      this.setState({
          answer: response.answer
      })
      
    })
  }
  handleNext = () => {
    LanguageApiService.postGuess(this.state.guess)
    .then(response =>{
      
      this.setState({
          hide: 'hidden',
          hidebtn: 'hidden',
          isFalse: 'hidden',
          nextWord: response.nextWord,
          wordCorrectCount: response.wordCorrectCount,
          wordIncorrectCount: response.wordIncorrectCount,
        })
    })
  }
  
  render() {
    const head = this.state.head
    if(head === undefined){
      return <section>
      <p>Error</p>
    </section>
    }
    return (
      <section>
        <h2 className={this.state.hide}>Correct</h2>
        <h2 className={this.state.isFalse}>The correct answer was: {this.state.answer}</h2>
        <form onSubmit={this.handleSubmit}>
        <div className='box answer'>  
        <h2>{this.state.nextWord}</h2>
        <div className='boxheader flex'>
        <div className='box'>
        <h3>Correct:{this.state.wordCorrectCount}</h3>
        </div>
        <div className='box red'>
        <h3>Incorrect:{this.state.wordIncorrectCount}</h3>
        </div>
        </div>
        
        <div className='boxbody'>
        <input 
        required name='guess'
        value={this.state.guess}
        onChange={this.handleGuessChange} 
        id='guess' 
        type="text" 
        placeholder="Enter Guess">
        </input>
        </div>

        <div className='boxfooter'>
        <button className='btn'>Submit</button>
        </div>
        </div>
        </form>
        <div className='boxfooter'>
        <button className={`btn ${this.state.hidebtn}`} onClick={this.handleNext}>Next</button>
        </div>
      </section>
    );
  }
}

export default LearningRoute
