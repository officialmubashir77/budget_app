// Get variables in js from html

let budget = document.querySelector('#budget');
let budget_btn = document.querySelector('#budget-btn');
let total_budget = document.querySelector('#total-budget');
let product_title = document.querySelector('#product-title');
let product_btn = document.querySelector('#product-btn');
let product_cost = document.querySelector('#product-cost');
let expense_list =  document.querySelector('#expense-list');
let total_expense =  document.querySelector('#total-expense');
let total_balance =  document.querySelector('#total-balance');

{/* <div style="padding-left: 10px; border-left: 5px solid #5B7C99;" class="col-md-6 mt-3 d-flex justify-content-between"><h4>Orange</h4><h5>6000</h5></div><div class="col-md-6 mt-3 d-flex justify-content-end"><i style="padding-right: 40px;" class="fas fa-trash font-size"></i><i class="fas fa-edit font-size"></i></div></div> */}


// Store budget 

budget_btn.onclick = function(e){
  e.preventDefault();

  if (budget.value != "") {
    localStorage.setItem("budget" , budget.value);
    location.href = location.href ;
    
  } else {
    alert("Please Eneter Budgetr Amount !!!")
  }

  budget.value = "" ;
}

// Store prouct in local storage

product_btn.onclick = function(e){
  e.preventDefault();
  // alert(product_cost.value);

  if (product_title.value != "" && product_cost.value != "") {
    // alert("Success")
    let p_title = product_title.value ;
    let p_cost = product_cost.value ;

    let data = {p_title : p_title , p_cost : p_cost}

    // Convert into string and push into local storage
    let dataString = JSON.stringify(data);

    localStorage.setItem("budget_" + product_title.value , dataString);
    location.href = location.href ; 


     
  } 
  else {
    alert("Field is Empty !!!")
  }

     // Empty fields Product Title and Cost ;
     product_title.value = "" ;
     product_cost.value = "" ;

}




// Get data from local storage and set into budget column
let all_data = function() {

  for(i = 0 ; i < localStorage.length ; i++){
    let allKeys = localStorage.key(i);
    if (allKeys.match("budget_")) {
      let jsonData = localStorage.getItem(allKeys) ;
      let jsonParse = JSON.parse(jsonData);
      // console.log(jsonParse.p_title);
      expense_list.innerHTML += `<div style="padding-left: 10px; border-left: 5px solid #5B7C99;" class="col-md-6 mt-3 d-flex justify-content-between"><h4>${jsonParse.p_title}</h4><h5 class="price">${jsonParse.p_cost}</h5></div><div class="col-md-6 mt-3 d-flex justify-content-end"><i style="padding-right: 40px;" class="fas fa-trash delete-btn font-size"></i><i class="fas fa-edit edit-btn font-size"></i></div></div>`
    } else {
      
    }

  }

  let price_tag = document.getElementsByClassName("price");
  let price = [] ; 
  for( i = 0 ; i < price_tag.length ; i++){
    // alert();

    price[i] = price_tag[i].innerHTML ; 
  }

  let price_int = [];
  for(i = 0 ; i < price.length ; i++){
    price_int.push(parseInt(price[i]))
  }

  let final_price = 0 ; 
  for(i = 0 ; i < price_int.length ; i++){
    final_price += price_int[i]
  }

  total_expense.innerHTML = final_price ; 
// console.log(final_price);
// console.log(price);
// console.log(price_int);


total_budget.innerHTML = localStorage.getItem("budget");

let t_budget = total_budget.innerHTML ; 
let t_expense = total_expense.innerHTML ; 
total_balance.innerHTML = t_budget - t_expense ;


// Delete Itme Code 
let delete_btn = document.querySelectorAll('.delete-btn');

for (let i = 0; i < delete_btn.length; i++) {

  delete_btn[i].onclick = function() { 
    
    let confirm_del = window.confirm("Do you Wanna Delete it ?");
    if (confirm_del) {
      
        let del_parent = this.parentElement; 
        let div_parent = del_parent.previousElementSibling.firstChild.innerHTML; 
        console.log(div_parent);

        localStorage.removeItem("budget_"+div_parent);
        location.href = location.href ;

    }
    else{
      alert("Your Data is Safe ✅")
    }

  };
}

// Edit Icon Code 

let edit_btn = document.querySelectorAll('.edit-btn'); 
for (i = 0 ; i<  edit_btn.length ; i++ ){

  edit_btn[i].onclick = function() { 
    var cnfrm_mess =  window.confirm("Do You Wanna Update It ?");
    if(cnfrm_mess == true){
      // alert("success")
      let edit_parent = this.parentElement.previousElementSibling ;
      let data_parent_title = edit_parent.firstElementChild.innerHTML ;
      let data_parent_cost = edit_parent.firstElementChild.nextElementSibling.innerHTML ;
      

      product_title.value = data_parent_title ; 
      product_cost.value = data_parent_cost ; 
      product_title.focus();

      product_btn.innerHTML = "Update Data";

      product_btn.onclick = function() { 

        localStorage.removeItem("budget_"+data_parent_title)
        let p_title = product_title.value ;
        let p_cost = product_cost.value ;
    
        let data = {p_title : p_title , p_cost : p_cost}
    
        // Convert into string and push into local storage
        let dataString = JSON.stringify(data);
    
        localStorage.setItem("budget_" + product_title.value , dataString);
        location.href = location.href ; 

      }


      console.log(data_parent_title );
      console.log(data_parent_cost);

      // let get_product_data = data_parent.firstElementChild;
      // let get_cost_data = data_parent.firstElementChild.nextElementSibling;
    } 
    else{
      alert("Your Data is Safe ✅")
    }
  }
}



}

all_data()


