var localkey = "dosh0005";
var alldata = {};
alldata.timeStamp = Date.now()
alldata.key = {
    "cricket": "cricket"
}
alldata.standings = [];
alldata.teamname = [];
var localdata = {};
var datakey = alldata.key.cricket;
var flag_new = true;
//document.getElementById("btn-timetable").addEventListener('click', function () {
//    document.getElementById("timetable").classList.add('active');
//    document.getElementById("scores").classList.remove('active');
//});
document.getElementById("btn-score").addEventListener('click', function () {
    document.getElementById("scores-div").classList.add('active');
    document.getElementById("standings-div").classList.remove('active');
});
document.getElementById("btn-standings").addEventListener('click', function () {
    document.getElementById("standings-div").classList.add('active');
    document.getElementById("scores-div").classList.remove('active');
});
document.getElementById("btn-reload").addEventListener('click', function () {
    document.getElementById("scores").innerHTML = "";
    document.getElementById("timetable").innerHTML = "";
    document.getElementById("standings").innerHTML = "";
    alldata = {};
    alldata.timeStamp = Date.now()
    alldata.key = {
        "cricket": "cricket"
    }
    alldata.standings = [];
    alldata.teamname = [];
    localdata = {};
    forceInit();
});

function init() {
    let dt = Date.now();
    if (localStorage.getItem(datakey)) {
        var oldData = localStorage.getItem(datakey);
        oldData = JSON.parse(oldData);
        var oldTimestemp = (parseInt(oldData.timeStamp) + (3600 * 1000));
        if (oldTimestemp < dt) {
            flag_new = true;
            get_data();
        }
        else {
            flag_new = false;
            get_old_data();
        }
    }
    else {
        flag_new = true;
        get_data();
    }
}
//init();

function forceInit() {
    get_data();
    alldataStore(alldata);
}

function get_data() {
    var url = "https://griffis.edumedia.ca/mad9014/sports/cricket.php";
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (jsonData) {
        alldata.gamedata = jsonData;
        set_teamname();
        drawScore();
        //        drawTimetable();
        drawStandings();
    }).catch(function (err) {
        alert(err.message);
        console.log(err.message);
    });
}

function get_old_data() {
    alldata = localStorage.getItem(datakey);
    alldata = JSON.parse(alldata);
    //    set_teamname();
    drawScore();
    //    drawTimetable();
    drawStandings();
}

