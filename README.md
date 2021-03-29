# WeatherMapping

# Overview

This is an addition to a previous project I created in Java. It makes API calls to openweathermap.org, and displays the weather report for
close to 1,000 cities in the US.  The difference between this project and my other one is that this one uses ArcGIS to display the location
of each city. Instead of typing in a city, the top 1,000 most populated cities are automatically generated, and the user can click on the
city they would like to examine.

## IMPORTANT

My API key has been removed from the source code, and has been replaced with an empty string. To have this code be functional, a valid
API key for openweathermap.org is required.


## Purpose
The purpose of writing this software was to get more familiar with ArcGIS and JavaScript. Both of these concepts were a bit foreign to me
so I thought this would be a great exercise to get to know both of these concepts better.

## Logistics
I used a list of 1,000 most popular US cities I found online. I wrote Python code to modify the list to be more code-friendly
instead of manually taking out the portions I needed.  After a couple test runs of making 1,000 API calls per run, I received
an email saying I exceeded my API call limit for openweathermap.org (60 calls per minute). My solution to this was the
'group' tag that openweathermap.org provides. This allows for up to 20 cities and their information inside the same JSON
file.  The only issue is it requires the city ID, rather than just the city name. I again used Python code to make 1,000 more
calls (on a dummy account I made that I knew would get suspended) that generated each city ID. From there, I loaded each city
ID into groups of 20 and placed them into the JavaScript file. This allows for the program to run with only 50 calls as
opposed to 1,000 each run. This satisfies the call limit for openweathermap.org.


[Software Demo Video](https://www.youtube.com/watch?v=IwLo-zqfsTc)

# Development Environment

For this project, I used:
* ArcGIS
* openweathermap.org
* Visual Studio Code
* Visual Studio Code Extension: Live Server

I used mostly JavaScript for this project. Minimal HTML was used to host the server on a browser.
On top of this, I used Python to generate files that are necessary for the API calls.

# Useful Websites

* [ArcGIS](https://www.arcgis.com/index.html)
* [OpenWeatherMap](https://openweathermap.org/)
* [List of US Cities](https://gist.github.com/Miserlou/11500b2345d3fe850c92)

# Future Work

* Some US cities share a common name with a city from another country. This means that some foreign cities take precedence over the US ones. I have yet to clean this up.
* It would be nice to have the state mentioned in the pop up window, but unfortunately openweathermap.org does not provide the state name in the JSON.
* I would like to make more in depth colorings based on the weather and provide a key in the map itself.
