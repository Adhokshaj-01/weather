import React , {useState} from 'react';


function App() {

  
  function loading(){
  window.addEventListener('load' ,()=>{
    location()
  })
}loading();
const Api = {key:"1b4268c8f9e5139717a027e23452fd9b",
               base:"https://api.openweathermap.org/data/2.5/weather?"
              };

          
 //----getting---curret--locatino--//
 
              function location () {
                if(navigator.geolocation){
                  navigator.geolocation.getCurrentPosition(onclick);
                }else {
                  console.log("position not found 404!");
                }
              }
              function onclick (position){
               let lat = position.coords.latitude;
              let lon = position.coords.longitude;
                 fetch(`${Api.base}lat=${lat}&lon=${lon}&appid=${Api.key}&units=metric`)
                 .then(data => data.json())
     .then(result =>{ 
      setWeather(result);
      setQuery ('');
   }); 
               
            }
            
             
            //--------*-----------//
           
              
              //date--function//
  const dateB = (d)=> {
    let months = ["Jan" ,"Feb" , "Mar" , "April" , "May" , "June" , "July" , 
    "Aug" , "September" , "October" , "Nov" , "December"];
    let Days = [ "Sunday","Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" ];
  
     let day = Days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year = d.getFullYear();

   return `${day}  ${date}-${month}-${year}`
  }
  //-date--f-f//
  //--fetching --from api--//
  const [query , setQuery] = useState('');
  const [weather , setWeather] = useState({});
const search = evt => {
   if(evt.key === 'Enter'){
     fetch(`${Api.base}q= ${query}&units=metric&APPID=${Api.key}`)
     .then(res => res.json())
     .then(result =>{ 
      setWeather(result);
      setQuery ('');
     
   }); 
  }
} 
  return (
        
    <div className='main'> 
      <div className='weather'>
      <div className='input'>
        <input type="search" className='input-box'
         onChange={e => setQuery(e.target.value)}
         value = {query}
          onKeyPress={search}
         placeholder="Search City Name...."
         />
         <button type='submit' className='btn' onClick={location} title='Current location' >
           <span className="material-icons">
           location_on
           </span>
         </button>
          
        </div>
      
      
        <div className='info'>
        <div className="location-info">
          {(typeof weather.main != "undefined") ? (
            <div className='location-details'>
          <div className='location-name'>
            <h2> {weather.name}, {weather.sys.country}</h2>
          </div>
         
          <div className='temp-value'>
           <h1>{Math.round(weather.main.temp)} °c</h1>
          </div>
          
          <div className='time-date'>
           <h3>{dateB(new Date())}</h3>
          </div></div> 
          ) : (<div><div className="loading-pulse"></div></div>) }
        </div>
        <div className='weather-info'>
          <div className='icon'> 
          {(typeof weather.name != "undefined") ? (
           
         <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          />  
          ) : (
             <div><div className="loading-pulse"></div></div>
          )}
         
          </div>
          {(typeof weather.name != "undefined") ? (
            <div className='status'>
              <h3>{weather.weather[0].main}</h3>
          </div>) : (
             <div> </div>
          )}
        </div>
        </div>
         
          {(typeof weather.name != "undefined") ? (
             <div className='next-days'>
        <div className='humidity'>
        <span className="material-icons span">
thermostat
</span> <h1>{weather.main.humidity}%</h1>
        <h3>Humidity</h3>

        </div>
        <div className="wind">
        <span className="material-icons span1">
air
</span>
<h1>{Math.round(weather.wind.speed * 3.6)} Km/h</h1>
        <h3>Wind Speed</h3>
        </div>
        </div>):(<div><div className="loading-pulse">
              </div></div>)}
        
      </div> 
      <h3 className='footer'>Developed by &#169; <a href="https://twitter.com/H_Adhokshaj">Adhokshaj</a>
      </h3>
     
      </div> 
     
     
    );
}

export default App;
