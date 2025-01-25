import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

class Custom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            replace: [false, ""],
            LocalEqualCookies: "save",
            animation: [false, "", "", "hide"],
            itemChoise: "",
            mouse: [0, 0],
            items: [],
        };
    }

    componentDidMount() {
        var image = new Image();
        image.src = "./image/Easter-Egg/Martin_dance.gif";
        var result = document.querySelector(".result");
        result.style.transform = "scaleX(0)";
        result.style.opacity = "0";
        this.checkSaveList();
        this.readLocal();
        this.setState({
            name: this.props.name,
        });
    }

    componentDidUpdate() {
        if (this.state.name != this.props.name) {
            this.readLocal();
            this.setState({
                name: this.props.name,
            });
        }
        window.addEventListener("mousemove", (e) => {
            this.setState({
                mouse: [
                    e.x - window.innerWidth / 2,
                    e.y - window.innerHeight / 2,
                ],
            });
        });
    }

    readFile(e) {
        var inputImport = document.getElementById("file");

        var file = new FileReader();

        file.onload = () => {
            this.setState({
                items: file.result.split("#"),
            });
            inputImport.value = "";
        };
        file.readAsText(inputImport.files[0]);
    }

    readLocal() {
        if (localStorage.getItem("items")) {
            if (localStorage.getItem("items").split("#")[0] !== "") {
                this.setState({
                    items: localStorage.getItem("items").split("#"),
                });
                return localStorage.getItem("items").split("#");
            }
        }
    }

    createCookie(name, value, day) {
        if (name.length > 1) {
            if (day) {
                var date = new Date();
                date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
                var exp = "; expires=" + date.toGMTString();
            } else {
                var exp = "";
            }
            if (day === -1) {
                document.cookie = name + "=" + value + exp + ";path=/";
            } else {
                document.cookie =
                    name + "=" + value.join("#") + exp + ";path=/";
            }
        }
    }

    readCookie(name) {
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
    }

    deleteCookie(name) {
        this.deleteAll(false);
        this.createCookie(name, "", -1);
        location.reload();
    }

    onChange(e) {
        this.setState({
            userInput: e.target.value,
        });
    }

    addItem(e) {
        e.preventDefault();

        var spaceValue = this.state.userInput.split("");
        var space = 0;
        for (let letter in spaceValue) {
            if (this.state.userInput[letter] === " ") {
                space += 1;
            }
        }

        if (this.state.userInput && space !== this.state.userInput.length) {
            if (this.state.userInput.split("#").length === 1) {
                document.getElementById("error").textContent = ""
                if (!this.state.replace[0]) {
                    var local = [...this.state.items, this.state.userInput].join(
                        "#"
                    );
                    localStorage.setItem("items", local);
                    this.setState({
                        userInput: "",
                        items: [...this.state.items, this.state.userInput],
                    });
                } else {
                    this.replaceItem(this.state.replace[1], this.state.userInput);
                }
            }
            else {
                document.getElementById("error").textContent = "You cannot use #"
            }
        } else {
            if (this.state.replace[0]) {
                this.setState({
                    replace: [false, ""],
                });
            }
        }
        this.checkSaveList();
    }

    deleteItem(item) {
        const array = this.state.items;
        const index = array.indexOf(item);
        array.splice(index, 1);
        this.setState({
            items: array,
        });
        localStorage.setItem("items", array.join("#"));
        this.setState({
            replace: [false, ""],
            userInput: "",
        });
        this.checkSaveList();
    }

    replaceItem(item, value) {
        const array = this.state.items;
        const index = array.indexOf(item);
        array.splice(index, 1, value);
        this.setState({
            items: array,
            userInput: "",
            replace: [false, ""],
        });
        localStorage.setItem("items", this.state.items.join("#"));
        this.checkSaveList();
    }

    replaceMode(item) {
        this.setState({
            userInput: item,
            replace: [true, item],
        });
    }

    deleteAll(check = true) {
        this.setState({
            replace: [false, ""],
            items: [],
        });
        localStorage.setItem("items", "");
        if (check) {
            this.checkSaveList();
        }
    }

    checkSaveList() {
        if (this.props.name) {
            if (
                localStorage.getItem("items") ===
                this.readCookie(this.props.name)
            ) {
                this.setState({
                    LocalEqualCookies: "save",
                });
            } else {
                this.setState({
                    LocalEqualCookies: "not-save",
                });
            }
        }
    }

    Save() {
        if (this.readCookie("accept") === "true") {
            this.createCookie(this.props.name, this.state.items, 365);
        }
        this.checkSaveList();
    }

    renderDeleteAll() {
        if (this.state.items.length > 1) {
            if (this.props.name) {
                return (
                    <button
                        className="delete-all button-style"
                        onClick={this.deleteAll.bind(this)}
                        style={{ marginRight: 30 + "px" }}
                    >
                        {this.props.data.buttonDeleteAll}
                    </button>
                );
            } else {
                return (
                    <button
                        className="delete-all button-style"
                        onClick={this.deleteAll.bind(this)}
                        style={{ marginRight: 0 }}
                    >
                        {this.props.data.buttonDeleteAll}
                    </button>
                );
            }
        }
    }

    renderEdit() {
        if (this.props.name) {
            return (
                <div>
                    <button
                        className={
                            "save-cookie button-style " +
                            this.state.LocalEqualCookies
                        }
                        onClick={this.Save.bind(this)}
                    >
                        {this.props.data["saveCookie"]}
                    </button>
                    <button
                        className="delete-cookie button-style"
                        onClick={this.deleteCookie.bind(this, this.props.name)}
                    >
                        {this.props.data["deleteCookie"]}
                    </button>
                    <button
                        className="restart-cookie button-style"
                        onClick={() => location.reload()}
                    >
                        {this.props.data["resList"]}
                    </button>
                </div>
            );
        }
    }

    renderList() {
        return this.state.items.map((item) => {
            if (
                item.indexOf(".jpg") !== -1 ||
                item.indexOf(".png") !== -1 ||
                item.indexOf(".gif") !== -1 ||
                item.indexOf(".jpeg") !== -1
            ) {
                return (
                    <div className="item">
                        <img key={item} src={item} />
                        <button
                            className="edit"
                            onClick={this.replaceMode.bind(this, item)}
                        >
                            <FontAwesomeIcon icon={faPen} size="xl" />
                        </button>
                        <button
                            className="cross"
                            onClick={this.deleteItem.bind(this, item)}
                        >
                            <FontAwesomeIcon icon={faXmark} size="2xl" />
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="item">
                        <p key={item}>{item}</p>
                        <button
                            className="edit"
                            onClick={this.replaceMode.bind(this, item)}
                        >
                            <FontAwesomeIcon icon={faPen} size="xl" />
                        </button>
                        <button
                            className="cross"
                            onClick={this.deleteItem.bind(this, item)}
                        >
                            <FontAwesomeIcon icon={faXmark} size="2xl" />
                        </button>
                    </div>
                );
            }
        });
    }

    renderCreateList() {
        if (!this.props.name && this.state.items.length > 1) {
            return (
                <div className="pos">
                    <button
                        className={
                            "navigate-to-create-list " + this.state.animation[1]
                        }
                    >
                        <NavLink to={"/create-list"}>
                            <FontAwesomeIcon
                                icon={faPlus}
                                size="3x"
                                className="create-list"
                            ></FontAwesomeIcon>
                            <p>{this.props.data["createList"]}</p>
                        </NavLink>
                    </button>
                </div>
            );
        }
    }

    renderDrawLots() {
        if (this.state.items.length > 1 && !this.state.animation[0]) {
            return (
                <button
                    className="drawLots unselectable"
                    onClick={this.animateImages.bind(this)}
                >
                    {this.props.data.drawLots}
                </button>
            );
        }
    }

    renderResult() {
        if (this.state.itemChoise.toLowerCase() === "martin_bg_35") {
            return (
                <h3 className="result">
                    <img src="./image/Easter-Egg/Martin_dance.gif" />{" "}
                    {this.props.data["TextResult"]}
                </h3>
            );
        } else {
            if (
                this.state.itemChoise.indexOf(".jpg") !== -1 ||
                this.state.itemChoise.indexOf(".png") !== -1 ||
                this.state.itemChoise.indexOf(".gif") !== -1 ||
                this.state.itemChoise.indexOf(".jpeg") !== -1
            ) {
                return (
                    <h3 className="result">
                        <img src={this.state.itemChoise} />{" "}
                        {this.props.data["TextResult"]}
                    </h3>
                );
            } else {
                return (
                    <h3 className="result">
                        <span>{this.state.itemChoise}</span>{" "}
                        {this.props.data["TextResult"]}
                    </h3>
                );
            }
        }
    }

    renderAfterAnimation() {
        if (this.state.items.length < 2) {
            return (
                <div className={"after-animate " + this.state.animation[3]}>
                    <button
                        className="button-style"
                        onClick={this.reset.bind(this)}
                    >
                        {this.props.data["modif"]}
                    </button>
                </div>
            );
        } else {
            return (
                <div className={"after-animate " + this.state.animation[3]}>
                    <button
                        className="button-style"
                        onClick={this.reset.bind(this)}
                    >
                        {this.props.data["modif"]}
                    </button>
                    <button
                        className="button-style"
                        onClick={this.animateImages.bind(this)}
                    >
                        {this.props.data["OtherResult"]}
                    </button>
                    <button
                        className="button-style"
                        onClick={this.resetWithoutItem.bind(this)}
                    >
                        {this.props.data["startAgainWithout"]}{" "}
                        <span>{this.state.itemChoise}</span>
                    </button>
                </div>
            );
        }
    }

    resetWithoutItem() {
        this.deleteItem(this.state.itemChoise);
        this.animateImages();
    }

    reset() {
        var result = document.querySelector(".result");
        result.style.transform = "scaleX(0)";
        result.style.height = "0";
        result.style.opacity = "0";
        var itemsPaper = document.querySelectorAll(".item");
        var containerItems = document.querySelector(".container-items");
        containerItems.style.display = "flex";
        for (var i = 0; i < itemsPaper.length; i++) {
            itemsPaper[i].style.transitionDelay = `0ms`;
            itemsPaper[i].style.transform = "translateY(0px)";
            itemsPaper[i].style.background = "var(--color-paper)";
            itemsPaper[i].children[0].style.marginRight = "10px";
            itemsPaper[i].children[1].style.display = "block";
            itemsPaper[i].children[2].style.display = "block";
        }
        this.setState({
            animation: [false, "", "", "hide"],
        });
    }

    renderImages() {
        if (this.state.items.length < 1 && !this.state.animation[0]) {
            return (
                <div className="images">
                    <img
                        src="image/Plouaf-Plouaf/Canard.svg"
                        alt="Canard"
                        className="canard unselectable"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Machine_a_papier.svg"
                        alt="Machine_a_papier"
                        className="machine_a_papier unselectable"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Reflet.svg"
                        alt="reflet"
                        className="reflet"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Eyes.svg"
                        alt="Eyes"
                        className="eyes"
                        style={{
                            transform: `translate(${
                                this.state.mouse[0] * 0.02
                            }%, ${this.state.mouse[1] * 0.15}%)`,
                        }}
                    />
                    <div className="papers">
                        {this.state.items.map((item, key) => {
                            var index = key % 5;
                            if (index == 0) {
                                index = 5;
                            }
                            return (
                                <img
                                    src="image/Plouaf-Plouaf/Papier.svg"
                                    alt="papier"
                                    className={
                                        "paper" +
                                        String(index) +
                                        " paper unselectable"
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            );
        } else if (this.state.animation[0]) {
            return (
                <div className="images">
                    <img
                        src="image/Plouaf-Plouaf/Canard.svg"
                        alt="Canard"
                        className="canard unselectable"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Machine_a_papier.svg"
                        alt="Machine_a_papier"
                        className="machine_a_papier unselectable"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Reflet.svg"
                        alt="reflet"
                        className="reflet"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Eyes.svg"
                        alt="Eyes"
                        className="eyes"
                        style={{
                            transform: `translate(${
                                this.state.mouse[0] * 0.02
                            }%, ${this.state.mouse[1] * 0.15}%)`,
                        }}
                    />
                    <div className="papers">
                        {this.state.items.map((item, key) => {
                            var index = key % 5;
                            if (index == 0) {
                                index = 5;
                            }
                            return (
                                <img
                                    src="image/Plouaf-Plouaf/Papier.svg"
                                    alt="papier"
                                    className={
                                        "paper" +
                                        String(index) +
                                        " paper unselectable"
                                    }
                                />
                            );
                        })}
                        <img
                            src="image/Plouaf-Plouaf/Papier.svg"
                            alt="papier"
                            className="paper-result unselectable"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="images hide">
                    <img
                        src="image/Plouaf-Plouaf/Canard.svg"
                        alt="Canard"
                        className="canard unselectable"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Machine_a_papier.svg"
                        alt="Machine_a_papier"
                        className="machine_a_papier unselectable"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Reflet.svg"
                        alt="reflet"
                        className="reflet"
                    />
                    <img
                        src="image/Plouaf-Plouaf/Eyes.svg"
                        alt="Eyes"
                        className="eyes"
                        style={{
                            transform: `translate(${
                                this.state.mouse[0] * 0.02
                            }%, ${this.state.mouse[1] * 0.15}%)`,
                        }}
                    />
                    <div className="papers">
                        {this.state.items.map((item, key) => {
                            var index = key % 5;
                            if (index == 0) {
                                index = 5;
                            }
                            return (
                                <img
                                    src="image/Plouaf-Plouaf/Papier.svg"
                                    alt="papier"
                                    className={
                                        "paper" +
                                        String(index) +
                                        " paper unselectable"
                                    }
                                />
                            );
                        })}
                        <img
                            src="image/Plouaf-Plouaf/Papier.svg"
                            alt="papier"
                            className="paper-result unselectable"
                        />
                    </div>
                </div>
            );
        }
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    animateImages() {
        var index = this.getRandom(0, this.state.items.length);

        this.setState({
            animation: [true, "hide", "position", "hide"],
        });

        var paper1 = document.querySelectorAll(".paper1");
        var paper2 = document.querySelectorAll(".paper2");
        var paper3 = document.querySelectorAll(".paper3");
        var paper4 = document.querySelectorAll(".paper4");
        var paper5 = document.querySelectorAll(".paper5");
        var paperResult = document.querySelector(".paper-result");
        var result = document.querySelector(".result");
        var containerItems = document.querySelector(".container-items");
        var itemsPaper = document.querySelectorAll(".item");

        if (window.innerWidth < 800) {
            containerItems.style.display = "none";
        } else {
            containerItems.style.display = "flex";

            for (var j = 0; j < itemsPaper.length; j++) {
                itemsPaper[j].style.transitionDelay = `0`;
                itemsPaper[j].style.transform = "translateY(0px)";
                itemsPaper[j].style.background = "var(--color-paper)";
                itemsPaper[j].children[0].style.margin = "0";
                itemsPaper[j].children[1].style.display = "none";
                itemsPaper[j].children[2].style.display = "none";
            }
        }

        result.style.transform = "scaleX(0)";
        result.style.height = "0";
        result.style.opacity = "0";

        var resetItem = setTimeout(() => {
            if (this.state.items.length > 10) {
                var time = 2;
            } else {
                var time = 3;
            }

            var addDelay = (time * 1000) / this.state.items.length;
            var delay = addDelay;

            if (window.innerWidth > 800 || window.innerWidth === 800) {
                let elementsChoise = [];

                var placeChoise = this.getRandom(
                    0,
                    Math.round(this.state.items.length * 0.9)
                );
                for (
                    i = 0;
                    i < Math.round(this.state.items.length * 0.9);
                    i++
                ) {
                    if (i !== placeChoise) {
                        var verif = 1;
                        while (verif > 0) {
                            verif = 0;

                            var n = this.getRandom(0, this.state.items.length);

                            for (i = 0; i < elementsChoise.length; i++) {
                                if (elementsChoise[i] == n) {
                                    verif += 1;
                                }
                            }

                            if (verif == 0) {
                                elementsChoise.push(n);
                            }
                        }
                    } else {
                        elementsChoise.push(index);
                    }
                }

                for (var i = 0; i < elementsChoise.length; i++) {
                    itemsPaper[elementsChoise[i]].style.transform =
                        "translateY(-15px)";
                    itemsPaper[
                        elementsChoise[i]
                    ].style.transitionDelay = `${delay}ms`;
                    itemsPaper[elementsChoise[i]].style.background =
                        "var(--color-green)";
                    delay += addDelay;
                }
            }

            paperResult.style.transform = "scale(0)";
            for (var p = 0; p < paper1.length; p++) {
                paper1[p].style.animation = "paper1 " + time + "s 900ms";
            }
            for (var p = 0; p < paper2.length; p++) {
                paper2[p].style.animation = "paper2 " + time + "s 900ms";
            }
            for (var p = 0; p < paper3.length; p++) {
                paper3[p].style.animation = "paper3 " + time + "s 900ms";
            }
            for (var p = 0; p < paper4.length; p++) {
                paper4[p].style.animation = "paper4 " + time + "s 900ms";
            }
            for (var p = 0; p < paper5.length; p++) {
                paper5[p].style.animation = "paper5 " + time + "s 900ms";
            }

            var papers = document.querySelectorAll(".paper");
            papers[0].addEventListener("animationend", () => {
                this.setState({
                    itemChoise: this.state.items[index],
                });
                paperResult.style.transform = "scale(1)";
                var waitting = setTimeout(() => {
                    if (window.innerWidth > 800 || window.innerWidth === 800) {
                        for (var i = 0; i < itemsPaper.length; i++) {
                            if (index !== i) {
                                itemsPaper[i].style.transform =
                                    "translateY(0px)";
                                itemsPaper[i].style.transitionDelay = `0ms`;
                                itemsPaper[i].style.background =
                                    "var(--color-paper)";
                            } else {
                                itemsPaper[i].style.transform =
                                    "translateY(-15px)";
                                itemsPaper[i].style.transitionDelay = `0ms`;
                                itemsPaper[i].style.background =
                                    "var(--color-green)";
                            }
                        }
                    }
                    this.setState({
                        animation: [true, "hide", "position", ""],
                    });
                    for (var p = 0; p < paper1.length; p++) {
                        paper1[p].style.animation = "none";
                    }
                    for (var p = 0; p < paper2.length; p++) {
                        paper2[p].style.animation = "none";
                    }
                    for (var p = 0; p < paper3.length; p++) {
                        paper3[p].style.animation = "none";
                    }
                    for (var p = 0; p < paper4.length; p++) {
                        paper4[p].style.animation = "none";
                    }
                    for (var p = 0; p < paper5.length; p++) {
                        paper5[p].style.animation = "none";
                    }
                    result.style.transform = "scaleX(1)";
                    result.style.height = "100%";
                    result.style.opacity = "1";
                }, 1000);
            });
        }, 300);
    }

    render() {
        return (
            <div className="custom">
                <h2 className={this.state.animation[1]}>
                    {this.props.data.h2.ct}{" "}
                    <span>{this.props.data.drawLots}</span>
                </h2>
                <form className={this.state.animation[1]}>
                    <input
                        type="text"
                        value={this.state.userInput}
                        className="input-to-create-element"
                        placeholder={this.props.data.inputPlaceholder}
                        onChange={this.onChange.bind(this)}
                    />
                    <button onClick={this.addItem.bind(this)}>
                        <i className="fa fa-plus" aria-hidden="true">
                            <FontAwesomeIcon icon={faPlus} size="2xl" />
                        </i>
                    </button>
                </form>
                <p id="error"></p>
                <div className={"buttons-edit " + this.state.animation[1]}>
                    {this.renderDeleteAll()}
                    {this.renderEdit()}
                </div>
                <div className={"container-items"}>{this.renderList()}</div>
                {this.renderCreateList()}
                {this.renderDrawLots()}
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => {
                        this.readFile(e);
                    }}
                />
                <label htmlFor="file" className="file " id="file">
                    <svg
                        viewBox="0 0 620 622"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M25 388.5H435.5M435.5 388.5L340 491M435.5 388.5L340 286.5"
                            strokeWidth="50"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M184 281.5V60.5C184 25 184 25 229.5 25L470 25L595 150V546C595 596.5 595 596.5 559 596.5H229.5C184 596.5 184 596.5 184 546L184 491"
                            strokeWidth="50"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M579.351 151.015L451.335 39.0001L451.335 151.015L579.351 151.015Z"
                            id="triangle"
                        />
                        <path d="M451.335 39.0001L471.091 16.4229C462.232 8.67134 449.658 6.81697 438.939 11.681C428.219 16.5451 421.335 27.2287 421.335 39.0001L451.335 39.0001ZM579.351 151.015L579.351 181.015C591.849 181.015 603.038 173.266 607.434 161.567C611.83 149.867 608.512 136.668 599.106 128.438L579.351 151.015ZM451.335 151.015L421.335 151.015L421.335 181.015L451.335 181.015L451.335 151.015ZM431.58 61.5773L559.596 173.592L599.106 128.438L471.091 16.4229L431.58 61.5773ZM421.335 39.0001L421.335 151.015L481.335 151.015L481.335 39.0001L421.335 39.0001ZM451.335 181.015L579.351 181.015L579.351 121.015L451.335 121.015L451.335 181.015Z" />
                    </svg>
                </label>
                <div className={"confetti " + this.state.animation[3]}>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                </div>
                {this.renderResult()}
                <div className={"container-images " + this.state.animation[2]}>
                    {this.renderImages()}
                </div>
                {this.renderAfterAnimation()}
            </div>
        );
    }
}

export default Custom;
