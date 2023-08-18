import React, {useState, useEffect} from "react";
import {createRoot} from "react-dom/client";
import Header from "./components/Header";
import PodcastRow from "./components/PodcastRow";
import Episode from "./components/Episode";
import axios from 'axios';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [podcasts, setPodcasts] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    /*

    const episodes = [
        {id: 0, title: 'track 1', image: '/images/img_1.jpg', trackUrl: 'http://hwcdn.libsyn.com/p/e/2/d/e2d49676d65218ec/p1541a.mp3?c_id=84308228&cs_id=84308228&expiration=1601254668&hwt=ccab3206052417d0e901722ab00c9c88'},
        {id: 1, title: 'track 2', image: '/images/img_2.jpg', trackUrl: 'http://hwcdn.libsyn.com/p/e/2/d/e2d49676d65218ec/p1541a.mp3?c_id=84308228&cs_id=84308228&expiration=1601254668&hwt=ccab3206052417d0e901722ab00c9c88'},
        {id: 2, title: 'track 3', image: '/images/img_3.jpg', trackUrl: 'http://hwcdn.libsyn.com/p/e/2/d/e2d49676d65218ec/p1541a.mp3?c_id=84308228&cs_id=84308228&expiration=1601254668&hwt=ccab3206052417d0e901722ab00c9c88'},
        {id: 3, title: 'track 4', image: '/images/img_4.jpg', trackUrl: 'http://hwcdn.libsyn.com/p/e/2/d/e2d49676d65218ec/p1541a.mp3?c_id=84308228&cs_id=84308228&expiration=1601254668&hwt=ccab3206052417d0e901722ab00c9c88'},
        {id: 4, title: 'track 5', image: '/images/img_5.jpg', trackUrl: 'http://hwcdn.libsyn.com/p/e/2/d/e2d49676d65218ec/p1541a.mp3?c_id=84308228&cs_id=84308228&expiration=1601254668&hwt=ccab3206052417d0e901722ab00c9c88'}
    ];
    */
    const onInputTyped = (e) => {
        //console.log('input typed: '+e.target.value);
        setSearchTerm(e.target.value);
    }

    const onSearchBtnClicked = (e) => {
        //console.log('search btn clicked: '+searchTerm)

        axios({
            url:'/search',
            method: 'POST',
            data: {
                term: searchTerm.trim().toLocaleLowerCase()
            },
            options: {
                headers: {Accept: 'application/json'}
            }
        })
        .then(({data}) => {
            //console.log('podcasts: '+ JSON.stringify(data));
            setPodcasts(data.podcasts);
        })
        .catch(err => {
        
        })

    }

    const selectPodcast = (podcast, e) => {
        e.preventDefault()
        console.log('selected podcast: '+JSON.stringify(podcast));
        setSelectedPodcast(podcast);
    }

    useEffect(() => {
        console.log('selected podcast changed: '+JSON.stringify(selectedPodcast));
        if(!selectedPodcast) return;
        const url = `/feed?url=${selectedPodcast.feed}`;
        axios({
            url,
            method: 'GET',
        })
        .then(({data}) => {
            console.log('FEED: '+ JSON.stringify(data));
            const {item} = data;
            const tracks = item.map((track, index) => {
                return {
                    id: index,
                    title: track.title[0],
                    image: selectedPodcast.image,
                    trackUrl: track.enclosure[0]['$'].url
                }
            })
            setEpisodes(tracks);
        })
        .catch(err => {
        
        })        
    }, [selectedPodcast]);

    return (
        <div className="site-wrap">
            <Header />
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="featured-user  mb-5 mb-lg-0">
                                <h3 className="mb-2">Search Podcasts</h3>
                                <div style={{display: "flex"}}>
                                    <input onChange={onInputTyped} type="text" style={{height: 32}} className="form-control mb-4" />
                                    <button onClick={onSearchBtnClicked} className="btn btn-info p-1 ml-2" style={{height: 32}}>GO!</button>
                                </div>
                                <ul className="list-unstyled">
                                    {podcasts.map(podcast => <PodcastRow key={podcast.id} {...podcast} onSelect={(e) => selectPodcast(podcast, e)}/>)}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            {episodes.map(episode => <Episode key={episode.id} {...episode}/>)}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);