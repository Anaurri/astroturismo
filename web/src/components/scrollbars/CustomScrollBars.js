import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import '../../index.css';

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: 'rgba(35, 49, 86, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

function CustomScrollbars() {
    return (
        <div className="App " autoHide autoHideTimeout={500} autoHideDuration={200}>
            <Scrollbars
                renderThumbHorizontal={renderThumb}
                renderThumbVertical={renderThumb}
                {...props}
            />
        </div>
    );
}



export default CustomScrollbars;