const numUl = document.querySelector(".num ul")
const btn = document.querySelector(".btn");

btn.addEventListener("click", function(){
    numUl.innerHTML="";
    let newLi = document.createElement('li')
  
})

// 랜덤 숫자가 들어 갈 2차원 배열[5][6] 만들기
function arr2Create(rows, columns) {
    let resultArray = new Array(rows);
    for (let i = 0; i < rows; i++) {
        resultArray[i] = new Array(columns);
    }
    return resultArray; 
}
let resultArray = arr2Create(5,6);


function lotto(){
    var numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]
    for(let i=0;i<resultArray.length;i++){
        for(let j=0;j<6;j++){
            resultArray[i][j] = numbers.splice(Math.floor(Math.random() * numbers.length),1)[0]
        }
    }
}

lotto();