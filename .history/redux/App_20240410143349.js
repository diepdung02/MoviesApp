// App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import BookingScreen from './BookingScreen'; // Import your BookingScreen component

const App = () => (
  <Provider store={store}>
    <BookingScreen />
  </Provider>
);

export default App;
