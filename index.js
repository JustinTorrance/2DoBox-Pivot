var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var numCards = 0;
var qualityVariable = "swill";

var newCard = function(id , title , body , quality) {
    return  `<article id="${id}" class="card-container">
                <div class="top-card-div">
                    <h2 class="title-of-card">${title}</h2>
                    <button class="delete-button"></button>
                </div>
                <p class="body-of-card">${body}</p>
                <div class="bottom-card-div">
                    <button class="upvote"></button>
                    <button class="downvote"></button> 
                    <p class="quality">quality: <span class="quality-variable">${quality}</span></p>
                </div>
            </article>`
};

function cardObject() {
    return {
        id: 'card' + numCards,
        title: titleInput.val(),
        body: bodyInput.val(),
        quality: qualityVariable
    };
}

$.each(localStorage, function() {
    var cardData = JSON.parse(this);
    numCards++;
    $( ".bottom-box" ).append(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
});

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem(numCards - 1, cardString);
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if (titleInput.val() === "" || bodyInput.val() === "") {
       return false;
    };  

    numCards++;
    $( ".bottom-box" ).append(newCard('card' + numCards, titleInput.val(), bodyInput.val(), qualityVariable)); 
    localStoreCard();
    $('form')[0].reset();
});

// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);cardObject

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });
      










