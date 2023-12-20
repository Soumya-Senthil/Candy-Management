var Form = document.querySelector('form');
var CandyName = Form.querySelector('#name').nextElementSibling;
var Description = Form.querySelector('#desc').nextElementSibling;
var Price = Form.querySelector('#Price').nextElementSibling;
var qty = Form.querySelector('#Qty').nextElementSibling;

var apiEndPoint =  'https://crudcrud.com/api/6ee08552c26e41b6af18f4c820c2956e';
var post_json = {}

var isEditing = false;
var editId = '';
var gotDetails = {};

Form.addEventListener('submit',(e)=>{
    e.preventDefault();
    post_json.name = CandyName.value;
    post_json.Description = Description.value;
    post_json.Price = Price.value;
    post_json.qty = qty.value;
    
    CandyName.value ="";
    Description.value="";
    Price.value="";
    qty.value="";
    
    if (isEditing){
        isEditing=false;
        update()
    }
    else{
        post()
    }
})

async function update(){
    await axios.put(`${apiEndPoint}/candystock/${editId}`,post_json);
    getData();
}

async function post(){
    await axios.post(`${apiEndPoint}/candystock`,post_json);
    getData();
}

async function getData(){

    var data_1 = await axios.get(`${apiEndPoint}/candystock`);
    var CandyDetails = document.getElementById('candies');
    CandyDetails.innerHTML='';

    var ul = document.createElement('ul');
    ul.style = "list-style-type:none"
    ul.setAttribute('id','CandyDetails-ul');
    CandyDetails.appendChild(ul)

    if (data_1.data.length === 0){
        ul.innerHTML =" No Candies"
        return
    }

    var text = document.createTextNode("Candy Details");
    ul.appendChild(text);

    data_1.data.forEach(candy => {       
        var li = document.createElement('li');
        var Add1Btn = document.createElement('button');
        var Add2Btn = document.createElement('button');
        var Add3Btn = document.createElement('button');

        Add1Btn.innerText ='Add1';
        Add2Btn.innerText ='Add2';
        Add3Btn.innerText ='Add3';

        li.setAttribute('id',`${candy._id}`);
        Add1Btn.style = 'color:white;background-color:purple;margin-left:10px;'
        Add2Btn.style = 'color:white;background-color:purple;margin-left:10px;'
        Add3Btn.style = 'color:white;background-color:purple;margin-left:10px;'
        li.innerHTML = `CandyName: ${candy.name} , Description: ${candy.Description} , Price : ${candy.Price} , Quantity: ${candy.qty}`
        li.appendChild(Add1Btn)
        li.appendChild(Add2Btn)
        li.appendChild(Add3Btn)
        ul.append(li)
    })
}
getData();

async function updateAdd1(isEdit){

    var data = await axios.get(`${apiEndPoint}/candystock/${isEdit}`);
    var element = document.getElementById(`${isEdit}`);
    element.parentNode.removeChild(element);
    CandyName.value = data.data.name;
    Description.value = data.data.Description;
    Price.value = data.data.Price;

    
        qty.value = data.data.qty-1;  
        if(qty.value<=0){
            window.Error("Not enough chocolates");
        }
      
}

async function updateAdd2(isEdit){

    var data = await axios.get(`${apiEndPoint}/candystock/${isEdit}`);
    var element = document.getElementById(`${isEdit}`);
    element.parentNode.removeChild(element);
    CandyName.value = data.data.name;
    Description.value = data.data.Description;
    Price.value = data.data.Price;
    
    
        qty.value = data.data.qty-2;  
        if(data.data.qty<=0){
            window.Error("Not enough chocolates");
        }
       
}

async function updateAdd3(isEdit){

    var data = await axios.get(`${apiEndPoint}/candystock
    /${isEdit}`);
    var element = document.getElementById(`${isEdit}`);
    element.parentNode.removeChild(element);
    CandyName.value = data.data.name;
    Description.value = data.data.Description;
    Price.value = data.data.Price;
    
        qty.value = data.data.qty-3;  
        if(data.data.qty<=0){
            window.Error("Not enough chocolates");
        }
     
}

document.addEventListener('click',(e)=>{ 

    if (e.target.innerText == 'Add1'){
        var isEdit = `${e.target.parentNode.id}`
        isEditing = true;
        editId = `${e.target.parentNode.id}`
        updateAdd1(isEdit);
    }

    if (e.target.innerText == 'Add2'){
        var isEdit = `${e.target.parentNode.id}`
        isEditing = true;
        editId = `${e.target.parentNode.id}`
        updateAdd2(isEdit);
    }

    if (e.target.innerText == 'Add3'){
        var isEdit = `${e.target.parentNode.id}`
        isEditing = true;
        editId = `${e.target.parentNode.id}`
        updateAdd3(isEdit);
    }
});