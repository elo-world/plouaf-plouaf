import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ language, data, actual }) => {
    const [page, setPage] = useState(["selected", "none"]);

    const actualPage = () => {
        if (window.location.pathname === "/" && page !== ["selected", "none"]) {
            setPage(["selected", "none"]);
        }
        if (
            window.location.pathname === "/about" &&
            page !== ["none", "selected"]
        ) {
            setPage(["none", "selected"]);
        }
    };

    useEffect(() => {
        actualPage();
    }, []);

    if (data) {
        return (
            <nav onClick={() => actualPage()}>
                <h1 className="unselectable">{data.title}</h1>
                <div className="bar">
                    <div className={"page home " + page[0]}>
                        <NavLink to={"/"}>
                            <svg
                                viewBox="0 0 606 533"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M30 251L94 197.193M576 251L312.845 34.5644C305.4 28.4417 294.648 28.4998 287.27 34.7026L94 197.193M94 197.193V436C94 502.5 94 502.5 164 502.5C225.6 502.5 386.667 502.5 459.5 502.5C507.5 502.5 507.5 502.5 507.5 436C507.5 406.732 506.667 264.628 507.5 197.193"
                                    strokeWidth="60"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </NavLink>
                    </div>
                    <div className={"page about " + page[1]}>
                        <NavLink to={"/about"}>
                            <svg
                                viewBox="0 0 798 623"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M219.556 387.237C195.304 390.57 179.828 415.674 171.518 437.914C167.144 449.62 176.523 461 189.02 461H392.713C405.932 461 414.957 448.519 408.847 436.798C397.65 415.314 378.963 389.768 357.736 387.237C324.197 383.238 253.185 382.616 219.556 387.237Z"
                                    fill="#2D334A"
                                    strokeWidth="70"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M510 201H654"
                                    strokeWidth="70"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M510 312H654"
                                    strokeWidth="70"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M713 35H85C57.3858 35 35 57.3858 35 85V538C35 565.614 57.3857 588 85 588H713C740.614 588 763 565.614 763 538V85C763 57.3858 740.614 35 713 35Z"
                                    strokeWidth="70"
                                />
                                <ellipse
                                    cx="293"
                                    cy="224.5"
                                    rx="94"
                                    ry="93.5"
                                />
                            </svg>
                        </NavLink>
                    </div>
                    <div className="select">
                        <select
                            name="Language"
                            id="language"
                            value={actual}
                            onChange={(e) => language(e.target.value)}
                        >
                            <option value="bzh">BZH</option>
                            <option value="cor">COR</option>
                            <option value="fra">FRA</option>
                            <option value="eng">ENG</option>
                            <option value="ita">ITA</option>
                            <option value="esp">ESP</option>
                            <option value="deu">DEU</option>
                        </select>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Nav;
