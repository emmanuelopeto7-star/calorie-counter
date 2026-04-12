const addbtn = document.getElementById('addbtn');
const resetbtn = document.getElementById('resetbtn');
const foodnameinput = document.getElementById('foodnameinput');
const foodcalorieinput = document.getElementById('foodcalorieinput');
const foodlist = document.getElementById('foodlist');
const totalcalories = document.getElementById('totalcalories');

let foods = JSON.parse(localStorage.getItem('foods')) 

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
            localStorage.setItem('foods', JSON.stringify(foods));
            renderlist();
        });
    }
        li.appendChild(namespan);

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
addbtn.addEventListener('click', function(){
    const name = foodnameinput.value;
    const calories = parseInt(foodcalorieinput.value);

});
resetbtn.addEventListener('click', function(){
    if(confirm('Are you sure you want to reset the list?')){
        foods = [];
        savetoLocalStorage();
        renderlist();
        updateTotalCalories();
    }
});