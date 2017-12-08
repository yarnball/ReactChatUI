import React from 'react'
import { 
  // randomLatin, 
  carChoose 
} from './Query/GetQuestions'

class App extends React.Component {
  state = {
    currentAns: '',
    isTyping: false,
    messages: [
          {type:'q', text: 'Tell me a car band, I will tell you a model'},
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
    // nextQ = foodChoice(currentAns)
    // console.log("nex", nextQ)
    // ONLY use this on promise- it waits for the endpoint to resolve
    carChoose(currentAns)
    .then((res) => {
      nextQ = {type: 'q', text: res}
    })
    .then(() => this.setState({ isTyping: false, messages:  [...messages, nextQ] }))
    // const randomWait = Math.floor((Math.random() * 2200) + 100)
    // setTimeout(() => {
    //     this.setState({ isTyping: false, messages:  [...messages, nextQ] }),
    //     console.log('ne', nextQ)
    //   }, randomWait)
  }

  render() {
    const { messages, currentAns, isTyping } = this.state
    console.log('messages', messages)
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
