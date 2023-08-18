import React from 'react'

const PodcastRow = ({name, image, categories, onSelect}) => {

    return (
        <li>
            <a href="#" onClick={onSelect} className="d-flex align-items-center  p-2">
                <img src={image} alt="Image" className="img-fluid mr-2"/>
                <div className="podcaster">
                    <span className="d-block">{name}</span>
                    <span className="small">{categories.join(', ')}</span>
                </div>
            </a>
        </li>
)}

export default PodcastRow
