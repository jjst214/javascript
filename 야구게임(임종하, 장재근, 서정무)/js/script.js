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
const round = document.querySelector("#round");
const juja = document.querySelectorAll("#minimap div");
const div = document.querySelectorAll("div");
let strikescore = document.querySelector("#strike strong");
let ballscore = document.querySelector("#ball strong");
let outscore = document.querySelector("#out>p");
let isUserTurn = true;
let resetCount = 0;
let strikeNum = 0;
let ballNum = 0;
let outNum = 0;
let roundtext = 1;
let userScore = 0;
let comScore = 0;
let timer;
let bol = document.querySelector("#bol");
let player = document.querySelectorAll("#hitter");
let pitcher = document.querySelector("#pitcher");
let gameStrike = document.querySelector("#game_strike");
let gameBall = document.querySelector("#game_ball");
let gameFaul = document.querySelector("#game_faul");
let gameStrikeout = document.querySelector("#game_strikeout");
let gameFourball = document.querySelector("#game_fourball");
let gameFlyout = document.querySelector("#game_flyout");
let gameGroundball = document.querySelector("#game_groundball");
let gameHomerun = document.querySelector("#game_Homerun");
let gameAnta = document.querySelector("#game_Anta");

// 1,2,3루 진출상황 data-value값 0 or 1 로 관리(추후 홈런상황에서 value값 재활용)
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
/* ---------------------- 진출관리 끝 ------------------------*/

