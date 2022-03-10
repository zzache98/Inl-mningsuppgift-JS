import { Player } from './data/HockeyPlayers.js'

const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const playerTableBody = document.getElementById('playerTableBody')
const submitNewButton = document.getElementById('submitNewButton')

const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')
const editLink = document.getElementById('editLink')

const newName =  document.getElementById('newName')
const newAge = document.getElementById('newAge')
const newJerseyNumber = document.getElementById('newJerseyNumber')
const newBorn = document.getElementById('newBorn')

const editName =  document.getElementById('editName')
const editAge = document.getElementById('editAge')
const editJerseyNumber = document.getElementById('editJerseyNumber')
const editBorn = document.getElementById('editBorn')

const submitEditButton = document.getElementById('submitEditButton')

const baseApi = "https://hockeyplayers.systementor.se/zzache98@gmail.com/player";

const search = document.getElementById('search')
search.addEventListener("keyup", ()=>{
    const lowercase = search.value.toLowerCase()

    const filteredList = items.filter(item=> item.name.toLowerCase()
        .includes(lowercase)  );
    
    playerTableBody.innerHTML = '';
    filteredList.forEach( (item) => {
        renderTr(item);
    });
})



// class Player{
//     constructor(id,name,age,jerseyNumber,born){
//         this.id = id;
//         this.name = name;
//         this.age = age;
//         this.jerseyNumber = jerseyNumber;
//         this.born = born;
//    }
// }

function showSection(sectionsId){
    if (sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "block";
    }
}

newLink.addEventListener("click",()=>{
    showSection('sectionNew');
});


listLink.addEventListener("click",()=>{
    showSection('sectionList');
});

editLink.addEventListener("click",()=>{
    showSection('sectionEdit');
});

submitNewButton.addEventListener("click",()=>{ 

    const newPlayer = {
        namn: newName.value,
        age: newAge.value,
        jersey: newJerseyNumber.value,
        born: newBorn.value
};
console.table(newPlayer)
const reqParams = {
    headers:{
        'Content-Type': 'application/json'
    },       
    method:"POST",
    body:JSON.stringify(newPlayer)
};
fetch(baseApi,reqParams)
    .then(res=>res.json()) 
    .then(json=>{
        const play = new Player(
            json.id,
            newName.value,
            newAge.value, 
            newJerseyNumber.value,
            newBorn.value)
        
        // console.log(play);
        items.push(play); 
        renderTr(play);
        showSection('sectionList');    
    })
});

submitEditButton.addEventListener("click",()=>{

    const changedPlayerValues = {
        namn: editName.value,
        age: editAge.value,
        jersey: editJerseyNumber.value,
        born: editBorn.value
    };
    const reqParams = {
        headers:{
            'Content-Type': 'application/json'
        },       
        method:"PUT",
        body:JSON.stringify(changedPlayerValues)
    };

    // 'https://fakestoreapi.com/products/7


    fetch(baseApi + '/' + editingPlayer.id ,reqParams)
        // .then(res=>res.json())
        .then(response=>{
            refreshItems();
            showSection('sectionList');
            console.log(editingPlayer);    
        });
});

let editingPlayer = null;

function editPlayer(id){
    
    console.log(id);
    editingPlayer = items.find((item)=>item.id === id)
    console.log(items);
    console.log(editingPlayer);
    editName.value = editingPlayer.name;
    editAge.value = editingPlayer.age;
    editJerseyNumber.value = editingPlayer.jerseyNumber;
    editBorn.value = editingPlayer.born;
    showSection('sectionEdit'); 

}
window.editPlayer = editPlayer;

function renderTr(player){
    let jsCall = `editPlayer(${player.id})`;
    console.log(jsCall);
    // jsCall = editPlayer(18)
    // jsCall = editPlayer(19)
    let template = `<tr>
                        <td>${player.name}</td>
                        <td>${player.age}</td>
                        <td>${player.jerseyNumber}</td>
                        <td>${player.born}</td>
                        <td><a href="#" onclick="${jsCall}">EDIT</td>
                    </tr>`
    playerTableBody.innerHTML = playerTableBody.innerHTML + template;
} 

function refreshItems(){

    items = [];
    playerTableBody.innerHTML = '';
    console.log(items);
    fetch(baseApi)
        .then(response=>response.json())
        .then(array=>{
            //json -> items
            // console.log(array)
            array.forEach(play=>{
                
                let p = new Player(play.id,
                    play.namn,
                    play.age,
                    play.jersey,
                    play.born)                    
                items.push(p)
                console.log(p);
            });
            items.forEach( (item) => {
                renderTr(item);
            });
    })

}

let items = [];
refreshItems();
console.log(items);


showSection('sectionList');