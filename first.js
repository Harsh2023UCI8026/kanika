document.addEventListener("DOMContentLoaded", function () {
    const heading = document.querySelector('h1');
    const para = document.querySelector('p');
    const input = document.querySelector('input');
    const submit = document.querySelector('button');
    const easy = document.querySelector('.easy');
    const medium = document.querySelector('.medium');
    const hard = document.querySelector('.hard');

    function validusername(username) {
        if (username.trim() === "") {
            alert("UserName must not be Empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_]{1,15}$/;
        const ismatch = regex.test(username);

        if (!ismatch) {
            alert("Invalid UserName");
        }

        return ismatch;
    }

    function update(solved, total, element) {
        const progress = (solved / total) * 100;
        element.style.setProperty("--progress-degree", `${progress}%`);
    }

    async function fetchdetail(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            submit.textContent = "Searching...";
            submit.disabled = true;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch username");
            }

            const data = await response.json();
            console.log("logging data:", data);

           
            easy.textContent = `Easy: ${data.easySolved} / ${data.totalEasy}`;
            medium.textContent = `Medium: ${data.mediumSolved} / ${data.totalMedium}`;
            hard.textContent = `Hard: ${data.hardSolved} / ${data.totalHard}`;

          
            update(data.easySolved, data.totalEasy, easy);
            update(data.mediumSolved, data.totalMedium, medium);
            update(data.hardSolved, data.totalHard, hard);

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Could not fetch details. Try again later.");
        } finally {
            submit.textContent = "Search";
            submit.disabled = false;
        }
    }

    submit.addEventListener('click', function () {
        const username = input.value;
        console.log("logged in by:", username);
        if (validusername(username)) {
            fetchdetail(username);
        }
    });
});
