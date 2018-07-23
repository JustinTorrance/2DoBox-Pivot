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

$(".bottom-box").on('click', function(event){
    var currentQuality = $(event.target).siblings('p.quality').children().text();
    var qualityLevel;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityLevel = "genius";
            $(event.target).siblings('p.quality').children().text(qualityLevel);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityLevel = "plausible";
            $(event.target).siblings('p.quality').children().text(qualityLevel);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityLevel = "swill"
            $(event.target).siblings('p.quality').children().text(qualityLevel);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityLevel = "plausible"
            $(event.target).siblings('p.quality').children().text(qualityLevel);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityLevel = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityLevel = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML.attr('id').charAt(4);
    var cardObjectInJSON = localStorage.getItem(cardHTMLId - 1);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityLevel;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId - 1, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container');
        var cardHTMLId = cardHTML.attr('id').charAt(4);
        localStorage.removeItem(cardHTMLId - 1);
        cardHTML.remove();
    }
});
      










