let questions = [];
let num = 0;
let correct = 0;
let wrong = 0;

// キー作成用関数
const makeKey = function() {
    let keys = [0];
    for(let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }
    let maxNum = Math.max.apply(null,keys);
    return 1 + maxNum;
}

// クイズ追加イベント
$('#create').on('click', function (){
    let key = makeKey();
    let quiz = $('#quiz').val();
    let choice1 = $('#choice1_text').val();
    let choice2 = $('#choice2_text').val();
    let choice3 = $('#choice3_text').val();
    let answer = $("input[type='radio']:checked").val(); 

    if (quiz == "" || choice1 == "" || choice2 == "" || choice3 == "") {
        alert("Please fill all blanks!")
        return false;
    }

    if (!answer) {
        alert("Please choose the answer for this question!")
        return false;
    }

    const question = {
        quiz: quiz,
        choice1: choice1,
        choice2: choice2,
        choice3: choice3,
        answer: answer
    }

    localStorage.setItem(key, JSON.stringify(question));
    console.log(question);
    alert("Created!");
    // location.reload();
})

