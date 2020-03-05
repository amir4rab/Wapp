const weatherApi = new WeatherApi;
const ui = new Ui;
const citiesData =[
    {
        city: 'Tehran',
        long: 51.404343,
        lat: 35.715298
    },
    {
        city: 'Bandar-e-abbas',
        long: 56.2666,
        lat: 27.1832
    },
    {
        city: 'Shiraz',
        long: 52.5836,
        lat: 29.5926
    },
    {
        city: 'Mashhad',
        long: 59.6168,
        lat: 36.2605
    },
    {
        city: 'Isfahan',
        long: 51.6660,
        lat: 32.6539
    },
    {
        city: 'Yazd',
        long: 54.3569,
        lat: 31.8974
    }
]
let long,
    lat,
    apikey,
    tempData;

function getWeatherfromApi(long , lat , city){
    apikey = `https://api.darksky.net/forecast/2c4424557c7c8ba9ac359b17d2ade900/${lat},${long}`
    weatherApi.getWeather(apikey)
        .then(data => {
            ui.interFace(data)
            tempData = data
            console.log(data)
            if(city){
                ui.changeLocation(city);
            }
        })
        .catch(error => console.log(error));
}











let index = 0;

function setIndex(number){
    index = number--;
    console.log(number);
}
function goToNextCity(index){
    const citiesdataN = WeatherApi.cityScrollerNext(citiesData ,index);
    let currentCity = citiesdataN.next();
    setIndex(currentCity.CurrentIndex);
    console.log(`go to: ${currentCity.value.city}`)
    
    if(currentCity === undefined){
        console.log(`boi: ${currentCity}`);
    }else{
        apikey = `https://api.darksky.net/forecast/2c4424557c7c8ba9ac359b17d2ade900/${currentCity.value.lat},${currentCity.value.long}`
        weatherApi.getWeather(apikey)
            .then(Data=>{
                ui.scoroller(currentCity.value , Data)
            }).catch(error => console.log(error));
    }
}
function goToPreviousCity(index){
    const citiesdataP = WeatherApi.cityScrollerPrevious(citiesData ,index);
    let currentCity = citiesdataP.next();
    setIndex(currentCity.CurrentIndex);
    console.log(`back to: ${currentCity.value.city}`)
    

    if(currentCity === undefined){
        console.log(`boi: ${currentCity}`);
    }else{
        apikey = `https://api.darksky.net/forecast/2c4424557c7c8ba9ac359b17d2ade900/${currentCity.value.lat},${currentCity.value.long}`
        weatherApi.getWeather(apikey)
            .then(Data=>{
                ui.scoroller(currentCity.value , Data)
            }).catch(error => console.log(error));
    }
}















window.addEventListener("load", () => {
    if(Navigator.geolocation){
        Navigator.geolocation.geolocation(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(`long is: ${long} , lat is: ${lat}`)

            apikey = `https://api.darksky.net/forecast/2c4424557c7c8ba9ac359b17d2ade900/${lat},${long}`

            weatherApi.getWeather(apikey)
                .then(data => {
                    console.log(data)
                });
        })
    }else{
        long = 51.404343;
        lat = 35.715298;

        ui.showError("browser navigator didn't worked please use change location button, default location is tehran","alert alert-warning",10000);


        getWeatherfromApi(long , lat);
    }
})

document.getElementById("WeatherStanderdBtn").addEventListener("click",data => ui.changeStanderd(document.getElementById("WeatherStanderd").textContent ,tempData));

document.getElementById("citypickerBtn").addEventListener("click",()=>{
    let city = document.getElementById("citypicker").value;

    if(city === "tehran"){
        long = 51.404343;
        lat = 35.715298;
        getWeatherfromApi(long , lat ,city);
    }else if(city === "bandar-e-abbas"){
        long = 56.2666;
        lat = 27.1832;
        getWeatherfromApi(long , lat ,city);
    }else if(city === "shiraz"){
        long = 52.5836;
        lat = 29.5926;
        getWeatherfromApi(long , lat ,city);
    }else if(city === "mashhad"){
        long = 59.6168;
        lat = 36.2605;
        getWeatherfromApi(long , lat ,city);
    }else if(city === "esfahan"){
        long = 51.6660;
        lat = 32.6539;
        getWeatherfromApi(long , lat, city);
    }else if(city === "yazd"){
        long = 54.3569;
        lat = 31.8974;
        getWeatherfromApi(long , lat ,city);
    }
});

document.getElementById("nextBtn").addEventListener("click",data => goToNextCity(index));
document.getElementById("previousBtn").addEventListener("click",data => goToPreviousCity(index));