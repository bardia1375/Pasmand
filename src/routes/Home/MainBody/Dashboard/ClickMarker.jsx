import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import {

    Marker,

    useMapEvents,
  } from "react-leaflet";
  import {useLocation}from "react-router-dom"
function ClickMarker({setShowMap,getPosition}) {
    const [markerPosition, setMarkerPosition] = useState(null);
    const markerRef = useRef(null); // Ref to store the map instance
    const location=useLocation()
    const AddMarkerToClickLocation = () => {

        const map = useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
            setMarkerPosition(e.latlng);
            console.log("salam");
            // const newPosition = marker.getLatLng();
            // console.log("newPosition", newPosition);
            // setShowMap(2);
            // getAddress(newPosition);
    
            // Save the updated latitude and longitude to localStorage
            const latitude = lat;
            const longitude = lng;
            const newLatLong = [latitude, longitude];
            // setPosition(newPosition);
    
            // Save to localStorage
            localStorage.setItem("savedLatitude", latitude);
            localStorage.setItem("savedLongitude", longitude);
            localStorage.setItem("savedLatLong", JSON.stringify(newLatLong));
            // setMapPositions(latitude, longitude);
            // Update the state after saving to localStorage
            // setMapPositions([newLatLong]);
            getPosition(newLatLong);
            console.log("Latitude and Longitude saved to localStorage");
            setTimeout(()=>{
              setShowMap(2);
            },500)
    
          },
        });
        return markerPosition ? (
          <Marker position={markerPosition!==null?markerPosition:""}  ref={markerRef}
          >
            {/* <Popup>Marker at {markerPosition.lat}, {markerPosition.lng}</Popup> */}
          </Marker>
        ) : null;
      };
     
    const [position,setPosition]=useState([])
      useEffect(()=>{
       const latitude= localStorage.getItem("savedLatitude");
       const longitude= localStorage.getItem("savedLongitude");
       if(latitude){
        setMarkerPosition([latitude,longitude])

       }else{
        setMarkerPosition([0,0])

       }
      },[])
      
  return (
    <div>

     <AddMarkerToClickLocation />

    </div>
  )
}

export default ClickMarker