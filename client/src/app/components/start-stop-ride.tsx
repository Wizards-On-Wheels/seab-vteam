export const StartBike = async ( userId: string, bikeId: string) => {
    try {
        const response = await fetch(`http://localhost:1337/bike/start/${userId}/${bikeId}`, {
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error(`Failed to start bike. Status: ${response.status}`);
        } else {
            try {
                await fetch(`http://localhost:1337/bike/battery/decrease/10/${bikeId}`, {
                    method: "PUT",
                });
            } catch (error) {
                console.error(error)
            }

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
        } else {
            // console.log("Bike stopped successfully");
            return response.status
        }
        
    } catch (error) {
        console.error("Error stopping the bike:", error);
    }
};

export const GetParkingZones = async () => {
    try {
        const response = await fetch(`http://localhost:1337/admin/collections/cities/data`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`Failed to get cities data: ${response.status}`);
        } else {
            // console.log("We got the citie data less go");
            return response.json();
        }
        
    } catch (error) {
        console.error("Error fetching the cities:", error);
    }
};
