function attachEvents() {
    document.getElementById("submit").addEventListener('click', submit);
    let forecastSection = document.getElementById("forecast");

    let currForecastField = document.getElementById("current");
    let upcomingForecastField = document.getElementById("upcoming");

    let symbols = {
        "Sunny":"&#x2600",
        "Partly sunny":"&#x26C5",
        "Overcast":"&#x2601",
        "Rain":"&#x2614",
        "Degrees":"&#176"
    };

    async function submit(){
        try{
            let responce = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            let data = await responce.json();
            let currLocation = data.find(x => x.name === document.getElementById("location").value);
            if(currLocation === undefined){
                forecastSection.innerHTML = "Error";
            }

            let code = currLocation.code;

            let currForecastResponce = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
            let currForecastData = await currForecastResponce.json();
            let currForecast = currForecastData["forecast"];

            let upcomingForecastResponce = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
            let upcomingForecastData = await upcomingForecastResponce.json();
            let upcomingForecast = upcomingForecastData.forecast;

            document.getElementById("forecast").style.display = 'block';

            currForecastField.appendChild(createCurrentForecast(currForecastData, currForecast));

            let forecastDiv = document.createElement('div');
            forecastDiv.classList.add("forecast-info");

            forecastDiv.appendChild(createUpcomingForecast(upcomingForecast[0]));
            forecastDiv.appendChild(createUpcomingForecast(upcomingForecast[1]));
            forecastDiv.appendChild(createUpcomingForecast(upcomingForecast[2]));

            upcomingForecastField.appendChild(forecastDiv);
        }   
        catch{
            document.getElementById("forecast").style.display = 'block';
            forecastSection.innerHTML = "Error";
        }
    }

    function createCurrentForecast(currForecastData, currForecast){
        let forecastDiv = document.createElement('div');
        forecastDiv.classList.add("forecasts");

        let conditionalSymbolSpan = document.createElement('span');
        conditionalSymbolSpan.classList.add("condition", "symbol");
        conditionalSymbolSpan.innerHTML = symbols[currForecast["condition"]];

        let forecastSpan = document.createElement('span');
        forecastSpan.classList.add("condition");

        let nameSpan = document.createElement("span");
        nameSpan.classList.add("forecast-data");
        nameSpan.innerText = currForecastData["name"];

        let degreesSpan = document.createElement('span');
        degreesSpan.classList.add("forecast-data");
        degreesSpan.innerHTML = `${currForecast["low"]}${symbols["Degrees"]}/${currForecast["high"]}${symbols["Degrees"]}`;

        let conditionSpan = document.createElement('span');
        conditionSpan.classList.add("forecast-data");
        conditionSpan.innerText = currForecast["condition"];

        forecastSpan.appendChild(nameSpan);
        forecastSpan.appendChild(degreesSpan);
        forecastSpan.appendChild(conditionSpan);

        forecastDiv.appendChild(conditionalSymbolSpan);
        forecastDiv.appendChild(forecastSpan);

        return forecastDiv;
    }

    function createUpcomingForecast(upcomingForecast){
        let forecastSpan = document.createElement('span');
        forecastSpan.classList.add("upcoming");

        let conditionalSymbolSpan = document.createElement('span');
        conditionalSymbolSpan.classList.add("symbol");
        conditionalSymbolSpan.innerHTML = symbols[upcomingForecast["condition"]];

        let degreesSpan = document.createElement('span');
        degreesSpan.classList.add("forecast-data");
        degreesSpan.innerHTML = `${upcomingForecast["low"]}${symbols["Degrees"]}/${upcomingForecast["high"]}${symbols["Degrees"]}`;

        let conditionSpan = document.createElement('span');
        conditionSpan.classList.add("forecast-data");
        conditionSpan.innerText = upcomingForecast["condition"];

        forecastSpan.appendChild(conditionalSymbolSpan);
        forecastSpan.appendChild(degreesSpan);
        forecastSpan.appendChild(conditionSpan);

        return forecastSpan;
    }
}

attachEvents();