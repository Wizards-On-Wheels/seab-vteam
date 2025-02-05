import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/images/scooterMarker.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const customParkingIcon = new L.Icon({
  iconUrl: "/images/parkingicon.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const customParkingAndCargingIcon = new L.Icon({
  iconUrl: "/images/parkingcharging.png",
  iconSize: [60, 68],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60],
});

const profileIcon = new L.Icon({
  iconUrl: "/images/Profile.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

export { customIcon, customParkingIcon, customParkingAndCargingIcon, profileIcon };
