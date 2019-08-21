import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Async Storage'])

import Routes from './routes';

const App = () => <Routes></Routes>
export default App;