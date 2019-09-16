import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBulider from './containers/BurgerBuilder/BurgerBuilder';

function App() {
    return (
        <Layout>
            <BurgerBulider/>
        </Layout>
    );
}

export default App;
