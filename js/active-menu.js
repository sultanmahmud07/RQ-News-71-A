// active navbar menu
    let currentLocation = location.href;
    let menuItem = document.querySelectorAll("li a");
    menuItem.forEach((item)=>{
       if(item.href === currentLocation)
       {
        item.className ="active";
       }
    });