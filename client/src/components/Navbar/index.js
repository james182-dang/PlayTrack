import React from 'react';

function Navigation(props) {

    return (
        <header className='flex-wrap'>
            <h1>
                <a href='#home' onClick={() => props.setCurrentDisplay('Home')}>PlayTrack</a>
            </h1>
            <nav className='d-flex flex-wrap'>
                <ul className='d-flex justify-content-between mb-0'>

                </ul>
            </nav>
        </header>
    );
}

export default Navigation;