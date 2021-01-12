import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'

class DashboardRoute extends Component {
  state = { 
    language : {}
  }
  
  componentDidMount(){
    LanguageApiService.getLanguage()
    .then(language => {
      this.setState({language})
    })

  }
  handleClick = () => {
    this.props.history.push('/learn')
  }
  
  getWords = () => {
    const words = this.state.language.words
    if(words === undefined){
      return <li>Error</li>
    }
    return(words).map((word,index)=>{
      return <div key={index} className='box words'>
        <div className='boxheader'>
        <div className='boxtitle'>  
        <h3>{word.original}</h3>
        </div>
        </div>
        <div className='boxbody'>
        <p>Correct guesses: {word.correct_count}</p>
        <p>Incorrect guesses: {word.incorrect_count}</p>
        </div>
      </div>
    })
    }

  render() {
    const {language} = this.state.language
    if(language === undefined){
      return(<section>
        <p>Error</p>
      </section>)
    }
    return (
      <section>
        
        <h2>{language.name}</h2>
        <div className='boxheader'>
        <h3 className='boxtitle'>Total Score: {language.total_score}</h3>
        </div>
        <div className='allWords'>
          {this.getWords()}
        </div>
        <div className='boxfooter'>
          <button onClick={this.handleClick} className='btn'>Start Learning</button>
        </div>
      </section>
    );
  }
}

export default DashboardRoute