function drawScore() {
    var screen = document.getElementById("scores");
    alldata.gamedata.scores.sort(function (a, b) {
        let date1 = a.date;
        let date2 = b.date;
        if (date1 < date2) {
            return -1;
        }
        if (date1 > date2) {
            return 1;
        }
        return 0;
    });
    alldata.gamedata.scores.forEach(function (d) {
        let table = document.createElement("table");
        table.className = "table-score";
        let tr1 = document.createElement("tr");
        tr1.className = "data-score";
        let th1 = document.createElement("th");
        th1.setAttribute("colspan", "4");
        let date = new Date(d.date);
        th1.innerHTML = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        let tr2 = document.createElement("tr");
        tr2.className = "data-head"
        let th21 = document.createElement("th");
        th21.innerHTML = "Home Team";
        let th22 = document.createElement("th");
        th22.innerHTML = "score";
        let th23 = document.createElement("th");
        th23.innerHTML = "Away Team";
        let th24 = document.createElement("th");
        th24.innerHTML = "Score";
        let tr3 = document.createElement("tr");
        tr3.className = "data-body"
        let th31 = document.createElement("td");
        let img31 = set_image(alldata.teamname[d.games[0].home])
        let txt31 = document.createTextNode(alldata.teamname[d.games[0].home]);
        th31.appendChild(img31);
        th31.appendChild(txt31);
        let th32 = document.createElement("td");
        th32.innerHTML = d.games[0].home_score
        let th33 = document.createElement("td");
        let img33 = set_image(alldata.teamname[d.games[0].away])
        let txt33 = document.createTextNode(alldata.teamname[d.games[0].away]);
        th33.appendChild(img33);
        th33.appendChild(txt33);
        let th34 = document.createElement("td");
        th34.innerHTML = d.games[0].away_score;
        let tr4 = document.createElement("tr");
        tr4.className = "data-body"
        let th41 = document.createElement("td");
        let img41 = set_image(alldata.teamname[d.games[1].home])
        let txt41 = document.createTextNode(alldata.teamname[d.games[1].home]);
        th41.appendChild(img41);
        th41.appendChild(txt41);
        let th42 = document.createElement("td");
        th42.innerHTML = d.games[1].home_score
        let th43 = document.createElement("td");
        let img43 = set_image(alldata.teamname[d.games[1].away])
        let txt43 = document.createTextNode(alldata.teamname[d.games[1].away]);
        th43.appendChild(img43);
        th43.appendChild(txt43);
        let th44 = document.createElement("td");
        th44.innerHTML = d.games[1].away_score;
        tr1.appendChild(th1);
        tr2.appendChild(th21);
        tr2.appendChild(th22);
        tr2.appendChild(th23);
        tr2.appendChild(th24);
        tr3.appendChild(th31);
        tr3.appendChild(th32);
        tr3.appendChild(th33);
        tr3.appendChild(th34);
        tr4.appendChild(th41);
        tr4.appendChild(th42);
        tr4.appendChild(th43);
        tr4.appendChild(th44);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        table.appendChild(tr4);
        screen.appendChild(table);
    });
    alldataStore(alldata);
}
/*
function drawTimetable() {
    var screen = document.getElementById("timetable");
    alldata.gamedata.scores.forEach(function (d) {
        let table = document.createElement("table");
        table.className = "table-score";
        let tr1 = document.createElement("tr");
        tr1.className = "data-score";
        let th1 = document.createElement("th");
        th1.setAttribute("colspan", "3");
        th1.innerHTML = d.date;
        let tr2 = document.createElement("tr");
        tr2.className = "data-body"
        let th21 = document.createElement("td");
        let img21 = set_image(alldata.teamname[d.games[0].home])
        let txt21 = document.createTextNode(alldata.teamname[d.games[0].home]);
        th21.appendChild(img21);
        th21.appendChild(txt21);
        let th22 = document.createElement("td");
        th22.innerHTML = "Vs"
        let th23 = document.createElement("td");
        let img23 = set_image(alldata.teamname[d.games[0].away])
        let txt23 = document.createTextNode(alldata.teamname[d.games[0].away]);
        th23.appendChild(img23);
        th23.appendChild(txt23);
        let tr3 = document.createElement("tr");
        let th31 = document.createElement("td");
        tr3.className = "data-body"
        let img31 = set_image(alldata.teamname[d.games[1].home])
        let txt31 = document.createTextNode(alldata.teamname[d.games[1].home]);
        th31.appendChild(img31);
        th31.appendChild(txt31);
        let th32 = document.createElement("td");
        th32.innerHTML = "Vs"
        let th33 = document.createElement("td");
        let img33 = set_image(alldata.teamname[d.games[1].away])
        let txt33 = document.createTextNode(alldata.teamname[d.games[1].away]);
        th33.appendChild(img33);
        th33.appendChild(txt33);
        tr1.appendChild(th1);
        tr2.appendChild(th21);
        tr2.appendChild(th22);
        tr2.appendChild(th23);
        tr3.appendChild(th31);
        tr3.appendChild(th32);
        tr3.appendChild(th33);
        table.appendChild(tr1);
        table.appendChild(tr2);
        table.appendChild(tr3);
        screen.appendChild(table);
    });
    alldataStore(alldata);
}
*/
function drawStandings() {
    var screen = document.getElementById("standings");
    let table = document.createElement("table");
    table.className = "table-standings";
    let tr1 = document.createElement("tr");
    tr1.className = "data-head"
    let th11 = document.createElement("th");
    th11.innerHTML = "Team";
    let th12 = document.createElement("th");
    th12.innerHTML = "W";
    let th13 = document.createElement("th");
    th13.innerHTML = "L";
    let th14 = document.createElement("th");
    th14.innerHTML = "T";
    let th15 = document.createElement("th");
    th15.innerHTML = "P";
    tr1.appendChild(th11);
    tr1.appendChild(th12);
    tr1.appendChild(th13);
    tr1.appendChild(th14);
    tr1.appendChild(th15);
    table.appendChild(tr1);
    screen.appendChild(table);
//    if (flag_new) {
        alldata.gamedata.scores.forEach(function (d) {
            calculateGameScore(d.games[0]);
            calculateGameScore(d.games[1]);
        });
//    }
    alldata.standings.forEach(function (d, id) {
        if (d !== null) {
            let tr = document.createElement("tr");
            tr.className = "data-body"
            let th1 = document.createElement("th");
            let img1 = set_image(alldata.teamname[id])
            let txt1 = document.createTextNode(alldata.teamname[id]);
            th1.appendChild(img1);
            th1.appendChild(txt1);
            let th2 = document.createElement("th");
            th2.innerHTML = d.w;
            let th3 = document.createElement("th");
            th3.innerHTML = d.l;
            let th4 = document.createElement("th");
            th4.innerHTML = d.t;
            let th5 = document.createElement("th");
            th5.innerHTML = d.p;
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            table.appendChild(tr);
        }
    });
    alldataStore(alldata);
}

