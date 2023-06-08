import React from "react";

const Footer = () => {
    return (
        <>
            <div className="sticky-bottom text-center text-lg-start">
                <div className="text-center p-3 text-white">© {new Date().getFullYear()} Katja Kontio.</div>
            </div>
        </>
    );
};

export default Footer;
