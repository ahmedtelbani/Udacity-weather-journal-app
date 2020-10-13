/* Global Variables */

//const express = require("express");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API key for OpenWeathMap API
let baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = "&APPID=5aa4418f1aa9005cd054d9429d109992";

// add EventListener to HTML DOM Element
document.getElementById("generate").addEventListener("click", performAction);

// function called by EventListener
function performAction(e){
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseUrl, newZip, apiKey).then(function(data) {
        console.log(data);
        // add data to POST request
        postData('/add', {date:d, temp:data.list[0].main.temp, content: feelings});
        UpdateUI(); 
    });

};

// Function to GET web API data
const getWeather = async (baseUrl, zip, key) => {
    const res = await fetch(baseUrl+zip+key);
    try{
        const data = await res.json();
        return data;
    }catch(error){
        console.log("error", error);
        // handele the error
    }
}

const postData = async (url='', data={}) =>{
    console.log(data);
    const response = await fetch(url, {
        method: 'Post',
        Credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error", error);
    }
}

// Function to get Project Data
const UpdateUI = async () =>{
    const request = await fetch('/all');
    try{
        const allData = await response.json();
        document.getElementById('date').innerHTML = `Data: ${allData[0].data}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `feel: ${allData[0].content}`;
    }catch(error){
        console.log("error", error);
    }
}
