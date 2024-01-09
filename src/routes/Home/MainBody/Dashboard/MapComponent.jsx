import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import { Button } from "components/common";
import SearchImg from "../../../../assets/images/map/search.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DraggableMarker } from "./DraggableMarker";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../../../assets/images/profilephoto/worker.png"),
  iconUrl: require("../../../../assets/images/profilephoto/worker.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const CircularMarker = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function MapComponent({ userLocation, date, height, setShowMap }) {
  const mapRef = useRef(null); // Ref to store the map instance
  const x = JSON.parse(localStorage.getItem("users"));
  const Users = x?.filter((res) => res?.Date == date)[0]?.persons;
  const position = x
    ?.filter((res) => res.Date == date)[0]
    ?.persons.map((el) => el.position);
  console.log("UsersUsers", Users);
  console.log("positionposition", position);
  const [positions, setPositions] = useState(position);
  const [positionSearch, setPositionSearch] = useState(
    positions ? positions[0] : [35.739282, 51.429821],
    [35.735171, 51.430122],
    [35.730887, 51.433729],
    [35.738829, 51.446269],
    [35.738829, 51.446269],
    [35.724441, 51.435484],
    [35.730259, 51.427067],
    [35.730259, 51.437067],
    [35.730259, 51.439067],
    [35.740259, 51.447067],
    [35.745259, 51.457067],
    [35.755259, 51.457067]
  );
  const LocateControl = () => {
    const map = useMap();

    const handleClick = () => {
      map.locate({ setView: true, maxZoom: 16 });

      map.on("locationfound", (e) => {
        L.marker(e.latlng).addTo(map).bindPopup("شما اینجا هستید!").openPopup();
      });

      map.on("locationerror", (e) => {
        alert("موقعیت شما یافت نشد! لطفا چند دقیقه دیگر مجدد تلاش کنید.");
      });
    };

    return (
      <div>
        <img
          src="../../../../assets/images/profilephoto/myLocation.png" // Path to your image
          alt="Locate Me"
          className="locate-me-btn"
          onClick={handleClick}
          style={{ zIndex: 1000, position: "absolute", bottom: 0, left: 0 }}
        />
        {/* <img src='assets/images/profilephoto/newWorker.png' style={{zIndex:1000,  position: "absolute",bottom:0,left:0}} onClick={handleClick} /> */}
      </div>
    );
  };
  //   useEffect(()=>{
  //   const newLocation=positions.slice()
  //   if(userLocation!==null){
  //     newLocation.splice(0, 1,userLocation);
  //     console.log("newLocation",newLocation);
  //     setPositions(newLocation)

  //   }
  // },[userLocation])
  const customCircularMarkerIcon = new L.divIcon({
    className: "custom-circular-marker",
    iconSize: [60, 60], // Adjust the width and height of the icon
    iconAnchor: [30, 30], // Center of the icon
  });
  const blueDotIcon = new L.Icon({
    iconRetinaUrl: require("../../../../assets/images/profilephoto/302321278.jpg"),
    iconSize: [30, 30],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
  // const [userLocation, setUserLocation] = useState(null);

  // useEffect(() => {
  //   // Get user's current location using Geolocation API
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserLocation([latitude, longitude]);
  //     },
  //     (error) => {
  //       console.error('Error getting user location:', error.message);
  //     }
  //   );
  // }, []); // Empty dependency array ensures the effect runs only once
  console.log("userLocation", userLocation);

  const polyline = [
    [35.739282, 51.429821], // Example coordinates for Point 1
    [35.735171, 51.430122], // Example coordinates for Point 2
    [35.730956, 51.430423], // Example coordinates for Point 3
    [35.730852, 51.431883], // Example coordinates for Point 2
    [35.730887, 51.433729], // Example coordinates for Point 3
    [35.731061, 51.435876], // Example coordinates for Point 3
    [35.728274, 51.43622], // Example coordinates for Point 3
    [35.727124, 51.436435], // Example coordinates for Point 3
    [35.731026, 51.438625], // Example coordinates for Point 3
    [35.738794, 51.444165], // Example coordinates for Point 3
    [35.738829, 51.446269], // Example coordinates for Point 3
    [35.727751, 51.445189], // Example coordinates for Point 3
    [35.724441, 51.435484], // Example coordinates for Point 3
    [35.724197, 51.428012], // Example coordinates for Point 3
    [35.730259, 51.427067], // Example coordinates for Point 3
  ];
  const limeOptions = { color: "lime" };
  const [searchTerm, setSearchTerm] = useState("");
  const searchLocation = async () => {
    // Use geocoding to get the coordinates of the location
    const provider = new OpenStreetMapProvider();
    const queryWithCity = `${searchTerm}, Tehran, Iran`; // Add Tehran and Iran to the query
    const results = await provider.search({ query: queryWithCity });
    console.log("searchTerm", searchTerm);
    console.log("results", results);
    console.log("provider", provider);
    if (results.length > 0) {
      const { y, x } = results[0];
      setPositionSearch([y, x]);
      console.log("y,x", y, x);
      // this.setState({ position: [y, x], zoom: 15, hasLocation: true });
    } else {
      console.log("Location not found");
      // You can handle the case where the location is not found
    }
  };
  const handleSearchChange = (event) => {
    console.log("event.target.value", event.target.value);
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = async () => {
    await searchLocation();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      searchLocation();
    }
  };
  useEffect(() => {
    if (mapRef.current && positionSearch) {
      mapRef.current.flyTo(positionSearch, 16); // Example zoom level
    }
  }, [positionSearch]);
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPositionSearch([lat, lng]);
    // You can do more with the clicked coordinates if needed
    console.log("Clicked on map:", lat, lng);
  };
  return (
    <MapContainer
      center={positionSearch}
      zoom={userLocation ? 15 : 13}
      style={{
        height: ` ${height ? height : "30vh"}`,
        width: "100%",
        zIndex: 1,
      }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }} // Callback to store map instance
      onClick={(e) => handleMapClick(e)} // Attach the click event handler
    >
      <div
        style={{
          position: "absolute",
          top: "8px",
          zIndex: "1000",
          right: "16px",
          left:"32px"
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="جستجو موقعیت مکانی"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              borderRadius: "16px 16px 0 0",
              borderBottom: "1px solid #dadce0",
              boxShadow: "0 0 2px rgb(0 0 0/20%), 0 -1px 0 rgb(0 0 0/2%)",
              background: "#fff",
              border: "none",
              width: "100%",
              minWidth: "160px",
              // maxWidth: "150px",
              height: "28px",
              outline: "none",
              padding: "8px",
            }}
            onKeyDown={handleKeyDown}
          />
          <img
            onClick={handleSearchSubmit}
            style={{
              position: "absolute",
              width: "24px",
              height: "24px",
              left: "10px",
              top: "10px",
              cursor: "pointer",
            }}
            src={SearchImg}
            alt="Search"
          />
        </div>
        {/* <button onClick={this.handleSearchSubmit}>Search</button> */}
      </div>
      <Polyline pathOptions={limeOptions} positions={polyline} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {positions.map((position, index) => (
        <Marker key={index} position={position}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <CircularMarker>
                <img
                  src={require("../../../../assets/images/profilephoto/302321278.jpg")}
                  alt={`Point ${index + 1}`}
                />
              </CircularMarker>
              <div>جواد مقبلی</div>
            </div>
          </Popup>
        </Marker>
      ))} */}
      <DraggableMarker setShowMap={setShowMap} setSearchTerm={setSearchTerm}/>

      {userLocation && (
        <Marker position={userLocation} icon={blueDotIcon}>
          <Popup>
            <CircularMarker>
              <img
                src={require("../../../../assets/images/profilephoto/302321278.jpg")}
              />
            </CircularMarker>
          </Popup>
        </Marker>
      )}
      <MarkerClusterGroup>
        {Users?.map((el, index) => (
          <Marker key={index} position={el.position}>
            <StyledPopup state={el.State}>
              <div style={{ textAlign: "center" }}>
                {/* <CircularMarker>
                  <img src={require(el.ImgUrl)} alt={`Point ${index + 1}`} />
                </CircularMarker> */}
                <div>{el.name}</div>
                <div>کدپرسنلی:{el.Code}</div>
                <div>{el.State}</div>
              </div>
            </StyledPopup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <LocateControl />
    </MapContainer>
  );
}

export default MapComponent;

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background-color: ${(props) =>
      props.state === "تایید"
        ? "green"
        : props.state === "عدم تایید"
        ? "red"
        : "orange"};
    color:#fff;
    font-family:Yekan Bakh
    /* Set your desired background color here */
  }
  }

  color: white; /* Set the text color */
  padding: 10px; /* Set padding as needed */
`;
