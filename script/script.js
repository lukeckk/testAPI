window.onload = async() =>
{
    //this will show the breed information
    let button = document.querySelector("button");
    // button.onclick = loadCatInfo;

    // let url = "https://perenual.com/api/species-list?key=sk-i0Hb663547d69f75c5335";
    let url = "https://perenual.com/api/species-list?key=sk-qpDM66427176d4a945459&page=1";

    let config = {
        method: "get", //get for just reading
        mode: "cors", //security mode
        headers:{
            "Content-Type": "application/json",
            // "x-api-key": "live_oPsFo6ymBGV99n1xMNd4CJIFXSj6BMAUiVGgxQESzNWvqLT8Wvo2dJLVEhtpgfPt"
        }
    };

    let response = await fetch(url, config);
    let data = await response.json();
    // showBreeds(data);
    showBreedsTest(data);
}

//breedsArray is extracted from the jason data above
function showBreeds(breedsArray)
{
    //print out all tree types in the console
    console.log(breedsArray.data[0].common_name);
    //select the drop down box
    let select = document.querySelector("select");

    //each array element being passed into the option appended to the select tag
    // for(let i = 1; i < breedsArray.length; i ++)
    // {
    //     let option = document.createElement("option");
    //     option.textContent = breedsArray[i].data[i].common_name;
    //
    //     //create value id in the option tag to add in breed id
    //     option.value = breedsArray[i].data[i].id;
    //
    //     select.appendChild(option);
    // }

    //Method from Chatgpt
    // Assuming each item in breedsArray has a 'data' property which is an array.
    // for (let i = 0; i < breedsArray.length; i++) {
    //     if (breedsArray[i].data.length > 0) {
    //         // Create a new option element
            let option = document.createElement("option");

            // Set the text content of the option to the 'common_name' of the first item in the data array
            // option.textContent = breedsArray.data[1].common_name;
    // Example of accessing the second element of the data array of the first breedsArray item
    // if (breedsArray.length > 0 && breedsArray.data.length > 1) {
    //     option.textContent = breedsArray.data[0].common_name;
    // }
            option.textContent = "testing";
            option.value ="1";

    // Set the value of the option to the 'id' of the first item in the data array
    //         option.value = breedsArray.data[0].id;

            // Append the option to the select element
            select.appendChild(option);
    //     }
    // }


    //Method 2 with error checking
    //each array element being passed into the option appended to the select tag
    // if (Array.isArray(breedsArray) && breedsArray.length > 0) {
    //     breedsArray.forEach(breed => {
    //         // Assuming each breed in breedsArray has only one data object
    //         if (breed.data && breed.data.length > 0) {
    //             let option = document.createElement("option");
    //             option.textContent = breed.data[0].common_name;
    //             option.value = breed.data[0].id;
    //             select.appendChild(option);
    //         } else {
    //             console.error("No data found for breed:", breed);
    //         }
    //     });
    // } else {
    //     console.error("No breeds data found or breedsArray is not an array:", breedsArray);
    // }

}

function showBreedsTest(array)
{
    console.log(array.data);
    //select the drop down box
    let select = document.querySelector("ul");
    for (let i = 0; i < array.data.length; i++) {

        let list = document.createElement("li");
        let href = document.createElement("a");

        href.textContent = array.data[i].common_name;
        href.href = "#";
        // list.value = array.data[i].id;
        href.dataset.id = array.data[i].id;     //assign id as value using dataset so it can be retrived in the next method
        // href.id = "hrefClick";
        // list.textContent = array.data[i].common_name;


        // function to show tha plant info after being clicked
        // href.onclick = function (event){
        //     event.preventDefault();
        //     console.log("Button clicked");
        // }

        //separate the function containing event listener
        href.addEventListener('click', loadPlantInfo);

        list.appendChild(href);
        select.appendChild(list);
    }

}

async function loadPlantInfo(event){
    event.preventDefault();
    console.log("Button clicked");

    // let plant = document.querySelector("li");
    // let plantId = plant.value;
    let plantId = event.currentTarget.dataset.id;
    console.log(plantId);

    let url = `https://perenual.com/api/species/details/${plantId}?key=sk-qpDM66427176d4a945459`;

    let config = {
        method: "get", //get for just reading
        mode: "cors", //security mode
        headers:{
            "Content-Type": "application/json",
            // "x-api-key": "live_oPsFo6ymBGV99n1xMNd4CJIFXSj6BMAUiVGgxQESzNWvqLT8Wvo2dJLVEhtpgfPt"
        }
    };

    let response = await fetch(url, config);
    let data = await response.json();

    //displpaying API
    let commonName = document.querySelector("#common_name");
    commonName.textContent = data.common_name;

    let scientificName = document.querySelector("#scientific_name");
    scientificName.textContent = data.scientific_name;

    let wateringSchedule = document.querySelector("#watering");
    wateringSchedule.textContent = data.watering;

    let wateringBenchmark = document.querySelector("#watering_general_benchmark");
    wateringBenchmark.textContent = data.watering_general_benchmark.value + ' ' + data.watering_general_benchmark.unit;

    let sunlight = document.querySelector("#sunlight");
    sunlight.textContent = data.sunlight;

    let pruningMonth = document.querySelector("#pruning_month");
    pruningMonth.textContent = data.pruning_month;

    // let careGuides = document.querySelector("#care-guides");
    // careGuides.textContent = data.care-guides;

    let description = document.querySelector("#description");
    description.textContent = data.description;

    // let images = document.querySelector("#default_image");
    // images.textContent = data.default_image;


}

