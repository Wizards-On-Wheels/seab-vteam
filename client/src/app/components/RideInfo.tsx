import React from "react";


type RideHistoryProps = {
  rideHistory: { title: string; date: string; Price: number }[];
};

    
const RideProfile: React.FC<RideHistoryProps> = ({ rideHistory }) => {
    
    //funktion for calculating total amount spent on the app
    const calculateTotalSpent = () => {
        let total = 0;
        for (let i = 0; i < rideHistory.length; i++) {
          total += rideHistory[i].Price;
        }
        return total;
      };
    
      const totalSpent = calculateTotalSpent();
  
    return (
    <div className=" my-6">
        <h1 className="text-white mb-4"> Åk Historik</h1>
      {rideHistory.map((ride, index) => (
        <div key={index} className="mb-4 "> 
            <div className="flex  justify-between gap-20">
            <h2 className="text-l font-semibold text-white">{ride.title}</h2>
            <p className="text-white">{ride.date}</p>
            </div>
            <div className="flex  justify-between">
                <p className="text-gray-500">Totalt pris</p>
                <p className="text-gray-500">{ride.Price} Kr</p>
            </div>
            {index < rideHistory.length - 1 && (
                <hr className="border-t-1 border-gray-500 my-4" />
            )}
        </div>
        
      ))}
      <hr className="border-t-2 border-white my-4" />
      <div className="text-white flex justify-between">
            <h3 className="text-white"> Totalt Spenderat</h3>
            <p>{totalSpent} kr</p>
      </div>
    </div>
    
  );
};

export default RideProfile;
