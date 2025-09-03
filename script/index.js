const loadLessons =()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((res) => res.json())
  .then((data) => displayLessons(data.data));
}


const loadLevelWord =(id)=>{
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelsWords(data.data));
 
}

const displayLevelsWords =(words)=>{
const wordContainer =document.getElementById("word-container")
wordContainer.innerHTML=""
console.log(words)
if (words.length ===0) {
  alert("no data")
  return
}
words.map((e,i)=>{
 const card =document.createElement("div");



 console.log(e)
 card.innerHTML = `
<div class="bg-white rounded-xl shadow-lg px-4 py-10 text-center space-y-2">
 <h2 class="font-bold">${e.word}</h2>
 <h6 class="font-medium text-[12px]">Meaning / Pronounciation</h6>
 <h3 class="text-xl font-semibold">${e.meaning} / ${e.pronunciation}</h3>
 <div class="mt-8 flex justify-between items-center">
<button class="btn bg-[#1A91FF10] rounded-4 border-0 hover:bg-[#1A91FF89]"><i class="fa-solid fa-circle-info "></i></button>

  <button class="btn bg-[#1A91FF10] rounded-4 border-0 hover:bg-[#1A91FF89]"><i class="fa-solid fa-volume-high  "></i></button>

 </div>
  </div>
 `;
 wordContainer.appendChild(card);
})

}

const displayLessons=(lessons)=>{
//1 get the container 
const levelContainer =document.getElementById("level-container");
   levelContainer.innerHTML = ``;
//2 get into every lessons
for (let lesson of lessons) {
     //3 create element
     const btnDiv = document.createElement("div")
     btnDiv.innerHTML = `
     <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no} </button>
     `;
     levelContainer.appendChild(btnDiv)
    
}


}
loadLessons()