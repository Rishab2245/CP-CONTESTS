let search=document.querySelector('.search-icon');
let result=document.querySelector('.search-result');
let url="https://kontests.net/api/v1/";
let sitename="all";
let input=document.querySelector('input');
async function contest(){
    await axios.get(url+sitename)
    .then(response=>{
        console.log(response);
        response.data.forEach(element => {
            console.log(element.name);
            let div=document.createElement('div');
            div.classList.add('search-result-content');
            let h3=document.createElement('h3');
            h3.classList.add('site-name');
            h3.innerText=element.name;
            div.append(h3);
            result.append(div);
    });

    })
    .catch(error=>{
        console.log(error);
    })
}
search.addEventListener("click",contest);
input.addEventListener("click",contest);
