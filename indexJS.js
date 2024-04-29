// Creating objects for html Elements
const inputBox = document.getElementById("inputs");
const Result = document.getElementById("searchResult");
const favBtn = document.getElementById("btnFav");
// setData('myData', []);
// This is we will use for mainMeal page
let selectedID = 0;
const myVariable = "Hello, World!";
localStorage.setItem('myVariable', myVariable);
let controller = new AbortController();
let signal = controller.signal;
inputBox.addEventListener('input', showSearch);

// On call of this function it will display the records based on input
function showSearch()
{
    // It was showing records of my previous Fetch requests. So I added code for Aborting previous fetch request
    // Abort the previous fetch request
    controller.abort();

    // Create a new AbortController for the next fetch request
    controller = new AbortController();
    signal = controller.signal;
    console.log('input:-' + inputBox.value);
    // Creating URL based on value we types in input inputBox. It is comparing it with Title
    const resource = `https://www.omdbapi.com/?s=${inputBox.value}&apikey=eac69ebe`
    fetch(resource)
    .then(response => response.json())
    .then(data => {
        Result.innerHTML = '';
        console.log(data)
        data.Search.forEach(ele =>{
            console.log(ele)
            searchHelper(ele)
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

// This Function will be used to show the records on main form
function searchHelper(val)
{
    const tempLabel = document.createElement("label");
    const temp_P = document.createElement("p");
    const addFav = document.createElement("button");
    addFav.innerHTML = "Add to Favorite";
    temp_P.innerHTML = `${val['Title']} (${val['Year']})`;
    addFav.addEventListener('click',function() {
        appendFav(val['imdbID'],val['Title'])
    });
    tempLabel.appendChild(temp_P);
    tempLabel.appendChild(addFav);
    Result.appendChild(tempLabel);
    temp_P.classList.add('temp_p');
    addFav.classList.add('temp_btn');
    // Apply CSS styles to the elements
    tempLabel.style.display = "flex";
    tempLabel.style.justifyContent = "space-between";
    temp_P.style.marginRight = "auto"; // Pushes the button to the right
    addFav.style.marginLeft = "auto"; // Pushes the paragraph to the left
    temp_P.addEventListener('click',function() {
        // insted of using document.location.href I am using window.open to open page in new tab
        // document.location.href = "./mainMovie/Moviepage.html";
        window.open('./mainMovie/Moviepage.html', '_blank');
        console.log(val["imdbID"]);
        selectedID = val["imdbID"];
        localStorage.setItem('selectedID',selectedID);
    })

}
let data=[]
// Add to Favourite Event
function appendFav(id, mealName) {
    const newData = {"id":id}
    let storedData = getData('myData') || []; // Get existing data or initialize as an empty array
    console.log(storedData)
    storedData.push(newData); // Add new data
    setData('myData', storedData);
        
    }
    // Function to set value
    function setData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Function to get data from localStorage
    function getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

// Adding Event listner on click of Favourite Button    
favBtn.addEventListener('click',function() {
    // document.location.href = "./favMovie/favMovie.html";
    window.open('./favMovie/favMovie.html');
});




