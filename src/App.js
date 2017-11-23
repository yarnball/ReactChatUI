import React from 'react'
import { questions } from './Data'

// import { ChatFeed, Message, ChatBubbleProps } from 'react-chat-ui'

class App extends React.Component {
  state = {
    prevQ:[],
    currentQ: questions,
    answer:[]
  }
  nextQ = (e, item) =>{
    console.log(item)
    this.setState({ prevQ: [item, ...this.state.prevQ] });
  }
  render() {
    const { currentQ, prevQ } = this.state
    const numQ = Object.keys(prevQ).length
    return (
      <div>
      #{numQ}
        <br/>
          {prevQ.map((x, indx) => {
            return (
              <div style={{textAlign:'right'}} key={indx}> {x.message}<br /><br /></div>
            );
          })}
          {currentQ.map((x, indx) => {
            return (
              <span>
              <div key={indx}> {x.message}<br/><br/></div>
                <div style={{position:'absolute', bottom:'50%'}}><input type="text" />
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
