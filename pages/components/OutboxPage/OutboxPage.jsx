import { edit } from "fontawesome";
import React from "react";
import styles from "./OutBoxcss.module.css";

const OutboxPage = (props) => {
  let outerDiv = props.darkMode ? styles.outerDivDark : styles.outerDiv;
  let inputSearch = props.darkMode
    ? styles.inputSearchDark
    : styles.inputSearch;
  let ContactListDiv = props.darkMode
    ? styles.ContactListDivDark
    : styles.ContactListDiv;
  let ContactListDivText = props.darkMode
    ? styles.ContactListDivTextDark
    : styles.ContactListDivText;

  const [search, setsearch] = React.useState("");
  const changeSearchData = (e) => {
    setsearch(e.target.value);
  };
  const [dataFromDB, setdataFromDB] = React.useState(null);
  const [filter, setfilter] = React.useState(
    JSON.parse('{"id":"time","type":"Desc"}')
  );

  React.useEffect(() => {
    if (localStorage.getItem("otpUserData") === null) {
      setdataFromDB(null);
    } else {
      setdataFromDB(
        JSON.parse(localStorage.getItem("otpUserData")).sort(
          (a, b) => b.timeStamp - a.timeStamp
        )
      );
    }
  }, []);

  const getFunction = (e) => {
    console.log(e.id, e.type);
    if (e.id === "mobileno") {
      e.type === "DESC"
        ? setdataFromDB(dataFromDB.sort((a, b) => b.mobileno - a.mobileno))
        : setdataFromDB(dataFromDB.sort((a, b) => a.mobileno - b.mobileno));
    }
    if (e.id === "firstName") {
        e.type === "DESC"
          ? setdataFromDB(dataFromDB.sort((a, b) =>{ return ('' + b.firstName).localeCompare(a.firstName)}))
          : setdataFromDB(dataFromDB.sort((a, b) => { return ('' + a.firstName).localeCompare(b.firstName)}));
      }
      if (e.id === "timeStamp") {
        e.type === "DESC"
          ? setdataFromDB(dataFromDB.sort((a, b) => b.timeStamp - a.timeStamp))
          : setdataFromDB(dataFromDB.sort((a, b) => a.timeStamp - b.timeStamp));
      }
  };
  return (
    <div className={outerDiv}>
      <div style={{ padding: 10, display: "flex" }}>
        <input
          onChange={(e) => changeSearchData(e)}
          className={inputSearch}
          placeholder="Search Name"
        />
        <select
          style={{ marginLeft: 5 }}
          onChange={(e) => {
            setfilter(JSON.parse(e.target.value)),
              getFunction(JSON.parse(e.target.value));
          }}
          className={inputSearch}
        >
          <option value='{"id":"firstName","type":"ASC"}'>Name Asc</option>
          <option value='{"id":"firstName","type":"DESC"}'>Name Desc</option>
          <option value='{"id":"mobileno","type":"ASC"}'>Mobile Asc</option>
          <option value='{"id":"mobileno","type":"DESC"}'>Mobile Desc</option>
          <option value='{"id":"timeStamp","type":"ASC"}'>Time Asc</option>
          <option selected value='{"id":"timeStamp","type":"DESC"}'>
            Time Desc
          </option>
        </select>
      </div>
      <tbody>
        {dataFromDB === null
          ? "nothing to show"
          : dataFromDB.map((data, index) => {
              return data["firstName"]
                .toLowerCase()
                .includes(search.toLowerCase()) ? (
                <ListItemType
                  ContactListDivText={ContactListDivText}
                  ContactListDiv={ContactListDiv}
                  data={data}
                  key={index}
                  index={index}
                />
              ) : null;
            })}
      </tbody>
    </div>
  );
};

export default OutboxPage;

const ListItemType = (data) => {
  return (
    <div style={{ padding: 10 }}>
      <div className={data.ContactListDiv}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className={styles.ContactListDivIcon}
            style={{ backgroundColor: getRandomColor() }}
          >
            <span> {data.data["firstName"][0]}</span>
          </div>
          <div className={styles.ContactListDivDetails}>
            <span className={data.ContactListDivText}>
              {data.data["firstName"] + " " + data.data["lastName"]}
            </span>
            <span className={data.ContactListDivText}>
              OTP : {data.data["OTP"]}
            </span>
            <span className={data.ContactListDivText}>
              {getTime(parseInt(data.data["timeStamp"]))}
            </span>
            <span className={data.ContactListDivText}>
              +{data.data["mobileno"]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function getRandomColor() {
  const h = Math.floor(Math.random() * 27000);
  const randomColor = `hsl(${h}deg, 50%, 50%)`;
  return randomColor;
}

const getTime = (ms) => {
  console.log(ms);
  let d = new Date(ms);
  let time =
    d.toLocaleTimeString() +
    "-" +
    d.getDate() +
    "/" +
    d.getMonth() +
    "/" +
    d.getFullYear();
  return time;
};
