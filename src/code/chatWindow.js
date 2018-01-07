import React from 'react';
import '../css/chat.css'


class ChatRoom extends React.Component {
  handleClick = () => {
    this.props.roomSwitch(this.props.room);
  }

  news_badge = () => {
	if (this.props.room.news) {
		return <span className="badge badge-info">{this.props.room.news}</span>
		}
	else {
		return ''
		}
	}

  render() {
	return(
	<div role="button" onClick={this.handleClick} className="row">
      <div className="col-md-12 chat-side-bar-item">
        <div className="chat-side-bar-img">
          <img width="50px" src={this.props.room.recipient.thumbnail_url} alt={this.props.room.recipient.name} className="img-circle" />
        </div>
        <div className="chat-char-name">
          {this.props.room.recipient.name} {this.news_badge()}
        </div>
        <div className="chat-char-server">
          {this.props.room.recipient.realm}
        </div>
      </div>
    </div>
  	)
  }
}


class ChatOwnerChooserItem extends React.Component {
	handleClick = () => {
	    this.props.charSwitch(this.props.char);
	}

	render() {
		return(
		    <div role="button" onClick={this.handleClick} className="row">
		      <div className="col-md-12 chat-side-bar-item">
		        <div className="chat-side-bar-img">
		          <img width="50px" src={this.props.char.thumbnail_url} alt={this.props.char.name} className="img-circle" />
		        </div>
		        <div className="chat-char-name">
		          {this.props.char.name}
		        </div>
		        <div className="chat-char-server">
		          {this.props.char.realm}
		        </div>
		      </div>
		    </div>
		)
	}
}


class ChatOwner extends React.Component {
	chooser = () => {
		return this.props.chars.map((char) => {
			return <ChatOwnerChooserItem char={char} charSwitch={this.props.charSwitch} />
		})
	}

	render() {
		return(
		  <div className="col-md-3 chat-side-bar-header chat-dropdown">
		    <div className="row">
		      <div className="col-md-12 chat-side-bar-item">
		        <div className="chat-side-bar-img">
		          <img width="50px" src={this.props.owner.thumbnail_url} alt={this.props.owner.name} className="img-circle" />
		        </div>
		        <div className="chat-char-name">
		          {this.props.owner.name}
		        </div>
		        <div className="chat-char-server">
		          {this.props.owner.realm}
		        </div>
		      </div>
		    </div>
		    <div className="chat-dropdown-content">
				{this.chooser()}
		    </div>
		  </div>
		)
	}
}

class ChatHeader extends React.Component {

	render() {
		if (!this.props.room.recipient) {
			return (
			  <div className="col-md-9 chat-area-header">
			  </div>
				)
		}
		return(
		  <div className="col-md-9 chat-area-header">
		    <div className="row">
		      <div className="col-md-12 chat-side-bar-item">
		        <div className="chat-side-bar-img">
		          <img width="50px" src={this.props.room.recipient.thumbnail_url} alt={this.props.room.recipient.name} className="img-circle" />
		        </div>
		        <div className="chat-char-name-top-area">
		          {this.props.room.recipient.name} <span className="chat-char-class-top-area"> ({this.props.room.recipient.race} {this.props.room.recipient.class}) </span>
		        </div>
		      </div>
		    </div>
		  </div>

		)
	}
}

class MessageSent extends React.Component {

	render() {
		return(
		    <div className="row">
		      <div className="col-md-11 bubble-chat" >
		        <div className="panel panel-default">
		          <div className="panel-body">
					{this.props.message.message}
		          </div>
		        </div>
		      </div>
		      <div className="col-md-1">
		        <img width="50px" src={this.props.sender.thumbnail_url} alt={this.props.sender.name} className="img-circle" />
		      </div>
		    </div>
		)
	}
}

class MessageReceived extends React.Component {

	render() {
		return(
		    <div className="row">
		      <div className="col-md-1 bubble-pic-right">
		        <img width="50px" src={this.props.receiver.thumbnail_url} alt={this.props.receiver.name} className="img-circle" />
		      </div>
		      <div className="col-md-11 bubble-chat">
		        <div className="panel panel-default">
		          <div className="panel-body">
					{this.props.message.message}
		          </div>
		        </div>
		      </div>
		    </div>
		)
	}
}


class ChatArea extends React.Component {
	constructor(props) {
		super(props)
		this.read = []
	}

	buildConversation() {
		this.read = []
		return(
			this.props.conversation.map((message) => {
			if (message.type === 'sent') {
				return <MessageSent key={message.id} sender={this.props.owner} message={message} />
			}
			//received
			if (!message.read) {
				this.read.push(message.id)
			}
			return <MessageReceived key={message.id} receiver={this.props.room.recipient} message={message} />
			})
		)
	}

	scrollToBottom = () => {
	  this.messagesEnd.scrollIntoView();
	}

	componentDidMount() {
	  this.scrollToBottom();
	}

	componentDidUpdate() {
	  this.scrollToBottom();
	}

	markReadMsgs = () => {
		if (!this.read.length) {
			return
		}
	    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.owner.uuid + '/chat/rooms/' + this.props.room.id + '/messages'
	    fetch(endpoint, {
	      credentials: 'include',
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({'ids': this.read})
	    }).then(results => {
	      return results.json()
	    })
	}

	render() {
		let conversation = this.buildConversation()
		this.markReadMsgs()
		return(
			<div className="col-md-9 chat-area">
				{conversation}
				<div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
		    </div>
		)
	}
}

