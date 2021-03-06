var cuisineName;
var cuisineId;
var establishmentId;
var establishmentName;
var apiKey = "062f1094719e081c0ffc6ab1f3e61902";
var requestCitiesUrl = "https://developers.zomato.com/api/v2.1/cities?q=";
var restaurantsList;

var requestHeader = new Headers({
    'user-key': apiKey
});

function displayRestaurants(restaurantsList) {
    console.log(restaurantsList);
    var data = restaurantsList;
    // $("#restaurants-found").empty();

    for (var i = 0; i < data.length; i++) {
        var restaurantField = $("<div>").addClass("card restaurant-field has-background-light");
        var restaurantMainSection = $("<section>").addClass("columns is-mobile card-content");
        var figureBox = $("<figure>").addClass("column mobile-responsive");
        if (data[i].restaurant.featured_image === "") {
            var imgRestaurant = $("<img>").attr({ src: "assets/images/cat-placeholder.png" });
        } else {
            var imgRestaurant = $("<img>").attr({ src: data[i].restaurant.featured_image, alt: data[i].restaurant.name });
        }
        var locality = $("<figcaption>").text(data[i].restaurant.location.locality);
        var restaurantNameSection = $("<div>").addClass("column media-content");
        var restaurantName = $("<p>").addClass("mobile-center-text title is-3").text(data[i].restaurant.name);
        var userRating = $("<p>").addClass("subtitle is-7").text(data[i].restaurant.user_rating.rating_text + " reviews - " + data[i].restaurant.user_rating.aggregate_rating + "  ");
        var userRatingSpan = $("<span>").addClass("ml-5 mr-5 icon is-small");
        var userRatingIcon = $("<i>").attr({ class: "fas fa-star", "aria-hidden": "true" });
        var reviewsAmount = $("<span>").text(" (" + data[i].restaurant.user_rating.votes + " Reviews" + ")");
        var restaurantLocation = $("<p>").addClass("subtitle is-7").text("Address: " + data[i].restaurant.location.address);
        var hoursOfOperation = $("<p>").addClass("subtitle is-7").text("Hours: " + data[i].restaurant.timings);

        var restaurantDetailsSection = $("<section>").addClass("card-content columns is-mobile");
        var optionsColumn = $("<div>").addClass("column");
        var cuisineData = $("<p>").text("Cuisines: " + data[i].restaurant.cuisines)

        var costForTwo = $("<p>").text("Cost for two: " + data[i].restaurant.average_cost_for_two);
        var costForTwoSpan = $("<span>").text(" " + data[i].restaurant.currency);

        var priceRange = $("<p>").text("Price Avg: " + (" "));
        var priceRangeSpan = $("<span>").addClass("ml-5 icon is-small");
        var priceRangeIcon = $("<i>").attr({ class: "fas fa-hand-holding-usd", "aria-hidden": "true" });

        var servesAlcohol = $("<p>").text("Serves Alcohol: ");
        var alcoholAllowedSpan = $("<span>").addClass("icon is-small");
        var alcoholAllowedIcon = $("<i>").attr({ class: "fas fa-thumbs-up", "aria-hidden": "true" });
        var alcoholNotAllowedIcon = $("<i>").attr({ class: "far fa-thumbs-down", "aria-hidden": "true" });

        var outdoorSeating = $("<p>").text("Outdoor Seating: ");
        var outdoorSeatingSpan = $("<span>").addClass("icon is-small");
        var outdoorSeatingIconYes = $("<i>").attr({ class: "fas fa-check-circle", "aria-hidden": "true" });
        var outdoorSeatingIconNo = $("<i>").attr({ class: "far fa-times-circle", "aria-hidden": "true" });

        var wifiavailable = $("<p>").text("Wifi: ");

        var phoneNumber = $("<p>").text("Phone Number: " + data[i].restaurant.phone_numbers);

        var highlightsColumn = $("<div>").addClass("column");




        var highlightsData = $("<p>").text(data[i].restaurant.highlights[i]);




        $("#restaurants-found").append(restaurantField);
        restaurantField.append(restaurantMainSection);
        restaurantMainSection.append(figureBox);
        figureBox.append(imgRestaurant, locality);
        restaurantMainSection.append(restaurantNameSection);
        restaurantNameSection.append(restaurantName, userRating.append(userRatingSpan), restaurantLocation, hoursOfOperation);
        userRating.append(userRatingSpan)

        for (var y = 0; y < Math.round(data[i].restaurant.user_rating.aggregate_rating); y++) {
            if (y < 5) {
                userRatingSpan.append(userRatingIcon.clone());
            } else if (y < 5 && y >= 3.5) {
                userRatingSpan.append(userRatingIcon.clone());
            } else if (y < 3.5 && y >= 2.5) {
                userRatingSpan.append(userRatingIcon.clone());

            } else if (y < 2.5 && y >= 1.5) {
                userRatingSpan.append(userRatingIcon.clone());
            } else if (y < 1.5 && y > 0) {
                userRatingSpan.append(userRatingIcon.clone());
            }
        }
        userRating.append(reviewsAmount);

        restaurantField.append(restaurantDetailsSection);
        restaurantDetailsSection.append(optionsColumn);
        optionsColumn.append(cuisineData, costForTwo.append(costForTwoSpan), priceRange);
        priceRange.append(priceRangeSpan);

        for (var j = 0; j < data[i].restaurant.price_range; j++) {
            priceRangeSpan.append(priceRangeIcon.clone());
        }

        optionsColumn.append(servesAlcohol.append(alcoholAllowedSpan));

        if (data[i].restaurant.highlights.includes("Serves Alcohol")) {
            alcoholAllowedSpan.append(alcoholAllowedIcon);
        } else {
            alcoholAllowedSpan.append(alcoholNotAllowedIcon);
        }


        optionsColumn.append(outdoorSeating.append(outdoorSeatingSpan));
        if (data[i].restaurant.highlights.includes("Outdoor Seating")) {
            outdoorSeatingSpan.append(outdoorSeatingIconYes);
        } else {
            outdoorSeatingSpan.append(outdoorSeatingIconNo);
        }

        optionsColumn.append(phoneNumber);


        restaurantDetailsSection.append(highlightsColumn);


        for (var j = 0; j < data[i].restaurant.highlights.length; j++) {
            if (data[i].restaurant.highlights[j].includes("Wifi") ||
                data[i].restaurant.highlights[j].includes("Vegetarian Friendly") ||
                data[i].restaurant.highlights[j].includes("Takeaway Available") ||
                data[i].restaurant.highlights[j].includes("Street Parking") ||
                data[i].restaurant.highlights[j].includes("Fullbar") ||
                data[i].restaurant.highlights[j].includes("Nightlife") ||
                data[i].restaurant.highlights[j].includes("Live Music") ||
                data[i].restaurant.highlights[j].includes("Live Entertainment") ||
                data[i].restaurant.highlights[j].includes("Table booking recommended")) {

                highlightsData = $("<p>").text(data[i].restaurant.highlights[j])
                highlightsColumn.append(highlightsData.clone());
            }

        }


    }
}

