import { Button } from "components/common";
import Card from "components/common/Card";
import { Field } from "components/common/Field";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function SendingTime({ setGetTime, setGetDay, setShowMap, getDay, getTime }) {
  const [times, setTimes] = useState([
    { id: 0, text: "ساعت 9 تا 12", bg: "#fff" },
    { id: 1, text: "ساعت 12 تا 15", bg: "#fff" },
    { id: 2, text: "ساعت 15 تا 18", bg: "#fff" },
    { id: 3, text: "ساعت 18 تا 21", bg: "#fff" },
  ]);
  const [days, setDays] = useState([
    { id: 0, text: "یکشنبه", date: "1 بهمن", bg: "#fff" },
    { id: 1, text: "دوشنبه", date: "2 بهمن", bg: "#fff" },
    { id: 2, text: "سه‌شنبه", date: "3 بهمن", bg: "#fff" },
    { id: 3, text: "چهارشنبه", date: "4 بهمن", bg: "#fff" },
    { id: 4, text: "پنجشنبه", date: "5 بهمن", bg: "#fff" },
    { id: 5, text: "شنبه", date: "6 بهمن", bg: "#fff" },
  ]);
  useEffect(() => {
    const timeAndDateOrder = JSON.parse(
      localStorage.getItem("timeAndDateOrder")
    );
    console.log("timeAndDateOrder", timeAndDateOrder);
  }, []);
  const selectItem = (el, index) => {
    const updatedTimes = times.map((time, i) => {
      console.log(i, index);
      if (i === index) {
        return { ...time, bg: "lightgreen" }; // Set the background to red for the selected item
      } else {
        return { ...time, bg: "#fff" }; // Set the background to white for other items
      }
    });
    console.log("updatedDays", updatedTimes);
    setTimes(updatedTimes);
      setGetTime((prev) => [...prev, el]);

    
  };
  
  const selectDays = (el, index) => {
    const updatedDays = days.map((day, i) => {
      console.log("123123", index);
      if (i === index) {
        return { ...day, bg: "lightgreen" }; // Set the background to red for the selected item
      } else {
        return { ...day, bg: "#fff" }; // Set the background to white for other items
      }
    });
    console.log("updatedDays", updatedDays);
    setDays(updatedDays);
      setGetDay((prev) => [...prev, el]);

    
  };
  const onSubmit = () => {
    console.log();
    setShowMap(0);
    localStorage.setItem("dateInformation", JSON.stringify(getDay));
    localStorage.setItem("timeInformation", JSON.stringify(getTime));
    // const data = [...getDay, ...getTime];
    // console.log("data", data);
    // localStorage.setItem("timeAndDateOrder", JSON.stringify(data));
  };
  //   useEffect(() => {
  //     localStorage.setItem("timeAndDateOrder", JSON.stringify(getDay));
  //     localStorage.setItem("timeAndDateOrder", JSON.stringify(getTime));
  //     localStorage.setItem("savedAddress", JSON.stringify(Address));
  //   }, [getDay, getTime, Address]);
  return (
    <Card color={"#fff"}>
      <div>انتخاب بازه زمانی</div>
      <div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "0.7rem ",
            overflowX: "auto",
          }}
        >
          {days.map((el) => (
            <Days
              onClick={() => selectDays(el, el.id)}
              bg={el.bg}
              style={{ borderBottom: `2px dashed ${el.bg}`, padding: "0 8px" }}
            >
              <p>{el.text}</p>
              <p>{el.date}</p>
            </Days>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {times.map((el, index) => (
            <Hours>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${el.bg}`,
                }}
              >
                <Item onClick={() => selectItem(el, el.id)}>{el.text}</Item>
              </div>
            </Hours>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
          }}
        >
          <Button justify align display="flex" onClick={onSubmit}>
            تایید و تکمیل اطلاعات
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default SendingTime;
const Days = styled.div`
  &:hover {
    border-bottom: 2px solid lightgreen;
  }
  p {
    font-size: 0.7rem;
    white-space: noWrap;
  }
`;
const Hours = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  white-space: noWrap;
  margin-top: 16px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    &:hover {
      background-color: lightgreen;
    }
  }
`;
const Item = styled.div`
  padding: 4px 8px;
  text-align: center;
  white-space: noWrap;
  font-size: 0.7rem;
`;
