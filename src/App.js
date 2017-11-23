import React from 'react'
import { questions } from './Data'

// import { ChatFeed, Message, ChatBubbleProps } from 'react-chat-ui'

class App extends React.Component {
  state = {
    currentQ: questions,
    prevQ:[],
    answer:[],
    currentAns:{}
  }
  nextQ = (e, item) =>{
    console.log(e.target.value, item)
    this.setState({ prevQ: [item, ...this.state.prevQ] });
    this.setState({ answer: [this.state.currentAns, ...this.state.answer] });
  }
  onChange = (e) =>{
    console.log('e', e.target.value)
    const ans = {name: e.target.value}
    this.setState({ currentAns: ans });
  }
  render() {
    const { currentQ, prevQ, answer } = this.state
    const numQ = Object.keys(prevQ).length
    return (
      <div>
      #{numQ}
        <br/>
          {answer.map((x, indx) => {
            return (
              <div style={{textAlign:'right'}} key={indx}> {x.name}<br /><br /></div>
            );
          })}
{/*          {prevQ.map((x, indx) => {
            return (
              <div style={{textAlign:'right'}} key={indx}> {x.message}<br /><br /></div>
            );
          })}*/}
          {currentQ.map((x, indx) => {
            return (
              <span>
              <div key={indx}> {x.message}<br/><br/></div>
                <div style={{position:'absolute', bottom:'50%'}}>
                  <input onChange={this.onChange} type="text" />
                  <button onClick={e => this.nextQ(e, x)}>send</button>
                </div>
              </span>
            );
          })[0]}
      </div>
    )
  }
}

export default App;