class  ChatInput extends React.Component {
	constructor(props) {
		super(props)

		this.state = {message: ''}

		this.handleMessage = this.handleMessage.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.dispatchMessage = this.dispatchMessage.bind(this)
	}


	handleMessage(event) {
		this.setState({message: event.target.value})
	}

	handleKeyPress(e) {
	    if (e.key === 'Enter') {
	    	this.dispatchMessage()  
	    }
	  }

	dispatchMessage() {
		if (!this.state.message){
			return
		}
		this.props.dispacher(this.state.message, this.props.room)
		this.setState({message: ''})
	}

	componentDidMount(){
 	  this.inputText.focus(); 
	}

	render() {
		return(
		<div>
		    <div className="col-md-8 chat-msg">
		      <input type="text" onChange={this.handleMessage} onKeyPress={this.handleKeyPress} ref={(input) => { this.inputText = input; }} value={this.state.message} className="form-control chat-input-msg" id="exampleInputEmail1" placeholder="Message..." />
		    </div>
		    <div className="col-md-1 chat-msg">
		      <button onClick={this.dispatchMessage} type="button" className="btn btn-primary" style={{'width': '100%', 'borderRadius': '0'}}>
		        <span className="glyphicon glyphicon-send"></span>
		      </button>
		    </div>
		 </div>
		)
	}
}



class ChatWindow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			owner: {},
			chars: [],
			rooms: [],
			active_room: {},
			conversation: []
		}
		this.sendMessage = this.sendMessage.bind(this)
		this.switchChatRoom  = this.switchChatRoom.bind(this)
		this.switchChar = this.switchChar.bind(this)
	}

	runUpdates = () => {
		this.updateRooms(this.state.owner)
		this.updateConversation(this.state.active_room)
	}

	componentDidMount() {
		this.fetchAndSetOwner()
		this.fetchAndSetUserChars()
		this.timerID = setInterval(
	      () => this.runUpdates(),
	      5000
	    );
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	fetchAndSetOwner = () => {
		let endpoint = process.env.REACT_APP_API_URI + '/api/chars/chat-king'
	    fetch(endpoint, {credentials: 'include'})
	    .then(results => {
	      return results.json()
	    })
	    .then(data => {
	      this.setState({owner: data})
	      this.fetchAndSetRooms(data.uuid)
	    })
	}

	fetchAndSetRooms = (char_uuid) => {
		let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + char_uuid + '/chat/rooms'
	    fetch(endpoint, {credentials: 'include'})
	    .then(results => {
	      return results.json()
	    })
		.then(_rooms => {
			let rooms = _rooms.map((room) => {
		      	return <ChatRoom roomSwitch={this.switchChatRoom} key={room.id} room={room} />
	    	})
	        this.setState({rooms})
	        if (_rooms.length > 0) {
				this.switchChatRoom(_rooms[0])
	        }
	    })
	}

	switchChatRoom(room) {
		this.fetchAndSetActiveRoom(room)
	}


	fetchAndSetActiveRoom = (room) => {
		let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + room.owner_id + '/chat/rooms/' + room.id
	    fetch(endpoint, {credentials: 'include'})
	    .then(results => {
	      return results.json()
	    })
	    .then(data => {
			this.setState({
				active_room: room,
				conversation: data.conversation
			})
	    })
	}

	fetchAndSetUserChars = () => {
		let endpoint = process.env.REACT_APP_API_URI + '/api/chars'
	    fetch(endpoint, {credentials: 'include'})
	    .then(results => {
	      return results.json()
	    })
	    .then(chars => {
			this.setState({chars})
	    })
	}

	updateRooms = (owner) => {
		if (!owner.uuid) {
			return
		}
		let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + owner.uuid + '/chat/rooms'
	    fetch(endpoint, {credentials: 'include'})
	    .then(results => {
	      return results.json()
	    })
	    .then(data => {
			let rooms = data.map((room) => {
				return <ChatRoom roomSwitch={this.switchChatRoom} key={room.id} room={room} />
	    	})
	        this.setState({rooms})
	        if (data.length > 0 && Object.keys(this.state.active_room).length === 0) {
				this.switchChatRoom(data[0])
	        }

	    })
	}

	updateConversation = (room) => {
		if (!room.owner_id) {
			return
		}
		let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + room.owner_id + '/chat/rooms/' + room.id
	    fetch(endpoint, {credentials: 'include'})
	    .then(results => {
	      return results.json()
	    })
	    .then(data => {
			this.setState({
				conversation: data.conversation
			})
	    })
	}


	sendMessage(message, room) {
	    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.state.owner.uuid + '/chat/rooms/' + room.id
	    fetch(endpoint, {
	      credentials: 'include',
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({'message': message})
	    }).then(results => {
			this.updateConversation(room)
			return results.json()
	    })
	}

	switchChar(owner) {
		this.setState({owner, rooms: [], conversation: [], active_room: {}})
		this.updateRooms(owner)
	}

	render() {
	  return(
		<div className="chat-container">
			<div className="row">
				<ChatOwner owner={this.state.owner } chars={this.state.chars} charSwitch={this.switchChar} />
			    <ChatHeader room={this.state.active_room}/>
			</div>
		<div className="row">
		  <div className="col-md-3 chat-side-bar">
			{this.state.rooms}
		  </div>
			<ChatArea owner={this.state.owner} room={this.state.active_room} conversation={this.state.conversation} />
			<ChatInput dispacher={this.sendMessage} room={this.state.active_room} />
		</div>

		</div>
        )
	}
}




export default ChatWindow;