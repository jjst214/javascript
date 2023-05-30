const logUl = document.querySelector("#log");
const lis = document.querySelectorAll("#log li");

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
    logUl.prepend(createLi);
}
newLi("홈런");
newLi("안타");