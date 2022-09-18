var d = new Date()
d.getHours()
d.getMinutes()
d.getSeconds()


var weather = []

if (d.getHours() < 12){
    document.getElementById("welcome").textContent = "Good morning."
} else if (12 < d.getHours() && d.getHours()<15){
    document.getElementById("welcome").textContent = "Good afternoon."
} else {
    document.getElementById("welcome").textContent= "Good evening."
}


function  weatherBTN () {
    const location = document.getElementById("citylocation").value
    getWeather(location)
}

const searchcity = document.getElementById("citylocation")
searchcity.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
    document.getElementById("search").click()}
})
function getWeather(location){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=895753d773773c12a7aec8b6be260612", {mode:'cors'})
       .then(function(response){
            if(response.ok){
           return response.json()
            } else {
                Promise.reject('Location not found')
                document.getElementById("citylocation").setCustomValidity("Not a valid city")
                document.getElementById("citylocation").reportValidity()
            }
   })   
        .then(function(response){
        weather = response
        document.getElementById("cloudstatus").textContent=weather.weather[0].description
        document.getElementById("location").innerHTML=
        `${weather.name} <ion-icon name="${getIcon(weather.weather[0].description)}"></ion-icon> 
        `
        const temp = document.getElementById("temp")
        temp.textContent = "Temp: " + tempConv(weather.main.temp) +" F°"
        document.getElementById("tempmin").textContent=  "Low: " +tempConv(weather.main.temp_min) +" F°"
        document.getElementById("tempmax").textContent=  "High: " +tempConv(weather.main.temp_max) +" F°"
        document.getElementById("humidity").textContent= "Humidity: " +weather.main.humidity + " %"
        document.getElementById("windspeed").textContent= "Wind: " +(Math.round((weather.wind.speed * 2.236)*100)/100)+" MPH"
        document.getElementById("sunrise").textContent= "Sun Up: " +convTime(weather.sys.sunrise)
        document.getElementById("sunset").textContent= "Sun Down: " +convTime(weather.sys.sunset)
})      
}


getWeather("Gainesville")

function tempConv(tempK){
    tempF = Math.round(((tempK-(273.15))*(9/5))+32)
    return tempF
}

function convTime(timeMS){
    const date = new Date(timeMS*1000)
    const hr = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return hr + ":" + min
}
    
function getIcon(x){
    if (x =="clear sky"){
        return "sunny-outline"
    }else if(x == "few clouds"){
        return "partly-sunny-outline"
    }
    else if (x=="scattered clouds"){
        return "partly-sunny-outline"
    }
    else if (x=="broken clouds"){
        return "cloud-outlineg"
    }
    else if(x=="shower rain"){
        return "rainy-outline"
    }
    else if(x=="rain"){
        return "rainy-outline"
    }
    else if(x=="thunderstorm"){
        return "thunderstorm-outline"
    }
    else if(x=="snow"){
        return "snow-outline"
    }
    else{
        return "cloud-outline"
    }
}