
function Dollar (val) {  // force to valid dollar amount
var str,pos,rnd=0;
  if (val < .995) rnd = 1;  // for old Netscape browsers
  str = escape (val*1.0 + 0.005001 + rnd);  // float, round, escape
  pos = str.indexOf (".");
  if (pos > 0) str = str.substring (rnd, pos + 3);
  return str;
}

function ReadForm (obj1, tst) { // process radio and checkbox

if (obj1.tot.value < "$100.00") {
  	$("input.unibrace").attr("disabled", "disabled");
  	$("input.unibrace").addClass("off");
  	$("input[name='on2']").attr("disabled", "disabled");
  }else if (obj1.tot.value > "$100.00") {
    $("input.unibrace").removeAttr("disabled");
    $("input.unibrace").removeClass("off");
    $("input[name='on2']").removeAttr("disabled");
  }

var i,j,amt=0,des="",obj,pos,val,val2,tok,tag,position,desNew="",
  op1a="",op1b="",op2a="",op2b="",itmn=""; // var i,item_amt,object,position,val;




		  //item_amt = object1.amount.value;          // default amount
		  //for (i=0; i<object1.length; i++) {        // check options
		    //object = object1.elements[i];           
		    //if (object.type == "select-one" &&
		      //  object.name == "cng") {             // must be named cng
		      //position = object.selectedIndex;      // option selected
		      //val = object.options[position].value; // selected value
		      //position  = val.indexOf ("$");        // set new price
		      //if (position >= 0) item_amt = val.substring (position + 1)*1.0; 
		    //}
		  //}
		  //object1.amount.value = item_amt;
		  //if (object1.item_total) object1.item_total.value = "$" + item_amt;

var ary = new Array ();

  if (obj1.baseamt) amt  = obj1.baseamt.value*1.0;  // base amount
  //if (obj1.basedes) des  = obj1.basedes.value;  // base description
  if (obj1.baseon0) op1a = obj1.baseon0.value;  // base options
  if (obj1.baseos0) op1b = obj1.baseos0.value;
  if (obj1.baseon1) op2a = obj1.baseon1.value;
  if (obj1.baseos1) op2b = obj1.baseos1.value;
  if (obj1.baseitn) itmn = obj1.baseitn.value;
  
  for (i=0; i<obj1.length; i++) {  // run entire form
    obj = obj1.elements[i];        // a form element
    
    
    if (obj.type == "select-one" && obj.name == "cng") {             // must be named cng
    	position = obj.selectedIndex;      // option selected
		val = obj.options[position].value; // selected value
		val2 = obj.value; // selected value
		position  = val.indexOf ("$");        // set new price
		if (position >= 0) amt = val.substring (position + 1)*1.0; 
		if (position >= 0) desNew = val2;
		if (position >= 0) desNew2 = val2.substring (0,position-1); 
		console.log(position);
	}
	
	obj1.amount.value = amt;
	if (obj1.item_total) obj1.item_total.value = "$" + amt;
    
    
    if (obj.type == "checkbox" ||  // checkboxes
        obj.type == "radio") {     //  and radios
      if (obj.checked) {           // did user check it?
        val = obj.value;           // the value of the selection
        ary = val.split (" ");          // break apart
        for (j=0; j<ary.length; j++) {  // look at all items
// first we do single character tokens...
          if (ary[j].length < 2) continue;
          tok = ary[j].substring (0,1); // first character
          val = ary[j].substring (1);   // get data
          if (tok == "@") amt = val * 1.0;
          if (tok == "$") amt = amt + val*1.0;
          if (tok == "+") amt = amt + val*1.0;
          if (tok == "%") amt = amt + (amt * val/100.0);
          if (tok == "#") {             // record item number
            if (obj1.item_number) obj1.item_number.value = val;
          ary[j] = "";                // zap this array element
          }
// Now we do 3-character tokens...
          if (ary[j].length < 4) continue;
          tok = ary[j].substring (0,3); // first 3 chars
          val = ary[j].substring (3);   // get data
          if (tok == "s1=") {           // value for shipping
            if (obj1.shipping)  obj1.shipping.value  = val;
            ary[j] = "";                // clear it out
          }
          if (tok == "s2=") {           // value for shipping2
            if (obj1.shipping2) obj1.shipping2.value = val;
            ary[j] = "";                // clear it out
          }
        }
        val = ary.join (" ");           // rebuild val with what's left        tag = obj.name.substring (obj.name.length-2);  // get flag
        if      (tag == "1a") op1a = op1a + " " + val;
        else if (tag == "1b") op1b = op1b + " " + val;
        else if (tag == "2a") op2a = op2a + " " + val;
        else if (tag == "2b") op2b = op2b + " " + val;
        else if (tag == "3i") itmn = itmn + " " + val;
        else if (des.length == 0) des = val;
        else des = des + ", " + val;
      }
    }
  }
// Now summarize stuff we just processed, above
  if (op1a.length > 0) obj1.on0.value = op1a;
  if (op1b.length > 0) obj1.os0.value = op1b;
  if (op2a.length > 0) obj1.on1.value = op2a;
  if (op2b.length > 0) obj1.os1.value = op2b;
  if (itmn.length > 0) obj1.item_number.value = itmn;
  obj1.item_name.value = desNew;
  obj1.amount.value = Dollar (amt);
  if (obj1.tot) obj1.tot.value = "$" + Dollar (amt);
  if (obj1.tot.value == "$.00") obj1.tot.value = "$0.00";
  if (obj1.item_name.value == "Select Location - $0.00") obj1.tot.value = "$0.00";
  if (obj1.item_name.value) obj1.submit.value = "BUY " + obj1.tot.value;
  if (obj1.tot.value < "$100.00") {
  	$("input.unibrace").attr("disabled", "disabled");
  	$("input.unibrace").addClass("off");
  	$("input[name='os2']").attr("disabled", "disabled");
  }else if (obj1.tot.value > "$100.00") {
    $("input.unibrace").removeAttr("disabled");
    $("input.unibrace").removeClass("off");
    $("input[name='os2']").removeAttr("disabled");
    $(".addition span").removeClass("off");
  }
}



function ReadFormSeparate (obj, tst) { // nutsert
  var amt=0,position,product="";
  var sel = document.getElementById('separate_dropdown');
  position = sel.selectedIndex; 
  val = sel.options[position].value;
  price  = val.indexOf ("$");
  if (price >= 0) amt = val.substring (price + 1)*1.0;
  if (price >= 0) product = val.substring (0,price-3);
  obj.item_name.value = product;
  obj.amount.value = Dollar (amt);
  if (obj.tot_separate) obj.tot_separate.value = "$" + Dollar (amt);
  if (obj.tot_separate.value == "$.00") obj.tot_separate.value = "$0.00";
  if (obj.item_name.value) obj.submit.value = "BUY " + obj.tot_separate.value;
  if (obj.item_name.value == "Select Location") {
  	$("input[name='submit']").attr("disabled", "disabled");
  	$("input.separate-purchase").addClass("off");
  }else{
    $("input[name='submit']").removeAttr("disabled");
    $("input.separate-purchase").removeClass("off");
  }
}






