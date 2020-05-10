import React, {Component} from 'react';

const History = ({history}) =>{
        return history.length > 0 && (
            history.map((i, index) =>
                <p style={!i.success ? {color:"red"} : {color:"green"}} key={index}>
                    {i.title}
                </p>
            )
        )
    }

export default History;