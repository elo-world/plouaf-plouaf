import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "./js/components/Nav";
import About from "./js/pages/About";
import Home from "./js/pages/Home";
import Settings from "./js/pages/Settings";
import CreateList from "./js/pages/CreateList";
import AcceptCookies from "./js/components/AcceptCookies";

const App = () => {
    const [dataLanguage, setDataLanguage] = useState();

    const fetchLanguage = (language) => {
        localStorage.setItem("language", language);
        fetch("language/" + language + ".json")
            .then((res) => res.json())
            .then((data) => setDataLanguage(data));
    };

    useEffect(() => {
        if (localStorage.getItem("language")) {
            fetchLanguage(localStorage.getItem("language"));
        } else {
            localStorage.setItem("language", "bzh");
            fetchLanguage("bzh");
        }
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Nav
                    language={fetchLanguage}
                    data={dataLanguage}
                    actual={localStorage.getItem("language")}
                />
                <Routes>
                    <Route path="/" element={<Home data={dataLanguage} />} />
                    <Route
                        path="/about"
                        element={<About data={dataLanguage} />}
                    />
                    <Route
                        path="/settings"
                        element={<Settings data={dataLanguage} />}
                    />
                    <Route
                        path="/create-list"
                        element={<CreateList data={dataLanguage} />}
                    />
                    <Route path="*" element={<Home data={dataLanguage} />} />
                </Routes>
                <AcceptCookies data={dataLanguage} />
            </BrowserRouter>
        </div>
    );
};

export default App;
