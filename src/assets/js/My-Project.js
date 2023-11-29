function getDistanceTime(time) {
    const timeNow = new Date().getTime(); // jam sekarang miliseconds
    const timePosted = time;

    const distance = timeNow - timePosted; // miliseconds

    // Math :
    // floor -> dibulatkan ke bawah, ex : 8.6 -> 8
    // round -> dibulatkan angka terdekat, ex : 8.3 -> 8
    // ceil -> dibulatkan ke atas, ex : 8.3 -> 9

    const distanceSeconds = Math.floor(distance / 1000);
    const distanceMinutes = Math.floor(distance / 1000 / 60);
    const distanceHours = Math.floor(distance / 1000 / 60 / 60);
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24);

    console.log("distanceSeconds", distanceSeconds);
    console.log("distanceMinutes", distanceMinutes);
    console.log("distanceHours", distanceHours);
    console.log("distanceDay", distanceDay);

    if (distanceDay > 0) {
        return `${distanceDay} day ago`;
    } else if (distanceHours > 0) {
        return `${distanceHours} hours ago`;
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes} minutes ago`;
    } else {
        return `${distanceSeconds} seconds ago `;
    }
}

let dataBlog = [];

function submitData(event) {
    event.preventDefault();
    const projectName = document.getElementById("inputMyProject");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const description = document.getElementById("inputContent");
    const technologies = document.querySelectorAll("input[type=checkbox]:checked");
    const image = document.getElementById("inputImage");

    if (projectName && startDate && endDate && description && technologies && image && image.files.length > 0) {
        const projectNameValue = projectName.value;
        const startDateValue = startDate.value;
        const endDateValue = endDate.value;
        const descriptionValue = description.value;
        const technologiesValue = Array.from(technologies).map((tech) => tech.value);
        const imageValue = image.files[0];

        if (imageValue) {
            const imageUrl = URL.createObjectURL(imageValue);

            console.log(projectNameValue, startDateValue, endDateValue, descriptionValue, technologiesValue, imageUrl);

            const blog = {
                title: projectNameValue, 
                content: descriptionValue,
                technologies: technologiesValue,
                image: imageUrl,
                postAt: new Date(),
                author: "Ravano Akbar Widodo",
                nodeJs: true,
                reactJs: true,
                nextJs: false,
                typescript: false,
            }

            dataBlog.push(blog);
            console.log("dataBlog", dataBlog)
            renderBlog();
        }
    }
}

function renderBlog() {
    const contentsElement = document.getElementById("contents");
    contentsElement.innerHTML = '';

    for (let index = 0; index < dataBlog.length; index++) {
        contentsElement.innerHTML += `
        <div class="blog-list-item">
            <div class="blog-image">
                <img src="${dataBlog[index].image}" alt="" />
            </div>
            <div class="blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="My-Project-detail.html" target="_blank">${dataBlog[index].title}</a>
                </h1>
                <div class="detail-blog-content">
                    ${dataBlog[index].postAt} | ${dataBlog[index].author}
                </div>
                <p>
                   ${dataBlog[index].content}
                </p>
                <div class="technologies">
                    <label>Technologies:</label>
                    <ul>
                        ${dataBlog[index].technologies.map((tech) => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>`;
    }
}

setInterval(function() {
    renderBlog()
}, 1000)