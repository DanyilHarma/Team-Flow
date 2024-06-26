let elementsStyles = {
    "mia": {
        "position": "absolute",
        "top": "25%",
        "left": "-3%",
        "border-radius": "50%"
    },
    "angelina": {
        "position": "absolute",
        "top": "37%",
        "left": "64%",
        "border-radius": "50%"
    },
    "matt": {
        "position": "absolute",
        "top": "71%",
        "left": "26%",
        "border-radius": "50%"
    },
    "stive": {
        "position": "absolute",
        "top": "43%",
        "left": "43%",
        "border-radius": "50%"
    },
    "celeste": {
        "position": "absolute",
        "top": "12%",
        "left": "82%"
    },
    "presentation": {
        "position": "absolute",
        "top": "12%",
        "left": "31%"
    },
    "camera": {
        "position": "absolute",
        "top": "55%",
        "left": "28%",
        "width": "100%",
        "max-width": "50px"
    },
    "peoples": {
        "position": "absolute",
        "top": "60%",
        "left": "75%",
        "width": "100%",
        "max-width": "55px"
    },
    "blue-circle": {
        "position": "absolute",
        "top": "80%",
        "width": "15px",
        "height": "15px",
        "background-color": "#4A81EC",
        "border-radius": "50%"
    },
    "blue-circle-small": {
        "position": "absolute",
        "top": "10%",
        "left": "10%",
        "width": "8px",
        "height": "8px",
        "background-color": "#4A81EC",
        "border-radius": "50%"
    },
    "yellow-circle": {
        "position": "absolute",
        "top": "40%",
        "left": "22%",
        "width": "10px",
        "height": "10px",
        "background-color": "#ECC84A",
        "border-radius": "50%"
    },
    "orange-circle": {
        "position": "absolute",
        "top": "15%",
        "left": "75%",
        "width": "8px",
        "height": "8px",
        "background-color": "#EC7B4A",
        "border-radius": "50%"
    },
    "pink-circle": {
        "position": "absolute",
        "top": "46%",
        "left": "105%",
        "width": "15px",
        "height": "15px",
        "background-color": "#F3648F",
        "border-radius": "50%"
    },
    "green-circle": {
        "position": "absolute",
        "top": "75%",
        "left": "55%",
        "width": "10px",
        "height": "10px",
        "background-color": "#3ED37A",
        "border-radius": "50%"
    },
    "boost": {
        "position": "absolute",
        "top": "85%",
        "left": "50%",
        "padding": "5px 15px",
        "box-shadow": "0px 4px 39px 0px rgba(34, 60, 80, 0.2)",
        "background-color": "#fff",
        "border-radius": "10px",
        "color": "#2F4BDF",
        "font-size": "15px",
        "font-weight": "600"
    }
};


document.addEventListener("DOMContentLoaded", () => {
    for (let [className, styles] of Object.entries(elementsStyles)) {
        let element = document.querySelector(`.${className}`);
        if (element) {
            Object.assign(element.style, styles);
        }
    }
});

////////////////////////////////////FOR BIG MAP/////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    fetch("data-testimonials.json")
        .then(response => response.json())
        .then(data => {
            let container = document.querySelector(".testimonials-map");
            let popups = document.querySelectorAll(".popup");
            let currentIndex = 0;
            let images = [];
            let mouseOver = false;
            for (person in data) {
                if (data.hasOwnProperty(person)) {
                    let personData = data[person];

                    let img = document.createElement("img");
                    img.src = personData.img;
                    img.alt = personData.alt;
                    img.style.top = personData.top;
                    img.style.left = personData.left;
                    container.appendChild(img);
                    images.push(img);
                }
            }

            images.forEach((img, index) => {
                img.addEventListener("mouseenter", () => {
                    mouseOver = true;
                    hideAllPopups();
                    showPopup(popups[index]);
                });
                img.addEventListener("mouseleave", () => {
                    mouseOver = false;
                    hideAllPopups();
                });
            });

            function showPopup(popup) {
                popup.style.opacity = "1";
                popup.style.visibility = "visible";
            };

            function hideAllPopups() {
                popups.forEach(popup => {
                    popup.style.opacity = "0";
                    popup.style.visibility = "hidden";
                })
            };

            function switchPopup() {
                if (!mouseOver) {
                    hideAllPopups();
                    showPopup(popups[currentIndex]);
                    currentIndex = (currentIndex + 1) % popups.length;
                }
            };
            setInterval(switchPopup, 3500);


        }).catch(error => {
            console.error('Error loading JSON file:', error);
        });
});
////////////////////////////////////FORM SUPPORT/////////////////////////////////////////
let submit = document.querySelector(".button-email-support").addEventListener("click", function (e) {
    e.preventDefault();
    let email = document.querySelector(".input-email");
    let img = document.querySelector("#img-support");
    img.classList.remove("img_indent");
    void img.offsetWidth;
    if (email.value === "") {
        img.classList.add("img_indent");
    } else {
        email.value = "";
        img.classList.remove("img_indent");
    }
});

////////////////////////////////////FOOTER LIST DATA/////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    fetch("footer-data.json")
        .then(response => response.json())
        .then(data => {
            for (info in data) {
                if (data.hasOwnProperty(info)) {
                    let container = document.getElementById(info);
                    let infoData = data[info];
                    infoData.text.forEach(item => {
                        let a = document.createElement(infoData.tag);
                        a.textContent = item;
                        a.style.textDecoration = infoData["text-decoration"];
                        a.style.color = infoData.color;
                        a.style.fontFamily = infoData["font-family"];
                        a.style.fontSize = infoData["font-size"];
                        a.href = "#";
                        container.appendChild(a);
                    });
                }
            }
        })
})