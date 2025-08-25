// *** Product Details POPup Show js Start
document.addEventListener("DOMContentLoaded", () => {
    let overlaydiv = document.querySelector(".overlaydiv");
    let productInformationMain = document.querySelectorAll(".productInformation_popup_wrapper");
    let dots = document.querySelectorAll(".hotspot-dot");

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const smallPopupProductId = dot.getAttribute("smallPopUPId");
            console.log(smallPopupProductId);
            productInformationMain.forEach(mainpop => (mainpop.style.display = "none"));

            productInformationMain.forEach(mainpop => {
                if (mainpop.getAttribute("matchedpopupid") === smallPopupProductId) {
                    mainpop.style.display = "block";
                    overlaydiv.style.display = "block";
                    document.body.classList.add("no-scroll");
                }
            });
        });
    });

    document.querySelectorAll(".cross").forEach(btn => {
        btn.addEventListener("click", () => {
            productInformationMain.forEach(mainpop => (mainpop.style.display = "none"));
            overlaydiv.style.display = "none";
            document.body.classList.remove("no-scroll");
        });
    });

    overlaydiv.addEventListener("click", () => {
        productInformationMain.forEach(mainpop => (mainpop.style.display = "none"));
        overlaydiv.style.display = "none";
        document.body.classList.remove("no-scroll");
    });
});


// *** Product Details POPup Show js End

// *** Add To Cart JS code
document.addEventListener("DOMContentLoaded", () => {
    let productWrappers = document.querySelectorAll(".productInformation_popup_wrapper");

    productWrappers.forEach((wrapper) => {
        let productClrOption = wrapper.querySelectorAll('.option_color');
        let productSizeOption = wrapper.querySelectorAll('.option_selection');
        let addtocartbutton = wrapper.querySelectorAll('.add_cartId');
        let variant_box = wrapper.querySelectorAll('.variant_box p');
        let FreeProduct = wrapper.querySelectorAll('.freeProduct');

        let colorOption = null;
        let sizeOption = null;
        let selectedVariantId = null;
        let freeProductId = FreeProduct.length ? FreeProduct[0].getAttribute('freeproductid') : null;

        
        if (productClrOption.length > 0) {
            let firstColor = productClrOption[0];
            firstColor.classList.add("active");
            colorOption = firstColor.getAttribute('optioncolorname');

            productClrOption.forEach((clr) => {
                clr.addEventListener("click", () => {
                    productClrOption.forEach(c => c.classList.remove("active"));
                    clr.classList.add("active");

                    colorOption = clr.getAttribute('optioncolorname');
                    optionFunction();
                });
            });
        }

        
        if (productSizeOption.length > 0) {
            productSizeOption.forEach((select) => {
                if (select.options.length > 1) {
                    select.selectedIndex = 1;
                    sizeOption = select.options[select.selectedIndex].getAttribute("optionSizeName");
                }

                select.addEventListener("change", (e) => {
                    sizeOption = e.target.options[e.target.selectedIndex].getAttribute("optionSizeName");
                    optionFunction();
                });
            });
        }

        
        function optionFunction() {
            if (!sizeOption || !colorOption) return;

            let concateValue = sizeOption + " / " + colorOption;
            console.log("Concatenated:", concateValue);

            selectedVariantId = null; 
            variant_box.forEach((variant) => {
                let varianttitle = variant.getAttribute('varianttitle');
                let variantid = variant.getAttribute('variantid');

                if (varianttitle === concateValue) {
                    selectedVariantId = variantid; 
                    variant.classList.add("active");
                } else {
                    variant.classList.remove("active");
                }
            });
        }

        
        addtocartbutton.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (!selectedVariantId) {
                    console.error("No variant selected for this product");
                    return;
                }

                let formData = {
                    'items': [{
                        'id': selectedVariantId,
                        'quantity': 1
                    }]
                };

                
                if (sizeOption === "M" && colorOption.toLowerCase() === "black" && freeProductId) {
                    formData.items.push({
                        'id': freeProductId,
                        'quantity': 1
                    });
                }

                fetch(window.Shopify.routes.root + 'cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Added to cart:", data);
                        window.location.href = "/cart";
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    }); 
            });
        });

        optionFunction();
    });
});


// Announcmentmenu
document.addEventListener("DOMContentLoaded", () => {
    let bar = document.querySelector('.bar');           
    let cross = document.querySelector('.crossIcon');   
    let annText = document.querySelector('.mobile_menu'); 

    bar.addEventListener("click", () => {
        annText.classList.add("show");  
        bar.style.display = "none";   
        cross.style.display = "block"; 
    });

    cross.addEventListener("click", () => {
        annText.classList.remove("show"); 
        cross.style.display = "none"; 
        bar.style.display = "block";  
    });
});
 
// *** Add to cart Js End 

