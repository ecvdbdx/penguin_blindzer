import React from 'react';
import {Transition} from 'react-spring/renderprops'
import HistoryCard from "./historyCard";

const History = ({history}) =>{
    const newHistory = history.slice(-4)
    return (
        <div className="history-wrapper">
            {newHistory.length > 0 && (
                newHistory.map((i) => (
                    <Transition
                    items={i} key={i.title}
                    from={{ transform: 'translate3d(-250px,0,0)' }}
                    enter={{ transform: 'translate3d(0px,0,0)' }}
                    leave={{ transform: 'translate3d(-250px,0,0)' }}>
                        {i => props =>
                        <div key= {i.item} style= {props}>
                            <HistoryCard
                                key = {i.title}
                                title = {i.title}
                                artist = {i.artist}
                                success = {i.success}
                            />
                        </div>
                        }
                    </Transition>
                ))
            )
            }
        </div>

    )
}

export default History;