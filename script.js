const addbtn = document.getElementById('add-btn');
const resetbtn = document.getElementById('resetbtn');
const foodnameinput = document.getElementById('food-name');
const foodcalorieinput = document.getElementById('calories');
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
fetch('https://api.edamam.com/api/nutrition-data?app_id=YOUR_ID&app_key=YOUR_KEY&ingr=1%20large%20apple')
.then(response => response.json())
.then (data => console.log(data))
.catch(error => console.error('Error fetching data:', error));


addbtn.addEventListener('click', function(){
    const name = foodnameinput.value.trim();
    const calories = parseInt(foodcalorieinput.value, 10);

   

    foods.push({ name, calories });
    savetoLocalStorage();
    renderlist();
    updateTotalCalories();

    foodnameinput.value = '';
    foodcalorieinput.value = '';
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