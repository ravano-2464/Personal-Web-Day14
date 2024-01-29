const myproject = [];

function addProject(e) {
  e.preventDefault();

  const projectName = document.getElementById("exampleInputName").value;
  const startDate = document.getElementById("exampleInputStartDate").value;
  const endDate = document.getElementById("exampleInputEndDate").value;
  const description = document.getElementById("floatingTextarea2").value;
  const nodeJs = document.getElementById("flexCheckDefaultNode").checked;
  const reactJs = document.getElementById("flexCheckDefaultReact").checked;
  const angularJs = document.getElementById("flexCheckDefaultAngular").checked;
  const java = document.getElementById("flexCheckDefaultJava").checked;

  let image = document.getElementById("formFile").files;
  image = URL.createObjectURL(image[0]);

  const dateOne = new Date(startDate);
  const dateTwo = new Date(endDate);
  const time = Math.abs(dateTwo - dateOne);
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(time / (1000 * 60 * 60 * 24) / 365);

  let duration = [];

  if (days < 24) {
    duration += days + " Days";
  } else if (months < 12) {
    duration += months + " Month";
  } else if (years < 365) {
    duration += years + " Years";
  }

  const project = {
    projectName,
    startDate,
    endDate,
    description,
    nodeJs,
    reactJs,
    angularJs,
    java,
    duration,
    image,
  };

  // const localProject = JSON.stringify(project);
  // window.localStorage.setItem("myproject", localProject);

  myproject.unshift(project);
  // renderMyProject();

  document.querySelector("form").reset();

  let html = "";

  for (let i = 0; i < myproject.length; i++) {
    let renderIcon = "";
    if (myproject[i].nodeJs) {
      renderIcon += `<i class="fa-brands fa-node"></i>`;
    }
    if (myproject[i].reactJs) {
      renderIcon += `<i class="fa-brands fa-react"></i>`;
    }
    if (myproject[i].angularJs) {
      renderIcon += `<i class="fa-brands fa-angular"></i>`;
    }
    if (myproject[i].java) {
      renderIcon += `<i class="fa-brands fa-java"></i>`;
    }

    html += `
        <div class="box">
          <a href="/detail-project/1">
            <img src="${myproject[i].image}" alt="" class="list-img" />
          </a>
          <h3 class="list-project-title">${myproject[i].projectName}</h3>
          <p class="list-project-duration">
            Duration: ${myproject[i].duration}
          </p>
          <p class="list-project-description">${myproject[i].description} </p>

          <div class="list-icon">
            ${renderIcon}
          </div>

          <div class="button-box">
            <button type="submit" class="list-btn">Edit</button>
            <button type="submit" class="list-btn">Delete</button>
          </div>
        </div>
    `;
  }

  document.querySelector(".list-box").innerHTML = html;
}
