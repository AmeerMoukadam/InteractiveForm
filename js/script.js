//declaring variables I will use in my form
let fullCost = 0;
let trueSubmt = false;
let validPay = false;
let correctCard = false;
let correctCvv = false;
const checkbox1 = $(".activities input[name='all']")
const checkbox2 = $(".activities input[name='js-frameworks']")
const checkbox3 = $(".activities input[name='js-libs']")
const checkbox4 = $(".activities input[name='express']")
const checkbox5 = $(".activities input[name='node']")
const checkbox6 = $(".activities input[name='build-tools']")
const checkbox7 = $(".activities input[name='npm']")
const cost1 = parseInt((checkbox1.attr('data-cost').replace("$","")))
const cost2 = parseInt((checkbox2.attr('data-cost').replace("$","")))
const cost3 = parseInt((checkbox3.attr('data-cost').replace("$","")))
const cost4 = parseInt((checkbox4.attr('data-cost').replace("$","")))
const cost5 = parseInt((checkbox5.attr('data-cost').replace("$","")))
const cost6 = parseInt((checkbox6.attr('data-cost').replace("$","")))
const cost7 = parseInt((checkbox7.attr('data-cost').replace("$","")))

//Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
//Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
// Focus on the name input on page load
$('#name').focus();
// Hide job role input
$("#other-title").hide();
// Show the other job role input if "other" is selected
$('#title').change(function(){
	const $selection = $('#title').val()
	if ($selection === "other"){
		$('#other-title').show()
	} else {
		$('#other-title').hide();
	}
})

function updateTotal() {
	$('.fullCost').text('Total Cost: $' + fullCost)
}

const $design = $('#design').val()
	if($design === "Select Theme"){
		$("#colors-js-puns").hide();
	}	

//Design Event Listenter
$("#colors-js-puns select").append('<option value="choosedesign">Choose a Design</option>');
// ”T-Shirt Info” section
// Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
// For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
// When a new theme is selected from the "Design" menu, both the "Color" field and drop down menu is updated.

// Shows only the correct color options for each design.
$("#design").change(function(){
		const designValue = $('#design').val()
		$('#selectTheme').prop('disabled',true)
		$("#colors-js-puns").show();
		if (designValue === "js puns"){
			$("#colors-js-puns option").hide();
			$("#colors-js-puns option[value = 'cornflowerblue']").show();
			$("#colors-js-puns option[value = 'darkslategrey']").show();
			$("#colors-js-puns option[value = 'gold']").show();
			$("#colors-js-puns option[value = 'choosedesign']").hide()
			$("#colors-js-puns option[value = 'cornflowerblue']").prop("selected",true);
		} else if (designValue === "heart js") {
			$("#colors-js-puns option").hide();
			$("#colors-js-puns option[value = 'tomato']").show();
			$("#colors-js-puns option[value = 'steelblue']").show();
			$("#colors-js-puns option[value = 'dimgrey']").show();
			$("#colors-js-puns option[value = 'choosedesign']").hide();
			$("#colors-js-puns option[value = 'tomato']").prop("selected",true);
		} else if (designValue === "Select Theme") {
			$("#colors-js-puns option").hide();
			$("#colors-js-puns option[value = 'choosedesign']").show();
			$("#colors-js-puns option[value = 'choosedesign']").prop("selected",true);
		}
})



//”Register for Activities” section
//Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
//When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
//As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
// Creating the total cost display 
const fullCostDiv = document.createElement('div');
fullCostDiv.className ='fullCost';
$('.activities').append($(fullCostDiv).text('Total Cost: $' + fullCost));

checkbox1.change(function(){
		if(checkbox1.prop('checked')){
		fullCost += cost1
		} else {
		fullCost -= cost1;
		}
	updateTotal();
	})

checkbox2.change(function(){
		if(checkbox2.prop('checked')){
		fullCost += cost2
		checkbox4.prop('disabled', true);
		} else {
		fullCost -= cost2;
		checkbox4.prop('disabled', false);
		}
	$('#label4').toggleClass("unavailable")
	updateTotal();
	})

checkbox3.change(function(){
		if(checkbox3.prop('checked')){
		fullCost += cost3
		checkbox5.prop('disabled', true);
		} else {
		fullCost -= cost3;
		checkbox5.prop('disabled', false);
	}
	$('#label5').toggleClass("unavailable")
	updateTotal()
})

checkbox4.change(function(){
		if(checkbox4.prop('checked')){
		fullCost += cost4
		checkbox2.prop('disabled', true);
		} else {
		fullCost -= cost4;
		checkbox2.prop('disabled', false);
	}
	$('#label2').toggleClass("unavailable")
	updateTotal()
})

