class Ui{
    interFace(Data){
        //adding simple text elemnts
        document.getElementById("WeatherTemp").textContent = Math.floor(Data.currently.temperature);
        document.getElementById("status").textContent = Data.daily.summary;
        document.getElementById("location").textContent = `your estmited location is: ${Data.timezone}`;
        document.getElementById("WeatherStanderd").textContent = `F`;
        document.getElementById("humidity").textContent = `humidity: ${Data.currently.humidity}`;
        document.getElementById("pressure").textContent = `pressure: ${Data.currently.pressure}`;
        document.getElementById("windSpeed").textContent = `wind speed: ${Data.currently.windSpeed}`;
        document.getElementById("visibility").textContent = `visibility: ${Data.currently.visibility}`;
        document.getElementById("WeatherStanderdBtn").textContent = "Change to Celsius";
        //adding Gif
        const skyCons = new Skycons({"color": "#212529"});
        skyCons.set(document.getElementById("icon1"), Data.currently.icon.replace(/-/g, "_").toUpperCase());
        skyCons.play();
    }

    changeLocation(City){
        document.getElementById("location").textContent = `your estmited location is: ${City}`;
    }

    changeStanderd(WStanderd , Data){
        if(WStanderd === `F`){
            document.getElementById("WeatherTemp").textContent = Math.floor((Data.currently.temperature - 32) * 5 / 9);
            document.getElementById("WeatherStanderdBtn").textContent = "Change to Fahrenheit";
            document.getElementById("WeatherStanderd").textContent = "C";
        }else{
            document.getElementById("WeatherTemp").textContent = Math.floor(Data.currently.temperature);
            document.getElementById("WeatherStanderdBtn").textContent = "Change to Celsius";
            document.getElementById("WeatherStanderd").textContent = "F";
        }
    }

    scoroller(city,Data){
        document.getElementById("ScrollerWeatherTemp").textContent = Math.floor(Data.currently.temperature);
        document.getElementById("ScrollerWeatherStanderd").textContent = `F`;
        document.getElementById("ScrollerCityName").textContent = city.city;
        const skyCons = new Skycons({"color": "#212529"});
        skyCons.set(document.getElementById("icon2"), Data.currently.icon.replace(/-/g, "_").toUpperCase());
        skyCons.play();
    }
    
    showError(message , alertType ,timeOut){
        let container = document.getElementById("container");

        let Alert = document.createElement("DIV");
        Alert.className = alertType;
        Alert.role = 'alert'
        Alert.id = "Alert"
        Alert.textContent = message;

        container.parentElement.insertBefore(Alert,container);

        if(alertType === "alert alert-warning"){
            setTimeout(() => {
                container.parentElement.removeChild(Alert);
            }, timeOut);
        }
    }
}