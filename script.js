function newCard(id , title , body , quality) {
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

function cardObject(turnip) {
    return {
        id: turnip,
        title: $('.title-input').val(),
        body: $('.body-input').val(),
        quality: 'swill'
    };
}

function localStoreCard (potato, radish) {
    var newCardInJSON = JSON.stringify(radish);
    localStorage.setItem(potato, newCardInJSON);
}

$.each(localStorage, function(key) {
    if (key === 'length') {
        return false;
    } else {
    var cardData = JSON.parse(this);
    $( ".bottom-box" ).append(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
}});

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('.title-input').val() === "" || $('.body-input').val() === "") {
       return false;
    };  

    var newId = $.now();
    $( ".bottom-box" ).append(newCard(newId, $('.title-input').val(), $('.body-input').val(), 'swill')); 
    localStoreCard(newId, cardObject(newId));
    $('form')[0].reset();
});

$(".bottom-box").on('click', function(event){
    var currentQuality = $(event.target).siblings('p.quality').children().text();
    var newQuality;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            newQuality = "genius";
            $(event.target).siblings('p.quality').children().text(newQuality);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            newQuality = "plausible";
            $(event.target).siblings('p.quality').children().text(newQuality);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            newQuality = "swill"
            $(event.target).siblings('p.quality').children().text(newQuality);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            newQuality = "plausible"
            $(event.target).siblings('p.quality').children().text(newQuality);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            newQuality = "swill";
        
        } 
        else if (event.target.className === "upvote" && currentQuality === "genius") {
            newQuality = "genius";
        }

    var cardId = $(event.target).closest('.card-container').attr('id');
    var cardInJSON = localStorage.getItem(cardId);
    var cardInJS = JSON.parse(cardInJSON);

    cardInJS.quality = newQuality;

    localStoreCard(cardId, cardInJS);
   
    }
   
    else if (event.target.className === "delete-button") {
        var cardId = $(event.target).closest('.card-container').attr('id');
        localStorage.removeItem(cardId);
        $(`#${cardId}`).remove();
    }
});
      










