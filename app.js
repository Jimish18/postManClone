console.log("Jay Shree Ram");

// --------------------------> Grab Elements <---------------------------- //
let get = document.getElementById("get");
let post = document.getElementById("post");
let jsonBtn = document.getElementById("json");
let customizeParams = document.getElementById("customizeParams");
let submitParameter = document.getElementById("submitParameter");
// let params = document.getElementById("params");
let parameterContainer = document.getElementById("parameterContainer");
let submitBtn = document.getElementById("submitBtn");

// ------------------------------> Utility Function <------------------------- //
function getElementFromString(string)
{
    let div = document.createElement(`div`);
    div.classList.add("container");
    div.classList.add("my-2");
    div.classList.add("row");
    div.innerHTML = string;
    return div;
} 

// --------------> Trigger different fields according to selection <-------------------- //
if(get.checked)
{
    document.getElementById("postDetailContainer").style.display = `none`;
}

get.addEventListener("click",()=>
{
    document.getElementById("postDetailContainer").style.display = `none`;
})

post.addEventListener("click",()=>
{
    document.getElementById("postDetailContainer").style.display = `block`;
})

if(jsonBtn.checked)
{
    parameterContainer.style.display = `none`;
}

jsonBtn.addEventListener("click",()=>
{
    parameterContainer.style.display = `none`;
    document.getElementById("requestJSON").style.display = `flex`;
})

customizeParams.addEventListener("click",()=>
{
    document.getElementById("requestJSON").style.display = `none`;
    parameterContainer.style.display = `flex`;
})

let parameterCount = 1;

submitParameter.addEventListener("click",function()
{
    parameterCount++;
    
    let string = `<div class="col col-2">
                    <label for="key" class="col-form-label">Parameter ${parameterCount}</label>
                    </div>

                    <div class="row col col-8">
                        <div class="col">
                        <input type="text" class="form-control" placeholder="Key ${parameterCount}" id="key${parameterCount}">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" placeholder="value ${parameterCount}" id="value${parameterCount}">
                        </div>
                        <div class="btn btn-primary col-auto deleteParam">&#x02212;</div>
                    </div>`;
    

    // Convert element node to DOM string 
    let paramElement = getElementFromString(string);

    // console.log(paramElement);
    parameterContainer.appendChild(paramElement);

    // adding an eventListener to remove that perticular perameter on clicking - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for(item of deleteParam)
    {
        item.addEventListener("click",(e)=>
        {
            e.target.parentElement.parentElement.remove();
        })
    }
    
})

submitBtn.addEventListener("click",()=>
{

    let responseJSON = document.getElementById("responseJSON");
    responseJSON.value = `Please wait... fetching your requested data...`;

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;

    let data;
    // If user selected customizeParams , so we collect all the parameters value
    if(contentType === `customizeParams`)
    {
        data = {};
        for(i = 0 ; i < parameterCount ;  i++)
        {
            if(document.getElementById(`key${i+1}`) != undefined)
            {
                let key = document.getElementById(`key${i+1}`).value;
                let value = document.getElementById(`value${i+1}`).value;
                
                data[key] = value;
            }            
        }

        data = JSON.stringify(data);
    }
    else
    {
        data = document.getElementById("requestJSONText").value;
    }

    // logging values for debugging 
    console.log(`URL is ` + url);
    console.log(`requestType is ` + requestType);
    console.log(`contentType is ` + contentType);
    console.log(data);

    

    // Fetching APIs for the data
    if(requestType === `get`)
    {
        fetch(url, {
            method : `GET`,
        }).then(data => data.text())
        .then((text) => {
            responseJSON.value = text;
        });
        responseJSON.rows = 12;
    }
    else
    {
        fetch(url, {
            method : `POST`,
            body : data,
            headers : { "Content-type" : "application/json; charset = UTF-8"}

        }).then(data => data.text())
        .then((text) => {
            responseJSON.value = text;
        })
    }
})

