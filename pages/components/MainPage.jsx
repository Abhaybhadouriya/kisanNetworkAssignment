import React, { useState } from "react";
import ContactList from "./contactList/ContactList";
import Footer from "./footer/footer";
import Header from "./header/header";
import MenuTab from "./menuTab/menuTab";
import OutboxPage from "./OutboxPage/OutboxPage";
import Head from "next/head";
const MainPage = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [swipeTabs, setswipeTabs] = useState(false);
  const setDarkModeFunction = () => {
    setdarkMode(!darkMode);
  };
  const setSwipeTabsFunctions = () => {
    setswipeTabs(!swipeTabs);
  };

  return (
    <div>
      <Head>
        <title>Kisan Network</title>
        <link rel="icon" href="/leaf.png"></link>
        <link
          rel="stylesheet"
          href="path/to/font-awesome/css/font-awesome.min.css"
        />
      </Head>
      <Header darkMode={darkMode} setDarkModeFunction={setDarkModeFunction} />
      <MenuTab
        darkMode={darkMode}
        swipeTabs={swipeTabs}
        setSwipeTabsFunctions={setSwipeTabsFunctions}
      />

      {swipeTabs ? (
        <OutboxPage darkMode={darkMode} />
      ) : (
        <ContactList darkMode={darkMode} />
      )}
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default MainPage;
