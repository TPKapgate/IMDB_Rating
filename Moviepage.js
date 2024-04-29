// We are using getItem function to get value of selectedID
const selectedID = localStorage.getItem('selectedID');
// Creating objects for html element
const MovieName = document.getElementById('name');
const imageDiv = document.getElementById('image');
const plot = document.getElementById('plot');
const plotContent = document.getElementById('plotContent');
const year = document.getElementById('year');
const rating = document.getElementById('rating');
const lst = document.getElementById('cast');

// this we are creating custom URl to get url based on id
const resource = `https://www.omdbapi.com/?i=${selectedID}&apikey=eac69ebe`;

// Fetching Records
fetch(resource)
.then(response => response.json())
.then(data => {
    const ele=data;
    MovieName.innerHTML = ele['Title'];
    // Creating and attaching image
    const img = document.createElement('img');
    img.src = ele['Poster'];
    img.style.height='400px';
    img.style.width='400px';
    imageDiv.appendChild(img);
    // Setting up plot of movie
    plotContent.innerHTML = ele['Plot'] 
    year.innerHTML = `Year - ${ele["Year"]}`;
    rating.innerHTML = `IMDB Rating - ${ele["imdbRating"]}`;
    // Getting cast of the movie
    const cast = ele["Actors"]
    // Creating list from the cast string so that I can apply loops on it
    const castlist= cast.split(",")
    castlist.forEach(element => {
        const temp_li = document.createElement("li");
        temp_li.innerHTML= element;
        lst.appendChild(temp_li);
    });
    
})
.catch(error => {
    // Handle any errors
    console.error('Error fetching data:', error);
});
