// reducers.js
import { SET_BOOKED_SEATS, SET_SELECTED_SHOWTIME } from './actionTypes';

const initialState = {
  bookedSeats: [],
  selectedShowtime: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKED_SEATS:
      return {
        ...state,
        bookedSeats: action.payload,
      };
    case SET_SELECTED_SHOWTIME:
      return {
        ...state,
        selectedShowtime: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
