import React, { Component } from 'react'
import { Link } from 'react-router'
import functional from 'react-functional'
import Modal from 'boron/OutlineModal'

const modalStyle = {
    width: 'inherit'
};

class Items extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(props) {
    this.props.fetchItems(this.props.params.partnerId)
  }
  showModal() {
    this.refs.modal.show();
  }
  hideModal() {
    this.refs.modal.hide();
  }
  initiateTransaction(item){
    //set user id until auth is finished
    const user_id = 13;
    this.props.initiateTransaction({'group_id': item.id, 'user_id': user_id});
  }
  renderItemDetails(item) {
    return (
      <div>
        <h1>{item.name}</h1>
        <p>{`${item.zlato_amount} Zlato`}</p>
        <p>{`${item.num_available} left`}</p>
      </div>
    );
  }
  render() {
    return (
      <ul style={{ margin: '0 auto' }} >
        {this.props.items.map(item => 
          <li className='btn btn-default' onClick={this.showModal.bind(this)}>
            {this.renderItemDetails(item)}
            <Modal ref="modal" modalStyle={modalStyle}>
              <div className='btn btn-default'>
                {this.renderItemDetails(item)}
                <button onClick={this.initiateTransaction.bind(this)}>Purchase</button>
                <button onClick={this.hideModal.bind(this)}>Cancel</button>
              </div>
            </Modal>            
          </li>
        )}
      </ul>
    );
  }
}

export default Items
