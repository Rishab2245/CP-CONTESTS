let search=document.querySelector('.search-icon');
let main=document.querySelector('.search-section');
let result=document.querySelector('.search-result');

let url="https://kontests.net/api/v1/";
let input=document.querySelector('input');
let sitename="all";

async function contest(){
  let elements=document.querySelectorAll('.search-result-content');
  elements.forEach(element=>{
    element.remove();
  })
    if(input.value!=""){
    sitename=input.value.toLowerCase().replace(" ","_");
    console.log(sitename);
    await axios.get(url+sitename)
    .then(response=>{
        console.log(response);
        response.data.forEach(element => {
            let div=document.createElement('div');
            div.classList.add('search-result-content');
            let h3=document.createElement('h3');
            h3.innerText=sitename;
            let p1=document.createElement('p');
            p1.innerText="contest :"+element.name;
            let div1=document.createElement('div');
            let p2=document.createElement('p');
            p2.innerText="Duration :"+((+element.duration));
            let p3=document.createElement('p');
            p3.innerText="start time :"+element.start_time;
            let p4=document.createElement('p');
            p4.innerText="end time :"+element.end_time;
            let p5=document.createElement('p');
            p5.innerText="in 24 hours :"+element.in_24_hours;
            let p6=document.createElement('p');
            p6.innerText="status :"+element.status;
            let button=document.createElement('button');
            button.innerText="Contest";
            button.setAttribute("onclick",`location.href='${element.url}'`);
            


            div1.append(p1);
            div1.append(p2);
            div1.append(p3);
            div1.append(p4);
            div1.append(p5);
            div1.append(p6);
            div1.append(button);
            
            div.append(h3);
            div.append(div1);
            result.append(div);
            
    });

    })
    .catch(error=>{
        console.log(error);
    })
}
else{
console.log(sitename);
    await axios.get(url+sitename)
    .then(response=>{
        console.log(response);
        response.data.forEach(element => {
            let div=document.createElement('div');
            div.classList.add('search-result-content');
            let h3=document.createElement('h3');
            h3.innerText=element.site;
            let p1=document.createElement('p');
            p1.innerText="contest :"+element.name;
            let div1=document.createElement('div');
            let p2=document.createElement('p');
            p2.innerText="Duration :"+((+element.duration));
            let p3=document.createElement('p');
            p3.innerText="start time :"+element.start_time;
            let p4=document.createElement('p');
            p4.innerText="end time :"+element.end_time;
            let p5=document.createElement('p');
            p5.innerText="in 24 hours :"+element.in_24_hours;
            let p6=document.createElement('p');
            p6.innerText="status :"+element.status;
            let button=document.createElement('button');
            button.innerText="Contest";
            button.setAttribute("onclick",`location.href='${element.url}'`);
            


            div1.append(p1);
            div1.append(p2);
            div1.append(p3);
            div1.append(p4);
            div1.append(p5);
            div1.append(p6);
            div1.append(button);
            
            div.append(h3);
            div.append(div1);
            result.append(div);

    });

    })
    .catch(error=>{
        console.log(error);
    })
}
}
search.addEventListener("click",contest);
input.addEventListener("click",contest);

