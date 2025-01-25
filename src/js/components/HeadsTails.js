import React from "react";
import { useState } from "react";

const HeadsTails = ({ data }) => {
    const [actualPiece, setActualPiece] = useState("head");
    const [animationProgress, setAnimationProgress] = useState(false);
    const [result, setResult] = useState(true);
    const [renderResult, setRenderResult] = useState(false);

    const animatePiece = () => {
        var head = document.querySelector(".head");
        var tail = document.querySelector(".tail");
        if (head && tail && !animationProgress) {
            setRenderResult(false);
            setAnimationProgress(true);
            var choise = Math.random() > 0.5;
            // true === head ; false === tail
            if (choise) {
                setResult(true);
                if (actualPiece === "head") {
                    head.style.animation = "startend 3s forwards";
                    tail.style.animation = "follow 3s forwards";
                }
                if (actualPiece === "tail") {
                    tail.style.animation = "startnone 3s forwards";
                    head.style.animation = "followend 3s forwards";
                }
            } else if (!choise) {
                setResult(false);
                if (actualPiece === "tail") {
                    tail.style.animation = "startend 3s forwards";
                    head.style.animation = "follow 3s forwards";
                }
                if (actualPiece === "head") {
                    head.style.animation = "startnone 3s forwards";
                    tail.style.animation = "followend 3s forwards";
                }
            }
            head.addEventListener("animationend", () =>
                reset(head, tail, choise)
            );
        }
    };

    const reset = (head, tail, choise) => {
        setRenderResult(true);
        setAnimationProgress(false);
        head.style.animation = "none";
        tail.style.animation = "none";
        if (choise) {
            setActualPiece("head");
            head.style.transform = "scale(1)";
            tail.style.transform = "scale(0)";
        } else {
            setActualPiece("tail");
            head.style.transform = "scale(0)";
            tail.style.transform = "scale(1)";
        }
        head.style.animation = null;
        tail.style.animation = null;
        head.removeEventListener("animationend", reset);
    };

    const renderTheResult = () => {
        if (renderResult) {
            if (result) {
                return (
                    <p><span>{data.heads}</span> {data.TextResult}</p>
                )
            } else {
                return (
                    <p><span>{data.tails}</span> {data.TextResult}</p>
                )
            }
        }
    }

    return (
        <div className="headtail" onClick={() => animatePiece()}>
            <div className="piece">
                <img
                    src="image/HeadsTails/head.png"
                    alt="head"
                    className="head unselectable"
                />
                <img
                    src="image/HeadsTails/tail.png"
                    alt="tail"
                    className="tail unselectable"
                />
            </div>
            {renderTheResult()}
            <button className="drawLots unselectable">{data.drawLots}</button>
        </div>
    );
};

export default HeadsTails;
