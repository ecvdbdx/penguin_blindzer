import React from 'react';
import HistoryCard from "./historyCard";

const History = ({history}) =>{
    console.log(history)
    return (
        <div className="history-wrapper">
            {history.length > 0 && (
                history.map((i, index) => (

                    <HistoryCard
                        key = {index}
                        title = {i.title}
                        artist = {i.artist}
                        success = {i.success}
                    />
                ))
            )
            }
        </div>

    )
}

export default History;