import React, { useState, useEffect } from 'react';

const Layout = (props:any) => {
    const [count, setCount] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <h1>THIS IS THE LAYOUT AREA</h1>
            {props.Children}
        </div>
    );
}

export default Layout;