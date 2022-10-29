
/*
    Api theke category load korte hobe. ai api theke mot 8 ti category er nam pawa jabe
    ai 8ti category , header a dynamic vabe, menu te dekhate hobe
*/
const loadCategory = async()=>{
    try{
            const url = "https://openapi.programming-hero.com/api/news/categories";
            const res = await fetch(url);
            const categories = await res.json();
            return categories.data.news_category;
    }catch(error){
            console.log(error);
    }
}

/*
    ai function theke , api fetch kore, dynamically category name diye menu create hobe.
    abar , prottekta li er upor click korle , sei click er jonno -- sei category er 
    joto news ache, segulo news homepage a dekhabe...
*/

const displayCategory = async()=>{
    try{
            const categories = await loadCategory();
            // select category container (ul)
            const categoryContainer = document.getElementById("category-container");
           // categories holo array 
           categories.forEach(category=>{
         // make li element
           const li = document.createElement("li");
           li.classList.add("hover:text-indigo-400");

        //    function er moddhe category gory id argument deya holo, er fole
        // category id diye, new api theke category id onusare data load kora hobe.. 
           li.innerHTML=`
           <a href="#" id="catNews" onclick="categoryNews('${category.category_id}')">${category.category_name}</a>
           `;
           categoryContainer.appendChild(li);
        });

    }catch(error){
            console.log(error);
    }
}
displayCategory();



/*
    displayCategory function theke , category id argument hisebe niye asar por,
    categoryNews function theke, dynamic category id diye , api theke sei category 
    er news gulo load kora hobe. 

    er por sei data gulo displayNews function er argument hisebe pathano holo
*/
const categoryNews = async(category_id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try{
           // data load kora akdom thik suru te spinner chalu hobe
           let spin = document.getElementById("spin");
           spin.classList.remove("hidden");
           // category id onusare data fetch kora hocche
            const res = await fetch(url);
            const categoryWiseAllNews = await res.json();

            // category te click korle, sei category te koto gulo news ache, 
            // tar length ber korle, header er nichei total news count dekhabe

             const categoryTotalnews= categoryWiseAllNews.data.length;
             newsCounter(categoryTotalnews); // total new koto seta dekhay

            displayNews(categoryWiseAllNews.data);

    }catch(error){
            console.log(error)
    }
}

/*
    header er nichei, kon category te koto ti news found kora geche,
    amon akti section ache.. sei section er data gulo ai function thekei update hoy
*/
const newsCounter =(totalNews)=>{
    //select total newscouter 
    const totalNewsElement = document.getElementById("total");
    totalNewsElement.innerText = totalNews>0?`${totalNews} News Found Ins This Category`:`No News Found In This Category`;
}



