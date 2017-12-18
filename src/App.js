import React from 'react'
import { 
  // randomLatin, 
  carChoose 
} from './Query/GetQuestions'
import './App.css'

class App extends React.Component {
  state = {
    currentAns: '',
    isTyping: false,
    messages: [
          {type:'q', text: 'Tell me a car band, I will tell you a model'},
    ]
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // dummy div created
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
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
      <header><span className="left">Messages</span><b style={{color:'black'}}>CarSelect</b><span className="right">Contact</span></header>
<div className="messages-wrapper">
          {messages.map((x, indx) => {
            return (
              <span className="messageBody" key={indx}>
              {x.type === 'q' && <div className="message from" > {x.text}</div>}
              {x.type === 'a' && <div className="message to" > {x.text} </div>}

              <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
              
              </span>
            );
          })}
          
          {isTyping && <div className="message from" > . . . </div>}
          </div>

          <form onSubmit={this.send}><input onChange={this.onChange} value={currentAns} type="text" /></form>
      </div>
    )
  }
}

export default App;
