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


document.addEventListener("DOMContentLoaded", () => {
    let productInfomation = document.querySelectorAll(".productInfomation");
    let overlaydiv = document.querySelector(".overlaydiv");
    let productInformationMain = document.querySelectorAll(
        ".productInformation_popup_wrapper"
    );

    let smallPopupProductId;
    let mainProductId;

    // Click on product info
    productInfomation.forEach((prInfor) => {
        prInfor.addEventListener("click", () => {
            smallPopupProductId = prInfor.getAttribute("smallPopUPId");

            // hide all popups first
            productInformationMain.forEach((mainpop) => {
                mainpop.style.display = "none";
            });

            // show the matching popup
            productInformationMain.forEach((mainpop) => {
                mainProductId = mainpop.getAttribute("matchedpopupid");
                if (mainProductId === smallPopupProductId) {
                    mainpop.style.display = "block";
                    overlaydiv.style.display = "block";
                    document.body.style.overflow = "hidden"; // ❌ disable scroll
                }
            });
        });
    });

    // Close button logic (popup + overlay + enable scroll)
    productInformationMain.forEach((mainpop) => {
        let closeBtn = mainpop.querySelector(".popup-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                mainpop.style.display = "none";
                overlaydiv.style.display = "none";
                document.body.style.overflow = "auto"; // ✅ enable scroll
            });
        }
    });

    // Click on overlay to close popup + overlay + enable scroll
    overlaydiv.addEventListener("click", () => {
        productInformationMain.forEach((mainpop) => {
            mainpop.style.display = "none";
        });
        overlaydiv.style.display = "none";
        document.body.style.overflow = "auto"; // ✅ enable scroll
    });
});


document.addEventListener("DOMContentLoaded", () => {
    let productWrappers = document.querySelectorAll(".productInformation_popup_wrapper");

    productWrappers.forEach((wrapper) => {
        let productClrOption = wrapper.querySelectorAll('.option_color');
        let productSizeOption = wrapper.querySelectorAll('.option_selection');
        let addtocartbutton = wrapper.querySelectorAll('.add_cartId');
        let variant_box = wrapper.querySelectorAll('.variant_box p');

        let colorOption = null;
        let sizeOption = null;
        let selectedVariantId = null;

        // ✅ Select first color by default
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

        // ✅ Select first size by default
        if (productSizeOption.length > 0) {
            productSizeOption.forEach((select) => {
                if (select.options.length > 1) {
                    select.selectedIndex = 1;
                    let selectedOption = select.options[select.selectedIndex];
                    sizeOption = selectedOption.getAttribute("optionSizeName");
                }

                select.addEventListener("change", (e) => {
                    let selectedOption = e.target.options[e.target.selectedIndex];
                    sizeOption = selectedOption.getAttribute("optionSizeName");
                    optionFunction();
                });
            });
        }

        function optionFunction() {
            if (!sizeOption || !colorOption) return;

            let concateValue = sizeOption + " / " + colorOption;
            console.log("Concatenated:", concateValue);

            variant_box.forEach((variant) => {
                let varianttitle = variant.getAttribute('varianttitle');
                let variantid = variant.getAttribute('variantid');

                if (varianttitle === concateValue) {
                    selectedVariantId = variantid; // ✅ store matched variant
                    variant.classList.add("active");
                } else {
                    variant.classList.remove("active");
                }
            });
        }

        // ✅ Add to Cart for this product only
        addtocartbutton.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (!selectedVariantId) {
                    console.error("❌ No variant selected for this product");
                    return;
                }

                let formData = {
                    'items': [{
                        'id': selectedVariantId,
                        'quantity': 1
                    }]
                };

                fetch(window.Shopify.routes.root + 'cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("✅ Added to cart:", data);
                        window.location.href = "/cart";
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        });

        // Run once on page load
        optionFunction();
    });
});




// Announcmentmenu
document.addEventListener("DOMContentLoaded", () => {
    let bar = document.querySelector('.bar');            // hamburger icon
    let cross = document.querySelector('.crossIcon');    // cross icon
    let annText = document.querySelector('.mobile_menu'); // mobile menu wrapper

    // ✅ Bar click → open menu
    bar.addEventListener("click", () => {
        annText.classList.add("show");  // show menu
        bar.style.display = "none";     // hide bar
        cross.style.display = "block";  // show cross
    });

    // ✅ Cross click → close menu
    cross.addEventListener("click", () => {
        annText.classList.remove("show"); // hide menu
        cross.style.display = "none";     // hide cross
        bar.style.display = "block";      // show bar
    });
});
 

