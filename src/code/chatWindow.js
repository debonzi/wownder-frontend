import React from 'react';
import '../css/chat.css'


class ChatRoom extends React.Component {

	render() {
		return(
			<div class="row">
		      <div class="col-md-12 chat-side-bar-item">
		        <div class="chat-side-bar-img">
		          <img width="50px" src={this.props.room.thumbnail_url} alt={this.props.room.name} class="img-circle" />
		        </div>
		        <div class="chat-char-name">
		          {this.props.room.name} <span class="badge badge-info">{this.props.room.news}</span>
		        </div>
		        <div class="chat-char-server">
		          {this.props.room.realm}
		        </div>
		      </div>
		    </div>
		)
	}
}


class ChatOwner extends React.Component {

	render() {
		return(
		  <div class="col-md-3 chat-side-bar-header">
		    <div class="row">
		      <div class="col-md-12 chat-side-bar-item">
		        <div class="chat-side-bar-img">
		          <img width="50px" src={this.props.owner.thumbnail_url} alt={this.props.owner.name} class="img-circle" />
		        </div>
		        <div class="chat-char-name">
		          {this.props.owner.name}
		        </div>
		        <div class="chat-char-server">
		          {this.props.owner.realm}
		        </div>
		      </div>
		    </div>
		  </div>
		)
	}
}

class ChatHeader extends React.Component {

	render() {
		return(
		  <div class="col-md-9 chat-area-header">
		    <div class="row">
		      <div class="col-md-12 chat-side-bar-item">
		        <div class="chat-side-bar-img">
		          <img width="50px" src={this.props.room.thumbnail_url} alt={this.props.room.name} class="img-circle" />
		        </div>
		        <div class="chat-char-name-top-area">
		          {this.props.room.name} <span class="chat-char-class-top-area"> ({this.props.room.race} {this.props.room.class}) </span>
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
		    <div class="row">
		      <div class="col-md-1">
		        <img width="50px" src={this.props.sender.thumbnail_url} alt={this.props.sender.name} class="img-circle" />
		      </div>

		      <div class="col-md-11 bubble-chat" >
		        <div class="panel panel-default">
		          <div class="panel-body">
					{this.props.message.message}
		          </div>
		        </div>
		      </div>
		    </div>
		)
	}
}

class MessageReceived extends React.Component {

	render() {
		return(
		    <div class="row">
		      <div class="col-md-11 bubble-chat">
		        <div class="panel panel-default">
		          <div class="panel-body">
					{this.props.message.message}
		          </div>
		        </div>
		      </div>
		      <div class="col-md-1 bubble-pic-right">
		        <img width="50px" src={this.props.receiver.thumbnail_url} alt={this.props.receiver.name} class="img-circle" />
		      </div>
		    </div>
		)
	}
}


class ChatArea extends React.Component {

	buildConversation() {
		return(
			this.props.conversation.map((message) => {
			if (message.type === 'sent') {
				return <MessageSent sender={this.props.owner} message={message} />
			}
			// else if (message.type === 'received') {
			return <MessageReceived receiver={this.props.room} message={message} />
			// }
			})
		)
	}

	render() {
		return(
			<div class="col-md-9 chat-area">
				{this.buildConversation()}
		    </div>
		)
	}
}

class  ChatInput extends React.Component {

	render() {
		return(
		<div>
		  <div class="col-md-8 chat-msg">
		    <input type="text" class="form-control chat-input-msg" id="exampleInputEmail1" placeholder="Message..." />
		  </div>
		  <div class="col-md-1 chat-msg">
		    <button type="button" class="btn btn-primary" style={{'width': '100%', 'border-radius': '0'}}>
		      <span class="glyphicon glyphicon-send"></span>
		    </button>
		  </div>
		 </div>
		)
	}
}

// class  extends React.Component {

// 	render() {
// 		return(

// 		)
// 	}
// }


class Mock {
	constructor() {
		this.chatOwnerData = {
			name: 'Daemeris',
			thumbnail_url: 'https://render-us.worldofwarcraft.com/character/nemesis/73/149361225-avatar.jpg?alt=wow/static/images/2d/avatar/10-1.jpg',
			realm: 'Nemesis'
		}
		this.chatRooms = [
			{
				name: 'Boohmy',
				thumbnail_url: 'https://render-us.worldofwarcraft.com/character/nemesis/140/141278860-avatar.jpg?alt=wow/static/images/2d/avatar/8-0.jpg',
				realm: 'Nemesis',
				class: 'Druid',
				race: 'Troll',
				news: 3
			},
			{
				name: 'Tarelyon',
				thumbnail_url: 'https://render-us.worldofwarcraft.com/character/nemesis/91/163981147-avatar.jpg?alt=wow/static/images/2d/avatar/10-0.jpg',
				realm: 'Nemesis',
				class: 'Paladin',
				race: 'Blood Elf',
				news: 1
			},
			{
				name: 'Taurium',
				thumbnail_url: 'https://render-us.worldofwarcraft.com/character/tichondrius/224/166141664-avatar.jpg?alt=wow/static/images/2d/avatar/6-0.jpg',
				realm: 'Tichondrius',
				class: 'Warrior',
				race: 'Tauren',
				news: 8
			},
		]
		this.activeRoomMsgs = [
			{
				type: 'sent',
				message: 'These questions to ask a guy or girl over text are great because chatting with someone over text is a lot different from talking with them in person. So a lot of conversation questions just don’t quite work in a medium that begs for short responses. No long detailed stories. Nothing too deep or heavy. And forget anything too emotionally loaded unless you are an emoji master.'
			},
			{
				type: 'sent',
				message: 'So I’ve put together this list of questions that work a lot better with a phone in hand and access to the internet. Lots of short back and forth answers that are pretty light. Plus questions that focus the conversation on something that can be easily shared while texting, like photos, videos, websites, etc.'
			},
			{
				type: 'received',
				message: 'If you are stuck thinking of questions to ask a guy or girl over text or you just need some ideas to build on we’ve got you covered. Take a look and enjoy! I’m sure you’ll find some of them really useful!'
			},
			{
				type: 'sent',
				message: 'A great way to get a good laugh and have something common to talk about, both now and in the future. Plus you get to see how much their sense of humor matches yours. And if you’ve got some great funny videos tucked away, you can share some of them.'
			},
			{
				type: 'received',
				message: 'If you know the place and like it, you can talk about how good it is. If you don’t know it, give it a shot and you’ll have something to talk about next time you text them!'
			},
			{
				type: 'received',
				message: 'Great for getting to know their musical taste and seeing how well it matches up with your own. Plus everyone is passionate about the music they love and chances are they will be more than happy to talk a lot about it.'
			},
		]
	}
}

class ChatWindow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			owner: {},
			rooms: [],
			active_room: {},
			conversation: []
		}
	}

	componentDidMount() {
		var mock = new Mock();
		this.setState(
			{
				owner: mock.chatOwnerData,
				rooms: mock.chatRooms.map((room) => {
					return <ChatRoom room={room} />
				}),
				active_room: mock.chatRooms[0],
				conversation: mock.activeRoomMsgs
			}
		)
	}


	render() {
		console.log('RENDER', this.state.conversation)
	  return(
		<div>
			<div class="row">
				<ChatOwner owner={this.state.owner }/>
			    <ChatHeader room={this.state.active_room}/>
			</div>
		<div class="row">
		  <div class="col-md-3 chat-side-bar">
			{this.state.rooms}
		  </div>
			<ChatArea owner={this.state.owner} room={this.state.active_room} conversation={this.state.conversation} />
			<ChatInput />
		</div>

		</div>
        )
	}
}




export default ChatWindow;