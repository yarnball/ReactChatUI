import React from 'react'
import { questions } from './Data'

class App extends React.Component {
  state = {
    currentAns: '',
    messages: [
          {type:'q', text: 'yiiew'},
    ]
  }
  onChange = (e) =>{
    this.setState({ currentAns: e.target.value  })
  }
  send = () =>{
    const { currentAns, messages } = this.state
    const ans = {type: 'a', text: currentAns}
    this.setState({ messages: [...messages, ans] }, () => this.getNext() )
  }

  getNext = () =>{
    const { messages } = this.state
    const randomNum = Math.floor((Math.random() * 100) + 1)
    const randomQ = questions.filter(e=> e.id === randomNum).pop()
    const q = {type:'q', text:randomQ.text}
    const randomWait = Math.floor((Math.random() * 3000) + 100)
    setTimeout(() => {
        this.setState({ messages:  [...messages, q] })
      }, randomWait)
  }

  render() {
    const { messages } = this.state
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
          <input onChange={this.onChange} type="text" />
          <button onClick={this.send}> go </button>
      </div>
    )
  }
}

export default App;
