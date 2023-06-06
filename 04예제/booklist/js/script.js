fetch("data/data.json")
    .then(res => res.json())
    .then(data => {
        display(data.datas);
        typelist(data.datas);
    });

function display(datas){
    const ul = document.querySelector("#lists");
    let str = "";
    str = datas.forEach(data => {
       let li = document.createElement("li");
       li.innerHTML = `<span>${data.writer}</span>
       <span>${data.title}</span>
       <span>${data.year}</span>`;
       ul.append(li);
    });
}

function typelist(value){
    const btn = document.querySelector("#btns");
    
    btn.addEventListener("click", function(e){
        const value = e.target.dataset.value;
        let dat = value.filter(a => a[key] === value);
        display(dat);
    });
}