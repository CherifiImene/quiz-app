var state = {
    modules: [{
            question: "You're heart beats over" ,
            answer: "100,000 times a day",
            propositions: ["800,000 times a day" ,"900,000 times a day" ,"50,000 times a day" ,"90,000 times a day" ,"100,000 times a day" ]},
        {
            question: "How long does food take to get entirely digest ?" ,
            answer: "12 hours",
            propositions:["14 hours" ,"12 hours" ,"10 hours" ,"9 hours" ,"8 hours" ]
        },
        {
            question: "The longuest bout of hycups lasted nearly" ,
            answer: "69 years",
            propositions:["6 months" ,"10 years" ,"10 weeks" ,"69 years" ,"69 days" ]
        },
        {
            question: "Wearing headphones for just an hour will increase bacteria in your ear  " ,
            answer: "700 times",
            propositions:["900 times" ,"800 times" ,"700 times" ,"600 times" ,"500 times"]             
        },
        {
            question: "The first Fax machine was patented" ,
            answer: "in 1843",
            propositions:["30 years before Grahambel demonstrated the telephone" ,"in 1853" ,"20 years after Grahambel demonstrated the telephone" ,"in 1843" ,"in 1850"]
        },
        {
            question: "What is the average for a normal person to fall asleep ?" ,
            answer: "7 min",
            propositions:["7 min" ,"5 min" ,"10 min" ,"15 min" ,"4 min"] 
        },
        {
            question: "How long can an iguana stay under water ?" ,
            answer: "28 min",
            propositions:["1 hour" ,"45 min" ,"50 min" ,"28 min" ,"30 min"]             
        },
        {
            question: "The world's youngest parent were age" ,
            answer: "8 and 9",
            propositions:["10 and 9" ,"8 and 9" ,"15 and 12" ,"9 and 9" ,"8 and 8"]            
        },
        {
            question: "choose the correct statement" ,
            answer: "Women blink nearly twice often as men",
            propositions:["Women blink nearly twice less than men" ,"Women blink nearly twice often as men" ,"Women blink just like men does" ,"none of these" ,"Women blink nearly three times more than men"] 
        },
        {
            question: "The moon is moving away from the Earth at a tiny, although measurable, rate every year. 85 million years ago it was orbiting the Earth" ,
            answer: "about 35 feet from the planet's surface",
            propositions:["about 1km from the planet's surface" ,"about 35 feet from the planet's surface" ,"about 50 feet from the planet's surface" ,"about 1 meter from the planet's surface" ,"about 2 meters from the planet's surface"]
        }

    ]
};
var score = 0;
var currentModule={};
var indexQuestion = 1;
var answered = false; // a boolean to prevent the user from aswering more than once
var propositionTemplate = '<li class="js-display-proposition"></li>';
var questionTemplate = '<h3 class="display-question"></h3>';
var indexTemplate = '<h6 class="index-question"></h6>';
var scoreTemplate = '<h1 class="score"></h1>';
//Dom manipulation
function evaluateAnswer (currentModule , choice){
    if(currentModule.answer === choice){
        score ++;
        return true;
    }
    return false;
}
function nextmodules(state){
    return state.modules.shift();
}
function displayQuestion(element , questionTemplate , question , indexTemplate, indexQuestion){
    let contentQuestion = $(questionTemplate).text('Q : '+question);
    let contentIndex = $(indexTemplate).text(indexQuestion+' / 10');
    element.html([contentIndex,contentQuestion]);
}
function renderHtmlElementPreposition(propositionTemplate,proposition ){
    let content = $(propositionTemplate).text(proposition);
    return content;
}
function displayScore(element, scoreTemplate, score){
    let content  = $(scoreTemplate).text('Score : '+score+' / 10');
    if(score >=8){
        content  = $(scoreTemplate).text('Congratulation you\'re Score is : '+score+' / 10');
    }
    
    element.html(content);
}
function renderCorrectProposition(element){
    element.addClass('correct');
    return element;
}
function renderIncorrectProposition(element){
    element.addClass('incorrect');
    return element;
}

//EventListeners
$(function(){
     currentModule = {} ;
    try {
        currentModule = nextmodules(state);
    } catch (error) {
        console.log('Something went wrong');
        console.dir(error);
    }finally{
        displayQuestion($('.js-question'),questionTemplate,currentModule.question , indexTemplate, indexQuestion);
        let propositionsHtml= [];
        for(let i=0 ; i<currentModule.propositions.length; i++){
            propositionsHtml.push(renderHtmlElementPreposition(propositionTemplate,currentModule.propositions[i]));
            if(currentModule.propositions[i] === currentModule.answer){
                //addclass correct
                propositionsHtml[i] = renderCorrectProposition($(propositionsHtml[i]));
            }else{
                //addclass incorrect
                propositionsHtml[i] = renderIncorrectProposition($(propositionsHtml[i]));
            }
        }
        $('.js-list-choices').html(propositionsHtml);
    }
});
$('.js-list-choices').on('click','.js-display-proposition', function(event){
    if(!answered){
        answered = !answered;
        event.stopPropagation;
        let choice = $(event.currentTarget).text();
        evaluateAnswer(currentModule,choice);
        $(this).addClass('display');
        $('.correct').addClass('display');
        $('.js-next').toggleClass('hidden');
        if(indexQuestion===10){ // if we've reached the last question we show the score after 1 seconds
            $('.js-next').toggleClass('hidden');
            setTimeout(function(){
                $('div.points').removeClass('hidden');
                displayScore($('div.points'), scoreTemplate ,score); 
                $('.container-quiz').addClass('hidden');
            },1000);
        }
    }
    
});
$('.js-next-question').on('click', function(event){
     answered = !answered;
     currentModule = nextmodules(state);
    indexQuestion++;
    if(currentModule){
        let propositionsHtml= [];
        for(let i=0 ; i<currentModule.propositions.length; i++){
            propositionsHtml.push(renderHtmlElementPreposition(propositionTemplate,currentModule.propositions[i]));
            if(currentModule.propositions[i] === currentModule.answer){
                //addclass correct
                propositionsHtml[i] = renderCorrectProposition($(propositionsHtml[i]));
            }else{
                //addclass incorrect
                propositionsHtml[i] = renderIncorrectProposition($(propositionsHtml[i]));
            }
        }
        $('.js-next').toggleClass('hidden');
        displayQuestion($('.js-question'),questionTemplate,currentModule.question , indexTemplate, indexQuestion);
        $('.js-list-choices').html(propositionsHtml);
    }
    
});