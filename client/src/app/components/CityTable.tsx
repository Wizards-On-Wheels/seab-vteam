// components/CityTable.tsx
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

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
};

type CityTableProps = {
  cities: City[];
  expandedCityId: string | null;
  onToggleCityExpand: (cityId: string) => void;  // Use "onToggleCityExpand" here to match the prop name from `CitiesPage`
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

      {/* Expanded Parking Locations Table */}
      {expandedCityId && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Parkeringar</h3>
          {cities
            .filter((city) => city._id === expandedCityId)
            .map((city) => (
              <div key={city._id}>
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
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default CityTable;