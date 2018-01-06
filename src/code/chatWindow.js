import React from 'react';
import '../css/chat.css'

class ChatWindow extends React.Component {

	render() {
	  return(

<div>

<div class="row">
  <div class="col-md-3 chat-side-bar-header">

    <div class="row">
      <div class="col-md-12 chat-side-bar-item">
        <div class="chat-side-bar-img">
          <img width="50px" src="https://render-us.worldofwarcraft.com/character/nemesis/73/149361225-avatar.jpg?alt=wow/static/images/2d/avatar/10-1.jpg" alt="Daemeris" class="img-circle" />
        </div>
        <div class="chat-char-name">
          Daemeris
        </div>
        <div class="chat-char-server">
          Nemesis
        </div>
      </div>
    </div>

  </div>


  <div class="col-md-9 chat-area-header">

    <div class="row">
      <div class="col-md-12 chat-side-bar-item">
        <div class="chat-side-bar-img">
          <img width="50px" src="https://render-us.worldofwarcraft.com/character/nemesis/73/149361225-avatar.jpg?alt=wow/static/images/2d/avatar/10-1.jpg" alt="Daemeris" class="img-circle" />
        </div>
        <div class="chat-char-name-top-area">
          Daemeris <span class="chat-char-class-top-area"> (Blood Elf Rogue) </span>
        </div>
      </div>
    </div>

  </div>


</div>





<div class="row">



  <div class="col-md-3 chat-side-bar">
    

    <div class="row">
      <div class="col-md-12 chat-side-bar-item">
        <div class="chat-side-bar-img">
          <img width="50px" src="https://render-us.worldofwarcraft.com/character/nemesis/73/149361225-avatar.jpg?alt=wow/static/images/2d/avatar/10-1.jpg" alt="Daemeris" class="img-circle" />
        </div>
        <div class="chat-char-name">
          Daemeris <span class="badge badge-info">3</span>
        </div>
        <div class="chat-char-server">
          Nemesis
        </div>
      </div>
    </div>
  

  </div>
  


  <div class="col-md-9 chat-area">

    <div class="row">
      <div class="col-md-1">
        <img width="50px" src="https://render-us.worldofwarcraft.com/character/nemesis/73/149361225-avatar.jpg?alt=wow/static/images/2d/avatar/10-1.jpg" alt="Daemeris" class="img-circle" />
      </div>

      <div class="col-md-11 bubble-chat" >
        <div class="panel panel-default">
          <div class="panel-body">
            dotted - Defines a dotted border
            dashed - Defines a dashed border
            solid - Defines a solid border
            double - Defines a double border
            groove - Defines a 3D grooved border. The effect depends on the border-color value
            ridge - Defines a 3D ridged border. The effect depends on the border-color value
            inset - Defines a 3D inset border. The effect depends on the border-color value
            outset - Defines a 3D outset border. The effect depends on the border-color value
            none - Defines no border
            hidden - Defines a hidden border
          </div>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-md-11 bubble-chat">
        <div class="panel panel-default">
          <div class="panel-body">
            All Right!!
          </div>
        </div>
      </div>

      <div class="col-md-1 bubble-pic-right">
        <img width="50px" src="https://render-us.worldofwarcraft.com/character/nemesis/73/149361225-avatar.jpg?alt=wow/static/images/2d/avatar/10-1.jpg" alt="Daemeris" class="img-circle" />
      </div>


    </div>
  </div>
  <div class="col-md-8 chat-msg">
    <input type="email" class="form-control chat-input-msg" id="exampleInputEmail1" placeholder="Message..." />
  </div>
  <div class="col-md-1 chat-msg">
    <button type="button" class="btn btn-primary" style={{'width': '100%', 'border-radius': '0'}}>
      <span class="glyphicon glyphicon-send"></span>
    </button>
  </div>


</div>			

</div>
        )
	}
}


export default ChatWindow;