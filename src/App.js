import { useState,useEffect } from 'react';


import {clear,cloud,mist,rain,snow,errorImg, PointerIcon,SearchIcon,WindIcon,WaterIcon} from './assets'
function App() {
  const [city,setCity] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [descr, setDescr] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity,setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [error,setError] = useState(false);
  const [done, setDone] = useState(false);
  const [height,setHeight] = useState('h-[70px]');
  const [opacity, setOpacity] = useState('opacity-0');
  const [scale, setScale] = useState('scale-0');
  const _ApiKey = '5dfa69c7f0107dfd85b2fcbb2d10f13e';
  const onLoad = ()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${_ApiKey}`)
    .then(data => data.json())
    .then(data =>{
      if(data.cod ==='404'){
       setError(true);
       setDone(false);
      }else{
        setError(false);
        setTemperature(data.main.temp);
        setDescr(data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1));
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setDone(true);
        switch(data.weather[0].main){
          case 'Rain':
            setImgUrl(rain);
            break;
          case 'Clouds':
            setImgUrl(cloud);
            break;
          case 'Clear':
            setImgUrl(clear);
            break;
          case 'Snow':
            setImgUrl(snow);
            break;
          case 'Haze':
            setImgUrl(mist);
            break;
          default:
            setImgUrl('');
        }
      }
    })
  }
  const onSubmit =(e)=>{
    e.preventDefault();
    onLoad();
  }
  useEffect(()=>{
    if(done || error){
    setHeight('h-600px');
    setOpacity('opacity-100');
    setScale('scale-100');
    }
  },[done,error])

  const View = ()=>{
    if(done){
      return(
        <div className={`text-center font-poppins`}>
          <div className={`${scale} ${opacity} fadeIn`}>
          <img src={imgUrl} alt="weather" className='w-[60%] mx-auto'/>
          <h1 className='text-6xl font-semibold pt-6'>{temperature}</h1>
          <h2 className='pt-1 text-xl font-semibold '>{descr}</h2>
          </div>
          <div className={`flex justify-around py-5 ${scale} ${opacity}`}>
            <div className='flex items-center'>
              <WaterIcon style={{'width': '30px', 'height' : '30px', 'color' : '#06283D'}}/>
              <div className='flex flex-col ml-2 items-start'>
                <span className='text-xl font-semibold'>{humidity}</span>
                Humidity
              </div>
              
            </div>
            <div className='flex items-center'>
              <WindIcon style={{'width': '30px', 'height' : '30px', 'color' : '#06283D'}} />
              <div className='flex flex-col ml-2 items-start'>
                <span className='text-xl font-semibold'>{windSpeed}</span>
                Wind Speed
              </div>
            </div>
          </div>
        </div>
      )
      
    }
    else if(error){
      return(
        <div className={`${scale} ${opacity} animate-fade`}>
          <img src={errorImg} alt="Error IMG" className='w-[60%] mx-auto mt-[20px]' />
          <p className='py-[100px] text-center text-stone-900 text-lg'>Ooops! Invalid location :/</p>
        </div>
      )
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-[100vh] ">
      <div className={`${height} w-[370px] m-auto bg-white rounded-3xl overflow-hidden transition duration-700 ease-linear`}>
        <form onSubmit={onSubmit} className='flex items-center justify-center'>
          <PointerIcon  style={{'width': '30px', 'height' : '40px', 'color' : '#06283D'}}/>
            <input value={city} onChange={(e)=>{setCity(e.target.value)}} type="text" placeholder="Enter Your Location" className="my-[5px] text-stone-900 text-lg placeholder-gray-800 py-4 pl-3 focus:outline-none font-poppins"/>
            <button className='bg-blue-100 rounded-full p-1' > <SearchIcon  style={{'width': '30px', 'height' : '30px', 'color' : '#06283D'}}/> </button>
        </form>
        <View/>
       
        
      </div>
    </div>
  );
}

export default App;
