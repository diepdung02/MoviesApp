// actions.js
import { SET_BOOKED_SEATS, SET_SELECTED_SHOWTIME } from './actionTypes';

export const setBookedSeats = (bookedSeats) => ({
  type: SET_BOOKED_SEATS,
  payload: bookedSeats,
});

export const setSelectedShowtime = (showtime) => ({
  type: SET_SELECTED_SHOWTIME,
  payload: showtime,
});
