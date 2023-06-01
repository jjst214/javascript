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
const juja = document.querySelectorAll("#minimap>div");
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
    
    play();
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
let ran_val;
let hit_ran;
let hit_ran2;
let first_stat = juja[0].dataset.value;
let second_stat = juja[1].dataset.value;
let third_stat = juja[2].dataset.value;
function first_status(idx){
    first_stat = idx;
    if(first_stat == 0){
        juja[0].style.background = "#fff";
    }else{
        juja[0].style.background = "yellow";
    }
}
function second_status(idx){
    second_stat = idx;
    if(second_stat == 0){
        juja[1].style.background = "#fff";
    }else{
        juja[1].style.background = "yellow";
    }
}
function third_status(idx){
    third_stat = idx;
    if(third_stat == 0){
        juja[2].style.background = "#fff";
    }else{
        juja[2].style.background = "yellow";
    }
}
function play(){
    if(isUserTurn){
        commandBtns[0].addEventListener("click", function(e){
            half_ran = newRandom();
            if(half_ran>5){
                hit_ran = newRandom();
                if(hit_ran>3){ // com 스트라이크 상황, 80%확률로 치는거 성공
                    hit_ran2 = newRandom();
                    switch(hit_ran2){
                        case 1:
                        case 2:
                            console.log("안타");
                            check(e.target.dataset.atk);
                            break;
                        case 3:
                        case 4:
                            console.log("홈런");
                            check(e.target.dataset.atk);
                            break;
                        case 5:
                        case 6:
                            console.log("파울");
                            check(e.target.dataset.atk);
                            break;
                        case 7:
                        case 8:
                            console.log("땅볼아웃");
                            check(e.target.dataset.atk);
                            break;
                        default:
                            console.log("플라이아웃");
                            check(e.target.dataset.atk);
                            break;
                    }
                }else{ //못쳤을때

                }
            }else{

            }
        })
    }else{

    }

    function check(val){

        function outChk(){
            out_cnt++;
            if(out_cnt>=3){
                newLi("삼진아웃");
                first_status(0);
                second_status(0);
                third_status(0);
                if(isUserTurn){
                    isUserTurn = false;
                }else{
                    isUserTurn = true;
                }
            }
        }

        //배트에 공이 맞은 상황 처리
        switch(hit_ran2){
            // 안타
            case 1:
            case 2:
                if(first_stat == 0){
                    first_status(1);
                }else{
                    if(second_stat == 0){
                        second_status(1);
                    }else{
                        if(third_stat == 0){
                            third_status(1);
                        }else{
                            if(isUserTurn){
                                userScore++;
                                boardRefresh();
                            }else{
                                comScore++;
                                boardRefresh();
                            }
                        }
                    }
                }
                break;
            // 홈런
            case 3:
            case 4:
                let sum = 1;
                sum = sum + Number(first_stat) + Number(second_stat) + Number(third_stat);
                if(isUserTurn){
                    userScore += sum;
                }else{
                    comScore += sum;
                }
                first_status(0);
                second_status(0);
                third_status(0);
                boardRefresh();
                break;
            // 파울
            case 5:
            case 6:
                if(val == "swing"){
                    if(strike_cnt!=2){
                        strike_cnt++;
                    }
                }else{
                    
                }
                break;
            case 7:
            case 8:
                console.log("땅볼아웃");
                break;
            default:
                console.log("플라이아웃");
                break;
        }
    }
}