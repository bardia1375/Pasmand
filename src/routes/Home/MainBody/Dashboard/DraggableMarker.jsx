import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import translate from "google-translate-api-browser";

const center = {
  lat: 35.735171,
  lng: 51.430122,
};

export function DraggableMarker({ setShowMap, height, setSearchTerm }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const [address, setAddress] = useState("");
  const [persianAddress, setPersianAddress] = useState("");

  const navigate = useNavigate();
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          getAddress(newPosition);
        }
      },
      click() {
        // Access the latest position when the marker is clicked
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          setShowMap(false);
          getAddress(newPosition);

          // Save the updated latitude and longitude to localStorage
          const latitude = newPosition.lat;
          const longitude = newPosition.lng;
          // Save to localStorage
          localStorage.setItem("savedLatitude", latitude);
          localStorage.setItem("savedLongitude", longitude);

          console.log("Latitude and Longitude saved to localStorage");
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const getAddress = async (newPosition) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${newPosition.lat}&lon=${newPosition.lng}&format=json`
      );
      const data = await response.json();
      const formattedAddress = data.display_name || "Address not found";
      setAddress(formattedAddress);
      console.log("hello");
      translate("hello", { to: "fa" })
        .then((res) => {
          // I do not eat six days
          console.log(res.text);
        })
        .catch((err) => {
          console.error(err);
        });
      // Translate the address to Persian
      const translation = await translate(formattedAddress, {
        from: "en",
        to: "fa",
      });

      setPersianAddress(translation.text);
      console.log("persian", persianAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    // Initial address retrieval
    getAddress(position);
  }, [position]);
  console.log("address", address);
  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}
