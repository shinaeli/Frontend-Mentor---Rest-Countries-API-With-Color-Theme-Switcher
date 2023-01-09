console.log('Hello!');
const showcaseEl = document.querySelector('.showcase');
const modeEl = document.querySelector('.mode');
const bodyEl = document.querySelector('body');
const formSectionEl = document.querySelector('.form-section');
const headerEl = document.querySelector('.header');
const options = document.querySelectorAll('option');
var countryEl, anchorEl;

// display first twelve countries from restcountries API
fetch('https://restcountries.com/v2/all')
.then(response => response.json())
.then(data => {
   const firstEight = data.slice(1, 13);
   let outputData = firstEight.map(item => {
    return `<div class='country' country-name="${item.name}">
        <div class='flag'>
            <img src=${item.flags.png} alt="" />
        </div>
        <h2>${item.name}</h2>
        <h3>Population: ${item.population}</h3>
        <h3>Region: ${item.region}</h3>
        <h3>Capital: ${item.capital+''}</h3>
    </div>`
   }).join(' ');
   showcaseEl.innerHTML = outputData;
   console.log(data);
   countryEl = document.querySelectorAll('.country');
   console.log(countryEl);
})
.catch(error => console.log(error));

// get countries by region section
const selectEl = document.querySelector('select');
console.log(selectEl);
selectEl.addEventListener('click', function(e) {
    let selectedRegion = e.target.value;
    fetch(`https://restcountries.com/v2/region/${selectedRegion}`)
.then(response => response.json())
.then(data => {
    let countries = data;
   let outputData = countries.map(item => {
    return `<div class='country' country-name="${item.name}">
        <div class='flag'>
            <img src=${item.flags.png} alt="" />
        </div>
        <h2>${item.name}</h2>
        <h3>Population: ${item.population}</h3>
        <h3>Region: ${item.region}</h3>
        <h3>Capital: ${item.capital+''}</h3>
    </div>`
   }).join(' ');
    showcaseEl.innerHTML = outputData;
    countryEl = document.querySelectorAll('.country');
    console.log(countryEl);
})
});

// search for a country section
const inputEl = document.querySelector('input');
console.log(inputEl);
inputEl.addEventListener('keyup', function(e) {
    e.preventDefault();
    let countryName = e.target.value.toLowerCase();
    fetch(`https://restcountries.com/v2/name/${countryName}`)
.then(response => response.json())
.then(data => {
    let countryData = data;
   let outputData = countryData.map(item => {
    return `<div class='country searched-country' country-name="${item.name}">
        <div class='flag'>
            <img src=${item.flags.png} alt="" />
        </div>
        <h2>${item.name}</h2>
        <h3>Population: ${item.population}</h3>
        <h3>Region: ${item.region}</h3>
        <h3>Capital: ${item.capital+''}</h3>
    </div>`
   }).join(' ');
   showcaseEl.innerHTML = outputData;
   countryEl = document.querySelectorAll('.country');
   console.log(countryEl);
   document.querySelector('.searched-country').addEventListener('click', function() {
    showcaseEl.style.display = 'none';
    formSectionEl.style.display = 'none';
    console.log(this.getAttribute('country-name').toLowerCase());
    getCountryDetails(this.getAttribute('country-name').toLowerCase());
})
})
});

// get country detail section
function getCountryDetails(ev) {
    fetch(`https://restcountries.com/v2/name/${ev}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let mappedData = data.map(item => {
            let languagesArr = '';
            for(let i=0; i<item.languages.length; i++) {
                i === item.languages.length - 1 ? languagesArr += item.languages[i].nativeName : languagesArr += item.languages[i].nativeName+', ';
            }
            console.log(languagesArr);
            const langOut = languagesArr;
            let borderArr = '';
            for(let i=0; i<item.borders.length; i++) {
                borderArr += `<div class='border'><span class='span-item'>${item.borders[i]}</span></div> `
            }
            console.log(borderArr);
            const borderOut = borderArr;
            return `
            <div class="back-container">
                <i class="fa-solid fa-arrow-left"></i>
                <a href="index.html">Back</a>
            </div>
            <div class='country-detail'>
                <div class='flag-detail'>
                    <img src=${item.flags.png} alt="" />
                </div>
               <div class='key-details'>
                    <h2>${item.name}</h2>
                    <div class='sub-details'>
                        <div>
                            <h3>Native Name: <span class='span-item'>${item.nativeName}</span></h3>
                            <h3>Population: <span class='span-item'>${item.population}</span></h3>
                            <h3>Region: <span class='span-item'>${item.region}</span></h3>
                            <h3>Sub Region: <span class='span-item'>${item.subregion}</span></h3>
                            <h3>Capital: <span class='span-item'>${item.capital+''}</span></h3>
                        </div>
                        <div>
                            <h3>Top Level Domain: <span class='span-item'>${item.topLevelDomain[0]}</span></h3>
                            <h3>Currencies: <span class='span-item'>${item.currencies[0].name}</span></h3>
                            <h3>Languages: <span class='span-item'>${langOut}</span></h3>
                        </div>
                    </div>
                    <div class='borders'>
                        <h3>Border Countries:</h3>
                        ${borderOut}
                    </div>
               </div>
            </div>`
           }).join(' ');
const mainDetailsEl = document.querySelector('.detail');
mainDetailsEl.innerHTML = mappedData;
const bordersEl = document.querySelectorAll('.border');
console.log(bordersEl);
[...bordersEl].map(item => {
    item.addEventListener('click', function() {
        let borderCountry = this.textContent;
        console.log(borderCountry);
        getCountryDetails(borderCountry.toLowerCase());
    })
});
anchorEl = document.querySelector('.back-container a');
console.log(anchorEl);
})
}

// change mode section
modeEl.addEventListener('click', function() {
    bodyEl.classList.toggle('dark-mode');
    headerEl.classList.toggle('.header-dark');
    [...countryEl].map(item => item.classList.toggle('country-dark'));
    [...options].map(item => item.classList.toggle('option-dark'));
    inputEl.classList.toggle('.search-dark');
    selectEl.classList.toggle('.select-dark');
    anchorEl.classList.toggle('anchor-changer');
});
















