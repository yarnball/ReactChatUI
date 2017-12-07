import React from 'react'
import { randomLatin, randomWiki } from './Query/GetQuestions'

class App extends React.Component {
  state = {
    currentAns: '',
    isTyping: false,
    messages: [
          {type:'q', text: 'What ingredients do you have?'},
    ]
  }
  onChange = (e) =>{
    this.setState({ currentAns: e.target.value  })
  }
  send = e =>{
    e.preventDefault()
    const { currentAns, messages } = this.state
    const ans = {type: 'a', text: currentAns}
    this.setState({ isTyping: true })
    this.setState({ currentAns:'', messages: [...messages, ans] }, 
      () => this.getNext(currentAns)
    )
  }

  getNext = currentAns =>{
    const { messages } = this.state
    let nextQ = {}
    nextQ = randomLatin(currentAns)
    // ONLY use this on promise- it waits for the endpoint to resolve
    // randomWiki(currentAns).then((res) => {
    //   nextQ = res
    // })
    const randomWait = Math.floor((Math.random() * 2200) + 100)
    setTimeout(() => {
        this.setState({ isTyping: false, messages:  [...messages, nextQ] })
      }, randomWait)
  }

  render() {
    const { messages, currentAns, isTyping } = this.state
    return (
      <div>
          {messages.map((x, indx) => {
            return (
              <div key={indx}>
              {x.type === 'q' && <div style={{textAlign:'left'}} > {x.text}<br /><br /></div>}
              {x.type === 'a' && <div style={{textAlign:'right'}} > {x.text}<br /><br /></div>}
              </div>
            );
          })}
          {isTyping && <div style={{textAlign:'left'}} > . . .<br /><br /></div>}
          <form onSubmit={this.send}><input onChange={this.onChange} value={currentAns} type="text" /></form>
      </div>
    )
  }
}

export default App;
