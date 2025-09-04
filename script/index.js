//1
const loadLessons =()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res) => res.json())
  .then((data) => displayLessons(data.data));
}

const manageSpinner =( status)=>{
 if (status ==true) {
  console.log("loading ..")
  document.getElementById("spinner").classList.remove("hidden")
  document.getElementById("word-container").classList.add("hidden");
 }else{
   document.getElementById("spinner").classList.add("hidden");
   document.getElementById("word-container").classList.remove("hidden");
 }
}
//2
const loadLevelWord =(id)=>{
    manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>{
      const actives = document.getElementsByClassName("actives"); //ei line ta so active class dhore anbe
for (let i of actives) {
        i.classList.remove("active")
        
      }  //ei loop  sob active class er active remove korbe
     const clickedBtn = document.getElementById(`lessonBtn${id}`);
       console.log("clicked btn id ", id);
       clickedBtn.classList.add("active") //eita spacific  id dhore active class add korbe
      displayLevelsWords(data.data)});
       
 
}
//3
const loadWordDetail= async(id)=>{
/*   manageSpinner(true) */
 const url = `https://openapi.programming-hero.com/api/word/${id}`;
const res =await fetch(url)
const details = await res.json()
displayWordDetails(details.data);
/* manageSpinner(false); */
}

//3 child
 const createElements = (datas) => {
  const hElement = datas.map((e) => ` <span class="btn">${e}</span>`)
   return hElement.join(""); //join korle kono ekta array string e convert kore
 };

 //3 child
const displayWordDetails = (data)=>{

const detailsContainer = document.getElementById("detailsContainer");
detailsContainer.innerHTML = `
 <div>
      <h2 class="text-2xl font-bold mb-4">${
        data.word
      } (<i class="fa-solid fa-microphone-lines"></i> :${
  data.pronunciation
})</h2>
      <p class="mb-2 font-bold">Meaning</p>
      <p class="mb-2">${data.meaning}</p>
      <p class="font-bold mb-2">Example</p>
      <p>${data.sentence}</p>
      <p class="font-bold mb-4 mt-5">সমার্থক শব্দ গুলো</p>
      <div>${createElements(data.synonyms)}</div>
      
      
     
    </div>
`;
document.getElementById("my_modal_5").showModal()
 
}

//2 child
const displayLevelsWords =(words)=>{
const wordContainer =document.getElementById("word-container")
wordContainer.innerHTML=""

if (words.length ===0) {
wordContainer.innerHTML = `<div class="col-span-full text-center space-y-3 font-bangls">
 <img src="./img/alert-error.png" alt="" class="mx-auto">
    <p class="text-[12px] ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
    <h2 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h2>
  </div>`;
 manageSpinner(false);
}
words.map((e,i)=>{
 const card =document.createElement("div");


 card.innerHTML = `
<div class="bg-white rounded-xl shadow-lg px-4 py-10 text-center space-y-2  w-5/6 mx-auto">
 <h2 class="font-bold">${e.word}</h2>
 <h6 class="font-medium text-[12px]">Meaning / Pronounciation</h6>
 <h3 class="text-xl font-semibold">${e.meaning} / ${e.pronunciation}</h3>
 <div class="mt-8 flex justify-between items-center">
<button onclick="loadWordDetail(${e.id})" class="btn bg-[#1A91FF10] rounded-4 border-0 hover:bg-[#1A91FF89]"><i class="fa-solid fa-circle-info "></i></button>

  <button class="btn bg-[#1A91FF10] rounded-4 border-0 hover:bg-[#1A91FF89]"><i class="fa-solid fa-volume-high  "></i></button>

 </div>
  </div>
 `;
 wordContainer.appendChild(card);
})
 manageSpinner(false);
}
//1 child
const displayLessons=(lessons)=>{
//1 get the container 
const levelContainer =document.getElementById("level-container");
   levelContainer.innerHTML = ``;
//2 get into every lessons
for (let lesson of lessons) {
     //3 create element
     const btnDiv = document.createElement("div")
     btnDiv.innerHTML = `
     <button id="lessonBtn${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary actives"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no} </button>
     `;
     levelContainer.appendChild(btnDiv)
    
}


}
loadLessons()

document.getElementById("btn-search").addEventListener("click",(()=>{
  const actives = document.getElementsByClassName("actives"); //ei line ta so active class dhore anbe
  for (let i of actives) {
    i.classList.remove("active");
  } 
  const  searchValue= document.getElementById("input-search").value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all").then(res =>res.json()).then(data=> {
   const allWords =  data.data;
 
 const filterword = allWords.filter((e) =>
   e.word.toLowerCase().includes(searchValue)
 );
 displayLevelsWords(filterword);
  })
  document.getElementById("input-search").value=""
}))