fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        displayItems(data.items);
        setEventItems(data.items);
    });

//화면나타내기
function displayItems(items){
    const ul = document.querySelector("#items");
    let str = "";
    str = items.map(item => {
        return `<li class="item">
            <img src="${item.image}">
            <span>${item.gender}, ${item.size}</span>
        </li>`;
    }).join("");
    ul.innerHTML = str;
}

//이벤트 설정하기
function setEventItems(items){
    const btn = document.querySelector("#buttonDiv");

    btn.addEventListener("click", function(e){
        const dataset = e.target.dataset;
        const key = e.target.dataset.key;
        const value = e.target.dataset.value;
        console.log(dataset);
        console.log(key);
        console.log(value);
        let filtered = items.filter(item=>item[key] === value);
        displayItems(filtered);
    });
}