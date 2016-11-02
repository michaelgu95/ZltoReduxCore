import React, { Component } from 'react';
import { Link } from 'react-router';
import functional from 'react-functional';
import Modal from 'boron/DropModal';
import _ from 'lodash';
import Spinner from 'react-spinkit';

const modalStyle = {
    width: 'inherit',
    height: 'inherit'
};

export function Item({item}) {
  return (
    <div>
      <h1>{item.name}</h1>
      <p>{`${item.zlato_amount} Zlato`}</p>
      <p>{`${item.num_available} left`}</p>
    </div>
  );
}

class Items extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(props) {
    this.props.fetchItems(this.props.params.partnerId)
  }
  componentWillReceiveProps(nextProps) {
    const { transactionResponse } = nextProps;
    this.transactionResponse = transactionResponse;
    setTimeout(() => this.setState({isTransacting: false}), 2000);
  }
  showModal() {
    this.refs.modal.show();
  }
  hideModal() {
    this.transactionResponse = null;
    this.refs.modal.hide();
  }
  initiateTransaction(item){
    //set user id until auth is finished
    const userId = 13;
    this.props.initiateTransaction(item.id, userId);
    this.setState({isTransacting: true});
  }
  render() {
    return (
      <ul style={{ margin: '0 auto' }} >
        {this.props.items.map(item => 
          <li className='btn btn-default' onClick={this.showModal.bind(this)}>
            <Item item={item}/>
            <Modal ref="modal" modalStyle={modalStyle}>
             <div className='btn btn-default'>
              <Item item={item}/>
              {this.state && this.state.isTransacting ? 
                <Spinner spinnerName='circle'></Spinner> 
                : 
                <div>
                  <button onClick={() => this.initiateTransaction(item)}>Purchase</button>
                  <button onClick={this.hideModal.bind(this)}>Cancel</button>
                  {this.transactionResponse ? <h1>{this.transactionResponse.status}</h1> : null}
                </div>
              }
              </div>
            </Modal>            
          </li>
        )}
      </ul>
    );
  }
}

export default Items
