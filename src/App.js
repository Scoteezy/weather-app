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
  const [xlheight, setXlHeight] = useState('h-[98px]')
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
    if(city!==''){
      onLoad();
    }
  }
  useEffect(()=>{
    if(done || error){
    setHeight('h-600px');
    setXlHeight('h-650px');
    setOpacity('opacity-100');
    setScale('scale-100');
    }
  },[done,error])

  const View = ()=>{
    if(done){
      return(
        <div className={`text-center font-poppins`}>
          <div className={`${scale} ${opacity} fadeIn`}>
          <img src={imgUrl} alt="weather" className='w-[60%] xl:w-[70%] mx-auto'/>
          <h1 className='text-6xl font-semibold xl:text-7xl pt-6'>{temperature}</h1>
          <h2 className='pt-1 text-xl font-semibold xl:text-3xl'>{descr}</h2>
          </div>
          <div className={`flex justify-around py-5 ${scale} ${opacity}`}>
            <div className='flex items-center'>
              <WaterIcon style={{'width': '30px', 'height' : '30px', 'color' : '#06283D'}}/>
              <div className='flex flex-col ml-2 items-start'>
                <span className='text-xl xl:text-5xl font-semibold'>{humidity}</span>
                <span className='xl:text-2xl'>Humidity</span> 
              </div>
              
            </div>
            <div className='flex items-center'>
              <WindIcon style={{'width': '30px', 'height' : '30px', 'color' : '#06283D'}} />
              <div className='flex flex-col ml-2 items-start'>
                <span className='text-xl xl:text-5xl font-semibold'>{windSpeed}</span>
                <span className='xl:text-2xl'>Wind Speed</span>
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
      <div className={`xl:${xlheight} ${height}  w-full xs:w-[370px] xl:w-[600px] m-auto bg-white rounded-3xl overflow-hidden transition duration-700 ease-linear`}>
        <form onSubmit={onSubmit} className='flex items-center justify-center xl'>
          <PointerIcon  style={{'width': '30px', 'height' : '40px', 'color' : '#06283D'}}/>
            <input value={city} onChange={(e)=>{setCity(e.target.value)}} type="text" placeholder="Enter Your Location" className="xl:text-3xl xl:my-[15px] my-[5px] text-stone-900 text-lg placeholder-gray-800 py-4 pl-3 focus:outline-none font-poppins"/>
            <button className='bg-blue-100 rounded-full p-1 hover:bg-blue-300 transition-all duration-700' > <SearchIcon style={{'width': '30px', 'height' : '30px', 'color' : '#06283D'}}/> </button>
        </form>
        <View/>
       
        
      </div>
    </div>
  );
}

export default App;
