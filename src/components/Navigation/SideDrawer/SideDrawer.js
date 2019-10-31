import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return <Auxiliary>
        <Backdrop
            show={props.open}
            clicked={props.closed} />
        <div
            onClick={props.closed}
            className={attachedClasses.join(' ')}>
            <Logo height='11%' marginBottom='32px' />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </Auxiliary>;
}

export default SideDrawer;