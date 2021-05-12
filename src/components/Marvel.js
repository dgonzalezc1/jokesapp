import React, { useEffect, useState } from 'react'
import './Marvel.css';

function Marvel() {
    const [info, setInfo] = useState([]);
    const [online, setOnline] = useState();

    useEffect(() => {

        //console.log(navigator.onLine);
        if(!navigator.onLine){
            if(localStorage.getItem("info")===null){
                setOnline(false);
                console.log("Loading...");
            } else {
                const storedData = JSON.parse(localStorage.getItem("info"));
                setInfo(storedData);
                setOnline(true);
            }
        } 

        fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=23ff8988cbade81d9f4b9e25069f539a&hash=00de9a8f19b12510a7edb83b4a52d448")
        .then(result => result.json())
        .then((result) => {

            const data = [];
            for (var i = 0, max = result.data.results.length; i < max; i += 1) {
                data.push(result.data.results[i]);
            }
            setInfo([...data]);
            setOnline(true);
            localStorage.setItem("info", JSON.stringify(data));
            //console.log(localStorage.getItem("info"));

        });
    }, []);

    if(online===true){
        return (
            <div className="Marvel">
                <h1>Marvel Characters</h1>
                <div className="card-columns characters">
                {info.map(i =>{
                    return (
                    <div className="card" key={i.id}>
                            <img className="card-img-top" src={i.thumbnail.path+"/portrait_small."+i.thumbnail.extension} alt="Marvel character" />
                            <div className="card-body">
                                <h5 className="card-title">{i.name}</h5>
                                <p className="card-text">Código: {i.id}</p>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    } else{
        return (
            <div className="Marvel">
                <h1>Marvel Characters</h1>
                <h5>Loading....</h5>
            </div>
        )
    }
    
} 

export default Marvel