// 이벤트 로그 추가 function
function newLi(eventType){
    let createLi = document.createElement('li');
    let createTxt;

    switch(eventType){
        case "홈런":
            createTxt = document.createTextNode("홈런을 쳤습니다!!");
            plus_score();
            minimap_clear();
            strikeCountReset();
            ballCountReset();
            homerunEffect();
            break;
        case "안타":
            createTxt = document.createTextNode("안타를 쳤습니다");
            run();
            strikeCountReset();
            ballCountReset();
            antaEffect();
            break;
        case "헛스윙":
            createTxt = document.createTextNode("헛스윙~ 이게뭔가요~");
            strikeCount();
            strikeEffect();
            break;
        case "볼":
            createTxt = document.createTextNode("볼~");
            ballCount();
            ballEffect();
            break;
        case "스트라이크":
            createTxt = document.createTextNode("스트라이크 ~!");
            strikeCount();
            strikeEffect();
            break;
        case "스트라이크아웃":
            createTxt = document.createTextNode("스트라이크 아웃!");
            break;
        case "볼넷":
            createTxt = document.createTextNode("볼 넷 ! 1루 진루 !");
            break;
        case "파울":
            createTxt = document.createTextNode("파울입니다.");
            faulEffect()
            faulcount();
            break;
        case "땅볼아웃":
            createTxt = document.createTextNode("땅볼아웃입니다.");
            strikeCountReset();
            ballCountReset();
            groundballEffect();
            outCount();
            break;
        case "플라이아웃":
            createTxt = document.createTextNode("플라이아웃입니다.");
            strikeCountReset();
            ballCountReset();
            flyoutEffect();
            outCount();
            break;
        case "쓰리아웃":
            createTxt = document.createTextNode("쓰리아웃 체인지~!");
            break;
        case "게임끝":
            createTxt = document.createTextNode("게임 종료!!");
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

// 게임시작 시 UI display 최초 세팅 이벤트
startbtn.addEventListener("click", function(){
    action_log.style.display = "block";
    commands.style.display = "flex";
    board.style.display = "flex";
    ground.style.display = "block";
    intro.style.display = "none";
    round.firstElementChild.innerHTML = `${roundtext}회초`;
    commands.firstElementChild.innerHTML = "공격";
    commandBtns[0].innerHTML = "스윙!!";
    commandBtns[1].innerHTML = "기다리기";
    turn.style.display = "block";
    setTimeout(function(){
        turn.style.display = "none";
    }, 1500);
    isUserTurn = true;
    createPlayer();
});
document.addEventListener("keydown", e=>{
    if(intro.style.display != "none"){
        if(e.key == "Enter"){
            startbtn.click();
        }
    }
});
// UI display 끝

// 유저 턴 일때 공격/수비 텍스트 변환 & 게임종료 조건 체크
function turnChk(){
    if(isUserTurn){
        ++roundtext;
        // 공수 교대시마다 종료 조건 체크
        endGameChk();
        if(endGameChk()){
            return;
        }else{
            commands.firstElementChild.innerHTML = "공격";
            commandBtns[0].innerHTML = "스윙!!";
            commandBtns[1].innerHTML = "기다리기";
            setTimeout(function(){
                turn.style.display = "block";
                turn.firstElementChild.innerHTML = "공격 턴 입니다.";
                setTimeout(function(){
                    turn.style.display = "none";
                }, 2000);
                round.firstElementChild.innerHTML = `${roundtext}회초`;
            },2000);
        }
        
    }else{
        endGameChk();
        if(endGameChk()){
            return;
        }else{
            commands.firstElementChild.innerHTML = "수비";
            commandBtns[0].innerHTML = "스트라이크";
            commandBtns[1].innerHTML = "볼";
            setTimeout(function(){
                turn.style.display = "block";
                turn.firstElementChild.innerHTML = "수비 턴 입니다.";
                setTimeout(function(){
                    turn.style.display = "none";
                }, 2000);
                round.firstElementChild.innerHTML = `${roundtext}회말`;
            },2000);
        }
        
    }
}
/* 유저 턴 일때 공격/수비 텍스트 변환 함수 끝 */



// 버튼 이벤트
commandBtns[0].addEventListener("click",function(){
    // 연속클릭 방지를 위해 클릭할 때 마다 1.5초씩 버튼 잠금
    commandBtns.forEach(dis=>{
        dis.disabled = "true";
    });
    setTimeout(function(){
        commandBtns.forEach(dis=>{
            dis.disabled = "";
        });
    },1500);
    
    bolthrow();
    
    // User 공격 턴 스윙 클릭시 이벤트
    let balltype = Math.random();
    if(isUserTurn){
        let throw1 = balltype<0.5 ? "스트라이크" : "볼";
        let hitresult = Math.random();
        if(throw1==="스트라이크"){
            if(hitresult<0.1){
                newLi("홈런");
            }else if(hitresult<0.3){
                newLi("파울");
            }else if(hitresult<0.5){
                let outType = Math.random();
                outType<0.5 ? (newLi("땅볼아웃")) : (newLi("플라이아웃"));
            }else{
                hitresult<0.8 ? (newLi("안타")) : (newLi("헛스윙"));
            }
            boardRefresh();
        }else{
            if(hitresult<0.05){
                newLi("홈런");
            }else if(hitresult<0.4){
                newLi("파울");
            }else if(hitresult<0.7){
                let outType = Math.random();
                outType<0.5 ? (newLi("땅볼아웃")) : (newLi("플라이아웃"));
            }else{
                hitresult<0.85 ? (newLi("안타")) : (newLi("헛스윙"));
            }
        }
        boardRefresh();
    }else { // 컴퓨터 공격 턴 이벤트
        let comAction = balltype;
        let hitresult = Math.random();
        // 컴퓨터가 스윙 할지 말지 50% 결정
        if(comAction<0.5){
            if(hitresult<0.1){
                newLi("홈런");
            }else if(hitresult<0.3){
                newLi("파울");
            }else if(hitresult<0.5){
                let outtype = Math.random();
                outtype<0.5 ? (newLi("땅볼아웃")) : (newLi("플라이아웃"));
            }else{
                hitresult<0.8 ? (newLi("안타")) : (newLi("헛스윙"));
            }
            boardRefresh();
        }else{
            newLi("스트라이크");
        }
    }
});
commandBtns[1].addEventListener("click",function(){
    commandBtns.forEach(dis=>{
        dis.disabled = "true";
    });
    setTimeout(function(){
        commandBtns.forEach(dis=>{
            dis.disabled = "";
        });
    },1500);


    bolthrow();
    
    if(isUserTurn){
        let balltype = Math.random(); //유저 공격턴일때 '기다리기'시에 컴퓨터가 던질 공 타입
        balltype<0.5 ? newLi("스트라이크") : newLi("볼");
    }else{
        let comAction = Math.random(); //컴퓨터 공격턴일때 휘두를지 말지 결정할 랜덤 값
        let hitresult = Math.random(); //컴퓨터 공격턴일때 휘두를시 결과 받을 랜덤 값
        if(comAction<0.5){
            if(hitresult<0.05){
                newLi("홈런");
            }else if(hitresult<0.4){
                newLi("파울");
            }else if(hitresult<0.7){
                let outtype = Math.random();
                outtype<0.5 ? (newLi("땅볼아웃")) : (newLi("플라이아웃"));
            }else{
                hitresult<0.85 ? (newLi("안타")) : (newLi("헛스윙"));
            }
            boardRefresh();
        }else{
            newLi("볼");
        }
    } 
});


function strikeCount(){
    strikeNum += 1;
    strikescore.innerHTML = strikeNum;
    if(strikeNum==3){
        newLi("스트라이크아웃");
        strikeOutEffect();
        strikeCountReset();
        ballCountReset();
        outCount();
    }
}
function strikeCountReset(){
    strikescore.innerHTML = resetCount;
    strikeNum = resetCount;
}
function faulcount(){
    let aa = Math.random();
    if(strikeNum==2){
        return;
    }else{
        strikeCount();
    }
    
}
function ballCount(){
    ballNum += 1;
    ballscore.innerHTML = ballNum;
    if(ballNum==4){
        newLi("볼넷");
        fourballEffect();
        ballCountReset();
        strikeCountReset();
        run();
        boardRefresh();
    }else{
        ballEffect();
    }
}
function ballCountReset(){
    ballscore.innerHTML = resetCount;
    ballNum = resetCount;
}
function outCount(){
    outNum +=1;
    outscore.innerHTML = outNum;
    if(outNum==3){
        outCountReset();
        minimap_clear();
        if(isUserTurn){
            isUserTurn = false;
        }else{
            isUserTurn = true;
        }
        change();
        newLi("쓰리아웃");
        turnChk();
    }
}
function outCountReset(){
    outscore.innerHTML = resetCount;
    outNum = resetCount;
}

function run(){
    let players = document.querySelectorAll("#hitter");

    setTimeout(function(){
        players.forEach(p=>{
            if(p.style.left =="34%"){
                hitter1move(p);
            }else if(p.style.left =="630px"){
                hitter2move(p);
            }else if(p.style.left =="410px"){
                hitter3move(p);
            }else{
                hitter4move(p);
            }
        });
        setTimeout(function(){
            createPlayer();
        },200)
    }, 500);

    // 진루주자 있는지 체크해서 있으면 노란색으로 배경 변경하기
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
                }else{
                    comScore++;
                    // 9회말 컴퓨터 마지막 공격때 유저보다 점수가 높아지면 그대로 게임 끝
                    if(roundtext == 9 && userScore<comScore){
                        fin();
                        Swal.fire({
                            title: `게임결과 ${userScore}:${comScore}`,   // Alert 제목
                            text: `패배했습니다ㅜㅜ.`,  // Alert 내용
                        });
                    }
                }
            }
        }
    }
}
function boardRefresh(){
    document.querySelector("#userScore").innerHTML = userScore;
    document.querySelector("#comScore").innerHTML = comScore;
}
function minimap_clear(){
    first_status(0);
    second_status(0);
    third_status(0);
}
function plus_score(){
    let sum = 1;
    sum = sum + Number(first_stat) + Number(second_stat) + Number(third_stat);
    if(isUserTurn){
        userScore += sum;
    }else{
        comScore += sum;
        // 9회말 컴퓨터 마지막 공격때 유저보다 점수가 높아지면 그대로 게임 끝
        if(roundtext == 9 && userScore<comScore){
            fin();
            Swal.fire({
                title: `게임결과 ${userScore}:${comScore}`,         // Alert 제목
                text: `패배했습니다ㅜㅜ.`,  // Alert 내용
            });
        }
    }
}

