const loadCatagores = () =>{
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data => displayCatagores2(data.data.news_category))
}
const displayCatagores2 = users =>{
  const cataroresBar =document.getElementById('catagoris-bar')
  for(const user of users){
    const li =document.createElement('li')
    li.innerHTML =`${user.category_name}`
    cataroresBar.appendChild(li)
    // console.log(li)
    // console.log(user)
  }
  // console.log(users)
}
loadCatagores()