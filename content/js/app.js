
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   const CityNameinput = document.querySelector('input')
   const cityName=document.querySelector('.city')
   const date=document.querySelector('.date')
   const temp=document.querySelector('.temp')
   const weather=document.querySelector('.weather')
   const hi_low=document.querySelector('.hi-low')
   const SystemDate=new Date();
   DateHandler(date)

window.addEventListener('keydown',(event)=>{

   if(CityNameinput.value===""){
      cityName.innerHTML="Enter City Name";
      temp.innerHTML="Temp";
      hi_low.innerHTML="Min°c/Max°c";
   }else{
      cityName.innerHTML="Please Wait...";
   }

   if(event.key=="Enter"){
   let city = CityNameinput.value
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d65f0d7075082896db400ce8b80110fc`
   ).then(res => { return res.json() })
      .then(data => {
         FoundCityMessage(data,cityName,date)
         TempHandler(data,temp,hi_low)
         WeatherTypeHandler(data,weather)
         console.log(data);
      }).catch((err)=>{
         console.log("dont defined city");
      })
      
   }
})

function FoundCityMessage(city,name){
   if(city.cod==404){
      alert("city is not found try Again!");
      CityNameinput.value="";
   }else{
   name.innerHTML=`${city.name}, ${city.sys.country}`;
   }
}

function DateHandler(dateElem){
let Day=`${days[SystemDate.getDay()]} ${SystemDate.getUTCDay()} 
${months[SystemDate.getMonth()]} ${SystemDate.getFullYear()}`;
dateElem.innerHTML=Day
}

function TempHandler(data,tempElem,min_maxTempElem){

let CityTemp=data.main.temp-273;//convert k to c
let MinTemp=data.main.temp_min-273;//convert min k to min c deg
let maxTemp=data.main.temp_max-273;//convert max k to max c deg

tempElem.innerHTML=Math.floor(CityTemp)+'°C';
min_maxTempElem.innerHTML=`${Math.floor(MinTemp)}°C/${Math.floor(maxTemp)}°C`;
}

function WeatherTypeHandler(data,Elem){
   let TypeWeatherobj=data.weather;
   for(let type of TypeWeatherobj){
      let weather=type.description
      Elem.innerHTML=weather;
   }
}
