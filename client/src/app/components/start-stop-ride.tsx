export const StartBike = async ( userId: string, bikeId: string) => {
    try {
        const response = await fetch(`http://localhost:1337/bike/start/${userId}/${bikeId}`, {
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error(`Failed to start bike. Status: ${response.status}`);
        }else {
            console.log("Bike started successfully");
            return response.status
        }
       
    } catch (error) {
        console.error("Error starting the bike:", error);
        console.log(bikeId)
    }
};

export const StopBike = async ( userId: string, bikeId: string) => {
    try {
        const response = await fetch(`http://localhost:1337/bike/stop/${userId}/${bikeId}`, {
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error(`Failed to stop bike. Status: ${response.status}`);
        }else {
            console.log("Bike stopped successfully");
            return response.status
        }
        
    } catch (error) {
        console.error("Error stopping the bike:", error);
    }
};