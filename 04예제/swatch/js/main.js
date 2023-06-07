const lis = document.querySelectorAll("#menu li");
const sec = document.querySelectorAll("section");
let wh = window.innerHeight;

lis.forEach((li, index)=>{
    li.addEventListener("click", function(e){
        // a태그에 걸려있는 기존 이벤트 제거(제거 안하면 a href="#" 때문에 맨위로 올라가버림)
        e.preventDefault();

        window.scrollTo({top:index*wh, behavior:"smooth"});
    })
});

window.addEventListener("scroll", function(){
    let sct = Math.ceil(this.document.documentElement.scrollTop)+1;
    for(let i=0; i<lis.length; i++){
        if(sct>=i*wh && sct<(i+1)*wh){
            lis.forEach(li=>{
                li.classList.remove("on");
            })
            lis[i].classList.add("on");
        }
    }
});

sec[0].addEventListener("mousemove", function(e){
    let x = e.pageX;
    let y = e.pageY;
    // 20 << img11의 x좌표 위치, x/30<< x값이 브라우저 기준이기 때문에 그대로 넣으면 너무 크게 이동하기 때문에 30으로 수치를 나눠준것
    document.querySelector(".img11").style.right = 20+(x/30)+"px";
    document.querySelector(".img12").style.right = 20-(x/30)+"px";
});