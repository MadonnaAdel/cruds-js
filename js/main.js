
var productCategoury = document.getElementById("productCategory");
var inputs = document.getElementsByClassName("form-control");
var productPrice = document.getElementById("productPrice");
var productInput = document.getElementById("productInput");
var tableTBody = document.querySelector('#tableTbody');
var productDes = document.getElementById("productDes");
var btnDelete = document.getElementById("btnDelete");
var search =  document.querySelector("#searchInput");
var table = document.querySelector('.table');
var lab = document.querySelector('.lab');
var error = document.querySelector("#error");
var btn = document.getElementById("btn");
var div = document.querySelector('#div');
var regName=/^[A-Z a-z]{2,}$/;
var regCat=/^[A-Z a-z]{2,}$/;
var regPrice=/^\d+$/;
var products = [];


// check web stprge
if(localStorage.getItem('products') != null){
  products = JSON.parse( localStorage.getItem('products'));
  displayProduct(products);
};

//valied function
function valide() {
  if (regName.test(productInput.value) &&
    regCat.test(productCategoury.value) &&
    regPrice.test(productPrice.value)) 
    {
    return true;
    } 
    else {
      return false;
    }
};


//add function
function addProduct(){
  if(valide() === true)
  {
    var product = {
      nameProduct:productInput.value,
      price:productPrice.value,
      categoury:productCategoury.value,
      description:productDes.value,
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    }
    else 
    {
      console.log("elae")
      error.innerHTML= "Invalid Data Please Enter Valid Data In Input"; 
      productInput.addEventListener("focus",()=>{
        document.querySelector("#error").innerHTML= " "; 
      });
    }
};

//search function
function searchInput(term){
  let found = false;
  let trs = "";
  
  for (var i = 0; i < products.length; i++) {
      if(products[i].nameProduct.toLowerCase().includes(term.toLowerCase())) {
          found = true;
          trs += `<tr>
              <td>${i+1}</td>
              <td>${products[i].nameProduct}</td>
              <td>${products[i].price} L.E</td>
              <td>${products[i].categoury}</td>
              <td>${products[i].description}</td>
              <td><button id="btnDelete" onclick="deletProduct(${i})" class="btn btn-danger">Delete</button></td>
              <td><button id="btnUpdate" onclick="updateProduct(${i})" class="btn btn-info text-white">Update</button></td>
          </tr>`;
      }
  }
  
  if (found) {
      table.classList.remove("hiden");
      tableTBody.innerHTML = trs;
      document.querySelector("#div").innerHTML = "";
    
  } else {
      table.classList.add("hiden");
      let div = `<div class="my-4 text-center p-5">
                      <i class="fa-solid fa-heart-crack fa-9x text-red mb-3"></i>
                      <p class="not-found">not found</p>
                  </div>`;
      document.querySelector("#div").innerHTML = div;
  }
  
};

//display function
function displayProduct(products){
  var trs = " ";
  for (var i = 0 ; i < products.length; i++) {
    trs += `<tr>
              <td>${i+1}</td>
              <td>${products[i].nameProduct}</td>
              <td>${products[i].price}L.E</td>
              <td>${products[i].categoury}</td>
              <td>${products[i].description}</td> 
              <td><buttom id="btnDelete" onclick="deletProduct(${i})" class="btn  btn-danger">Delete</buttom></td>
              <td><buttom id="btnUpdate" onclick="updateProduct(${i})" class="btn  btn-info text-white">update</buttom></td>
              </tr>`;
  }
    tableTBody.innerHTML= trs;
};

//clear function
function clear(){
  for(var i=0;i< inputs.length;i++){
    inputs[i].value=" "
  }
};

//delete function
function deletProduct(index){
  products.splice(index , 1);
  localStorage.setItem('products',JSON.stringify(products));
  displayProduct(products);
};

//up date function
function updateProduct(index){
  productInput.value = products[index].nameProduct;
  productPrice.value = products[index].price;
  productCategoury.value = products[index].categoury;
  productDes.value = products[index].description;
  document.getElementById('btn').innerHTML = "update";
  deletProduct(index);
  displayProduct(products);
};


btn.addEventListener('click', function(){
  addProduct();
  displayProduct(products);
  clear();
});
