import React from 'react';

const HomePage = () => {
    return (
        <div className="center-align" style={{ marginTop: '200px' }}>
            <h3>Welcome</h3>
            <button className="waves-effect waves-light btn" onClick={() => console.log('foo')}>Click</button>
        </div>
    );
};

export default {
    component: HomePage
};
