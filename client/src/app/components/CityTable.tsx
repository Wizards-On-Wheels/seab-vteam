import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

type SpeedZone = {
  registered: string;
  address: string;
  longitude: number;
  latitude: number;
  speed_limit: number;
  meta_data: {
    comment: string;
    zone_type: string;
    active_hours: string;
  };
};

type ParkingLocation = {
  status: string;
  registered: string;
  address: string;
  longitude: number;
  latitude: number;
  charging_station: boolean;
  maintenance: boolean;
};

type City = {
  _id: string;
  city: string;
  city_registered: string;
  status: string;
  parking_locations: ParkingLocation[];
  speed_zones: SpeedZone[]; // Add this type
};

type Bike = {
  _id: string;
  parked: boolean;
  battery: number;
  current_location: {
    longitude: number;
    latitude: number;
  };
};

type CityTableProps = {
  cities: City[];
  expandedCityId: string | null;
  onToggleCityExpand: (cityId: string) => void;
};

const CityTable: React.FC<CityTableProps & { bikes: Bike[] }> = ({
  cities,
  bikes,
  expandedCityId,
  onToggleCityExpand,
}) => {
  const columns = [
    { key: "id", label: "STADS ID" },
    { key: "city", label: "STAD" },
    { key: "city_registered", label: "REGISTRERAD" },
    { key: "charging_station", label: "CHARGING" }, // charging_station column
  ];

  // Helper function to calculate distance between two coordinates in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000;
    const toRad = (value: number) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <>
      {/* City List Table */}
      <Table aria-label="City List">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
          {cities.map((city) => (
            <TableRow key={city._id} onClick={() => onToggleCityExpand(city._id)}>
              <TableCell>{city._id}</TableCell>
              <TableCell>{city.city}</TableCell>
              <TableCell>{city.city_registered}</TableCell>
              <TableCell>
                {/* Check if any parking location has a charging station */}
                {city.parking_locations.some(location => location.charging_station) ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Expanded Details */}
      {expandedCityId &&
        cities
          .filter((city) => city._id === expandedCityId)
          .map((city) => (
            <div key={city._id}>
              <h3 className="text-xl mt-4 font-semibold mb-4">Parkeringar</h3>
              {city.parking_locations.length > 0 ? (
                <Table aria-label="Parking Locations">
                  <TableHeader>
                    <TableColumn>Adress</TableColumn>
                    <TableColumn>Registrerad</TableColumn>
                    <TableColumn>Charging</TableColumn>
                    <TableColumn>Koordinater</TableColumn>
                    <TableColumn>Bikes Parked</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {city.parking_locations.map((location, index) => {
                      const parkedBikes = bikes.filter((bike) => {
                        if (!bike.parked) return false;

                        const distance = calculateDistance(
                          bike.current_location.latitude,
                          bike.current_location.longitude,
                          location.latitude,
                          location.longitude
                        );

                        return distance <= 40; // Only include bikes within 40 meters
                      });

                      return (
                        <TableRow key={index}>
                          <TableCell>{location.address}</TableCell>
                          <TableCell>{location.registered}</TableCell>
                          <TableCell>{location.charging_station ? "Yes" : "No"}</TableCell>
                          <TableCell>{`${location.latitude}, ${location.longitude}`}</TableCell>
                          <TableCell>
                            {parkedBikes.length > 0 ? (
                              <ul>
                                {parkedBikes.map((bike) => (
                                  <li key={bike._id}>
                                    ID: {bike._id}, Battery: {bike.battery}%
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              "No bikes parked."
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <p>Inga tillgängliga parkeringsplatser.</p>
              )}

              {/* Speed Zones */}
              <h3 className="text-xl font-semibold mt-8 mb-4">Hastighetszoner</h3>
              {city.speed_zones.length > 0 ? (
                <Table aria-label="Speed Zones">
                  <TableHeader>
                    <TableColumn>Adress</TableColumn>
                    <TableColumn>Registrerad</TableColumn>
                    <TableColumn>Hastighetsgräns</TableColumn>
                    <TableColumn>Koordinater</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {city.speed_zones.map((zone, index) => (
                      <TableRow key={index}>
                        <TableCell>{zone.address}</TableCell>
                        <TableCell>{zone.registered}</TableCell>
                        <TableCell>{zone.speed_limit} km/h</TableCell>
                        <TableCell>{`${zone.latitude}, ${zone.longitude}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>Inga tillgängliga hastighetszoner.</p>
              )}
            </div>
          ))}
    </>
  );
};

export default CityTable;
