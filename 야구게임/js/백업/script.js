const turn = document.querySelector("#turn");
const intro = document.querySelector("#intro");
const startbtn = document.querySelector("#intro button");
const action_log = document.querySelector("#action-log");
const round = document.querySelector("#round");
const commands = document.querySelector("#commands");
const commandBtns = document.querySelectorAll("#commands button");
const ground = document.querySelector("#game");
const board = document.querySelector("#board");
const logUl = document.querySelector("#log");
const lis = document.querySelectorAll("#log li");
let isUserTurn = true;
let userScore = 0;
let comScore = 0;
let strike_cnt = 0;
let ball_cnt = 0;
let out_cnt = 0;
let roundtext = 1;

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
        case "파울":
            createTxt = document.createTextNode("배트에 맞았지만 파울존에 들어갔습니다");
            break;
        case "플라이아웃":
            createTxt = document.createTextNode("빗맞아서 높이 뜬 공에 의해 아웃됐습니다");
            break;
        case "삼진아웃":
        createTxt = document.createTextNode("삼진아웃! 공수 교체됩니다.");
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
    round.firstElementChild.innerHTML = `${roundtext}회초`;
    turn.firstElementChild.innerHTML = "공격 턴 입니다.";
        turn.style.display = "block";
        setTimeout(function(){
            turn.style.display = "none";
        }, 3000);
        commands.firstElementChild.innerHTML = "공격";
        commandBtns[0].innerHTML = "스윙!!";
        commandBtns[1].innerHTML = "기다리기";
});
// UI display 끝

// 유저 턴 일때 공격/수비 텍스트 변환 함수
function turnChk(){
    if(isUserTurn){
        roundtext++;
        turn.firstElementChild.innerHTML = "공격 턴 입니다.";
        turn.style.display = "block";
        setTimeout(function(){
            turn.style.display = "none";
        }, 3000);
        commands.firstElementChild.innerHTML = "공격";
        commandBtns[0].innerHTML = "스윙!!";
        commandBtns[1].innerHTML = "기다리기";
        round.firstElementChild.innerHTML = `${roundtext}회초`;
    }else{
        turn.firstElementChild.innerHTML = "수비 턴 입니다.";
        turn.style.display = "block";
        setTimeout(function(){
            turn.style.display = "none";
        }, 3000);
        commands.firstElementChild.innerHTML = "수비";
        commandBtns[0].innerHTML = "스트라이크";
        commandBtns[1].innerHTML = "볼";
        round.firstElementChild.innerHTML = `${roundtext}회말`;
    }
}

// 유저 턴 일때 공격/수비 텍스트 변환 함수 끝

// 게임 시스템 로직

//랜덤값 출력(확률계산용)
function newRandom(){
    return Math.floor(Math.random()*10)+1;
}


function boardRefresh(){
    document.querySelector("#strike").lastElementChild.innerHTML = strike_cnt;
    document.querySelector("#ball").lastElementChild.innerHTML = ball_cnt;
    document.querySelector("#out").firstElementChild.innerHTML = out_cnt;
    document.querySelector("#userScore").innerHTML = userScore;
    document.querySelector("#comScore").innerHTML = comScore;
}

let idx;
let outIdx;
boardRefresh();
if(isUserTurn){ //유저턴이 true일때(공격상황)
    commands.addEventListener("click", function(e){
        idx = newRandom();
        let btnValue = e.target.dataset.atk;
        if(btnValue == "swing"){
            //computer 투수 50% 확률로 strike, ball 결정
            if(idx<=5){ // 컴퓨터 볼 상황
                console.log("컴퓨터볼");
                idx = newRandom();
                if(idx<7){ // 스윙성공
                    outIdx = newRandom();
                    if(outIdx<=2){
                        console.log("안타");
                        newLi("안타");
                    }else if(outIdx>=3 && outIdx<=4){
                        console.log("홈런");
                        newLi("홈런");
                    }else if(outIdx>=5 && outIdx<=6){
                        console.log("파울");
                        newLi("파울");
                        gameRule();
                        boardRefresh();
                    }else if(outIdx>=7 && outIdx<=8){
                        console.log("땅볼아웃");
                        gameRule();
                        boardRefresh();
                        
                    }else{
                        console.log("플라이아웃");
                        gameRule();
                        newLi("플라이아웃");
                        boardRefresh();
                        
                    }
                }else{ //스윙실패
                    console.log("스윙실패" + outIdx);
                    gameRule();
                    boardRefresh();
                }
            }else{  // 컴퓨터 스트라이크 상황 스윙 성공률 40%
                console.log("컴퓨터 스트라이크");
                gameRule();
            }
        }else{ // 기다리기 선택
            
        }
    });
}else{

}
//아웃카운트 계산
function gameRule(){
    if(strike_cnt>=2){
        if(strike_cnt==2){
            if(outIdx==5 || outIdx==6){
                strike_cnt = 2;
                outIdx = 0;
                boardRefresh();
            }else{
                strike_cnt = 0;
                ball_cnt = 0;
                outIdx = 0;
                out_cnt++;
                boardRefresh();
            }
        }
    }else{
        strike_cnt++;
        boardRefresh();
    }
    if(outIdx>6){
        out_cnt++;
        strike_cnt = 0;
        ball_cnt = 0;
        outIdx = 0;
    }
    if(out_cnt >= 3){
        console.log("삼진아웃");
        newLi("삼진아웃");
        out_cnt = 0;
        strike_cnt = 0;
        ball_cnt = 0;
        boardRefresh();
        if(isUserTurn){
            isUserTurn = false;
            turnChk();
        }else{
            isUserTurn = true;
            turnChk();
        }
        
    }
}
