import React from 'react';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    color                 : 'black',
  },
  overlay: {
    backgroundColor: 'black',
    opacity: 0.5
  }
};

class LoktarLoading extends React.Component {

  render() {
    return (
    <Modal
      isOpen={this.props.isLoading}
      style={customStyles}
      ariaHideApp={false}
    >
      <h1>Lok'tar Ogar!!!</h1>
      <p>Loading....</p>
    </Modal>
  )}
}

export default LoktarLoading


