const loadCatagoriItame = () =>{
  fetch('https://openapi.programming-hero.com/api/news/category/01')
  .then(res => res.json())
  .then(data => displayCatagoreItame(data.data))
}
const displayCatagoreItame = itames =>{
  const cataroresContainer =document.getElementById('catagoris-containd');
  for( const itame of itames){
    const newDiv =document.createElement('div');
    newDiv.innerHTML =`
    
    <div class="card mb-3" >
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${itame.image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${itame.title}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          <div class="row row-cols-lg-4  align-items-center justify-content-center">
            <div class="col weight-set">
              <div class="writer-profile">
              <div class=" d-flex justify-content-between">
              <div class="img w-25">
                <img class="img-fluid" src="${itame.author.img}" alt="">
              </div>
              <div class="info ">
                <h6>${itame.author.name}</h6>
                <p id="date" class="fs-6">${itame.author.published_date}</p>
              </div>
            </div>
              </div>
            </div>
            <div class="col">
              <div class="viwe text-center">
                <i class="fa fa-regular fa-eye"></i> ${itame.total_view}
              </div>
            </div>
            <div class="col">
              <div class="ratting"> <i class="fa fa-solid fa-star"></i>
              <i class="fa fa-solid fa-star"></i>
              <i class="fa fa-solid fa-star"></i>
              <i class="fa fa-solid fa-star"></i>
              <i class="fa fa-light fa-star"></i></div>
            </div>
            <div class="col">
              <div class="button"><button type="button" class="btn btn-outline-warning">Warning</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
    cataroresContainer.appendChild(newDiv)
    console.log(itame)
  }
  console.log(itames)
}
loadCatagoriItame()