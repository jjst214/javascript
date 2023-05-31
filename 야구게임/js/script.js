const turn = document.querySelector("#turn");
const intro = document.querySelector("#intro");
const startbtn = document.querySelector("#intro button");
const action_log = document.querySelector("#action-log");
const commands = document.querySelector("#commands");
const commandBtns = document.querySelectorAll("#commands button");
const ground = document.querySelector("#game");
const board = document.querySelector("#board");
const logUl = document.querySelector("#log");
const lis = document.querySelectorAll("#log li");
let isUserTurn = true;

// 이벤트 로그 추가 함수


function newLi(event){
    let createLi = document.createElement('li');
    let createTxt;
    switch(event){
        case "홈런":
            createTxt = document.createTextNode("홈런을 쳤습니다!!");
            break;
        case "안타":
            createTxt = document.createTextNode("안타를 쳤습니다");
            break;
    }
    createLi.append(createTxt);
    function maxLengthChk(){
        let num = logUl.childElementCount;
        if(num>=8){
            logUl.lastElementChild.remove();
            logUl.prepend(createLi);
        }else{
            logUl.prepend(createLi);
        }
    }
    maxLengthChk();
}
// 이벤트 로그 추가함수 끝

// 게임시작 시 UI display 조작 리스너


startbtn.addEventListener("click", function(){
    action_log.style.display = "block";
    commands.style.display = "flex";
    board.style.display = "flex";
    ground.style.display = "block";
    intro.style.display = "none";
    
    turn.style.display = "block";
    setTimeout(function(){
        turn.style.display = "none";
    }, 3000)
    isUserTurn = true;
});
// UI display 끝

// 유저 턴 일때 공격/수비 텍스트 변환 함수
function turnChk(){
    if(isUserTurn == true){
        commands.firstElementChild.innerHTML = "공격";
        commandBtns[0].innerHTML = "스윙!!";
        commandBtns[1].innerHTML = "기다리기";
    }else{
        commands.firstElementChild.innerHTML = "수비";
        commandBtns[0].innerHTML = "스트라이크";
        commandBtns[1].innerHTML = "볼";
    }
}
turnChk();
// 유저 턴 일때 공격/수비 텍스트 변환 함수 끝

// 게임 시스템 로직

// 공격상황
let random = Math.floor(Math.random()*10)+1;