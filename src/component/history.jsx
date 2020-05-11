import React from 'react';
import HistoryCard from "./historyCard";

const History = ({history}) =>{
    const newHistory = history.slice(-4)
    return (
        <div className="history-wrapper">
            {newHistory.length > 0 && (
                newHistory.map((i, index) => (

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