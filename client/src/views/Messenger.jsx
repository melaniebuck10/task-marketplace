import React, { Component } from 'react';
import { loadMessages } from '../services/messenger';

export class Messenger extends Component {
  state = {
    messages: ''
  };

  async componentDidMount() {
    const messages = await loadMessages();
    console.log('message: ', messages);
    this.setState({ messages: messages.data.text });
  }
  render() {
    return <div>{this.state.messages}</div>;
  }
}

export default Messenger;
