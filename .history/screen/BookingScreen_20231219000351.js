const handleSeatSelection = (seat) => {
     const index = selectedSeats.findIndex((selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number);
 
     if (index !== -1) {
       setSelectedSeats(selectedSeats.filter((selectedSeat) => !(selectedSeat.row === seat.row && selectedSeat.number === seat.number)));
       setTotalPrice(totalPrice - getPrice(seat.type));
     } else {
       setSelectedSeats([...selectedSeats, seat]);
       setTotalPrice(totalPrice + getPrice(seat.type));
     }
   };
 
   function getPrice(type) {
     switch (type) {
       case 'VIP':
         return 179000;
       case 'Low':
         return 110000;
       default:
         return 139000;
     }
   }
 
   const renderSeats = () => {
     return allSeats.map((seat) => (
       <TouchableOpacity
         key={`${seat.row}${seat.number}`}
         style={[
           styles.seat,
           { backgroundColor: getSeatColor(seat.type) },
           selectedSeats.some((selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number) && styles.selectedSeat,
         ]}
         onPress={() => handleSeatSelection(seat)}
       >
         <Text style={selectedSeats.some((selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number) && styles.xMark}>
           {`${seat.row}${seat.number}`}
           {selectedSeats.some((selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number) && ` - ${getPrice(seat.type)} VND`}
         </Text>
       </TouchableOpacity>
     ));
   };
 