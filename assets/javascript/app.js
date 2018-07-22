var gameQuestions = [
    {riddle: "I never stop. I control your life, but without me you wouldn't go anywhere. What am I?", 
    optionList: ["The Joker", "Transportation", "Time", "Social Media"], 
    answer: 2},

    {riddle: "If you break me I don't stop working. If you touch me I may be snared. If you lose me nothing will matter. What am I?", 
    optionList: ["Friendship", "Your heart", "Trust", "Money"], 
    answer: 1},

    {riddle: "The man who invented it doesn't want it, the man who bought it doesn't need it, and the man who needs it doesn't know. What am I?", 
    optionList: ["Telephone", "Extra ketchup", "A gun",  "A coffin"], 
    answer: 3},

    {riddle: "You can have me but cannot hold me. Gain me and lose me quickly, if treated with care I can be great, and if betrayed I will break. What am I?", 
    optionList: ["Snowball", "Glass", "A porcupine", "Trust"],
    answer: 3},

    {riddle: "Hit me hard and I will crack. But you'll never stop me from staring back. What am I?", 
    optionList: ["Mr. Freeze", "A mirror", "A stranger", "Batman"],
    answer: 1},

    {riddle: "If you know me, you'll want to share me, but if you share me, I'll be gone. What am I?", 
    optionList: ["Money", "A secret", "An empty bed", "Ice cream"],
    answer: 1},

    {riddle: "What's the single answer on your face?", 
    optionList: ["An eyeball", "Yes", "No", "Your smile"],
    answer: 2},

    {riddle: "What is the beginning of eternity, the end of time and space, the beginning of the end, and the end of every race?", 
    optionList: ["A winner", "The letter 'I'", "The letter 'E'", "Nothing"],
    answer: 2},

    {riddle: "I'm where yesterday follows today, and tomorrow's in the middle. What am I?", 
    optionList: ["A calendar", "Labor Day", "The evening", "A dictionary"],
    answer: 3},

    {riddle: "When is the time of a clock like the whistle of a train?", 
    optionList: ["When it's noon", "When it's two to two", "Never", "When it's one to one"],
    answer: 1},

    {riddle: "What belongs to you, but is used by others?", 
    optionList: ["Your name",  "A mailbox", "A sidewalk",  "Your bathroom"],
    answer: 0},

    {riddle: "What is it that no man wants to have but no man wants to lose?", 
    optionList: ["A bet", "A life", "A marriage", "A lawsuit"],
    answer: 3},

    {riddle: "The more there is the less you see. What could I be?", 
    optionList: ["Lies", "Tall people", "Darkness", "Smoke"],
    answer: 2},

    {riddle: "I can run but not walk and wherever I go thought follows. What am I?", 
    optionList: ["A car", "A refrigerator", "Your mouth", "A nose"],
    answer: 3},

    {riddle: "What weighs six ounces, sits in a tree, and is very dangerous?", 
    optionList: ["An apple", "Two Face's coin", "Batman", "A sparrow with a machine gun"],
    answer: 3},
]

var bonusQuestion = {
    riddle: "I'm here but can't be seen, I'm neither real nor imaginary, and I exist only within the confines of this window. What am I?", 
    optionList: ["A ghost", "God", "This riddle", "Nothing", "The Answer"],
    answer: 4
}

var answerlog = [
    gameQuestions[0].answer, gameQuestions[1].answer, gameQuestions[2].answer, gameQuestions[3].answer, gameQuestions[4].answer, 
    gameQuestions[5].answer, gameQuestions[6].answer, gameQuestions[7].answer, gameQuestions[8].answer, gameQuestions[9].answer, 
    gameQuestions[10].answer, gameQuestions[11].answer, gameQuestions[12].answer, gameQuestions[13].answer, gameQuestions[14].answer
]

var statusUpdate = {
    correct: "How could you have known?!",
    incorrect: "I can't believe you are unable to solve the simplest of puzzles.",
    allCorrect: "What? You did it? You must've cheated!",
    timeout: "Looks like you're out of time!",
    end: "Let's see how you did.",
    nooooo: "You cheated! There's no way you could've outsmarted me!",
    loser: "I believe I credited you with more intelligence than I should have. Let's give your brain a rest. It needs it.",
    poor: "You are performing just below my predicted expectations. At this rate you'll never beat me.",
    okay: "You are beginning to impress me. You may still reach a level just below my genius one day.",
    better: "So you did it. Well done. I would have expected a child to work these out, but I suppose you'll do."
}

var audio = {
    start: new Audio("assets/audio/riddlerstart.mp3")
}

var riddle;
var solution;
var userChoice;
var answered;
var currentRiddle = 0;
var bonus = false;

var gameOver = false;
var gameStart = false;
var correctAnswers = 0;
var incorrectAnswers = 0;
var time;
var seconds;

