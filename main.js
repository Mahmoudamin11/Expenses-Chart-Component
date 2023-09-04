const obj = {
};

fetcher();
async function fetcher() {
    const response = await fetch("data.json");
    const data = await response.json();
    for (let i = 0; i < 7; i++) {
        Object.defineProperty(obj, String(data[i].day), {
            writable: true,
            configurable: true,
            enumerable: true,
            value: parseFloat(data[i].amount),
        })
    }
}

let spans = document.querySelectorAll(".charts div span");

let biggest = 0;
let arr = Array(7);

setTimeout(function () {
    // height = percent * 1.5
    for (let i = 0; i < 7; i++) {

        let classOfCurrentSpan = spans[i].className;
        let newHeight = obj[classOfCurrentSpan] * 2.5;
        arr[i] = obj[classOfCurrentSpan];
        spans[i].style.height = `${newHeight}px`;
        if (newHeight > biggest) {
            biggest = newHeight;
            spans.forEach((e) => {
                e.style.backgroundColor = "hsl(10, 79%, 65%)";
            })
            spans[i].style.backgroundColor = "hsl(186, 34%, 60%)";


        }
    }
    let euros = document.querySelectorAll(".charts div .euro");
    euros.forEach((e, index) => {
        e.innerHTML = "$" + arr[index];
    })


    document.addEventListener('mouseover', (e) => {
        if (e.target.id === "span") {
            e.target.style.opacity = "0.5";
            document.getElementById(e.target.className).style.visibility = "visible";
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.id === "span") {
            e.target.style.opacity = "1";
            document.getElementById(e.target.className).style.visibility = "hidden";
        }
    });
}, 1000)
