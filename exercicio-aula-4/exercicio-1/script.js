let btn = document.getElementsByTagName('button')[0];
let myname;

btn.addEventListener("click", function() {
  myname = prompt('Enter your name');
  document.getElementsByClassName('thank-you')[0].innerHTML = "Welcome " + myname;
});

