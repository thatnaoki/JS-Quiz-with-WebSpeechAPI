let questions = [];
let num = 0;
let correct = 0;
let wrong = 0;

// localStorageのクイズを取得してquestions配列に入れる関数
const makeQuiz = function(i) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let question = JSON.parse(value);
    questions.push(question);
    console.log(questions);
};

// questions配列に、localStorageの問題を全部入れる
window.onload = function() {
    for(let i = 0; i < localStorage.length; i++) {
        makeQuiz(i);
    }
    $('#quiz-wrapper').hide();
};

// 問題表示用の関数
const showQuiz = function(i) {
    $('#question').html(questions[i].quiz);
    $('#choice1').html(questions[i].choice1);
    $('#choice2').html(questions[i].choice2);
    $('#choice3').html(questions[i].choice3);
    $('#quiz-wrapper').show();
    $('#try').hide();
    $('#create').hide();
    $("input[name='choice']:checked").prop("checked", false);
}

// 最初の問題表示
$('#try').on('click', function() {
    showQuiz(0);
})

// 回答と正解判定および次の問題へ
$("#finalanswer").on("click", function() {
    ;
    let finalAnswer = $("input[name='choice']:checked").val();
    console.log(finalAnswer);
    if (finalAnswer == questions[num].answer) {
        correct++;
        alert("Correct!");
    } else if (!finalAnswer) {
        alert("You must choose the answer.");
        return false;
    } else {
        wrong++;
        alert("Wrong!");
    }
    if(num < localStorage.length - 1) {
        num++;
        showQuiz(num);
    } else {
        alert('Correct: ' + correct + ' Wrong: ' + wrong);
        location.reload();
    }
})

// 音声認識関連
let btn = document.querySelector('#speech_btn');
let speech = new webkitSpeechRecognition();

speech.lang = "ja";

btn.addEventListener('click', function() {
    speech.start();
});

speech.addEventListener('result', function(e) {
    // console.log(e);
    var speech_text = e.results[0][0].transcript;
    console.log(speech_text);
    if (speech_text == questions[num].choice1) {
        $("input[value='1'] ").prop("checked", true);
    } else if (speech_text == questions[num].choice2) {
        $("input[value='2'] ").prop("checked", true);
    } else if (speech_text == questions[num].choice3) {
        $("input[value='3'] ").prop("checked", true);
    } else {
        alert("I'm not sure about what you said. Please try again.");
    }
});