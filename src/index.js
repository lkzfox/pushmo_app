import React from 'react';
import { YellowBox } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import REDUCERS from './reducers';

YellowBox.ignoreWarnings(['Async Storage'])

import Routes from './routes';

const App = () => {
    return (
        <Provider store={createStore(REDUCERS)}>
            <Routes />
        </Provider>
    );
}
export default App;