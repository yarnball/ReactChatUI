import React from 'react'
import { 
  // randomLatin, 
  carChoose 
} from './Query/GetQuestions'
import './App.css'
import jsonLogic from 'json-logic-js'
import dotty from 'dotty'

class App extends React.Component {
  state = {
    currentAns: '',
    isTyping: false,
    messages: [
          {type:'q', text: 'Tell me a car band, I will tell you a model'},
    ]
  }
  testPost = (e) =>{
    return fetch(
          // post deleted item to archive DB
           'http://localhost:3005/quotes', {
           method: 'POST',
           // mode: 'no-cors',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({test:'genius'})
           }).catch((err) => console.error(err)).then(() => console.log('allG'))
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
  testLogic = () => {
    const cakeData = [{ "temp" : 100, "pies" : [{ "filling" : "apple","score":12 }, { "filling" : "cherry","score":12 }]}, { "temp" : 90, "pies" : [{ "filling" : "lemon","score":12 }, { "filling" : "orange","score":12 }]}]
    return cakeData.map((itm, indx) => {
       jsonLogic.add_operation('var_search', function(key){
          return dotty.search(this, key); //In custom operations "this" is bound to data
       });
       var rules = { "and" : [
          {"<" : [ { "var" : "temp" }, 110 ]},
          {"in" : ["cherry", { "var_search" : "pies.*.filling" } ] },
          // {"in" : [10, { ">" : "pies.*.score" } ]}
        ] };
        return jsonLogic.apply(rules, itm) ? itm : null;
    })
  }

  render() {
    const { messages, currentAns, isTyping } = this.state
    console.log('logic', this.testLogic())

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
          <button onClick={this.testPost}> test</button>
          {isTyping && <div className="message from" > . . . </div>}
          </div>

          <form onSubmit={this.send}><input onChange={this.onChange} value={currentAns} type="text" /></form>
      </div>
    )
  }
}

export default App;
