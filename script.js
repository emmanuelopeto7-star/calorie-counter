const addbtn = document.getElementById('add-btn');
const resetbtn = document.getElementById('resetbtn');
const foodnameinput = document.getElementById('food-name');
const foodlist = document.getElementById('food-log');
const totalcalories = document.getElementById('total-calories');

let foods = JSON.parse(localStorage.getItem('foods')) || [];

function renderlist(){
    foodlist.innerHTML = '';

    for(let i = 0; i < foods.length; i++){
        const li = document.createElement('li');
        const namespan = document.createElement('span');
        const caloriespan = document.createElement('span');
        const removebtn = document.createElement('button');

        namespan.textContent = foods[i].name;
        caloriespan.textContent = foods[i].calories + ' calories';
        removebtn.textContent = 'Remove';
        removebtn.addEventListener('click', function(){
            foods.splice(i, 1);
            savetoLocalStorage();
            renderlist();
            updateTotalCalories();
        });

        li.appendChild(namespan);
        li.appendChild(caloriespan);
        li.appendChild(removebtn);
        foodlist.appendChild(li);
    }
}
fetch('https://api.calorieninjas.com/v1/nutrition?query=')
.then(response => response.json())
.then (data => console.log(data))
.catch(error => console.error('Error fetching data:', error));

addbtn.addEventListener('click', function(){
    const name = foodnameinput.value.trim();

    if (!name) {
        alert('Please enter a food name.');
        return;
    }
    getcaloriesfromAPI(name);
    .then(calories => {
        foodlist.push({ name, calories });
        savetoLocalStorage();
        renderlist();
        updateTotalCalories();
    })
    .catch(error=> console.error('Error fetching calories:', error));
function updateTotalCalories(){
    let total = 0;
    for(let i = 0; i < foods.length; i++){
        total += foods[i].calories;
    }
    totalcalories.textContent = 'Total Calories: ' + total;
}

function savetoLocalStorage(){
    localStorage.setItem('foods', JSON.stringify(foods));
}

addbtn.addEventListener('click', function(){
    const name = foodnameinput.value.trim();

    if (!name) {
        alert('Please enter a food name.');
        return;
    }

    alert('Calories lookup is not implemented yet. Manual calorie entry has been removed.');
});

resetbtn.addEventListener('click', function(){
    if(confirm('Are you sure you want to reset the list?')){
        foods = [];
        savetoLocalStorage();
        renderlist();
        updateTotalCalories();
    }
});

renderlist();
updateTotalCalories();