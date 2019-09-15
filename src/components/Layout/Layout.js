import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrowerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sidedrowerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        console.log(this.state.showSideDrawer)
        return (
            <Auxiliary>
                <Toolbar 
                    drawerToggleClicked={this.sidedrowerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrowerClosedHandler}/>
                }
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    } 
};

export default Layout;