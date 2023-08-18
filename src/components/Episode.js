import React from 'react'

const Episode = ({title, image, trackUrl}) => {
    return (
        <div className="d-block d-md-flex podcast-entry bg-white mb-5">
            <div className="image" style={{backgroundImage: `url('${image}')`}}></div>
            <div className="text">
                <h3 className="font-weight-light"><a href="single-post.html">{title}</a></h3>
                <div className="text-white mb-3"><span className="text-black-opacity-05"><small>By Mike Smith <span className="sep">/</span> 16 September 2017 <span className="sep">/</span> 1:30:20</small></span></div>
                <div className="player">
                    <audio id="player2" preload="none" controls controlsList="nodownload" style={{width: "100%"}}>
                        <source src={trackUrl} type="audio/mp3"/>
                    </audio>
                </div>
            </div>
        </div>
)}

export default Episode