/*
    displayNews, Website tir homepage data dekhanor mul function.
    ai function aro 2ta function theke argument hisbe data niye,
    segulo ke webpage a dekhano hoy.

    ai function ti news er array of object receve kore. tai arrayof object ke sort kora hoyece,
    er karone, besi views pawa news gulo sobar upore  dekhano hoyece.

     const newsArraySort = catWiseAllNews.sort((a,b)=>{
                if(a.total_view < b.total_view)
                {
                    return 1;
                }else{
                    return -1;
                }
        })

    it's very very important !


*/
const displayNews = (categoryWiseAllNews)=>{
    // step1: news-continer select 
      const allCategoryNews = categoryWiseAllNews.sort((a,b)=>{
          if(a.total_view < b.total_view)
              {
                   return 1;
              }else{
                   return -1;
              }
          }); // array of object ke sort kora hoyece, views er vittite 
  
      //step 2: news container select kora 
      const newsContainer = document.getElementById("news-container");
       newsContainer.innerHTML ="";  // eta kora karone bar bar append holeo , pervious kono data append hobe na , new datar sathe... 
  
      //step 3: jodi category te news zero na hoy, tahole news dekhabe , r zero hole dekhabena
  
       if(allCategoryNews.length !=0 )
       {
         allCategoryNews.forEach(categoryNews=>{
  
         newsCounter(allCategoryNews.length);// total news count
  
       //step 4: news card a , news gulo dynamic dekhanor jonno card div create kore, tar moddhe card class add korte hobe .
  
        const newsCard = document.createElement("div");
        newsCard.classList.add("bg-slate-200","mt-4","p-2","rounded-sm");
  
      //step 5: dynamic vabe card er vitore api theke pawa info gulo dekhate hobe
      newsCard.innerHTML= `
       <div class="w-full md:flex gap-2">
           <div class="w-full flex-none md:w-72 md:h-80">
               <img src="${categoryNews.thumbnail_url}" alt="" class="w-full md:w-full md:h-full ">
           </div>
  
           <div class=" w-full md:w-72 md:h-80 grow h-auto flex flex-col justify-between p-2">
               <div>
                  <h2 class="text-2xl mb-4 mt-2">${categoryNews.title}</h2>
                  <p>${text_truncate(categoryNews.details,450," ...")}</p>
               </div>
  
               <div class="flex flex-col justify-end border mt-10  ">
                   <div class="flex justify-between items-center">
                       <div class="flex items-center gap-2">
                              <img src="${categoryNews.author.img}" alt="" class="w-10 rounded-full">
                          <div>
                             <p class="text-sm">${categoryNews.author.name?categoryNews.author.name:'Not  Available'}</p>
                             <p class="text-xs">${categoryNews.author.published_date}</p>
                        </div>
                    </div>
                    <div>
                           <p><i class="fa-regular fa-eye mr-1"></i>${categoryNews.total_view?categoryNews.total_view+"M":"No views"}<p>
                    </div>
  
                      <div>
                           <label for="my-modal-3" onclick="newsDetailsModal('${categoryNews._id}')"><i class="fa-solid fa-circle-arrow-right hover:text-indigo-400 text-2xl"></i></label>
                      </div>
                       
                   </div>
               </div>
  
           </div>
       </div>
           `;
          newsContainer.appendChild(newsCard);
          setTimeout(()=>{
              spin.classList.add("hidden");
          },1000);
  
         });} 
         
         else{
               // jodi news na thake,tokhon ai part execute hobe 
  
               const newsCard = document.createElement("div");
               newsCard.classList.add("bg-slate-200","mt-4","p-2","rounded-sm");
               newsCard.innerHTML= `
                  <div class="flex justify-center items-center p-5 h-screen">
                   <h2 class="text-5xl font-bold">No news found</h2>
                </div>
               `;
  
          newsContainer.appendChild(newsCard);
               setTimeout(()=>{
                  spin.classList.add("hidden");
              },1000);
         }
  }
  

  /*
    Kono kichur description jokhon boro hoye jay, tokhon sei description k purota na dekhiye,
    olpo kichu word ba character dekhate hoy..
    ai funciton ti, nidristo sonkhok character remove kore, end a elisp (...) zukto korte pare
*/

const text_truncate =(str, length, ending)=>{
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };


/*
  After clcik see more or show more button , this function will open a modal,
  and show information from specific category.. which category will found , when modal function
  will be excute by onclick method
*/

const newsDetailsModal = async(news_id)=>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
   try{

        const  res = await fetch(url);
        const  news =await res.json();
        console.log(news);
        
        let newsDetails = news.data[0];

        console.log(newsDetails)
        
        // select modal element 
        let newsDetailsModal = document.getElementById("newsDetailsModal");
        newsDetailsModal.innerHTML = "";

        let div = document.createElement("div");
        div.classList.add("modal-box");

        div.innerHTML = `
        <div class="flex justify-center">
        <div class="flex flex-col  rounded-lg bg-white shadow-lg">
             <img class=" w-full h-80  object-cover  rounded-t-lg" src="${newsDetails.image_url}" alt="" />
    
           <div class="p-6 flex flex-col justify-start">
               <h5 class="text-gray-900 text-xl font-medium mb-2">${newsDetails.title}</h5>
               <p class="text-gray-700 text-base mb-4">${newsDetails.details}</p>

               <div class="flex justify-between items-center">
                      <div class="flex items-center gap-2">
                          <img src="${newsDetails.author.img}" alt="" class="w-10 rounded-full">
                          <div>
                             <p class="text-sm">${newsDetails.author.name?newsDetails.author.name:'Not available'}</p>
                             <p class="text-xs">${newsDetails.author.published_date?newsDetails.author.published_date:'Not available'}</p>
                          </div>
                     </div>

                      <p><i class="fa-regular fa-eye mr-1"></i>${newsDetails.total_view?newsDetails.total_view+" M":'No views'}</p>
               </div>

             <div class="modal-action">
                 <label for="my-modal-3" class="btn">Close</label>
             </div>
    
         </div>
       </div>
     </div>
`;

       newsDetailsModal.appendChild(div)

   }catch(error)
   {
        console.log(error)
   }
}


/*
    homepage jeno empty na dekhay, tai shuru tei kichu data dekhanor jonno ai function
*/
const initialNewsDisplay =async()=>{
    const url = "https://openapi.programming-hero.com/api/news/category/01";
    try{

        const res = await fetch(url);
        const news = await res.json();

        const categoryTotalnews= news.data.length; // lenth er maddhome bujha jabe ai category te koto gulo news ba data ache . 

        newsCounter(categoryTotalnews);

        displayNews(news.data);

    }catch(error)
    {
            console.log(error)
    }
}
initialNewsDisplay();