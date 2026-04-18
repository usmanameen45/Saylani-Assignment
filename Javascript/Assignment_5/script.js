let api = async function() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await res.json();   
    console.log(data);
    // loop through the data and create elements for each user
    data.map(user => {
      // main div
        let div = document.createElement("div");
        div.classList.add("card");
        // p tag for id
        let p = document.createElement("p");
        p.innerHTML = `<b>ID:</b> ${user.id}`;
        div.append(p);
        // p tag for name
        let p1 = document.createElement("p");
        p1.innerHTML = `<b>Name:</b> ${user.name}`;
        div.append(p1);
        // p tag for phone
        let p2 = document.createElement("p");
        p2.innerHTML = `<b>Phone:</b> ${user.phone}`;
        div.append(p2);
        // p tag for email
        let p3 = document.createElement("p");
        p3.innerHTML = `<b>Email:</b> ${user.email}`;
        div.append(p3);
        // p tag for address        
        let p4 = document.createElement("p");
        p4.innerHTML = `<b>Address:</b> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
        div.append(p4);
        // p tag for company
        let p5 = document.createElement("p");
        p5.innerHTML = `<b>Company:</b> ${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}`;
        div.append(p5);
        // append main div to body
        document.querySelector("#main-container").append(div);
    });
  } catch (error) {
    console.log(error);
  }
}
api();

