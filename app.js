let search = document.querySelector(".search-icon");
let main = document.querySelector(".search-section");
let result = document.querySelector(".search-result");
let input = document.querySelector("input");
let button = document.querySelector("button");
let loader = document.querySelector(".loader");
let previous = document.getElementById("prev");
let nextpage = document.getElementById("next");

let url = "https://kontests.net/api/v1/all";
let error = document.querySelector("#noresult");
let jsondata = [];
let newjsondata = [];
let page = 0;

async function contest() {
  let elements = document.querySelectorAll(".search-result-content");
  elements.forEach((element) => {
    element.remove();
  });
  loader.style.display = "block";
  result.style.display = "none";
  button.style.display = "none";
  error.style.display = "none";
  await axios
    .get(url)
    .then((resolve) => {
      jsondata = resolve.data;
      loader.style.display = "none";
      result.style.display = "block";
      button.style.display = "block";
      for (let i = 0, k = 0; i < jsondata.length; i++) {
        let sitename = jsondata[i].site.toLowerCase();
        if (sitename.indexOf(input.value.toLowerCase()) != -1) {
          newjsondata[k++] = jsondata[i];
        }
      }
      let start = page * 5;
      let end = start + 5;
      let temp = newjsondata.slice(start, end);
      temp.forEach((element) => {
        insert(element);
      });
      // console.log(temp);
      if (result.childElementCount == 1) {
        error.style.display = "block";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function insert(element) {
  let div = document.createElement("div");
  div.classList.add("search-result-content");
  let h3 = document.createElement("h3");
  h3.innerText = element.name;
  let p1 = document.createElement("p");
  p1.innerText = "Site :" + element.site;
  let div1 = document.createElement("div");
  let p2 = document.createElement("p");
  p2.innerText = "Duration :" + +element.duration;
  let p3 = document.createElement("p");
  p3.innerText = "start time :" + element.start_time;
  let p4 = document.createElement("p");
  p4.innerText = "end time :" + element.end_time;
  let p5 = document.createElement("p");
  p5.innerText = "in 24 hours :" + element.in_24_hours;
  let p6 = document.createElement("p");
  p6.innerText = "status :" + element.status;
  let button = document.createElement("button");
  button.innerText = "Contest";
  button.setAttribute("onclick", `location.href='${element.url}'`);
  button.classList.add("link");
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
}
function csvdata() {
  const headers = Object.keys(jsondata[0]).toString();
  const main = jsondata.map((item) => {
    return Object.values(item).toString();
  });
  const csv = [headers, ...main].join("\n");
  downloadfile(csv);
}

function downloadfile(input) {
  const blob = new Blob([input], { type: "application/csv" });
  const url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.download = "contest.csv";
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

function prev() {
  if (page - 1 != -1) {
    page--;
    contest();
  }
}
function next() {
  page++;
  contest();
}

search.addEventListener("click", contest);
input.addEventListener("change", contest);
button.addEventListener("click", csvdata);
console.log(previous);
previous.addEventListener("click", prev);
nextpage.addEventListener("click", next);