checkbox5.change(function(){
		if(checkbox5.prop('checked')){
		fullCost += cost5
		checkbox3.prop('disabled', true);
		} else {
		fullCost -= cost5;
		checkbox3.prop('disabled', false);
	}
	$('#label3').toggleClass("unavailable")
	updateTotal()
})

checkbox6.change(function(){
		if(checkbox6.prop('checked')){
		fullCost += cost6
		} else {
		fullCost -= cost6;
	}
	updateTotal()
})
checkbox7.change(function(){
		if(checkbox7.prop('checked')){
		fullCost += cost7
		} else {
		fullCost -= cost7;
	}
	updateTotal()
})


// Payment section 
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment option[value="select method"]').prop('disabled',true)
$('#payment option[value="Credit Card"]').prop('selected',true)
$('#payment').change(function(){
	checkvalidPay()
	alertPayment();
	const val = $('#payment').val();
	if (val === "PayPal"){
		$('#credit-card').hide();
		$('#bitcoin').hide();
		$('#paypal').show();


	} else if (val === "Bitcoin") {
		$('#credit-card').hide();
		$('#paypal').hide();
		$('#bitcoin').show();
	} else if (val === "Credit Card") {
		$('#paypal').hide();
		$('#bitcoin').hide();
		$('#credit-card').show();
	}
	})

// Creating the Name Error Div and Hiding It
// Creating the CVV Error Div and Hiding It
// Creating the Email Error Div and Hiding It
// Creating the Activities Error Div and Hiding It
// Creating the Payment Error Div and Hiding It
// Creating the Card Number Error Div and Hiding It
// Creating the Zip Code Error Message Div and Hiding It
const $namediv = $("<div></div>", {id: "name_div", "class": "error_div"});
$namediv.html('<strong>Name field must not be left blank</strong>')
$("#name").after($namediv);
$namediv.hide()

const $emaildiv = $("<div></div>", {id: "email_div", "class": "error_div"});
$emaildiv.html('<strong>Please check email address format</strong>')
$("#mail").after($emaildiv);
$emaildiv.hide()

const $emaildiv2 = $("<div></div>", {id: "email_div2", "class": "error_div"});
$emaildiv2.html('<strong>Email address must not be left blank</strong>')
$("#mail").after($emaildiv2);
$emaildiv2.hide()

const $activediv = $("<div></div>", {id: "activities_div", "class": "error_div"});
$activediv.html('<strong>Please select at least one activity</strong>')
$(".activities").after($activediv);
$activediv.hide()

const $paymentdiv = $("<div></div>", {id: "payment_div", "class": "error_div"});
$paymentdiv.html('<strong>Please check your payment details</strong>')
$("#payment-info").after($paymentdiv);
$paymentdiv.hide()

const $cardnumdiv = $("<div></div>", {id: "cardnum_div", "class": "error_div"});
$cardnumdiv.html('<strong>Enter 13 - 16 digit card number</strong>')
$("#cc-num").after($cardnumdiv);
$cardnumdiv.hide()

const $zipdiv = $("<div></div>", {id: "zip_div", "class": "error_div"});
$zipdiv.html('<strong>Enter 5 Digit Zip Code</strong>')
$("#zip").after($zipdiv);
$zipdiv.hide()

const $zipdivempty = $("<div></div>", {id: "zip_div_empty", "class": "error_div"});
$zipdivempty.html('<strong>Zip is too long</strong>')
$("#zip").after($zipdivempty);
$zipdivempty.hide()

const $cvvdiv = $("<div></div>", {id: "cvv_div", "class": "error_div"});
$cvvdiv.html('<strong>Enter 3 digit CVV</strong>')
$("#cvv").after($cvvdiv);
$cvvdiv.hide()

const $cvvdivempty = $("<div></div>", {id: "cvv_div_empty", "class": "error_div"});
$cvvdivempty.html('<strong>CVV is too long</strong>')
$("#cvv").after($cvvdivempty);
$cvvdivempty.hide()

//Name Validation Function
function checkValidName(name) {
		if (name){
		return true;
	} else {
		return false;
	}
}
// Email Validation Function
function checkValidEmail(email){
		return  /^[^@]+@[^@.]+\.[a-z]+$/i.test(email)
}
// Checks 1 activity was selected
function checkValidTotal(){
	if (fullCost === 0) {
		return false;
		 } else {
		return true;
			}
		}
