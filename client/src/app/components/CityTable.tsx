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

type CityTableProps = {
  cities: City[];
  expandedCityId: string | null;
  onToggleCityExpand: (cityId: string) => void;
};

const CityTable: React.FC<CityTableProps> = ({
  cities,
  expandedCityId,
  onToggleCityExpand,
}) => {
  const columns = [
    { key: "id", label: "STADS ID" },
    { key: "city", label: "STAD" },
    { key: "city_registered", label: "REGISTRERAD" },
    { key: "status", label: "STATUS" },
  ];

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
              <TableCell>{city.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Expanded Details */}
      {expandedCityId && (
        <div className="mt-8">
          {cities
            .filter((city) => city._id === expandedCityId)
            .map((city) => (
              <div key={city._id}>
                {/* Parking Locations */}
                <h3 className="text-xl font-semibold mb-4">Parkeringar</h3>
                {city.parking_locations.length > 0 ? (
                  <Table aria-label="Parking Locations">
                    <TableHeader>
                      <TableColumn>Adress</TableColumn>
                      <TableColumn>Registrerad</TableColumn>
                      <TableColumn>Status</TableColumn>
                      <TableColumn>Laddstation</TableColumn>
                      <TableColumn>Reparation</TableColumn>
                      <TableColumn>Koordinater</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {city.parking_locations.map((location, index) => (
                        <TableRow key={index}>
                          <TableCell>{location.address}</TableCell>
                          <TableCell>{location.registered}</TableCell>
                          <TableCell>{location.status}</TableCell>
                          <TableCell>{location.charging_station ? "Yes" : "No"}</TableCell>
                          <TableCell>{location.maintenance ? "Yes" : "No"}</TableCell>
                          <TableCell>{`${location.latitude}, ${location.longitude}`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p>Inga tillgängliga parkeringsplatser för denna staden.</p>
                  </div>
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
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p>Inga tillgängliga hastighetszoner för denna staden.</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default CityTable;
