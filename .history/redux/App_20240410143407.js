// App.js

import React from 'react';
import { Provider } from 'react-redux';
import  // Import your Redux store
import { BookingScreen } from '../screen'; // Import your BookingScreen component

const App = () => (
  <Provider store={store}>
    <BookingScreen />
  </Provider>
);

export default App;