// Checks card number is 13-16 digits.
function checkcorrectCard() {
	const regExpCard = /^\d{13,16}$/
	const cardInput = $('#cc-num').val();
	return regExpCard.test(cardInput)
}
// Checks zip code is 5 digits.
function checkValidZip() {
	const regExpZip = /^\d{5}$/
	const zipInput = $('#zip').val();
	return regExpZip.test(zipInput)
}
// Checks CVV is 3 digits.
function checkcorrectCvv(){
	const regExpCvv = /^\d{3}$/
	const CvvInput = $('#cvv').val();
	return regExpCvv.test(CvvInput)
}


$('#cc-num').on('keyup', checkvalidPay)
$('#zip').on('keyup', checkvalidPay)
$('#cvv').on('keyup', checkvalidPay)
 
function checkvalidPay() {
	const val = $('#payment').val();
	if (!val){
		validPay = false;
	}
	if (val === "Credit Card") {
		if(checkcorrectCard() && checkValidZip() && checkcorrectCvv()) {
			validPay = true;
			}
		if (!checkcorrectCard()){
				correctCard = false;
				$('#cc-num').addClass('red')
				$cardnumdiv.show()
				validPay = false;
			} else {
				$cardnumdiv.hide();
				correctCard = true;
				$('#cc-num').removeClass('red')
			}
		if (!checkValidZip()){
				validZip = false;
				$('#zip').addClass('red')
				validPay = false;
					if($('#zip').val().length > 5) {
					$zipdivempty.show()
					$zipdiv.hide()
				} else {
					$zipdiv.show()
					$zipdivempty.hide()
				}
			} else {
				validZip = true;
				$zipdivempty.hide()
				$zipdiv.hide()
				$('#zip').removeClass('red')
			}
		if (!checkcorrectCvv()){
				correctCvv = false;
				$('#cvv').addClass('red')
				$cvvdiv.show();
				validPay = false;
					if($('#cvv').val().length > 3){
						$cvvdivempty.show();
						$cvvdiv.hide();
					} else {
						$cvvdivempty.hide();
						$cvvdiv.show();
					}
				} else {
				correctCvv = true;
				$('#cvv').removeClass('red')
				$cvvdiv.hide();
				$cvvdivempty.hide();
			}
		} else if( val === "PayPal" || val === "Bitcoin") {
			validPay = true;
		}
	}


// Alerts user of incorrect input
// Email input event listener
// Name input event listener
// Activities input event listener
function alertPayment(){
	if(validPay === false){
		$('#payment-info').addClass('red')
		$paymentdiv.show();
		} else {
		$('#payment-info').removeClass('red')
		$paymentdiv.hide();
		}
	}

$('#name').on('keyup', function(){
	const nameInput = $('#name').val()
 	if(checkValidName(nameInput)) {
 		$namediv.hide();
 		$('#name').removeClass('red')
 		return true;
 	} else {
 		$namediv.show();
 		$('#name').addClass('red')
 		return false;
 	}
})

$('#mail').on('keyup', function(){
	const mailInput = $('#mail').val()
 	if(checkValidEmail(mailInput)) {
 		$emaildiv.hide();
 		$emaildiv2.hide();
 		$('#mail').removeClass('red')
 		return true;
 	} else if (mailInput === ""){
 		$emaildiv.hide();
 		$emaildiv2.show();
 		$('#mail').addClass('red')
 	} else {
 		$emaildiv.show();
 		$emaildiv2.hide();
 		$('#mail').addClass('red')
 		return false;
 	}
})

$('.activities input').on('change', function(){
if(fullCost === 0){
	$activediv.show();
	$('.activities').addClass('red')
	} else {
	$activediv.hide();
	$('.activities').removeClass('red')
}
})

function checkValidity() {
	const nameInput = $('#name').val()
	if(!checkValidName(nameInput)){
		$namediv.show();
 		$('#name').addClass('red')
	} else if(checkValidName(nameInput)){
		$namediv.hide();
		$('#name').removeClass('red')
	}
	
	const mailInput = $('#mail').val()
	if(!checkValidEmail(mailInput)){
		$emaildiv.show();
 		$('#mail').addClass('red')
	} else if(checkValidEmail(mailInput)){
		$emaildiv.hide();
		$('#email').removeClass('red')
	}

	if(checkValidTotal()) {
		$activediv.hide();
		$('.activities').removeClass('red')
	} else {
		$activediv.show();
		$('.activities').addClass('red')
	}
	
	if(checkValidEmail(mailInput) && checkValidName(nameInput) && checkValidTotal()) {
		trueSubmt = true;
	} else {
		trueSubmt = false;
	}
	checkvalidPay()
	alertPayment()
	// checks if payment is valid and required fields are valid
	if(validPay === true && trueSubmt === true) {
		return true 
	} else {

		return false 
	}
}

$('button').click(checkValidity);