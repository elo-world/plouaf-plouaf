import React from "react";

const About = ({ data }) => {
    if (data) {
        return (
            <div className="about">
                <div className="paragraph">
                    <h2>{data.about.contactMe.title}</h2>
                    <p>{data.about.contactMe.ct} plouafplouaf[@]gmail.com ({data.about.contactMe.replace})</p>
                </div>
                <div className="paragraph">
                    <h2>{data.about.about.title}</h2>
                    <p>{data.about.about.ct1}</p>
                    <p>{data.about.about.ct2}</p>
                    <p>{data.about.about.ct3}</p>
                    <p>
                        {data.about.about.ct4}
                        <a target={"_blank"} href="https://replit.com/@Elouanmalo/Plouaf-Plouaf">
                            https://replit.com/@Elouanmalo/Plouaf-Plouaf
                        </a>
                    </p>
                    <p>
                        {data.about.about.ct5}
                        <a target={"_blank"} href="https://plouf-plouf.fr/">Plouf Plouf</a>
                    </p>
                </div>
                <div className="paragraph">
                    <h2>{data.about.works.title}</h2>
                    <p>{data.about.works.ct}</p>
                </div>
                <div className="paragraph">
                    <h2>{data.about.people}</h2>
                    <ul>
                        <li>
                            <a target={"_blank"} href="https://www.instagram.com/solal_bt/">
                                Solal
                            </a>
                        </li>
                        <li>
                            <a target={"_blank"} href="https://www.instagram.com/fransez_olivier/">
                                Fransez
                            </a>
                        </li>
                        <li>Alban</li>
                        <li>
                            <a target={"_blank"} href="https://www.instagram.com/martincll_/">
                                Martin (
                            </a>
                            <a target={"_blank"} href="https://www.youtube.com/channel/UCaGm1WYbgOSVAVHtCvh_0UA">
                                martin_bg_35
                            </a>
                            )
                        </li>
                        <li>
                            <a target={"_blank"} href="https://www.instagram.com/solann.vcl/">
                                Solann
                            </a>
                        </li>
                        <li>
                            <a target={"_blank"} href="https://www.instagram.com/briec_btc/">
                                Briec
                            </a>
                        </li>
                        <li>
                            <a target={"_blank"} href="https://www.instagram.com/gaspard_audt/">
                                Gaspard
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="paragraph">
                    <h2>{data.about.cgu.title}</h2>
                    <p>{data.about.cgu.ct}</p>
                </div>
                <p className="last unselectable">
                    &copy;Plouaf Plouaf ! gant Elouan Convenant Planchet
                </p>
            </div>
        );
    }
};

export default About;
