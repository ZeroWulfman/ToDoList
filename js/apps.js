//Various Variables
var array=[],
	list = document.getElementById("list"),
	form = document.getElementById("form"),
	food = document.getElementById("eat"),
	devour = document.getElementById("devour");

//Events Everywhere
form.addEventListener("submit",function (evt) {
	var text = form.listItem.value
	array.push(text);

	makeLis();

	form.listItem.value="";
	evt.preventDefault();
})
//Clears ul entirely and array
food.addEventListener("click", function (evt){
	eat();

	evt.preventDefault();
})
//Clears only checked items on the list
devour.addEventListener("click", function (evt) {
	var checkArray = document.getElementsByClassName("checked");

	for (i=0;i<checkArray.length;i++) {

		for (j=0;j<array.length;j++) {

			var spoof = checkArray[i].childNodes[1].innerHTML;
			
			if (spoof === array[j]) {
				array.splice(j, 1);
			}
		}	
	}
	var checkArray = [];
	makeLis();
	evt.preventDefault();
})
//Function Funhouse
 function e(elementType, text, attributes, styles) {
        var newElement = document.createElement(elementType);
        newElement.textContent = text;

        //set the attributes on the tag
        if (attributes) {
        	for (var i = 0; i < attributes.length; i++) {
        		var attr = attributes[i];
        		newElement.setAttribute(attr[0], attr[1]);
        	}
    	}
        //set the styles
        if (styles) {
        	for (var j = 0; j < styles.length; j++) {
        		var style = styles[j];
        		newElement.style[style[0]] = style[1];
        	}
        }
        return newElement;
        }
//Turns array into Li's
function makeLis () {
	list.innerHTML="";
	for (i=0;i<array.length;i++) {
		var item = array[i];
		var li = e("li","",[["id","li"+i]]);
		var checkbox = e("input","",[["type","checkbox"],["id","checker"+i]]);
		var span = e("span", item);
		var edit = e("button", "Edit",[["id","edit"+i],["class","editor"], ["rel", item]]);
		var del = e("button","Eat",[["id","del"+i],["class","delBtn"], ["rel", item]]);

		var editForm = e("form","",[["id","editForm"]]);
		var editText = e("input","",[["type","text"],["id","editText"]]);
		var editSub = e("input","",[["type","submit"],["value","Transform"]]);
		editForm.appendChild(editText);
		editForm.appendChild(editSub);

		checkbox.addEventListener("click", function (evt) {
			var thisLi = this.parentNode.getAttribute("id");
			var checkEdit = document.getElementById(thisLi).childNodes[2];
			var checkDel = document.getElementById(thisLi).childNodes[3];
		
			if (this.checked) {

				this.parentNode.classList.add("checked");
				document.getElementById(thisLi).childNodes[2].style.visibility="hidden";
				document.getElementsByClassName("checked")
			}
			else {
				this.parentNode.classList.remove("checked");

				document.getElementById(thisLi).childNodes[2].style.visibility="visible";
			}
		})
		edit.addEventListener("click", function (evt) {
			var thisLi = this.parentNode.getAttribute("id");
			var eSpan = document.getElementById(thisLi).childNodes[1];
			var eEdit = document.getElementById(thisLi).childNodes[2];
			var spanVal = document.getElementById(thisLi).childNodes[1].innerHTML;
			console.log(spanVal);

			document.getElementById(thisLi).replaceChild(editForm, eSpan);
			this.parentNode.childNodes[1].childNodes[0].setAttribute("value", spanVal);
			this.parentNode.childNodes[1].childNodes[0].setAttribute("rel", spanVal);
			document.getElementById(thisLi).removeChild(eEdit);
		
		})
		editForm.addEventListener("submit", function (evt) {
			var thisLi = this.parentNode.getAttribute("id");
			var defText = document.getElementById(thisLi).childNodes[1].childNodes[0].getAttribute("rel");
			console.log(defText);
			var newItem = document.getElementById(thisLi).childNodes[1].childNodes[0].value;

			var arrChange = array.indexOf(defText);
			console.log(array);
			array.splice(arrChange, 1, newItem);
			console.log(array);

			makeLis();

			evt.preventDefault();
		})
		del.addEventListener("click", function (evt) {
			if(confirm("Are you certain Shia Labeouf should eat this?")) {
				var delAt = this.getAttribute("rel");
				var delItem = array.indexOf(delAt);
				array.splice(delItem, 1);

				makeLis();
			}
		})

		list.appendChild(li);
		li.appendChild(checkbox);
		li.appendChild(span);
		li.appendChild(edit);
		li.appendChild(del);

	}
}
//Cannibalize Function:clears ul, and array.
function eat() {
	document.getElementById("list").innerHTML="";
	array=[];
	return"";
}
// Execution
