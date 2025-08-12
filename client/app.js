function getBhkValue() {
    var uiBhks = document.getElementsByName("uiBHK");
    for (var i in uiBhks){
        if (uiBhks[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBathValue() {
    var uiBaths = document.getElementsByName("uiBath");
    for (var i in uiBaths){
        if (uiBaths[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    var sqft = document.getElementById('area-input');
    var bhk = getBhkValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_prices";
    $.post(url,{total_sqft: parseFloat(sqft.value), bhk:bhk, bath: bathrooms, location: location.value
    },function(data, status){
        var result = data["estimated_price"];
        estPrice.innerHTML = "<h2>" + result.toString() + "Lakh</h2>"
        console.log(status);
    });

}



function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names"
    $.get(url,function(data, status) {
        console.log('got response for get_location_names request');
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $("#uiLocations").empty();
            for(var i in locations) {
                var option = new Option(locations[i]);
                $("#uiLocations").append(option);
            }
        }

    });




}


window.onload = onPageLoad();
