import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import cityImg from './city.jpg';

function App() {
    const [current,SetCurrent] = useState({});
    const [daily,SetDaily] = useState([]);

    const lat = -6.200000;
    const lon = 106.816666;
    const getData = async() =>{
        try {
            
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=metric&appid=2817363992dd0fc0dc050f32d111f65e`,{
                headers:{
                    'Content-Type' : 'aplication/json'  
                }
            })
            SetCurrent(response.data.current);
            console.log(response.data);
            SetDaily(response.data.daily)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    const convertDate = (utc) =>{

        const milliseconds = utc * 1000 

        const dateObject = new Date(milliseconds)

        const dateFormat = dateObject.toLocaleString('en-GB', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});

        return dateFormat;
    }

    useEffect(()=>{
        getData()
    },[]);

    return (
        <div className="widget">
            <div className="left-panel panel">
                <div className="date">
                    {convertDate(current.dt)}
                </div>
                <div className="city">
                    Jakarta
                </div>
                <div className="temp">
                    <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="80" />
                    {Math.floor(current.temp)}&deg;<span>c</span>
                </div>
            </div>
            <div className="right-panel panel">
                <img src={cityImg} alt="" width="160" />
            </div>
        {   daily ?
            daily.map(data =>{
                return(
                    <div className="week">
                        <div className="date">
                        {convertDate(data.dt)}
                        </div>
                        <div className="img-status">
                        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" width="40" />
                        </div>
                        <div className="temperature">
                        {data.temp.day}&deg;<span>c</span>
                        </div>
                    </div>
                )
            }) : <span>Loading . . .</span>
        }
                
    </div>
  );
}

export default App;
