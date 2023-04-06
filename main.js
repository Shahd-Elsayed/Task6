// book information
let id=0;
const bookName=document.getElementById("bookName");
const bookDes=document.getElementById("bookDes");
const image = document.getElementById("image");
const rate=document.getElementById("rate");
const read=document.getElementById("read");
const addbook=document.getElementById("addbtn");
const resetbook=document.getElementById("resetbtn");
const main=document.getElementById("books");
let cards=[];

// Add Books function
addbook.addEventListener('click',()=>{
    let data=getData();
    cards.push(data);
    updateView();
    reset();
    id++;
});

// reset Function
resetbook.addEventListener('click',()=>{
    reset();
});

// get date function
function getData(){
    let imageName=image.value.split('\\')[image.value.split('\\').length-1];
    let data={
        id:id,
        name:bookName.value,
        description:bookDes.value,
        image:imageName,
        read:read.checked,
        rate:rate.value,
    }
    return data;
}

// update View content function
function updateView (){
    let htmlContent=``;
    for(let i=0;i<cards.length;i++){
        let StarRate=cards[i].rate;
        if( +StarRate > 5 ){
            StarRate = 5;
        }else if(+StarRate < 1){
            StarRate = 1;
        }
        let FullStars=``;
        let EmptyStars=``;
        for(let j=0; j<StarRate; j++){
            FullStars+=`<i class="bi bi-star-fill"></i>`
        }
        for(let j=0; j< 5-StarRate; j++){
            EmptyStars+=`<i class="bi bi-star"></i>`
        }
        let Book =`
        <div class="${cards[i].read?"read" :"" } card">
        <p class="id">${cards[i].id}</p>
        <img src="images/${cards[i].image}" alt="BookImage">
        <h2><span class="infoTitle">Name: </span>${cards[i].name}</h2>
        <h3><span class="infoTitle">Description: </span> ${cards[i].description}</h3>
        <span id="star"><span class="infoTitle">Rate: </span>${FullStars+EmptyStars} </span>
        <button id="del" onclick="deleteCard(${cards[i].id})">Delete</button>
        </div>
        `;
        htmlContent+=Book;
    }
        main.innerHTML=htmlContent;

}

// Delete Card Function
function deleteCard(id){
    cards = cards.filter((e)=>e.id != id)
    // cards.splice(id,1);
    updateView()
}

// reset Function
function reset(){
    bookName.value =``;
    bookDes.value = ``;
    image.value = ``;
    rate.value = 1;
    read.checked = false;
}
