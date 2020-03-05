class WeatherApi {
    async getWeather(apiKey){
        const weatherData = await fetch(`https://api.darksky.net/forecast/${apiKey}`);

        const weatherDataJson = await weatherData.json();

        return weatherDataJson;
    }

    static cityScrollerNext(cities ,Index){
        let nextIndex = Index;
        return{
        next: function(){
            return nextIndex < cities.length ? {value: cities[nextIndex++] , done: false , CurrentIndex: nextIndex} : {done : true}
            }
        }
    }
    static cityScrollerPrevious(cities ,Index){
        let nextIndex = Index;
        return{
        next: function(){
            return nextIndex < cities.length ? {value: cities[nextIndex--] , done: false , CurrentIndex : nextIndex} : {done : true}
            }
        }
    }
};
