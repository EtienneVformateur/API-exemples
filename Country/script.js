let  countryArray = [];
let countriesDisplay = document.querySelector('.countriesDisplay');
let sortMethod = "alpha";

function fetchCountry(){
    fetch("https://restcountries.com/v3.1/all")
    .then((response)=>response.json())
    .then((data)=>{
        countryArray = data;
        displayCountry(countryArray);
    });
}


function displayCountry(countries){
    countriesDisplay.innerHTML = "";    
    countries
    .filter(country => country.translations.fra.common.toLowerCase().includes(inputFilter.value.toLowerCase()))
    .slice(0,inputRange.value)
    .sort((c1,c2) =>{
        if (sortMethod === "croissant") return c1.population - c2.population;
        else if (sortMethod == "decroissant") return c2.population - c1.population;
        else return c1.translations.fra.common.localeCompare(c2.translations.fra.common);
    }
    )
    .map(country=>
        {
            countriesDisplay.innerHTML += `
            <div class="countryDisplay">
            <img src="${country.flags.svg}" alt="flag ${country.translations.fra.common}">
            <div class="info">
                <span class="displayName">${country.translations.fra.common}</span>
                <span class="displayCapital">${country.capital?country.capital:""}</span>
                <span class="displayPopulation">Population :${country.population}</span>
            </div>
        </div>
            `;
        }
        );
}
fetchCountry();

inputFilter.addEventListener("input",()=>{displayCountry(countryArray)});
inputRange.addEventListener("input",()=>displayRange.textContent = inputRange.value);
inputRange.addEventListener("input",()=>{
    displayCountry(countryArray)
})

document.querySelectorAll(".btn").forEach(
    btn=>{
        btn.addEventListener("click",()=>{
            sortMethod = btn.id;
            displayCountry(countryArray);
        })
    }
) 