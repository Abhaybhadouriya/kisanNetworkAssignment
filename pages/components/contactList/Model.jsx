import React, { useEffect } from "react";
import styles from "./model.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faEnvelopeCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Model = (props) => {
  let modalContent = props.darkMode
    ? styles.modalContentDark
    : styles.modalContent;
  let ContactListDivText = props.darkMode
    ? styles.ContactListDivTextDark
    : styles.ContactListDivText;
  let ContactListButton = props.darkMode
    ? styles.ContactListButtonDark
    : styles.ContactListButton;

  const [otpDigits, setotpDigits] = React.useState("");
  useEffect(() => {
    setotpDigits(Math.floor(100000 + Math.random() * 900000));
  }, []);

  const [isOTPisSented, setisOTPisSented] = React.useState(false);
  const loadPost = async () => {
    let dataPost = { mobileno: props.data["mobileno"], otp: otpDigits };
    try {
      const res = await axios.post("https://justchecknodejs.vercel.app/", dataPost);
      console.log("Status", res.status);
      console.log("Body: ", res.data.status);
      if (res.data.status === 0) {
        setisOTPisSented(true);
        let data = {
          mobileno: props.data["mobileno"],
          firstName: props.data["firstName"],
          lastName: props.data["lastName"],
          OTP: otpDigits,
          timeStamp: res.data.time,
        };

        let dataToPush = [];
        dataToPush.push(data);
        if (localStorage.getItem("otpUserData") === null) {
          localStorage.setItem("otpUserData", JSON.stringify(dataToPush));
        } else {
          var retrievedObject = JSON.parse(localStorage.getItem("otpUserData"));
          retrievedObject.push(data);
          localStorage.setItem("otpUserData", JSON.stringify(retrievedObject));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div id="myModal" className={styles.modal}>
        <div className={modalContent}>
          <p className={ContactListDivText}>Send OTP</p>
          <span
            onClick={() => props.setModalShow(false)}
            className={styles.close}
          >
            &times;
          </span>
          <p className={ContactListDivText}>
            {props.data["firstName"] + " " + props.data["lastName"]}
          </p>
          <p
            className={ContactListDivText}
            style={{ textDecoration: "underline" }}
          >
            Hi. Your OTP is: {otpDigits}
          </p>
          <p className={ContactListDivText}>
            Click send to get OTP on your Mobile no : +{props.data["mobileno"]}
          </p>

          {isOTPisSented ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                style={{ width: 48, height: 48, color: "green" }}
                icon={faEnvelopeCircleCheck}
              />
              <p className={ContactListDivText}>OTP is Sent</p>
            </div>
          ) : (
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={ContactListButton}
              onClick={() => loadPost()}
            >
              SEND OTP
              <FontAwesomeIcon
                style={{ width: 18, height: 18 }}
                icon={faPaperPlane}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Model;
