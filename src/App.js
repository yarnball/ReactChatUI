import React from 'react'
import { questions } from './Data'

// import { ChatFeed, Message, ChatBubbleProps } from 'react-chat-ui'

class App extends React.Component {
  state = {
    currentQ: questions,
    prevQ:[],
    answer:[]
  }
  nextQ = (e) =>{
    console.log(e)
    // this.setState({ prevQ: [item, ...this.state.currentQ] });
  }
  render() {
    const { currentQ, prevQ } = this.state
    return (
      <div>
        {prevQ.map((x, indx) => {
          return (
            <div key={indx}> {x.message}<br /><br /></div>
          );
        })}
        {currentQ.map((x, indx) => {
          return (
            <span>
            <div key={indx}> {x.message}<br/><br/></div>
            <button onClick={this.nextQ(x)}>send</button>
            </span>
          );
        })[0]}
        <input type="text" />
        
      </div>
    )
  }
}

export default App;
