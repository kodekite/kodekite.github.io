var base_url = " https://api.football-data.org/v2/";

function status(response) {
    if (response.status !== 200) {
        console.log("Error: " + response.status);
        return Promise.reject(new Error(response.statusText));
    }else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();    
}

function error(error) {
    console.log("Error: " + error);
}

function getTeams() {
    if ('caches' in window) {
        caches.match(base_url+"teams")
            .then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        var teamsHtml = "";            
                        data.teams.forEach(function(team) {               
                            teamsHtml += `
                                <div class="col s12 m6 l4">
                                    <div class="card">
                                        <div class="card-image card-image waves-effect waves-block waves-light">
                                            <a href="./detail_player.html?id=${team.id}">
                                                <img style="height: 500px" src="${team.crestUrl || 'images/nologo.png'}">
                                            </a>
                                        </div>
                                        <div class="card-content">
                                            <span class="card-title truncate">
                                                ${team.name}
                                            </span>
                                            <p>
                                                ${team.venue || 'No Venue'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("teams").innerHTML = teamsHtml;                    
                    })
                }
            })
    }
    
    fetch(base_url+"teams", {
        headers: { 'X-Auth-Token': '55a8b3694ddf4b7b9710c66a4b5dc0b4'}
    })
        .then(status)
        .then(json)
        .then(function(data) {            
            var teamsHtml = "";            
            data.teams.forEach(function(team) {               
                teamsHtml += `
                    <div class="col s12 m6 l4">
                        <div class="card">
                            <div class="card-image card-image waves-effect waves-block waves-light">
                                <a href="./detail_player.html?id=${team.id}">
                                    <img style="height: 500px" src="${team.crestUrl || 'images/nologo.png'}">
                                </a>
                            </div>
                            <div class="card-content">
                                <span class="card-title truncate">
                                    ${team.name}
                                </span>
                                <p>
                                    ${team.venue || 'No Venue'}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.getElementById("loading").style.display = "none";
            document.getElementById("teams").innerHTML = teamsHtml;
        })
        .catch(error);
}

function getTeamById() {
    return new Promise(function(resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
    
        if ('caches' in window) {
            caches.match(base_url+"teams/"+idParam)
                .then(function(response) {
                    if (response) {
                        response.json().then(function(team) {
                            var teamsHtml = `
                                    <div class="col s12 m6 l4">
                                    <div class="card">
                                        <div class="card-image card-image waves-effect waves-block waves-light">
                                            <a href="./detail_player.html?id=${team.id}">
                                                <img style="height: 500px" src="${team.crestUrl || 'images/nologo.png'}">
                                            </a>
                                        </div>
                                        <div class="card-content">
                                            <span class="card-title truncate">
                                                ${team.name}
                                            </span>
                                            <p>
                                                ${team.venue || 'No Venue'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            `;
                    
                            document.getElementById("body-content").innerHTML = teamsHtml;
                            resolve(data);                            
                        })
                    }
                })  
        } 

        fetch(base_url+"teams/"+idParam, {
            headers: { 'X-Auth-Token': '55a8b3694ddf4b7b9710c66a4b5dc0b4'}
        })
            .then(status)
            .then(json)
            .then(function(team) {
                var teamsHtml = `
                    <div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-image card-image waves-effect waves-block waves-light">
                            <a href="./detail_player.html?id=${team.id}">
                                <img style="height: 500px" src="${team.crestUrl || 'images/nologo.png'}">
                            </a>
                        </div>
                        <div class="card-content">
                            <span class="card-title truncate">
                                ${team.name}
                            </span>
                            <p>
                                ${team.venue || 'No Venue'}
                            </p>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("body-content").innerHTML = teamsHtml;
            resolve(team);
        });
    })
}

function getSavedTeams() {
    getAll()
        .then(function(teams) {
            var teamsHtml = "";
            teams.forEach(function(team) {
              teamsHtml += `
                          <div class="card">
                            <a href="./detail_player.html?id=${team.id}&saved=true">
                              <div class="card-image waves-effect waves-block waves-light">
                              <img style="height: 500px" src="${team.crestUrl || 'images/nologo.png'}">
                              </div>
                            </a>
                            <div class="card-content">
                              <span class="card-title truncate">${team.name}</span>
                              <p>${team.venue}</p>
                            </div>
                          </div>
                        `;
            });
            
            if (teams.length < 1) {
                document.getElementById("body-content").innerHTML = '<h4 class="blue-text center">No Favorite Teams saved...</h4>';
            }else {
                document.getElementById("body-content").innerHTML = teamsHtml;
            }
        })
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = parseInt(urlParams.get("id"));
    
    getById(idParam).then(function(team) {    
      teamHTML = '';
      var teamHTML = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
            <img style="height: 500px" src="${team.crestUrl || 'images/nologo.png'}">
        </div>
        <div class="card-content">
          <span class="card-title">${team.name}</span>
          ${team.venue}
        </div>
      </div>
    `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamHTML;

      return team.id;
    });
  }