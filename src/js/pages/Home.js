import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Custom from "../components/Custom";
import HeadsTails from "../components/HeadsTails";

const Home = ({ data }) => {
    const [methodDrawing, setMethodDrawing] = useState("customize");
    const [allCookies, setAllCookies] = useState([]);

    const readCookie = (name) => {
        var nameEqual = name + "=";
        var cBoard = document.cookie.split(";");
        for (var i = 0; i < cBoard.length; i++) {
            var c = cBoard[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEqual) == 0) {
                return c.substring(nameEqual.length, c.length);
            }
        }
        return false;
    };

    const listCookie = () => {
        if (document.cookie) {
            if (document.cookie.length > 1) {
                var seperate = document.cookie.split(";");
            }
            let listOfAllCookie = [];
            for (var i = 0; i < seperate.length; i++) {
                var nameOfCookie = seperate[i].split("=")[0];
                while (nameOfCookie.charAt(0) == " ") {
                    nameOfCookie = nameOfCookie.substring(
                        1,
                        nameOfCookie.length
                    );
                }
                listOfAllCookie.push(nameOfCookie);
            }
            setAllCookies(listOfAllCookie);
        }
    };

    const method = () => {
        if (methodDrawing === "customize") {
            return <Custom data={data} name={false} />;
        } else if (methodDrawing === "heads-tails") {
            return <HeadsTails data={data} />;
        } else {
            for (var i = 0; i < allCookies.length; i++) {
                if (methodDrawing === allCookies[i]) {
                    if (readCookie(allCookies[i]) !== false) {
                        localStorage.setItem(
                            "items",
                            readCookie(allCookies[i])
                        );
                        return <Custom data={data} name={allCookies[i]} />;
                    }
                }
            }
            setMethodDrawing("customize");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("method")) {
            setMethodDrawing(localStorage.getItem("method"));
        } else {
            localStorage.setItem("method", "customize");
        }
        listCookie();
    }, []);

    if (data) {
        return (
            <div className="home">
                <select
                    name="Method of Drawing"
                    id="method-drawing"
                    value={methodDrawing}
                    onChange={(e) => {
                        setMethodDrawing(e.target.value);
                        localStorage.setItem("method", e.target.value);
                    }}
                >
                    <option value="customize">{data.select.customize}</option>
                    <option value="heads-tails">
                        {data.select.headsTails}
                    </option>
                    {allCookies.map((cookie) => {
                        if (cookie !== "accept") {
                            return (
                                <option value={cookie}>{cookie}</option>
                            )
                        }
                    })}
                </select>
                {method()}
            </div>
        );
    }
};

export default Home;
