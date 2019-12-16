window.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('div#monster-container');
    const form = document.querySelector('form');
    const back = document.querySelector('button#back');
    const forward = document.querySelector('button#forward');
    let pageNum = 1;

    fetch("http://localhost:3000/monsters?_limit=50&_page=1").then(response => response.json()).then(displayMonsters);

    form.addEventListener('submit', addMonster);
    back.addEventListener('click', goBack);
    forward.addEventListener('click', goForward);

    // functions

    function displayMonsters(monsters) {
        container.innerHTML = '';
        monsters.forEach(monster => {
            let name = monster.name;
            let age = monster.age;
            let desc = monster.description;
            let monsterName = document.createElement('h2');
            let monsterAge = document.createElement('p');
            let monsterDesc = document.createElement('p');
            monsterName.textContent = name;
            monsterAge.textContent = age;
            monsterDesc.textContent = desc;
            container.appendChild(monsterName);
            container.appendChild(monsterAge);
            container.appendChild(monsterDesc);
        })
        console.log(`display monsters on page ${pageNum}`);
    }

    function addMonster(event) {
        event.preventDefault();

        const name = document.querySelector('input[name=name]').value;
        const age = document.querySelector('input[name=age]').value;
        const description = document.querySelector('input[name=description]').value;

        let data = {
            name: name,
            age: age,
            description: description
        };
        console.log(data);

        let object = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:3000/monsters", object).then(response => response.json()).then(displayMonsters);
    }

    function goForward() {
        pageNum += 1;
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`).then(response => response.json()).then(displayMonsters);
    }

    function goBack() {
        pageNum -= 1;
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`).then(response => response.json()).then(displayMonsters);
    }
})

function getQueryParams() {
    return new URLSearchParams(window.location.search);
}

console.log(getQueryParams().get('page'));

// window.history.pushState(null, '', window.location.href + '?page=1');