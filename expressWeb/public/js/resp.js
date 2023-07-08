burger = document.querySelector('.burger');
navbar = document.querySelector('.navbar');
navList= document.querySelector('.nav-list');
rightNav= document.querySelector('.rightNav');


burger.addEventListener('click',function(){
    rightNav.classList.toggle('visibility-class-resp');
    // This will run the click function so whenever we will click on burger then it will run toggle function for v-class-resp contents and make it invisible which is the search wala part
    navList.classList.toggle('visibility-class-resp');
    // same wil happen with navList also but it contains contents of navbar so those things will become invisible
    navbar.classList.toggle('height-class-resp');
    // same thing for navbar also but it's classList is height class so we used that one to do actions and make it height change acc. to the value
})