function displayCuisineRestaurants(restaurantsList, cuisineId, establishmentId) {
    $("#restaurants-found").empty();
    var notification = $("<div>").addClass("notification is-primary has-text-centered");
    var notFound = $("<p>").text("No restaurants found with " + cuisineName + " cuisine" + " and " + establishmentName);
    var checkAvailable = $("<p>").text("Check below " + cuisineName + " cuisine restaurants");

    $("#restaurants-found").append(notification);
    notification.append(notFound, checkAvailable);

    displayRestaurants(restaurantsList);
}

function searchRestaurantsByCityCuisine(cityId, cuisineId, establishmentId) {
    var resquestRestaurantsUrlCuisine = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`
    console.log("url: " + resquestRestaurantsUrlCuisine);

    fetch(resquestRestaurantsUrlCuisine, {
        headers: requestHeader
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        restaurantsList = data.restaurants;
        displayCuisineRestaurants(restaurantsList, cuisineId, establishmentId);
    });
}

// Main API Call to getSearch for Restaurants around the desiredCity and selectedOptions
function searchDesiredRestaurants(cityId, cuisineId, establishmentId) {
    // API url for customized getSearch
    var requestRestaurantsUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}&establishment_type=${establishmentId}`;
    console.log("url: " + requestRestaurantsUrl);

    fetch(requestRestaurantsUrl, {
        headers: requestHeader
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        console.log(data.results_found + " - Results None")
        // in case there is no results found with selected parameters:
        if (data.results_found === 0) {
            searchRestaurantsByCityCuisine(cityId, cuisineId, establishmentId)
        } else {
            restaurantsList = data.restaurants;
            $("#restaurants-found").empty();
            displayRestaurants(restaurantsList);
        }
    });
}

