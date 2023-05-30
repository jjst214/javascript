//html 요소
const shortleftElem = document.querySelector("#short-left");
const comScoreElem = document.querySelector("#computer-score");
const userScoreElem = document.querySelector("#user-score");
const textElem = document.querySelector("#text");
const comBtn = document.querySelector(".btn-computer");
const userBtns = document.querySelectorAll(".btn-user");


//변수 설정
//컴퓨터 점수, 사람 점수, 남은 슛 횟수
let comScore = 0;
let userScore = 0;
let shortLeft = 5;
let isComputerTurn = true;

//컴퓨터가 먼저 슛을 함
//2점슛인지 3점슛인지 50%확률로 결정
//2점슛 성공확률 50%, 3점슛 성공확률 30%
//컴퓨터가 슛을 할 때 동작하는 함수
function onComputerShoot(){
    shortleftElem.innerHTML = shortLeft;
    let shootType = Math.random() > 0.5 ? 2 : 3;
    if(shootType == 2){
        //50% 확률로 성공
        //성공했을 때 글자를 변경. 컴퓨터 점수도 업데이트
        if(Math.random()<0.5){
            comScore += 2;
            comScoreElem.innerHTML = comScore;
            textElem.innerHTML = "컴퓨터가 2점슛을 성공했습니다.";
        }else{
            textElem.innerHTML = "컴퓨터가 2점슛을 실패했습니다.";
        }
    }else{
        if(Math.random()<0.3){
            comScore += 3;
            comScoreElem.innerHTML = comScore;
            textElem.innerHTML = "컴퓨터가 3점슛을 성공했습니다.";
        }else{
            textElem.innerHTML = "컴퓨터가 3점슛을 실패했습니다.";
        }
    }
    isComputerTurn = false;
    comBtn.disabled = true;
    userBtns.forEach(btn=>{
        btn.disabled = false;
    });
}
//유저가 슛버튼 클릭했을때 실행되는 함수
function onUserShoot(num){
    let ran = num == 2 ? 0.5 : 0.3;
    if(Math.random()<ran){
        userScore += num;
        userScoreElem.innerHTML = userScore;
        textElem.innerHTML = "유저가 " + num + "점슛을 성공했습니다.";
    }else{
        textElem.innerHTML = "유저가 " + num + "점슛을 실패했습니다.";
    }
    //남은 슛 횟수 차감
    shortLeft--;
    shortleftElem.innerHTML = shortLeft;
    isComputerTurn = true;
    comBtn.disabled = false;
    userBtns.forEach(btn=>{
        btn.disabled = true;
    });
    if(shortLeft==0){
        gameOver();
    }
}

function gameOver(){
    if(userScore>comScore){
        textElem.innerHTML = "유저가 승리했습니다.";
    }else if(userScore==comScore){
        textElem.innerHTML = "비겼습니다.";
    }else{
        textElem.innerHTML = "컴퓨터가 승리했습니다.";
    }
    comBtn.disabled = true;
    userBtns.forEach(btn=>{
        btn.disabled = true;
    });
}
userBtns[0].addEventListener("click", function(){
    onUserShoot(2);
});
userBtns[1].addEventListener("click", function(){
    onUserShoot(3);
});
comBtn.addEventListener("click", onComputerShoot);
