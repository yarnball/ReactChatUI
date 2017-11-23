import React from 'react'
import { questions } from './Data'

class App extends React.Component {
  state = {
    currentAns: '',
    isTyping: false,
    messages: [
          {type:'q', text: 'Want me to speak latin?'},
    ]
  }
  onChange = (e) =>{
    this.setState({ currentAns: e.target.value  })
  }
  send = e =>{
    e.preventDefault()
    const { currentAns, messages } = this.state
    const ans = {type: 'a', text: currentAns}
    this.setState({ currentAns:'', messages: [...messages, ans] }, () => this.getNext() )
  }

  getNext = () =>{
     this.setState({ isTyping: true })
    const { messages } = this.state
    const randomNum = Math.floor((Math.random() * 100) + 1)
    const randomQ = questions.filter(e=> e.id === randomNum).pop()
    const q = {type:'q', text:randomQ.text}
    const randomWait = Math.floor((Math.random() * 2200) + 100)
    setTimeout(() => {
        this.setState({ isTyping: false, messages:  [...messages, q] })
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