function calculateGameScore(d) {
    let hs = get_score(d.home_score);
    let as = get_score(d.away_score);
    hs = parseInt(hs);
    as = parseInt(as);
    var w, l, th, ta, ph, pa;
    if (hs > as) {
        alldata.standings[d.home].w = alldata.standings[d.home].w + 1;
        alldata.standings[d.away].l = alldata.standings[d.away].l + 1;
        alldata.standings[d.home].p = alldata.standings[d.home].p + 2;
    }
    else if (hs < as) {
        alldata.standings[d.away].w = alldata.standings[d.away].w + 1;
        alldata.standings[d.home].l = alldata.standings[d.home].l + 1;
        alldata.standings[d.away].p = alldata.standings[d.away].p + 2;
    }
    else if (hs == as) {
        alldata.standings[d.home].t = alldata.standings[d.home].t + 1;
        alldata.standings[d.away].t = alldata.standings[d.away].t + 1;
        alldata.standings[d.home].p = alldata.standings[d.home].p + 1;
        alldata.standings[d.away].p = alldata.standings[d.away].p + 1;
    }
}   

function get_score(s) {
    let parts = s.split("-");
    s = parts[0];
    return s;
}

function set_teamname() {
    alldata.gamedata.teams.forEach(function (t) {
        alldata.teamname[t.id] = t.name;
        alldata.standings[t.id] = {
            "w": 0
            , "l": 0
            , "t": 0
            , "p": 0
        }
    });
}

function set_image(name) {
    let img = document.createElement("img");
    switch (name) {
    case 'Kolkata Knight Riders':
        img.setAttribute("src", "img/kkr.png");
        break;
    case 'Royal Challengers Bangalore':
        img.setAttribute("src", "img/rcb.png");
        break;
    case 'Mumbai Indians':
        img.setAttribute("src", "img/mi.png");
        break;
    case 'Sunrisers Hyderabad':
        img.setAttribute("src", "img/sh.png");
        break;
    case 'Kings XI Punjab':
        img.setAttribute("src", "img/kxip.png");
        break;
    case 'Gujarat Lions':
        img.setAttribute("src", "img/gl.png");
        break;
    case 'Delhi Daredevils':
        img.setAttribute("src", "img/dd.png");
        break;
    case 'Rising Pune Supergiants':
        img.setAttribute("src", "img/rps.png");
        break;
    }
    img.setAttribute("alt", "Team Logos");
    img.setAttribute("width", "40px");
    img.setAttribute("height", "40px");
    return img;
}

function alldataStore(newData) {
    if (flag_new) {
        localStorage.removeItem(datakey);
        let subdata = JSON.stringify(newData);
        //    alert(subdata);
        localStorage.setItem(datakey, subdata);
    }
}