import React from 'react';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Auxiliary>
        <Backdrop 
            clicked={props.modalClosed}
            show={props.showModal} />
        <div
            className={classes.Modal}
            style={{
                transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.showModal ? '1': '0'
            }}>
            {props.children}
        </div>
    </Auxiliary>
);

export default modal;