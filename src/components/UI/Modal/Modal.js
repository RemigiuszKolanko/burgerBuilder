import React, {Component} from 'react';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component {

    shouldComponentUpdate(nextProps, _) {
        return nextProps.showModal !== this.props.showModal || nextProps.loading !== this.props.loading;
    }

    render() {
        return (<Auxiliary>
            <Backdrop 
                clicked={this.props.modalClosed}
                show={this.props.showModal} />
            <div
                className={classes.Modal}
                style={{
                    transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.showModal ? '1': '0'
                }}>
                {this.props.children}
            </div>
        </Auxiliary>);
    }
    
};

export default Modal;