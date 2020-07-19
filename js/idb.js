var dbPromised = idb.open("football-db", 4, function(upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: true });
    teamsObjectStore.createIndex("venue", "venue", { unique: false });
    teamsObjectStore.createIndex("crestUrl", "crestUrl", { unique: false });
  });

  function addToFavorite(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Team has been saved.");
        window.location.href = "index.html#saved";
      });
  }

  function getAll() {
      return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function(team) {
                resolve(team);
            });
      });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(team) {          
          resolve(team);
        });
    });
  }

  function removeFromFavorite(idTeam) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(idTeam);
        return tx.complete;
      })
      .then(function() {
        console.log("Team has been removed.");
        window.location.href = "index.html#saved";
      });
  }
  