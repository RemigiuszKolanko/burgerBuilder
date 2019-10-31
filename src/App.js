import React, {Component} from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBulider from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

    render() {
        return (
            <Layout>
                <BurgerBulider/>
                <Checkout />
            </Layout>
        );
    }
    
}

export default App;
