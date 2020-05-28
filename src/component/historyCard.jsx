import React from 'react';
import "../assets/historyCard.css"

const HistoryCard = ({ success, title, artist }) => {
    return (
            <div className={`history-card-container ${!success ? 'red' : 'green' }`}>
                <p className='history-card-title'>
                    {title}
                </p>
                <p className="history-card-artist">
                    {artist}
                </p>
            </div>
    )
}

export default HistoryCard
