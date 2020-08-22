/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "cb40e19f8285300cef640feed55c377c";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


function start(e) {

    const postCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeather(baseURL, postCode, apiKey)
        .then(function (data) {
            postData('/add', { temperature: data.main.temp, date: newDate, user_response: userResponse })
                .then(function () {
                    updateUI("/all")
                })
        })
}

// GET
const getWeather = async (baseURL, postCode, apiKey) => {
    const response = await fetch(baseURL + postCode + '&appID=' + apiKey + '&units=metric')
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}


// POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};



// Update user interface
const updateUI = async (url = "") => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}

const generateButton = document.getElementById("generate");

generateButton.addEventListener("click", start);