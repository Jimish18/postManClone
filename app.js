console.log("Jay Shree Ram");

// --------------------------> Grab Elements <---------------------------- //
let get = document.getElementById("get");
let post = document.getElementById("post");
let jsonBtn = document.getElementById("json");
let constomizeParams = document.getElementById("constomizeParams");
let submitParameter = document.getElementById("submitParameter");


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
    document.getElementById("parameters").style.display = `none`;
}

jsonBtn.addEventListener("click",()=>
{
    document.getElementById("parameters").style.display = `none`;
    document.getElementById("requestJSON").style.display = `flex`;
})

constomizeParams.addEventListener("click",()=>
{
    document.getElementById("requestJSON").style.display = `none`;
    document.getElementById("parameters").style.display = `flex`;
})

let parameterCount = 2;

submitParameter.addEventListener("click",function()
{
    
})