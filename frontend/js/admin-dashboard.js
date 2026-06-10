const token =
localStorage.getItem("token");

if(!token){

window.location.href =
"admin-login.html";

}

const eventList =
document.getElementById("eventList");

async function loadEvents(){

const response =
await fetch(
"http://localhost:5000/api/events"
);

const events =
await response.json();

eventList.innerHTML="";

events.forEach(event=>{

eventList.innerHTML += `
<div class="card">

<h3>${event.title}</h3>

<p>${event.description}</p>

<button
onclick="deleteEvent(
'${event._id}'
)">
Delete
</button>

</div>
`;

});

}

async function deleteEvent(id){

const response =
await fetch(
`http://localhost:5000/api/events/${id}`,
{
method:"DELETE",
headers:{
Authorization:token
}
}
);

const data =
await response.json();

alert(data.message);

loadEvents();

}

document
.getElementById("logoutBtn")
.addEventListener(
"click",
()=>{

localStorage.removeItem("token");

window.location.href =
"admin-login.html";

}
);

loadEvents();