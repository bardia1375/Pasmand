/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useRef, useState } from "react";

// Components
// Styled Elements
import styled, { css } from "styled-components";

// Images
import axios from "axios";
import api from "config/config.json";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import jMoment from "moment-jalaali";
import { errorMessage, successMessage } from "services/toast";
import { setTraffic } from "routes/Auth/Module";
import { useDispatch } from "react-redux";
import { Dashboard } from "assets/styles/home/dashboard";
import Compressor from "compressorjs";
import Card from "components/common/Card";
import MapComponent from "routes/Home/MainBody/Dashboard/MapComponent";
import DetailAddress from "./DetailAddress";

export const TrafficModalTest2 = ({
  setTrafficModal,
  trafficModal,
  loc,
  loader,
  setTakeImage,
}) => {
  // Codes of companies which can use camera option
  const codeList = [12345];
  const token = localStorage.getItem("tickmentAd_AccessToken");
  const info = JSON.parse(localStorage.getItem("personsData"));
  const [entryType, setEntryType] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraButton, setCameraButton] = useState(false);
  const [locations, setLocations] = useState({});
  const dispatch = useDispatch();
  // const {navigate}=useNavigate()
  // const [presentStatus, setPresentStatus] = useState(
  //   localStorage.getItem("present")
  // );
  const date = new Date();
  var CRC32 = require("crc-32");

  const nowDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const swapper = (x) => {
    let data = x.replace(/T.*/, "").split("/");
    let temp = data[0];
    data[0] = data[1];
    data[1] = temp;
    return data;
  };
  const finallDate = swapper(nowDate);

  const videoRef = useRef(null);

  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState(false);
  const [typeKind, setTypeKind] = useState("");
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    setLocations(loc);
  }, [loc]);

  // useEffect(() => {
  //   async function getMedia() {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.style.transform = "scaleX(-1)";
  //       setCameraButton(true);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   getMedia();
  // }, []);

  // function takePicture() {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext("2d");
  //   context.drawImage(video, 0, 0, 320, 240);
  //   const dataUrl = canvas.toDataURL("image/webp"); // Set quality to 0 for lowest quality

  //   // Calculate and log the approximate file size in kilobytes (KB)
  //   // const fileSizeKB = Math.round(dataUrl.length / 1.37);

  //   setImage(dataUrl);
  //   setPermission(false);
  //   setCameraButton(false);

  //   // Stop the camera stream
  //   const stream = video.srcObject;
  //   const tracks = stream.getTracks();
  //   tracks.forEach((track) => track.stop());

  //   presentHandler(typeKind, dataUrl);
  // }

  // useEffect(() => {
  //   loader(true);
  //   if (codeList.some((x) => x === info.CompanyCode)) {
  //     let stream;

  //     async function getMedia() {
  //       try {
  //         stream = await navigator.mediaDevices.getUserMedia({
  //           video: true,
  //         });
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.style.transform = "scaleX(-1)";
  //         setCameraButton(true);
  //         loader(false);
  //       } catch (err) {
  //         loader(false);
  //         console.error(err);
  //       }
  //     }

  //     getMedia();

  //     return () => {
  //       if (stream) {
  //         const tracks = stream.getTracks();
  //         tracks.forEach((track) => track.stop());
  //       }
  //     };
  //   }
  // }, []);

  // Helper function to convert data URL to Blob object
  function dataURLtoBlob(dataUrl) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  // function convertToBase64(blob) {
  //   const reader = new FileReader();
  //   reader.onloadend = function () {
  //     const base64String = reader.result;
  //     setImage(base64String);
  //     setTakeImage(base64String);
  //     presentHandler(typeKind, base64String);
  //     setPermission(false);
  //     setCameraButton(false);
  //   };
  //   console.log("blobblob", blob);
  //   reader.readAsDataURL(blob);
  // }

  // function takePicture() {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext("2d");
  //   context.drawImage(video, 0, 0, 320, 240);
  //   const dataUrl = canvas.toDataURL("image/webp");
  //   // Convert data URL to Blob object
  //   const blob = dataURLtoBlob(dataUrl);
  //   // Use Compressor.js to compress the image
  //   new Compressor(blob, {
  //     quality: 0.6, // Adjust the quality value as per your requirements (0.6 means 60% quality)
  //     success(result) {
  //       convertToBase64(result);
  //     },
  //     error(err) {
  //       console.error(err);
  //     },
  //   });
  // }

  // useEffect(() => {
  //   const type = 159;
  //   console.log("locations", locations);
  //   if (!!locations.error) {
  //     console.log("Location Error! :(");
  //   } else {
  //     console.log("permission", permission);
  //     console.log("image", image);
  //     console.log(
  //       "codeList.some((x) => x === info.CompanyCode)",
  //       codeList.some((x) => x === info.CompanyCode)
  //     );
  //     if (
  //       !permission &&
  //       !image &&
  //       codeList.some((x) => x === info.CompanyCode)
  //     ) {
  //       setPermission(true);
  //       setCameraButton(true);
  //       setTypeKind(type);
  //     } else {
  //       let entryTypes = entryType === "in" ? "out" : "in";
  //       setLoading(true);
  //       loader(true);
  //       axios
  //         .get(
  //           `${api.api}/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=1&page=0`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           if (
  //             res.data.data.clockings[0].datetime.split(" ")[1] ===
  //             jMoment().format("HH:mm:00")
  //           ) {
  //             errorMessage("!لطفا یک دقیقه منتظر بمانید");
  //             setImage(null);
  //             setLoading(false);
  //             loader(false);
  //           } else {
  //             dispatch(setTraffic(true));
  //             axios
  //               .post(
  //                 `${api.api}/v1/ta/clockings`,
  //                 {
  //                   clocking: {
  //                     latitude: locations.lat,
  //                     longitude: locations.long,
  //                     type_id: type,
  //                     user_id: info.UserId,
  //                     picture: image,
  //                     //   entry_type: type !== 159 ? "out" : entryTypes,
  //                     entry_type: entryTypes,
  //                     datetime: `${finallDate
  //                       .reverse()
  //                       .join("-")} ${date.getHours()}:${date.getMinutes()}`,
  //                     key: (
  //                       CRC32.str(
  //                         `*${info.UserId},${finallDate.reverse().join("-")},${
  //                           date.getHours() < 10
  //                             ? `0${date.getHours()}`
  //                             : date.getHours()
  //                         }:${
  //                           date.getMinutes() < 10
  //                             ? `0${date.getMinutes()}`
  //                             : date.getMinutes()
  //                         },${type},${
  //                           entryTypes === "in" ? "1" : "0"
  //                           // type !== 159 ? "0" : entryTypes === "in" ? "1" : "0"
  //                         },${!!locations.lat ? locations.lat : "35.66"},${
  //                           !!locations.long ? locations.long : "51.4"
  //                         }*`
  //                       ) >>> 0
  //                     ).toString(16),
  //                   },
  //                 },
  //                 {
  //                   headers: {
  //                     Authorization: `Bearer ${token}`,
  //                   },
  //                 }
  //               )
  //               .then((res) => {
  //                 if (199 < res.data.code && res.data.code < 400) {
  //                   setLoading(false);
  //                   loader(false);
  //                   dispatch(setTraffic(false));
  //                   setTrafficModal(false);
  //                   successMessage(".تردد شما با موفقیت ثبت شد");
  //                 } else {
  //                   setLoading(false);
  //                   loader(false);
  //                   dispatch(setTraffic(false));
  //                   setTrafficModal(false);
  //                   errorMessage(res.data.data.notice.message);
  //                 }
  //               });
  //           }
  //         });
  //     }
  //   }
  // }, [image]);
  // const presentHandler = (type, imageUrl) => {};

  // useEffect(() => {
  //   setLoading(true);
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       axios
  //         .get(
  //           `${api.api}/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=1&page=0`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           if (
  //             res.data.data.clockings[0].datetime.split(" ")[0] !==
  //             jMoment().format("YYYY-MM-DD")
  //           ) {
  //             setEntryType("out");
  //           } else {
  //             setEntryType(res.data.data.clockings[0].entry_type);
  //           }
  //           setLoading(false);
  //         });
  //       setLocations({
  //         lat: position.coords.latitude,
  //         long: position.coords.longitude,
  //       });
  //     },
  //     (error) => {
  //       axios
  //         .get(
  //           `${api.api}/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=1&page=0`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           if (
  //             res.data.data.clockings[0].datetime.split(" ")[0] !==
  //             jMoment().format("YYYY-MM-DD")
  //           ) {
  //             setEntryType("out");
  //           } else {
  //             setEntryType(res.data.data.clockings[0].entry_type);
  //           }
  //           setLoading(false);
  //         });
  //       setLocations({ error: "دسترسی به موقعیت مکانی شما امکان پذیر نیست." });
  //     }
  //   );
  // }, []);

  function openCollapse() {
    setCollapse(!collapse);
    var growDiv = document.getElementById("grows");
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      var wrapper = document.querySelector(".measuringWrappers");
      growDiv.style.height = wrapper.clientHeight + "px";
    }
  }
  // const Address = [
  //   {
  //     Title: "کتابخانه ملی ایران",
  //     Address:
  //       "تهران - اراضی عباس آباد - بزرگراه شهید همت - شهدای بانک مرکزی کتابخانه ملی ایران",
  //   },
  //   {
  //     Title: "کتابخانه ملی ایران",
  //     Address:
  //       "تهران - اراضی عباس آباد - بزرگراه شهید همت - شهدای بانک مرکزی کتابخانه ملی ایران",
  //   },
  // ];
  // const savedStateString = localStorage.getItem("savedAddress");
  // if (savedStateString) {
  //   const savedState = JSON.parse(savedStateString);
  //   console.log("savedState", savedState);
  // } else {
  //   console.log("No saved state found in localStorage");
  // }
  const [Address, setAddress] = useState(
    JSON.parse(localStorage.getItem("savedAddress"))
  );
  console.log("Address", Address);
  const [showMap, setShowMap] = useState(false);
  const openMap = () => {
    setShowMap(1);
  };
  const savedLatitude = localStorage.getItem("savedLatitude");
  const savedLongitude = localStorage.getItem("savedLongitude");
  return (
    <>
      <Overlay
      // overlayWidth={overlayWidth}
      // overlayHeight={overlayHeight}
      ></Overlay>
      <div
        style={{
          zIndex: 3,
          position: "absolute",
          top: 0,
          left: "20px",
          right: "20px",
          bottom: 0,
        }}
      >
        <Card color={"#f1f1f1"}>
          {showMap == 1 && (
            <MapComponent
              height="100%"
              setShowMap={setShowMap}
              savedLongitude={savedLongitude}
              savedLatitude={savedLatitude}
            />
          )}
          {showMap == 2 && (
            <div
              style={{
                overflowY: "scroll",
                overflowX: "hidden",
                height: "100%",
              }}
            >
              <DetailAddress
                Address={Address}
                setAddress={setAddress}
                setShowMap={setShowMap}
                savedLongitude={savedLongitude}
                savedLatitude={savedLatitude}
              />
            </div>
          )}

          {showMap == 0 && (
            <>
              <TitleCard>
                <div>آدرس جدید:</div>
                <div className="newAddress" onClick={openMap}>
                  + آدرس جدید
                </div>
              </TitleCard>
              {Address?.map((el) => (
                <AddressCard>
                  <div>عنوان: {el?.addressTitle}</div>
                  <div>{el?.Address}</div>
                  <div>{el?.details}</div>
                  <div>شماره تماس: {el?.phoneNumber}</div>
                </AddressCard>
              ))}
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export const Overlay = styled.div`
  position: absolute;
  top: -50%;
  left: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100vw")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100vh")};
  background-color: #fff1;
  z-index: 2;
  backdrop-filter: blur(15px);
  transition: 300ms;
`;

export const Body = styled.div`
  height: 100%;
  width: 100%;
  color: black;
  /* background-color: #193774; */
  /* background-image: linear-gradient(to bottom, #112a6a, #2d588b); */
  position: absolute;
  top: ${({ top }) => (top ? top : "50%")};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: 500ms;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 23vh;
  gap: 50px;
`;

export const Circle = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: -1px 10px 20px -2px rgba(0, 0, 0, 0.3);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-image: ${({ disabled }) =>
    disabled
      ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
      : "linear-gradient(to bottom left, #3eb4c0, #55d4dc)"};
`;

export const Selected = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: ${({ left }) => `${left}%`};
  transform: translate(-50%, -50%);
  z-index: 3;
`;

export const SelectedItem = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 2.5vh;
  box-shadow: ${({ suggest }) =>
    suggest
      ? "-1px 0px 20px 0px rgb(255, 67, 67)"
      : "-1px 10px 20px -2px rgba(0, 0, 0, 0.3)"};

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${({ type }) => {
    switch (type) {
      case "enter":
        return css`
          background-image: ${({ disabled }) =>
            disabled
              ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
              : "linear-gradient(to bottom left, #1788a7, #024f81)"};
        `;
      case "exit":
        return css`
          background-image: ${({ disabled }) =>
            disabled
              ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
              : "linear-gradient(to bottom left, #1788a7, #024f81)"};
          // ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
          // : "linear-gradient(to bottom left,rgb(255, 109, 109),#ff4d4d)"};
        `;
      default:
        break;
    }
  }}/* 
  position: absolute;
  top: 50%;
  left: ${({ left }) => `${left}%`};
  transform: translate(-50%, -50%);
  z-index: 3; */
`;

export const SelectedActions = styled.div`
  background-color: #e5f2f2;
  border-radius: 36px;
  width: 95%;
  height: 60px;
  /* padding: 0 10px; */
  /* gap: 3vh; */
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  margin-top: 10px; */
  /* z-index: 2; */
  display: flex;
  justify-content: space-between;
  position: relative;
  /* padding: 20px; */
`;
export const AddressCard = styled.div`
  width: 100%;
  margin: 1rem 0;
  padding: 0.625rem 1rem 0.625rem 0px;
  border: 1px solid rgba(58, 61, 66, 0.06);
  border-radius: 0.375rem;
  padding: 8px;
  &:hover {
    border: 1px solid #22a958;
  }
`;
export const TitleCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  .newAddress {
    color: #22a958;
    font-weight: 600;
  }
`;

export const LocationError = styled.div`
  position: absolute;
  top: 10vh;
  color: #000;
  font-weight: bold;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
  animation: blinkingText 2s infinite;
  @keyframes blinkingText {
    0% {
      color: #ef0a1a;
    }
    25% {
      color: #254878;
    }
    50% {
      color: #ef0a1a;
    }
    75% {
      color: #254878;
    }
    100% {
      color: #ef0a1a;
    }
  }
`;

export const TypeSelector = styled.div`
  /* height: ${({ open }) => (open ? "100px" : "0px")};
  gap: 15px;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-end;
  transition: 500ms; */
  -moz-transition: height 0.5s;
  -ms-transition: height 0.5s;
  -o-transition: height 0.5s;
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
  height: 0;
  overflow: hidden;
  width: 100%;
`;
