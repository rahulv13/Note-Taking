import React from "react";

const EmptyCard = ({ imgSrc, messsage }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-60">
            <img src={imgSrc} alt="No Notes" className="w-60" />

            <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
            {messsage}
            </p>
        </div>
    )
}

export default EmptyCard;