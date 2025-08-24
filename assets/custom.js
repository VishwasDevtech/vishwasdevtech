document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".hotspot-dot");

  dots.forEach(dot => {
    const popup = dot.parentElement.querySelector(".hotspot-popup");

    dot.addEventListener("click", () => {
      dot.classList.toggle("active"); // rotate icon
      popup.classList.toggle("active"); // toggle popup with transition
    });
  });
});


let productInfomation = document.querySelectorAll('.productInfomation');
console.log(productInfomation);
if(productInfomation) {
    console.log("found")
} else {
    console.log("not found")
}

let productClrOption = document.querySelectorAll('.option_color');
let productSizeOption = document.querySelectorAll('.option_selection');

let Option1 = null;
let Option2 = null;

// Color options
if (productClrOption.length > 0) {
  productClrOption.forEach((clr) => {
    clr.addEventListener('click', () => {
      Option1 = clr.dataset.optioncolorname || clr.value;
      console.log("Selected Color:", Option1);
    });
  });
} else {
  console.log("Product color option not found");
}
// Size options
if (productSizeOption.length > 0) {
  productSizeOption.forEach((size) => {
    size.addEventListener("change", (e) => {
      Option2 =  size.value;
      console.log("Selected Size:", Option2);
    });
  });
} else {
  console.log("Product size option not found");
}
