let focus_cell = null
let device = navigator.userAgent;
// console.log(device)
const regex =  /Mobi|Android|Tablet/i
function genGrid() {
    let container = document.getElementsByClassName('container')[0];
    let readOnly = regex.test(device)
    for (let i=1;i<=81;i++) {
        const cell = document.createElement('input');
        cell.type = 'number';
        cell.max = '9';
        cell.setAttribute('data-index', i); 
        cell.addEventListener('input', ()=>  (validateInput(cell)) );
        cell.addEventListener('keydown', (e) =>{handleKeyNavigation(e, cell)});
        // whenever use focus on a cell, select content for overwrite
        cell.addEventListener('focus', (e) => {
            e.target.select();
            focus_cell=cell;
        }); 
        if(readOnly && window.innerWidth >= 768){
            cell.setAttribute('readonly', true); 
        }
        container.appendChild(cell);
    }
    window.addEventListener('resize', handleResize);
}

function handleResize() {
    let readOnly = regex.test(device); 
    let cells = document.querySelectorAll('[data-index]');

    cells.forEach(cell => {
        if (readOnly && window.innerWidth >= 768) {
        cell.setAttribute('readonly', true);
        } else {
        cell.removeAttribute('readonly');
        }
    });
}

function validateInput(input) {
    let value = input.value;
    if(value.length == 2){
        if(value[0] == value[1]){
            input.value = '';
        }
        else{
            if(value[1] < '1' || value[1] > '9'){
                input.value = ''
            }
            else{
                input.value = value[1];
            }
        }
    }
    else{
        if(value < '1' || value > '9'){
            input.value = ''
        }
    }
}

function handleKeyNavigation(event, cell) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
    }
    const index = parseInt(cell.getAttribute('data-index'));
    switch (event.key) {
        case 'ArrowUp':
            if (index > 9) {
                document.querySelector(`[data-index="${index - 9}"]`).focus();
            }
            break;
        case 'ArrowDown':
            if (index < 73) { 
                document.querySelector(`[data-index="${index + 9}"]`).focus();
            }
            break;
        case 'ArrowLeft':
            if (index % 9 !== 1) { 
                document.querySelector(`[data-index="${index - 1}"]`).focus();
            }
            break;
        case 'ArrowRight':
            if (index % 9 !== 0) { 
                document.querySelector(`[data-index="${index + 1}"]`).focus();
            }
            break;
    }
}

function createNumbers(){
    const box = document.getElementsByClassName('numbers')[0]

    for(let i=0;i<9;i++){
        const num = document.createElement('button');
        num.setAttribute('class','nums')
        num.innerText = i+1
        num.addEventListener('click', ()=> applyNumber(num))
        box.appendChild(num);
    }
}

function applyNumber(button){
    let number = button.textContent;
    // console.log(focus_cell, number)
    if(focus_cell!=null){
        if(focus_cell.value == number){
            focus_cell.value = '';
        }
        else{
            focus_cell.value = number;
        }
        focus_cell.focus()
    }
}

document.getElementById('reset').addEventListener('click', function(){ clearCell(this) });

function clearCell(button){
    let grid = document.querySelectorAll('[data-index]');
    grid.forEach(cell =>{
        // console.log(cell.value);
        cell.value = '';
        cell.style.color = 'black';

    })
    focus_cell = null
    button.disabled =true;
    button.style.opacity = 0.8
    setTimeout(()=>{
        button.disabled = false;
        button.style.opacity = 1
    },1000)
}

document.getElementById('solve').addEventListener('click', ()=> getGrid());

function getGrid(){
    let grid = document.querySelectorAll('input');
    let list = []
    let temp =[]
    let i=0;
    grid.forEach(ele =>{
        i++;
        temp.push(parseInt(ele.value | 0));
        if(i%9 == 0){
            list.push(temp);
            temp =[]
        }
    })
    let res = chkValid(list);
    if(res === true){
        document.getElementById('solve').disabled=true;
        document.getElementById('solve').style.opacity = 0.8
        solveSudoku(list);
        setTimeout(()=>{
            document.getElementById('solve').disabled=false;
            document.getElementById('solve').style.opacity = 1
        },1000)
    }
    else{
        let invalidBox = document.getElementById('invalid');
        invalidBox.style.display = 'flex';
        invalidBox.querySelector('p').textContent = `Identical value detected in ${res}.`;
    }
}

function chkValid(list){
    let set = new Set();
    for(let i=0; i<list.length; i++){
        for(let j=0; j<list[0].length; j++){
            if(list[i][j]!=0){
                let row = list[i][j] + ' in row ' + i;
                let col = list[i][j] + ' in col ' + j;
                let subgrid = list[i][j] + ' in subgrid ' + parseInt(i/3) + '-' + parseInt(j/3);
                if(set.has(row)) return "row " + (i+1);
                if(set.has(col)) return "column " + (j+1);
                if(set.has(subgrid)) return "subgrid " + (parseInt(i/3)*3 + parseInt(j/3) + 1);
                set.add(row);
                set.add(col);
                set.add(subgrid);
            }
        }
    }
    return true;
}

function toggle(){
    let invalidBox = document.getElementById('invalid');
    invalidBox.style.display = 'none';
}

function solveSudoku(list){
    if(solve(list)){
        // console.log(grid);
        let grid = document.querySelectorAll('[data-index]');
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let cell =grid[9*i+j]
                // console.log(typeof cell.value);
                if(cell.value == ""){
                    // console.log(list[i][j])
                    cell.value = list[i][j];
                    cell.style.color = 'blue';
                    cell.style.disabled = true;
                }
            }
        }
    }
}

function solve(grid){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(grid[i][j]==0){
                for(let k=1;k<=9;k++){
                    if(validNum(i,j,k,grid)){
                        grid[i][j]=k;
                        if(solve(grid)) return true;
                        grid[i][j]=0;
                    } 
                }
            }
            if(grid[i][j]==0) return false;
        }
    }
    return true;
}

function validNum(i,j,val,grid){
    for(let k=0;k<9;k++){
        if(grid[i][k]==val) return false;
        if(grid[k][j]==val) return false;
        if(grid[parseInt(i/3)*3+parseInt(k/3)][parseInt(j/3)*3+k%3]==val) return false;
    }
    return true;
}

window.onload = () => {
    genGrid();
    createNumbers();
}