import styled, { css } from "styled-components";

export const RequestBody = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 80px;
`;

export const TitleStyle = styled.div`
  color: ${({ selected }) => (selected ? "white" : "#37b3b8")};
  background-color: ${({ selected }) => (selected ? "#37b3b8" : "none")};
  padding: ${({ selected }) => (selected ? "10px " : "10px")};
  border-radius: 30px;
  font-size: 2vh;
  font-weight: 400;
  width: ${({ width }) => (width ? width : "50%")};
  text-align: center;
  white-space: nowrap;
  margin: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (min-width: 500px) {
    font-size: 16px;
  }
`;

export const RequestHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* height: 10vh; */
  background-color: #ecfcfc;
  border-radius: 30px;
  margin-top: 5px;
`;

export const NewRequest = styled.div`
  background-color: #ecfcfc;
  border-radius: 30px;
  padding: 20px 15px;
  height: 100%;
  gap: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
`;

export const CustomButton = styled.div`
  color: ${({ color }) => (color ? color : "white")};
  border: ${({ border, color }) => (border ? `1px solid ${color}` : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vh;
  border-radius: 30px;
  background-image: ${({ noBackground }) =>
    noBackground ? "none" : "linear-gradient(to left, #ff8080, #ffb931)"};
  box-shadow: ${({ border }) =>
    border ? "none" : "0px 5px 20px -2px rgba(0, 0, 0, 0.3)"};
  position: relative;
  & > img {
    width: 15px;
    position: absolute;
    left: ${({ left }) => (left ? left : "none")};
    right: ${({ right }) => (right ? right : "none")};
  }
`;

export const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  white-space: nowrap;
`;

export const StatusItem = styled.div`
  color: ${({ selected }) => (selected ? "none" : "#37b3b8")};
  background-color: ${({ selected }) => (selected ? "#37b3b8" : "none")};
  /* padding: ${({ selected }) => (selected ? "10px 40px" : "10px")}; */
  padding: 5px;
  border-radius: 20px;
  font-size: 2vh;
  font-weight: 400;
  cursor: pointer;
  background: ${({ selected }) =>
    selected ? "rgba(214, 238, 244, 0.95)" : null};
  border: ${({ selected }) =>
    selected ? "1px solid rgba(86, 172, 194, 0.6)" : null};
`;

export const RequestCard = styled.div`
  background-color: white;
  width: 100%;
  min-height: 10vh;
  border: 1px solid #bbbbbb;
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const RequestCardInfo = styled.div`
  /* background-color: #f3f3f3; */
  background-image: linear-gradient(to bottom, #f7f7f7, white);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 10px;
`;

export const ListOFRequests = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

export const RequestCardStatus = styled.div`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "space-between")};
  margin: 10px 0 0;
`;

export const RequestCardStatusItem = styled.div`
  ${({ type }) => {
    let style;
    switch (type) {
      case "waiting":
        style = css`
          border: 1px solid #9c9c9c;
          padding: 8px 20px;
          border-radius: 30px;
          color: #9c9c9c;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      case "important":
        style = css`
          border: 1px solid #e98425;
          padding: 8px 30px;
          border-radius: 30px;
          color: #e98425;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      case "accepted":
        style = css`
          border: 1px solid #26417b;
          padding: 8px 35px;
          border-radius: 30px;
          color: rgba(0, 133, 167, 0.6);
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
          background: rgba(214, 238, 244, 0.95);
          border: 1px solid rgba(86, 172, 194, 0.6);
        `;
        break;
      case "acceptButton":
        style = css`
          border: 1px solid #26417b;
          padding: 8px 35px;
          border-radius: 30px;
          color: white;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
          background: rgba(0, 133, 167, 0.6);
          border: 1px solid rgba(86, 172, 194, 0.6);
        `;
        break;
      case "rejectButton":
        style = css`
          border: 1px solid #ff4d4d;
          padding: 8px 35px;
          border-radius: 30px;
          color: white;
          background-color: #ff4d4d;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      case "rejected":
        style = css`
          border: 1px solid #ff4d4d;
          padding: 8px 35px;
          border-radius: 30px;
          color: #ff4d4d;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      default:
        style = css``;
        break;
    }
    return style;
  }};
`;

export const ShowMore = styled.div``;

export const Notif = styled.div`
  position: absolute;
  top: 0;
  right: 0.5vw;
  background-color: red;
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 16px;
    width: 26px;
    height: 26px;
  }
`;

export const Option = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 10px;
  margin-top: 7px;
  font-size: 20px;
  cursor: pointer;
`;
