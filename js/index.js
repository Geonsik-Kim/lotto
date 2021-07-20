'use strict'

const numUl = document.querySelector(".num ul");
const btn = document.querySelector(".btn button");
const layout = "<li><div class='tit'><span></span> 자동</div><div class='choice'><span>?</span><span>?</span><span>?</span><span>?</span><span>?</span><span>?</span></div></li>";
const sel = document.getElementById("countSelect");
const date1 = document.querySelector(".date1");
const date2 = document.querySelector(".date2");
const date3 = document.querySelector(".date3");
let count;
let resultArray;

// 번호 추첨 버튼 클릭 시
btn.addEventListener("click", function(){
    // 선택한 수량이 없을 경우
    if(count === undefined){
        alert("개수를 선택하세요~");
        return false;
    }

    // 발행일, 추첨일, 지급기한 생성
    time();

    // 로또 번호 생성 관련
    numUl.innerHTML="";
    lotto();
    show();
    colorChange();
})

// selectbox에서 원하는 수량 선택
sel.addEventListener('change', function(){
    count = sel.options[sel.selectedIndex].value;
    makeArray();
})

// 시간
const week = ['일','월','화','수','목','금','토'];
function time(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let date = now.getDate();
    let day = now.getDay();
    let hours = ("0" + now.getHours()).slice(-2);
    let minutes = ("0" + now.getMinutes()).slice(-2);
    let seconds = ("0" + now.getSeconds()).slice(-2);

    let lottery = new Date(year, month, date+(6-day));
    let lotteryYear = lottery.getFullYear();
    let lotteryMonth = lottery.getMonth();
    let lotteryDate = lottery.getDate();
    let lotteryeDay = lottery.getDay();

    date1.querySelector(".date").innerText = `${year}/${month}/${date} (${week[day]}) ${hours}:${minutes}:${seconds}`;
    date2.querySelector(".date").innerText =  `${lotteryYear}/${lotteryMonth}/${lotteryDate} (토)`;
    date3.querySelector(".date").innerText =  `${lotteryYear+1}/${lotteryMonth}/${lotteryDate+1} (일)`;

    // 회차
    let startDay = new Date("2002-12-7");
    document.querySelector(".top span").innerText = parseInt((now - startDay) / (24 * 60 * 60 * 1000) / 7 + 2);
} 
time();

// 랜덤 숫자가 들어 갈 2차원 배열[5][6] 만들기
function makeArray(){
    resultArray = new Array(count);
    for (let i = 0; i < count; i++) {
        resultArray[i] = new Array(6);
    }
}

// 2차원 배열에 1~45 숫자 중 랜덤으로 배열 요소에 넣기
function lotto(){
    let numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
    for(let i=0;i<count;i++){
        for(let j=0;j<6;j++){
            resultArray[i][j] = numbers.splice(Math.floor(Math.random() * numbers.length),1)[0];
        }
        // 오름차순 정렬
        resultArray[i].sort(function(a,b){
            return a - b;
        })
    }
}

// 2차원 배열에 넣은 숫자들 화면 노출
function show(){
    for(let i=0;i<count;i++){
        numUl.innerHTML += layout;
        for(let j=0;j<6;j++){
            numUl.children[i].children[0].children[0].innerHTML = al[i];
            numUl.children[i].children[1].children[j].innerHTML = resultArray[i][j];
        }
    }
}

// 볼 번호에 따라 색상 변경
function colorChange(){
    const balls = document.querySelectorAll(".choice span");

    for(let i=0;i<balls.length;i++){
        if(balls[i].innerText <= 9){      
            balls[i].classList.add("ball1");
        } else if(balls[i].innerText <= 19){
            balls[i].classList.add("ball2");
        } else if(balls[i].innerText <= 29){
            balls[i].classList.add("ball3");
        } else if(balls[i].innerText <= 39){
            balls[i].classList.add("ball4");
        } else {
            balls[i].classList.add("ball5");
        }
    }
}

// 선택한 수량 따른 순서(alphabet) 노출을 위해 배열에 alphabet 넣기
const al = new Array(26)
for (let i = 0; i < al.length; i++) {
    al[i] = String.fromCharCode(65+i);
}