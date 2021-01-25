//always start at the top of the webpage
// history.scrollRestoration = "manual";

// let navItems = document.querySelectorAll("nav ul li");
// console.log(navItems); 
// let sections = document.querySelectorAll("section");
// console.log(sections); 

// const TableOfContents = {
//   container: document.querySelector('nav'), // this is the container for our links
//   links: null,
//   headings: null,
// }

// const options = {
//   root: null, // Can be any other element
//   rootMargin: '0px',
// // Ranges from 0.1 to 1.0 or an array of values
// }
// window.addEventListener('DOMContentLoaded', () => {

// 	const observer = new IntersectionObserver(entries => {
// 		entries.forEach(entry => {
// 			const id = entry.target.getAttribute('id');
// 			if (entry.intersectionRatio > 0) {
// 				// navItems[0].classList.remove('active');
// 				// navItems[1].classList.remove('active');
// 				// navItems[2].classList.remove('active');
// 				document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
// 			} else {
// 				document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
// 			}
// 		});
// 	}, options);

// 	// Track all sections that have an `id` applied
// 	document.querySelectorAll('section[id]').forEach((section) => {
// 		observer.observe(section);
// 	});
	
// });
// let lastId;
// let cur = [];
// console.log("window height" + window.innerHeight); 


// for (i=0, i<sections; i++)
// sections.forEach(watchActive); 
// sections.forEach(watchInactive); 

// height = window.innerHeight; 
// function watchActive(item, index){
//   item.addEventListener("mouseenter", function(event){
//     // console.log("entered " + item)
//     navItems[index].classList.add("current");
//     scrollTo(index * height); 
//   }); 
// }
// function watchInactive(item, index){
//   item.addEventListener("mouseout", function(event){
//     // console.log("entered " + item)
//     navItems[index].classList.remove("current");
//   }); 
// }

// let changeNav = (entries, observer) =>{
//   entries.forEach((entry, index) => {
//     let href = `#${entry.target.getAttribute('id')}`

//     // let link = navItems[index]); 
//     console.log("href" + href); 
//     console.log("this" + this); 

//       if(entry.isIntersecting&& entry.intersectionRatio === 1) {
// console.log("intersecting " + index)
// // console.log(navItems[index]); 
//         navItems[index].classList.add('current');
//       }
//       else {
//         navItems[index].classList.remove('current');
//         console.log("left " + index)
//        }
//   });
// }
// const observer = new IntersectionObserver(changeNav, options); 


// // sections.forEach((section, index)=> {
// //   console.log("this index for sections is " + index); 
// //   observer.observe(sections[index]);
// // }); 

// sections.forEach(section=>{
//   console.log('section number' + section); 
//   observer.observe(section); 
// }); 