var resetGame = function() {
    $("#options-div").hide();
    $("#clock-div").hide();
    $("#score-div").hide();
    $("#corrected").hide();

    correctAnswers = 0;
    incorrectAnswers = 0;
    gameOver = false;
    gameStart = false;
}

var startGame = function() {
    $("#title").hide();
    $("#start-div").hide();
    $("#clock-div").show();
    $("#options-div").show();
    $("#corrected").hide();

    gameStart = true;
    currentRiddle = 0;
    nextQuestion();
    audio.start.play();
}

var nextQuestion = function() {
    $("#corrected").hide();

    answered = true;
    $("#gameStatus").text("Riddle me this!");
    $("#riddle").text(gameQuestions[currentRiddle].riddle);

    for (var i = 0; i < 4; i++){
        var options = $("<button class='btn-lg btn-dark'>");
        options.text(gameQuestions[currentRiddle].optionList[i]);
        options.attr({"data-index": i});
        options.addClass("options");
        $("#answers").append(options);
    }

    countdown();

    $(".options").on("click", function() {
        userChoice = $(this).data("index");
        clearInterval(time);
        checkAnswer();
        console.log("User chose " + userChoice)
    });
}

var bonusStage = function() {
    answered= true;
    $("#gameStatus").text("You must've cheated! There's no way you could've solved them all! Riddle me one last time!");
    $("#riddle").text(bonusQuestion.riddle);

    for (var i = 0; i < 5; i++) {
        var options = $("<button class='btn-lg btn-dark'>");
        options.text(bonusQuestion.optionList[i]);
        options.attr({"data-index": i});
        options.addClass("options");
        options.addClass("number" + i);
        $("#answers").append(options);
    }

    countdown();

    $(".options").on("click", function() {
        userChoice = $(this).data("index");
        clearInterval(time);
        checkBonus();
        console.log("User chose " + userChoice)
    });
}

var countdown = function() {
    seconds = 15;
    $("#countdown").text("Time remaining: " + seconds + " seconds");
    answered = true;
    time = setInterval(displayCountdown, 1000)
}

var displayCountdown = function() {
    seconds -= 1;
    $("#countdown").text("Time remaining: " + seconds + " seconds");
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        checkAnswer();
        checkBonus();
    }
}

var checkAnswer = function() {
    $("#riddle").empty();
    $("#answers").empty();

    var solution = gameQuestions[currentRiddle].optionList[gameQuestions[currentRiddle].answer];
    var solutionIndex = gameQuestions[currentRiddle].answer;

    if ((userChoice == solutionIndex) && answered == true) {
        correctAnswers += 1;
        $("#gameStatus").text(statusUpdate.correct);
    } else if ((userChoice != solutionIndex) && answered == true) {
        incorrectAnswers += 1;
        $("#gameStatus").text(statusUpdate.incorrect);
        $("#corrected").text("Wrong! The correct answer was " + solution);
    } else {
        incorrectAnswers += 1;
        $("#gameStatus").text(statusUpdate.timeout);
        $("#corrected").text("Time's up! The correct answer was " + solution);
        answered = true;
    }

    if (currentRiddle == (gameQuestions.length-1) && correctAnswers < 15) {
        setTimeout(score, 3000);
        $("#gameStatus").text(statusUpdate.end);
    } else if ((currentRiddle == (gameQuestions.length-1)) && correctAnswers === 15) {
        setTimeout(bonusStage, 3000);
    } else {
        currentRiddle += 1;
        setTimeout(nextQuestion, 3000);
    }
}

var checkBonus = function() {
    $("#riddle").empty();
    $("#answers").empty();

    var bonusSolution = bonusQuestion.answer;

    if ((userChoice == bonusSolution) && answered == true) {
        correctAnswers += 1;
        bonus = true;
        $("#gameStatus").text(statusUpdate.nooooo);
        setTimeout(score, 3000);
    } else {
        incorrectAnswers += 1;
        $("#gameStatus").text(statusUpdate.loser);
        setTimeout(score, 3000);
    }
}

var score = function() {
    $("#game-div").hide();
    $("#clock-div").hide();
    $("#score-div").show();
    $("#corrected").hide();

    $("#correct-div").text("Correct answers: " + correctAnswers);
    $("#incorrect-div").text("Incorrect answers: " + incorrectAnswers);

    if (correctAnswers < 6) {
        $("#comment").text(statusUpdate.poor);
    } else if (correctAnswers > 5 && correctAnswers < 11) {
        $("#comment").text(statusUpdate.okay);
    } else if (correctAnswers === 16) {
        $("#comment").text(statusUpdate.cheater);
        //audio.cheater.play();
    } else {
        $("#comment").text(statusUpdate.better);
    }

}

$(document).ready(function() {
    resetGame();
    
    $("#start-btn").on("click", function() {
        startGame();           
    });
});

console.log(answerlog)
console.log(statusUpdate.allCorrect)