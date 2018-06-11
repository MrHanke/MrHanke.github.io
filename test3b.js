// JavaScript Document

// Model - Variable list
var currentOne = "1",
	currentBrand = "brand",
	currentModel = "model",
	currentPrice = "price",
	currentPic = "pic name",
	currentInterest = "interest",
	currentTerm	 = "term",
	currentSalesTax = "tax",
	whichOne = "1",
    carName= "name",
	carEngine = "Engine",
	carTrans = "Trans",
	carMiles ="Miles",
	timeHold = "0:00",
	carColor = "color",
    currentPremium=0,
	currentPreper=0,
	docFee=0,
	loadingFee=0,
	thatOne=0,
	oRate=0,
	cRate=0,
	eRate=0,
	cart=[],
	carCount = 0,
	grandTotal = 0,
	iTrack = 0,
	curPrice="1.00",
    TotCost = 0;

// initialize the page - read the XML, create the inventory list
$(document).on("pageinit", "#pageL", "#cart", function(){
	"use strict";
    $.ajax({
        url:"test.xml",
        cache:false,
        dataType:"xml",
        success: function(xml){
            $('#inventoryList').empty();
            $(xml).find('computer').each(function(){
                var info=
                    '<li data-id='+
                    $(this).find("ID").text()+
                    ' class="these"><a href=#page1><img src="images/'+
                    $(this).find("PromoImg").text()+
                    '" height="65"><h1>'+
                    $(this).find("CarName").text()+
                    '</h1><img src="images/'+
                    $(this).find("DisplayImg").text()+
                    '" height="165">' +
					'<p>Miles: '+
                    $(this).find("Miles").text()+
                    '</p><p>Transmition: '+
                    $(this).find("Transmition").text()+
					'</p><p>Engine: '+
                    $(this).find("Engine").text()+
					'</p><p> Ends on ' +
					$(this).find("EndText").text() +
					'</p><h2>Price: $'+
					$(this).find("price").text() +
					'</h2>'+
					'<p id="' +
					$(this).find("CarNameId").text() +
					'"></p>' +
                    '</a></li>';
			currentSalesTax=$(xml).find('standards').find("salesTax").text();
            $('#inventoryList').append(info).listview('refresh');
				
                    var thelink = $(this).find("AuctionEnd").text();
					
					var theName = $(this).find("CarNameId").text();

					var countDownDate = new Date(thelink).getTime();

					var x = setInterval(function () {

						// Get todays date and time
						var now = new Date().getTime();

						// Find the distance between now an the count down date
						var distance = countDownDate - now;

						// Time calculations for days, hours, minutes and seconds
						var days = Math.floor(distance / (1000 * 60 * 60 * 24));
						var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
						var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
						var seconds = Math.floor((distance % (1000 * 60)) / 1000);

						// output correct countdown
						if (days > 0) {
							document.getElementById(theName).innerHTML = days + "d " + hours + "h ";
							document.getElementById(theName).style.textDecoration = "underline";
						} else if (hours >= 9) {
							document.getElementById(theName).innerHTML = hours + "h " +
							minutes + "m ";
							document.getElementById(theName).style.fontWeight = "bold";
						} else if (hours > 1) {
							document.getElementById(theName).innerHTML = hours + "h " +
							minutes + "m ";
							document.getElementById(theName).style.fontWeight = "bold";
							document.getElementById(theName).style.color = "#ff0000";
						} else if (minutes > 30) {
							document.getElementById(theName).innerHTML = minutes + "m ";
							document.getElementById(theName).style.fontWeight = "bold";
							document.getElementById(theName).style.color = "#ff0000";
						} else if (minutes > 1) {
							document.getElementById(theName).innerHTML = minutes + "m " + seconds + "s ";
							document.getElementById(theName).style.fontWeight = "bold";
							document.getElementById(theName).style.color = "#ff0000";
						} else if (minutes > 0) {
							document.getElementById(theName).innerHTML = seconds + "s ";
							document.getElementById(theName).style.fontWeight = "bold";
							document.getElementById(theName).style.color = "#ff0000";
						} else  {
							clearInterval(x);
							document.getElementById(theName).innerHTML = "This Auction has Expired";
						}
					}, 1000);
            });
        }
		
    });


// handle a click on the listview - Populate the next page with the correct information	
$("#inventoryList").on("click","li",function(){
	whichOne=($(this).attr("data-id"));
	$.ajax({
		url:"test.xml",
		cache:false,
		dataType:"xml",
		success: function(xml1){
			currentPremium=$(xml1).find('standards').find("basePremium").text();
			currentSalesTax=$(xml1).find('standards').find("salesTax").text();
			currentPreper=$(xml1).find('standards').find("premiumPerc").text();
			docFee=$(xml1).find('standards').find("documentFee").text();
			loadingFee=$(xml1).find('standards').find("loadFee").text();
			oRate=$(xml1).find('standards').find("openRate").text();
			cRate=$(xml1).find('standards').find("closedRate").text();
			eRate=$(xml1).find('standards').find("enclosedRate").text();
			
			$(xml1).find('computer').each(function(){
				currentOne=($(this).find("ID").text());
				if(currentOne === whichOne)
				{
				carName=($(this).find("CarName").text());
				carEngine=($(this).find("Engine").text());
				carTrans=($(this).find("Transmition").text());
				carMiles=($(this).find("Miles").text());
				carColor=($(this).find("Color").text());
				currentPrice=($(this).find("price").text());
				currentPic=($(this).find("DisplayImg").text());
				currentTerm=($(this).find("term").text());
				currentBrand="#"+($(this).find("CarNameId").text());
				
				$('#theBrand').text(carName);
				$('#footerText').text(carName);
				$('#theEngine').text(carEngine);
				$('#theTrans').text(carTrans);
				$('#theMiles').text(carMiles);
				$('#theColor').text(carColor);
				timeHold = ($(currentBrand).text());
				$('#timeLeft').text(timeHold);
				$('#theModel').text(currentModel);
				$('#thePrice').text(currentPrice);
				$('#theCost').text(currentPrice);
				$('#thePic').html('<img src="images/'+currentPic+'" width="310" height="200" />');
				$('#theSmallPic').html('<img src="images/'+currentPic+'" width="150" height="112" />');
				$('#B').val(currentPrice);
				$('#T').val(currentSalesTax);
				$('#D').val(docFee);
				$('#CompName').text(carName);
				}
			});
		}
		
	});
});
$("#cartButton").click(function(){
	thatOne=whichOne;
	curPrice= currentPrice;
	var  newCar = new TheCar(thatOne,carName,currentPic,curPrice);
	if (localStorage && localStorage.getItem('cart')){
		cart = JSON.parse(localStorage.getItem('cart'));
		for(var i=0; i<cart.length;i++){
			if((cart[i].ida=== thatOne)){
				return;
			}
		}
		cart.push(newCar);
		localStorage.setItem('cart', JSON.stringify(cart));
		window.cart = cart;
		saveIt(cart);
		theCart();
		return;
	}
});
function TheCar(ida,name,picture,price){
	this.ida = ida;
	this.name = name;
	this.picture = picture;
	this.price = price;
}

	
function theCart(){
	grandTotal = 0;
	var aCart = JSON.parse(localStorage.getItem('cart'));
		$('#myCart').empty();
		//cart = JSON.parse(localStorage.getItem('cart'));
		for(var i=0; i<aCart.length;i++){
	    iTrack = i;
	var stuff =
		'<div class="cartitem" id="C'+
		aCart[i].ida+
		'"><h2>'+
		aCart[i].name+
	    '</h2><img src="images/'+
		aCart[i].picture+
		'" height="150">'+
		'<p> Cost: $'+
		aCart[i].price+
		'</p><button type="button" class="delIt" value="'+iTrack+'" onclick="deleteCar(this.value)" >Remove from Cart</button>'+
		'</div>';
		var oldTotal = Number(grandTotal);
		grandTotal = oldTotal + Number(aCart[i].price);
		$('#myCart').append(stuff);
}
	
	if (aCart.length === 0 || isNaN(aCart.length)){
		$('#myCart').empty();
		var empt = '<div class="cartitem"><h1>Your Shopping Cart is Currently Empty</h1></div>';
		$('#myCart').append(empt);
		$('#checkOut').hide();
	}
	if (aCart.length > 0){
	var these =
		'<h2> The total before expenses comes out to $'+
		grandTotal+
		".</h2>";
	$('#myCart').append(these);
	$('#checkOut').show();
	return grandTotal;
	}
	return;
}	
function deleteCar(value){
	var that = value;
	cart = JSON.parse(localStorage.getItem('cart'));
	cart.splice(that,1);
	localStorage.setItem('cart', JSON.stringify(cart));
	window.cart = cart;
	saveIt(cart);
	theCart();
}

function checkIt(){
	currentInterest = JSON.parse(localStorage.getItem('cart'));
	carCount = currentInterest.length;
	$('#B').val(grandTotal);
	$('#D').val(docFee);
	if(carCount > 1){
	$('#CompName').text(carCount+" Cars");
	}
	else{
		$('#CompName').text("the car");
	}
		$('#theSmallPic').html("<h3>Car List:</h3><br>");
	for(var i=0; i<currentInterest.length;i++){
		var junk =
			currentInterest[i].name+
			" at a price of $"+
			currentInterest[i].price+
			"<br>";
		$('#theSmallPic').append(junk);
	}
	$('#theSmallPic').append("Sub Total (Before Taxes and Fees): $"+grandTotal);
	calcIt();
}

$(document).on("pageinit", "#cart", function(){
	theCart();

});
// Calculate the total payments - called by entering the #page2 or clicking #calcButton
function calcIt(){
	var DocFee = ($('#D').val());
	var Bid = parseFloat($('#B').val());
	var Premium = 200;
	var TaxRate = currentSalesTax;
	var Taxes = TaxRate * Bid;
	$('#T').val(Taxes.toFixed(2));
	if (Bid > 10000){
		Premium = Bid * currentPreper;
		$('#P').val(Premium.toFixed(2));
	}
	else{
		Premium = 200;
		$('#P').val(Premium);
	}
	var Prems = Math.round((Premium + Taxes) * 100)/100;
	TotCost = (Math.round((Premium + Bid + Taxes) * 100)/100)+30;
	if (isNaN(Bid) || Bid===""){	
	$('#Answer').html('Please enter your bid in the form of a number into the bid input box to see the total cost to place your bid');
	}
	else if (grandTotal === Bid){
		$('#Answer').html('<h3>At $'+Bid+' for the car(s), your premium and taxes will be $'+Prems+' with a $'+DocFee+' document fee. The total cost of getting the car(s) today will come out to $'+TotCost+' <h3>');
	}
	else{
		$('#Answer').html('<h3>At $'+Bid+' for this car, your premium and taxes will be $'+Prems+' with a $'+DocFee+' document fee. The total cost of getting this car today will come out to $'+TotCost+' <h3>');
	}
	$('#theCost').html(TotCost);
	return TotCost;
	}
window.deleteCar= deleteCar;
window.calcIt = calcIt;
window.grandTotal = grandTotal;
$('#costButton').click(calcIt);
$('#checkOut').click(checkIt);
});
$(document).on("pageinit", "#cart", function(){ 
	"use strict";
	grandTotal = 0;
	var aCart = JSON.parse(localStorage.getItem('cart'));
		$('#myCart').empty();
		//cart = JSON.parse(localStorage.getItem('cart'));
		for(var i=0; i<aCart.length;i++){
	    iTrack = i;
	var stuff =
		'<div class="cartitem" id="C'+
		aCart[i].ida+
		'"><h2>'+
		aCart[i].name+
	    '</h2><img src="images/'+
		aCart[i].picture+
		'" height="150">'+
		'<p> Cost: $'+
		aCart[i].price+
		'</p><button type="button" class="delIt" value="'+iTrack+'" onclick="deleteCar(this.value)" >Remove from Cart</button>'+
		'</div>';
		var oldTotal = Number(grandTotal);
		grandTotal = oldTotal + Number(aCart[i].price);
		$('#myCart').append(stuff);
}
	
	if (aCart.length === 0 || isNaN(aCart.length)){
		$('#myCart').empty();
		var empt = '<div class="cartitem"><h1>Your Shopping Cart is Currently Empty</h1></div>';
		$('#myCart').append(empt);
		$('#checkOut').hide();
	}
	if (aCart.length > 0){
	var these =
		'<h2> The total before expenses comes out to $'+
		grandTotal+
		".</h2>";
	$('#myCart').append(these);
	$('#checkOut').show();
	return grandTotal;
	}
	return;
});
			   