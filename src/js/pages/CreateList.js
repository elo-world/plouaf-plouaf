import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

const CreateList = ({ data }) => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const deleteItem = (item) => {
        var index = items.indexOf(item);
        setItems(items.splice(index, 1));
        localStorage.setItem("items", items);
    };

    const saveList = (name) => {
        if (name.length > 1) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(localStorage.getItem("items")));
            element.setAttribute('download', 'plouaf-plouaf-'+name.toLowerCase());
            element.style.display = "none";
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        }
    }

    const createCookie = (name, value, day) => {
        if (name.length > 1 && value.length > 1) {
            if (name !== "accept") {
                document.getElementById("error").textContent = ""
                if (day) {
                    var date = new Date();
                    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
                    var exp = "; expires=" + date.toGMTString();
                } else {
                    var exp = "";
                }
                document.cookie = name + "=" + value.join("#") + exp + ";path=/";
                localStorage.setItem("method", name);
                navigate("/");
            } else {
                document.getElementById("error").textContent = 'You cannot name your list "accept"'
            }
        }
    };

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

    useEffect(() => {
        if (localStorage.getItem("items").split(",")[0] !== "") {
            setItems(localStorage.getItem("items").split("#"));
        }
    }, []);

    if (data) {
        return (
            <div className="container-create-list">
                <input
                    type="text"
                    value={inputValue}
                    name="title"
                    id="title"
                    placeholder={data["inputName"]}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <p id="error"></p>
                <div className="container-items">
                    {items.map((item) => (
                        <div className="item">
                            <p key={item}>{item}</p>
                            <button
                                className="cross"
                                onClick={() => deleteItem(item)}
                            >
                                <FontAwesomeIcon icon={faXmark} size="2xl" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    <NavLink to={"/"}>
                        <p>Annuler</p>
                    </NavLink>
                    <button className="btn-create-list button-style" onClick={() => {
                            if (readCookie("accept") === "true") {
                                document.getElementById("error").textContent = ""
                                createCookie(inputValue, items, 365);
                            } else {
                                document.getElementById("error").textContent = "Accept cookies to create a list"
                            }
                        }}>
                        {data["createList"]}
                    </button>
                    <button className="button-style" onClick={() => saveList(inputValue)}>
                        {data["saveList"]}
                    </button>
                </div>
            </div>
        );
    }
};

export default CreateList;
