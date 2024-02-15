let myleads = [];
const btn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const leadsFromLocalStoage =JSON.parse( localStorage.getItem("myleads"));
const deleteEl = document.getElementById('delete-btn')
const tapEl = document.getElementById('tap-btn')


if (leadsFromLocalStoage) {
    myleads= leadsFromLocalStoage
    render(myleads)
}


tapEl.addEventListener('click', ()=>{
    chrome.tabs.query({active:true , currentWindow: true} , (tabs)=>{
        myleads.push(tabs[0].url);
        localStorage.setItem("myleads", JSON.stringify(myleads));
        render(myleads)
    })

})



function render(leads) {
    let listitems="";
    for (let i = 0; i < leads.length; i++) {
        listitems += `<li>
        <a target='_blank' href='${leads[i]}'> ${leads[i]} </a>
        </li>`;
    }
    ulEl.innerHTML = listitems;
}


deleteEl.addEventListener('click',()=>{
    myleads=[];
    localStorage.clear();
    render(myleads)
})


btn.addEventListener('click',()=>{
     myleads.push(inputEl.value);
     clear() 
     localStorage.setItem("myleads", JSON.stringify(myleads));
     render(myleads) 
    })


function clear() {
    inputEl.value= "" ;
}