// 타자 & 진루주자 엘리먼트 생성 함수
function createPlayer(){
    let newPlayer = document.createElement("div");
    newPlayer.setAttribute('id', `hitter`);
    newPlayer.style.position = "absolute";
    newPlayer.style.top = "70%";
    newPlayer.style.left = "34%";
    newPlayer.style.width = "65px";
    newPlayer.style.height = "73px";
    newPlayer.style.transition = "0.3s";
    newPlayer.style.backgroundSize = "contain";
    newPlayer.style.backgroundRepeat = "no-repeat";
    if(isUserTurn){
        newPlayer.style.backgroundImage = "url('images/taja.png')";
    }else{
        newPlayer.style.backgroundImage = "url('images/taja2.png')";
    }
    ground.append(newPlayer);
}

// 매개변수를 받아 진루 주자 관리
function hitter1move(player) {
    if(isUserTurn){
        player.style.backgroundImage = "url('images/zuza.png')";
    }else{
        player.style.backgroundImage = "url('images/zuza2.png')";
    }
    player.style.left = "630px";
    player.style.top = "230px";    
}
function hitter2move(player) {
    player.style.top = "95px";
    player.style.left = "410px";
}
function hitter3move(player) {
    player.style.top = "230px";
    player.style.left = "170px";
}
function hitter4move(player) {
    player.style.top = "365px";
    player.style.left = "410px";
    setTimeout(() => {
        player.remove();    
    }, 500);
}

