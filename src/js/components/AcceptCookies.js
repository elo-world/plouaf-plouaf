import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";

const AcceptCookies = ({ data }) => {
    const [accept, setAccept] = useState(false);

    const createCookie = (name, value, day) => {
        if (name.length > 1) {
            if (day) {
                var date = new Date();
                date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
                var exp = "; expires=" + date.toGMTString();
            } else {
                var exp = "";
            }
            document.cookie = name + "=" + value + exp + ";path=/";
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
        if (readCookie("accept") === "true") {
            setAccept(true);
        }
    }, []);

    if (data) {
        return (
            <div className={"accept-cookies " + accept}>
                <h5>{data.bannerCookie}</h5>
                <div className="buttons">
                    <button
                        onClick={() => {
                            createCookie("accept", "true", 365);
                            setAccept(true);
                        }}
                    >
                        {data.btnBannerCookie}
                    </button>
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => setAccept(true)}
                    />
                </div>
            </div>
        );
    }
};

export default AcceptCookies;
