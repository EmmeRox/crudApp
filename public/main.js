//external js to execute the PUT request. It is convention to name this folder the PUBLIC folder
const update = document.querySelector("#update-button");

//fetch has the following syntax: (enpoint, options)
update.addEventListener("click", (_) => {
  //Send PUT request here
  fetch("/quotes", {
    /*put is a method of Fetch*/
    method: "put",
    //tell the server we are sending JSON data by setting the content type
    headers: { "Content-Type": "application/json" },
    //convert the date we send into json using json.stringify using the body property
    body: JSON.stringify({
      name: "Darth Vader",
      quote: "I find your lack of faith disturbing",
    }),
  });
});
