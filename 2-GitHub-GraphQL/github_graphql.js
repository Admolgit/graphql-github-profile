const github_data = {
  token: "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",
  username: "Admolgit",
};

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + github_data.token,
};

const my_detail = {
  query: `
  query { 
    viewer { 
      login
      name
      avatarUrl
      location
      websiteUrl
      twitterUsername
      url
    }
  }
  `
};

const query_projects = {
  query: `
	query {
    viewer {
      repositories(first: 50) {
        edges {
          repository:node {
            name
            issues(first: 50) {
              totalCount
              edges {
                node {
                  title
                  bodyHTML
                }
              }
            }
          }
        }
      }
    }
  }
	`
};

const base_url = "https://api.github.com/graphql";

fetch(base_url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(my_detail),
})
.then((response) => response.text())
.then(info => {
  const data = JSON.parse(info);
  console.log(data.data.viewer.login)

  const output = `
  <div class="card card-body mb-3">
    <div class="row">
      <div class="col-md-18 rowest">
        <img class="img" style="border-radius: 50%" src="${data.data.viewer.avatarUrl}">
        <p class="url"></p>
        <p id="name-url-1">${data.data.viewer.name}</p>
        <p id="name-url-2">${data.data.viewer.login}</p>
        <a href="${data.data.viewer.url}" target="_blank" class="btn btn-primary btn-block" mb-4>Check profile</a>
        <p class="location" style="padding-top: 0.5rem"><i class="fa fa-map-marker">${data.data.viewer.location}</i></p>
        <p class="location"><i class="fa fa-link"><a href="https://admolfolio.netlify.app/">${data.data.viewer.websiteUrl}</a></i></p>
        <p class="location"><i class="fa fa-twitter"><a href="https://twitter.com/AdmolZa890">${data.data.viewer.twitterUsername}</a></i></p>
      </div>
      <div id="name-profile"></div>
    </div>
    <div id="repos"></div>
  </div>
`;
  
// Navbar Avatar Logo
  const avatar_url = document.querySelector("#profile");

  avatar_url.innerHTML = output;

  const html = `
  <img class="img-fluid mb-2" style="border-radius: 50%" src="${data.data.viewer.avatarUrl}">
  `;

  let headerImg = document.querySelector(".brand-logo");

  headerImg.innerHTML = html;

})
.catch((error) => console.log(JSON.stringify(error)));


const base_Url = "https://api.github.com/graphql";

fetch(base_Url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(query_projects),
})
.then((response) => response.text())
.then((info) => {
  const data = JSON.parse(info);

  console.log(data);

  let profile = document.querySelector('#repository')
  
  profile.innerHTML = `
  <div class="rep-details rep-style" style="padding-left: 3rem">
    <div class="rows">
      <div class="reps">
        <span class="badge"><i class="fas fa-book-open"></i>Overview</span>
        <span class="badge"><i class="fas fa-archive"></i><a href="https://github.com/Admolgit?tab=repositories" style="color: black; text-decoration: none;">Repository 
          ${data.data.viewer.repositories.edges.length}</a>
        </span>
        <span class="badge"><i class="fa fa-suitcase"></i>Projects</span>
        <span class="badge"><i class="fas fa-dice-d6"></i>Packages</span>
        <span class="badge"><i class="far fa-star"></i>Stars</span>
        <hr />
      </div>
      <br />
      <div class="repo-header">
        <div class="popular">
          <h3>Popular repositories</h3>
        </div>
        <div class="customize">
          <p class="customizer">Customize your pins</p>
        </div>
      </div>
        <div class="grid">
          <div class="cards repo-card">
            <div class="left">
              <div class="repo-card" style="color: blue">
                ${data.data.viewer.repositories.edges["0"].repository.name}
              </div>
              <div style="padding-top: ">
                Public
              </div>
            </div> 
            <div class="language"><i class="fas fa-circle" style="color: yellow"></i>JavaScript</div> 
          </div>
          <div class="cards repo-card">
            <div class="left">
              <div class="repo-card" style="color: blue">
                ${data.data.viewer.repositories.edges["1"].repository.name}
              </div>
              <div style="padding-top: ">
                Public
              </div>
            </div> 
            <div class="language"><i class="fas fa-circle" style="color: red"></i>HTML</div> 
          </div>
          <div class="cards repo-card">
            <div class="left">
              <div class="repo-card" style="color: blue">
                ${data.data.viewer.repositories.edges["2"].repository.name}
              </div>
              <div style="padding-top: ">
                Public
              </div>
            </div> 
            <div class="language"><i class="fas fa-circle" style="color: red"></i>HTML</div> 
          </div>
          <div class="cards repo-card">
            <div class="left">
              <div class="repo-card" style="color: blue">
                ${data.data.viewer.repositories.edges["3"].repository.name}
              </div>
              <div style="padding-top: ">
                Public
              </div>
            </div> 
            <div class="language"><i class="fas fa-circle" style="color: red"></i>HTML</div> 
          </div>
          <div class="cards repo-card">
            <div class="left">
              <div class="repo-card" style="color: blue">
                ${data.data.viewer.repositories.edges["4"].repository.name}
              </div>
              <div style="padding-top: ">
                Public
              </div>
            </div> 
            <div class="language"><i class="fas fa-circle" style="color: red"></i>HTML</div> 
          </div>
          <div class="cards repo-card">
            <div class="left">
              <div class="repo-card" style="color: blue">
                ${data.data.viewer.repositories.edges["5"].repository.name}
              </div>
              <div style="padding-top: ">
                Public
              </div>
            </div> 
            <div class="language"><i class="fas fa-circle" style="color: yellow"></i>JavaScript</div> 
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
})
.catch((error) => console.log(JSON.stringify(error)));


{/* <span class="badge badge-primary">Public Repos: ${data.data.viewer.repositories.edges.length}</span> */}