function searchEstablishmentId(cityId, cuisineId) {
    // API Url for getEstablishment
    var requestEstablishmentUrl = `https://developers.zomato.com/api/v2.1/establishments?city_id=${cityId}`;

    fetch(requestEstablishmentUrl, {
        headers: requestHeader
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        // Looking through the data to grab the establishmentId for the specific establishmentName
        for (var i = 0; i < data.establishments.length; i++) {
            if (data.establishments[i].establishment.name.includes(establishmentName)) {
                establishmentId = data.establishments[i].establishment.id;
                console.log("EstablishmentId: " + establishmentId);
            }
        }
        // main function for api call with selected parameters
        searchDesiredRestaurants(cityId, cuisineId, establishmentId);
    });
}

function searchCuisinesId(cityId) {
    // API Url for getCuisine
    var requestCuisineUrl = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityId}`;

    fetch(requestCuisineUrl, {
        headers: requestHeader
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        // if User selected only establishmentName we bypass pulling a cuisineId
        if (!cuisineName) {
            searchEstablishmentId(cityId, cuisineId);
        }
        // Looking through the data to grab the cuisineId for the specific cuisineName
        for (var i = 0; i < data.cuisines.length; i++) {
            if (data.cuisines[i].cuisine.cuisine_name === cuisineName) {
                var cuisineIdLocal = data.cuisines[i].cuisine.cuisine_id;
                console.log("CuisineId: " + cuisineIdLocal);
                searchEstablishmentId(cityId, cuisineIdLocal);
            }
        }
    });

}
// This function starts the chains of API Calls
function searchCityId(cityName) {
    // api call + the cityName parameter to the base url
    // the second parameter to the fetch() call, which is an object with a "headers"
    // property, which is set equal to requestHeader object from the top of JS file
    fetch(requestCitiesUrl + cityName, {
        headers: requestHeader
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        var cityId = data.location_suggestions[0].id;
        console.log("CityId: " + cityId);
        // Calling other 2 API Calls knowing the cityId
        searchCuisinesId(cityId);
    });
}
//  Jquerry onclick grabs cityName, establishmentName, cuisineNameInput and
// starts the chain of functions - searchCityId()...
$("#search-button-rest").on("click", function (event) {
    event.preventDefault();
    // Used both - Jquerry and Vanilla JS(DOM commands)
    var cityNameEl = document.querySelector("#search-input-city");
    cityName = cityNameEl.value;
    // they're declared global variables already
    var cuisineNameInput = $("#cuisine-option").val();
    cuisineName = cuisineNameInput
    establishmentName = $("#establishment-option").val();
    console.log(cityName);
    console.log(establishmentName);
    console.log(cuisineNameInput);

    searchCityId(cityName);
});

