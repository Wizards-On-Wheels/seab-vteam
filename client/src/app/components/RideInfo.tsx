import React from "react";

type RideHistoryProps = {
  rideHistory: { title: string; date: string; price: number }[];
};

const RideProfile: React.FC<RideHistoryProps> = ({ rideHistory }) => {
  // Function to calculate total amount spent on the app
  const totalSpent = rideHistory.reduce((sum, ride) => sum + ride.price, 0);

  return (
    <div className="my-6">
      <h1 className="text-white mb-4">Åkhistorik</h1>

      {rideHistory.length > 0 ? (
        rideHistory.map((ride, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between gap-20">
              <h2 className="text-l font-semibold text-white">{ride.title}</h2>
              <p className="text-white">{ride.date}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Totalt pris</p>
              <p className="text-gray-500">{ride.price} Kr</p>
            </div>
            {index < rideHistory.length - 1 && (
              <hr className="border-t-1 border-gray-500 my-4" />
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Ingen åkhistorik tillgänglig.</p>
      )}

      <hr className="border-t-2 border-white my-4" />
      <div className="text-white flex justify-between">
        <h3 className="text-white">Totalt spenderat</h3>
        <p>{totalSpent} kr</p>
      </div>
    </div>
  );
};

export default RideProfile;