//이펙트
// 공 날아가는 애니메이션 이펙트
function bolthrow() {
    bol.style.top = "400px";
    setTimeout(function(){
        bol.style.opacity=0;
        setTimeout(function(){
            bol.style.top = "";
            setTimeout(function(){
                bol.style.opacity=1;
            },400)
        },400)
    },400)
}
// 스트라이크 이펙트
function strikeEffect() {
    gameStrike.style.opacity = '1';    
    setTimeout(function() {
        gameStrike.style.opacity = '0';
    }, 1000);
}
// 볼 이펙트
function ballEffect() {
    gameBall.style.opacity = '1';    
    setTimeout(function() {
        gameBall.style.opacity = '0';
    }, 1000);
}
// 파울 이펙트
function faulEffect() {
    gameFaul.style.opacity = '1';    
    setTimeout(function() {
        gameFaul.style.opacity = '0';
    }, 1000);
}
// 삼진아웃 이펙트
function strikeOutEffect() {
    setTimeout(function(){
        gameStrikeout.style.opacity = '1';    
    setTimeout(function() {
        gameStrikeout.style.opacity = '0';
    }, 1000);
    },1000)
}
// 4볼 이펙트
function fourballEffect() {
    setTimeout(function(){
    gameFourball.style.opacity = '1';    
    setTimeout(function() {
        gameFourball.style.opacity = '0';
        }, 1000);
    },1000);
}
// 플라이아웃 이펙트
function flyoutEffect() {
    gameFlyout.style.opacity = '1';    
    setTimeout(function() {
        gameFlyout.style.opacity = '0';
    }, 1000);
}
// 땅볼 이펙트
function groundballEffect() {
    gameGroundball.style.opacity = '1';    
    setTimeout(function() {
        gameGroundball.style.opacity = '0';
    }, 1000);
}
// 홈런 이펙트 & 필드 클리어 함수
function homerunEffect() {
    gameHomerun.style.opacity = '1';    
    setTimeout(function() {
        gameHomerun.style.opacity = '0';
    }, 2500);

    timer = setInterval(() => {
        document.querySelectorAll("#hitter").forEach(p=>{
            if(p.style.top=="70%"&& p.style.left =="34%"){
                hitter1move(p);
            }else if(p.style.top=="230px"&& p.style.left =="630px"){
                hitter2move(p);
            }else if(p.style.top=="95px"&& p.style.left =="410px"){
                hitter3move(p);
            }else{
                hitter4move(p);
            }
        });
    }, 200);
    // 홈런 후 필드에 hitter div 체크 후 다 홈으로 들어왔으면 잉여 div 삭제 후 다음 타자 생성
    setTimeout(function(){
        if(document.querySelectorAll("#hitter").length == 0){
            clearInterval(timer);
        }
        createPlayer();
        commandBtns.forEach(cmd=>{
            cmd.disabled = ""; 
        });
    }, 1500);
}
// 안타 이펙트
function antaEffect() {
    gameAnta.style.opacity = '1';    
    setTimeout(function() {
        gameAnta.style.opacity = '0';
    }, 1500);
}
/* ---------------이펙트 끝--------------- */

// 공수교대 유니폼 색상변경 및 이미 진출한 주자 엘리먼트 초기화 함수
function change(){
    let players = document.querySelectorAll("#hitter");
    function colorChange() {
        players.forEach(clear=>{
            clear.remove();
            createPlayer();
            clear.style.backgroundImage = "url('images/taja2.png')";
        });
        pitcher.style.backgroundImage = "url('images/pitcher2.png')";
    }
    function colorChange2() {
        players.forEach(clear=>{
            clear.remove();
            createPlayer();
            clear.style.backgroundImage = "url('images/taja.png')";
        });
        pitcher.style.backgroundImage = "url('images/pitcher.png')";
    }
    if(isUserTurn){
        colorChange2();
    }
    else{
        colorChange();
    }
}

// 게임 종료 관련 함수
// 턴 넘어가면서 게임 종료상황 2가지 체크
function endGameChk(){
    // 9회말 진입할 때(유저공격 끝날때) 유저가 컴퓨터보다 점수가 낮으면 패배
    if(roundtext == 9 && !isUserTurn && userScore<comScore){
        fin();
        Swal.fire({
            title: `게임결과 ${userScore}:${comScore}`,         // Alert 제목
            text: `패배했습니다ㅜㅜ.`,  // Alert 내용
        });
        return true;
    // 9회말까지 종료 된 후 점수가 같으면 무승부(연장x)
    }else if(roundtext == 10 && userScore==comScore){
        fin();
        Swal.fire({
            title: `게임결과 ${userScore}:${comScore}`,         // Alert 제목
            text: `무승부입니다.`,  // Alert 내용
        });
        return true;
    }else if(roundtext == 10 && userScore>comScore){
        fin();
        Swal.fire({
            title: `게임결과 ${userScore}:${comScore}`,         // Alert 제목
            text: `승리하셨습니다!!`,  // Alert 내용
        });
        return true;
    }else{
        return false;
    }
}
// 게임 종료(div 다시 다 사라짐)
function fin(){
    action_log.style.display = "none";
    commands.style.display = "none";
    board.style.display = "none";
    ground.style.display = "none";
    turn.style.display = "none";
    intro.style.display = "block";
    intro.firstElementChild.innerHTML = "Thanks for playing!!";
    intro.lastElementChild.style.display = "none";
}
