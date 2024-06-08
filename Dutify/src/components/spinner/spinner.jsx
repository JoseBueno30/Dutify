import React from 'react';
import "./spinner.css";

const Spinner = () => {
    return (
        <div className="spinner-wrapper" aria-label="Cargando contenido..." role="status">
            <div className='spinner'></div>
        </div>
    );
};

export default Spinner;