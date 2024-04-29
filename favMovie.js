const container = document.getElementById("content");
const keys= localStorage.getItem("myData");
const newdata= JSON.parse(keys);
console.log(newdata);

// This is the main function. On calling this function we will show records
function show()
{
    container.innerHTML="";
newdata.forEach(element => {
    console.log(element["id"]);
    // creating URL which will give us JSON based on ID we are providing
    const res= `http://www.omdbapi.com/?i=${element["id"]}&apikey=eac69ebe`;
    
    // Code to fetch the records based on URL
    fetch(res)
    .then(response=> response.json())
    .then(data =>{
        console.log(data);
        addItem(data)
    })
});
// This function will be used to add items in div. Which will later display on the form
function addItem(data)
{    
    const temp_p = document.createElement("p");
    const temp_lbl = document.createElement("label");
    const deleteBtn = document.createElement("button");

    temp_p.innerHTML = `Movie Name- ${data["Title"]} (${data["Year"]})`;
    deleteBtn.innerHTML = "Delete";
    temp_lbl.appendChild(temp_p);
    temp_lbl.appendChild(deleteBtn);
    container.appendChild(temp_lbl);
    temp_p.classList.add('p_tag');
    // this event listner is for deleteBtn
    deleteBtn.addEventListener('click',()=>{
        let i=0;
        console.log("delete clicked")
        console.log(newdata)
        console.log(data["id"])
        newdata.forEach(ele => {
            console.log(ele["id"])
            if (ele["id"] == data["imdbID"])
            {
                newdata.splice(i, 1);
                localStorage.setItem('myData', JSON.stringify(newdata));
                show()
            }
            i+=1
        })
    })
}
}
show()