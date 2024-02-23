const getdata = async () => {
    const data = await fetch("https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    return json;
}

const imgCdn = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"
window.onload = async (event) => {
    const data = await getdata();
    console.log(data)

    const cardContainer = document.querySelector(".card-container");
    const wholeData = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    wholeData.forEach((data) => {
        const card = document.createElement("div");         // new card:
        card.classList.add("card");

        const cardImage = document.createElement("div");
        const cardData = document.createElement("div");

        cardImage.classList.add("card-image");
        cardData.classList.add("card-data");


        const img = document.createElement("img");
        img.src = `${imgCdn}/${data.info.cloudinaryImageId}`;
        cardImage.appendChild(img);
        cardContainer.appendChild(card);
        card.appendChild(cardImage);


        const name = data.info.name;
        const cuisines = data.info.cuisines.slice(0, 3).join(",");
        const costForTwo = data.info.costForTwo;

        const cardHeading = document.createElement("h4");
        const cardCuisines = document.createElement("p");
        const cardDetails = document.createElement("div");

        cardHeading.innerText = name;
        cardCuisines.innerText = cuisines;
        cardData.append(cardHeading, cardCuisines, cardDetails);
        card.appendChild(cardData);


        const ratings = document.createElement("p")
        const distance = document.createElement("p")
        const cost = document.createElement("p")

        ratings.innerText = data.info.avgRating;
        distance.innerText = data.info.sla.slaString;
        cost.innerText = costForTwo;
        cardDetails.append(ratings, distance, cost);
        cardDetails.classList.add("card-details");
    });
};
