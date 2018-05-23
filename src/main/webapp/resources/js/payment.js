var vatRateResult = 0;
var vatNanVat = "";

$(document).ready(function() {		
			findTypePayment();
			findBank();
			findBankNo();
			summaryTax();
			hideShowdat();
			disBtn();
			autoSelect();
			document.getElementById("taxOnly").readOnly = true;
			
//			document.getElementById("radioButton").disabled = true;
//			document.getElementById("radioButton1").disabled = true;
//			document.getElementById("radioButton2").disabled = true;
//			document.getElementById("radioButton3").disabled = true;
//			document.getElementById("radioButtons").disabled = true;
			$("#change").val(parseFloat(0).toFixed(2));
			$("#balanceSumShow").val(parseFloat(0).toFixed(2));
			$("#balanceSummaryShow").val(parseFloat(0).toFixed(2));
			
			$("#balanceSummary").keyup(function() {
			    // keydown code
				var result = FormatMoneyShowToNumber($("#balanceSummary").val());
				var bable = parseFloat(result.toFixed(2).replace(",", ""));
				if(bable < 0 || !bable){
					bable = 0;
				}
//				if(bal == ""){
//					bal = parseFloat(0).toFixed(2);
//				}
//				var result = parseFloat(bal.replace(",", ""));
				var vatq =0;
				if(vatNanVat == "NON VAT"){
					vatq = 0;
				}else{
					vatq = $("#vatrate").val();
				}
				
				var vatRQ = parseFloat(parseFloat(vatq).toFixed(2).replace(",", ""));
				var beforeVat = parseFloat(0);
				var vat = parseFloat(0);
				var summary = parseFloat(0);
				var summaryT = parseFloat(0);
				var vatCo = parseFloat(107);
				var vatRq = parseFloat(0);
				
				summaryT = parseFloat(bable * parseFloat(vatRQ));
				vat = parseFloat(summaryT / vatCo);
				
				
				beforeVat = parseFloat(bable - vat);
				summary = parseFloat(beforeVat + vat);
				
				
				$("#balanceBeforeTax").val(beforeVat.toFixed(2));
				$("#vat").val(vat.toFixed(2));
				$("#balanceOfTax").val(summary.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"));
//				$("#balanceOfTaxPrice").val(summary.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#balanceBeforeTaxs").val(beforeVat.toFixed(2));
				$("#vats").val(vat.toFixed(2));
				
				$("#balanceBeforeTaxsShow").val(beforeVat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#vatsShow").val(vat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#balanceOfTaxs").val(bable.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#balanceOfTaxsShow").val(bable.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				// Summary
				$("#balanceSummarys").val( parseFloat(bable).toFixed(2));
				$("#balanceSummaryShow").val(bable.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				
				
				$("#moneyTran").val(bable.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#creditPrice").val(bable.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#moneyCheck").val(bable.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				
				
				
//				$("#balanceBeforeTaxs").val(beforeVat.toFixed(2));
//				$("#vats").val(vat.toFixed(2));
				var balanOfTax = $("#balanceOfTaxPrice").val();
				if(balanOfTax == ""){
					balanOfTax = parseFloat(0);
				}else{
					balanOfTax = FormatMoneyShowToNumber(balanOfTax);
				}
				
				
				if(balanOfTax < bable){
//					alert("ยอดที่ต้องชำระมากกว่า ยอดใบแจ้งหนี้ กรุณากรอกใหม่");
					$("#sBalanceSummary").show();
					document.getElementById("radioButton").value = "";
		        		document.getElementById("radioButtons").value = "";
					return $("#balanceSummary").focus();
				}else{
					$("#sBalanceSummary").hide();
				}
				vatAmount();
			});
			  $('#radioButton').change(function() {
				  var balance = $("#balanceSummary").val();
				  $("#messError").hide();
				  if(balance == "" || balance == "0.00"){
					  document.getElementById("radioButton").checked = false;
					  alert("คุณต้องชำระยอดเงินก่อนใส่ส่วนลด");
					 return $("#balanceSummary").focus();
				  }
				  $("#mi-modal").modal('show');
				  $("#modal-btn-si").on("click", function(){
					  var dataSend = { "userName": $('#userName').val(), "password": $('#password').val() };
					  $.ajax({
		      		        type: "POST",
		      		        url: "/cancelPayment/checkAuthentication",
		      		        data: JSON.stringify(dataSend),
		      		        dataType: "json",
		      		        async: false,
		      		        contentType: "application/json; charset=utf-8",
		      		        success: function (res) {
		      		        	if(res){
		      		        		document.getElementById("taxOnly").readOnly = false;
		      		        		document.getElementById("radioButton").disabled = true;
		      		        		document.getElementById("radioButtons").disabled = true;
		      		        		document.getElementById("radioButton").checked = true;
		      		        		$("#mi-modal").modal('hide');
		      		        	}else{
		      		        		document.getElementById("radioButton").checked = false;
		      		        		$("#messError").show();
		      		        	}
		      		        	
		      		        }
					  });
					    
					  });
					  
					  $("#modal-btn-no").on("click", function(){
//					    callback(false);
					    $("#mi-modal").modal('hide');
					 });
					  $("input:radio").removeAttr("checked");
			    });
			  $('#radioButtons').change(function() {
				  var balance = $("#balanceSummary").val();
				  $("#messError").hide();
				  if(balance == "" || balance == "0.00"){
					  document.getElementById("radioButtons").checked = false;
					  alert("คุณต้องชำระยอดเงินก่อนใส่ส่วนลด");
					 return $("#balanceSummary").focus();
				  }
				  $("#mi-modal").modal('show');
				  $("#modal-btn-si").on("click", function(){
					  var dataSend = { "userName": $('#userName').val(), "password": $('#password').val() };
					  $.ajax({
		      		        type: "POST",
		      		        url: "/cancelPayment/checkAuthentication",
		      		        data: JSON.stringify(dataSend),
		      		        dataType: "json",
		      		        async: false,
		      		        contentType: "application/json; charset=utf-8",
		      		        success: function (res) {
		      		        	if(res){
		      		        		document.getElementById("taxOnly").readOnly = false;
		      		        		document.getElementById("radioButton").disabled = true;
		      		        		document.getElementById("radioButtons").disabled = true;
		      		        		document.getElementById("radioButtons").checked = true;
		      		        		$("#mi-modal").modal('hide');
		      		        	}else{
		      		        		 document.getElementById("radioButtons").checked = false;
		      		        		$("#messError").show();
		      		        	}
		      		        	
		      		        }
					  });
					    
					  });
					  
					  $("#modal-btn-no").on("click", function(){
//					    callback(false);
					    $("#mi-modal").modal('hide');
					 });
					  $("input:radio").removeAttr("checked");
			    });
			  
			  

		});

function taxDiscount(){
	var result = FormatMoneyShowToNumber($("#taxOnly").val());
	var bable = parseFloat(result.toFixed(2).replace(",", ""));
	var bas = $("#balanceSummarys").val();
	var balance = parseFloat(bas.replace(",", ""));
	
	var sq = $("#summaryTax").val();
	var summaryTax = parseFloat(sq.replace(",", ""));
	if(bable < 0 || !bable){
		bable = parseFloat(0);
	}
	if(bable > balance){
		alert("คุณกรอกจำนวนผิดพลาด กรุณากรอกใหม่");
		$("#taxOnly").val(0);
		return $("#taxOnly").focus();
	}
	
	
	var balanSum = FormatMoneyShowToNumber($("#balanceSummary").val());
	var balanSumShow = FormatMoneyShowToNumber($("#balanceSummaryShow").val());
	var total = parseFloat(balanSumShow) - parseFloat(summaryTax *-1);
	balance =	parseFloat(balance) - parseFloat(bable);
	$("#balanceSummarys").val(parseFloat(balance).toFixed(2));
//	$("#balanceSummaryShow").val(balance.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyTran").val(balance.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#creditPrice").val(balance.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyCheck").val(balance.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
};
function disBtn(){
	var table = document.getElementById("showTotalPriceTable");
	var rowLength = table.rows.length;
	var money = $("#moneyTran").val();
	if(money == ""){
		money = parseFloat(0);
	}
	if(rowLength > 1){

		
		$('button#submitFormPayment').prop('disabled', false);
	}else{
		$('button#submitFormPayment').prop('disabled', true);
	}
}

function balanceSum(){
	var balan = $("#balanceSum").val();
	var balanceSummary = $("#balanceSummarys").val();
	
	
	if(balan == ""){
		balan = parseFloat(0);
	}
	if(balanceSummary == ""){
		balanceSummary = parseFloat(0);
	}
	
//	var total = parseFloat(FormatMoneyShowToNumber(balanceSummary) - FormatMoneyShowToNumber(balan));
	$("#moneyTran").val(FormatMoneyShowToNumber(balanceSummary).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#creditPrice").val(FormatMoneyShowToNumber(balanceSummary).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyCheck").val(FormatMoneyShowToNumber(balanceSummary).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	
	
	
}
function DeletebalanceSum(){
	var balan = $("#balanceSum").val();
	var balanceSummary = $("#balanceSummary").val();
	
	
	if(balan == ""){
		balan = parseFloat(0);
	}
	if(balanceSummary == ""){
		balanceSummary = parseFloat(0);
	}
	
	var total = parseFloat(FormatMoneyShowToNumber(balanceSummary) - FormatMoneyShowToNumber(balan));
	
	$("#moneyTran").val(total.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#creditPrice").val(total.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyCheck").val(total.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	
	
	
}


	
function findvatAmount(){
	checkNonVat();
	var result = $("#balanceSummary").val();
	
	
	if(result == ""){
		return;
	}
	
	var vatq = 0;
	if(vatNanVat == "NON VAT"){
		vatq = vatRateResult;
	}else{
		vatq = $("#vatrate").val();
	}
	
	var bal = $("#balanceSummary").val();
	var result = parseFloat(bal.replace(",", ""));
	
	var vatRQ = parseFloat(parseFloat(vatq).toFixed(2).replace(",", ""));
	var beforeVat = parseFloat(0);
	var vat = parseFloat(0);
	var summary = parseFloat(0);
	var summaryT = parseFloat(0);
	var vatCo = parseFloat(107);
	var vatRq = parseFloat(0);
	
	summaryT = parseFloat(result * parseFloat(vatRQ));
	vat = parseFloat(summaryT / vatCo);
	
	
	beforeVat = parseFloat(result - vat);
	summary = parseFloat(beforeVat + vat);
	
	$("#balanceBeforeTax").val(beforeVat.toFixed(2));
	$("#vat").val(vat.toFixed(2));
	$("#balanceOfTax").val(summary.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	// Summary
};

function datePriod(){
	var dateS = document.getElementById('startupDate');
	var dateE = document.getElementById('endDate');

	var res = dateS.value.split("-");
	var res1 = dateE.value.split("-");
	
	var dateSt = res[0]+res[1]+res[2];
	var dateEn = res1[0]+res1[1]+res1[2];
	
	if(parseFloat(dateSt) > parseFloat(dateEn)){
		 $("#sstartupDate1").show();
		 $("#sendDate1").show();
	}else{
		 $("#sstartupDate1").hide();
		 $("#sendDate1").hide();
	}
	
}

function vatAmount(){
	var result = $("#balanceSummarys").val();
	if($("#balanceSummarys").val() !== ''){
		result = FormatMoneyShowToNumber($("#balanceSummarys").val());
	}
	var vaq = $("#vatrate").val();
	var vatRQ = parseFloat(parseFloat(vaq).toFixed(2).replace(",", ""));
	var beforeVat = parseFloat(0);
	var vat = parseFloat(0);
	var summary = parseFloat(0);
	var summaryT = parseFloat(0);
	var vatCo = parseFloat(107);
	var vatRq = parseFloat(0);
	
	summaryT = parseFloat(result * parseFloat(vatRQ));
	vat = parseFloat(summaryT / vatCo);
	
	
	beforeVat = parseFloat(result - vat);
	summary = parseFloat(beforeVat + vat);
	
	//$("#balanceOfTaxs").val(summary.toFixed(2));
	$("#beforeSale").val(beforeVat.toFixed(2));
	$("#beforeSaleShow").val(beforeVat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	//$("#balanceOfTaxsShow").val(summary.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	
	$("#balanceBeforeTaxs").val(beforeVat.toFixed(2));
	$("#vats").val(vat.toFixed(2));
	
//	$("#balanceBeforeTaxsShow").val(beforeVat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//	$("#vatsShow").val(vat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
};

function hideShowdat(){
	 $("#sCustName").hide();
	 $("#suserGroup").hide();
	 $("#sdebtCollection").hide();
	 $("#sinvoiceNo").hide();
	 //$("#sserviceNo").hide();
	 $("#sstartupDate").hide();
	 $("#sendDate").hide();
	 $("#sdeadlines").hide();
	 $("#sinvoiceDate").hide(); 
	 $("#sdocDed").hide();
	 $("#smoneyDed").hide();
	 $("#saddRow").hide();
	 $("#saddRow1").hide();
	 $("#addRowShow").hide();
	 $("#addRowShow1").hide();
	 $("#sstartupDate1").hide();
	 $("#sendDate1").hide();
	 $("#sBalanceSummary").hide();
	 $("#sCustNo").hide();
	 $("#messError").hide();
	 
	 
}
function submitForm(){
	var result = $("#balanceSummarys").val();
	if(parseFloat(result) > 0){
		
		alert("ยอดที่ต้องชำระยังจ่ายไม่ครบ กรุณาตรวจสอบใหม่");
		
		return $("#balanceSummary").focus();
	}
	hideShowdat();
	var radioButtons = document.getElementsByName("radioDed");
	var radioResult = "";
	var invoiceNo = $("#invoiceNo").val();
	var deductible = [];
	var  resultDeductible = [];
	var totalPrice = [];
	var  resultTotalPrice = [];
	
	// get radio 
	for (var x = 0; x < radioButtons.length; x++) {
		if (radioButtons[x].checked) {
			radioResult = radioButtons[x].value;
		}
	}
//	ภาษี หัก ณ ที่จ่าย
	var table = document.getElementById("sumDeductibleTable");
	var rowLength = table.rows.length;
	
	for (var i = 1; i < rowLength; i++) {
		deductible = [];
		var oCells = table.rows.item(i).cells;
		for (var fs = 0; fs < oCells.length; fs++) {
			
			deductible.push(oCells[fs].innerHTML);
		}
		resultDeductible.push(deductible);

	}
	
	// ตาราง สรุป ยอดเงิน
	var tableTotalPrice = document.getElementById("sumTotalPriceTable");
	var rowLengths = tableTotalPrice.rows.length;
	
	for (var y = 1; y < rowLengths; y++) {
		totalPrice = [];
		var oCells = tableTotalPrice.rows.item(y).cells;
		for (var fs = 0; fs < oCells.length; fs++) {
			
			totalPrice.push(oCells[fs].innerHTML);
		}
		resultTotalPrice.push(totalPrice);

	}
	
	// list ภาษี หัก ณ ที่จ่าย
	var listpaymentTaxQ = [];
	var listpaymentTaxRQ = [];
	
	for (var a = 0; a < resultDeductible.length; a++) {
		listpaymentTaxQ = []
		listpaymentTaxQ = {"invoiceNo" : resultDeductible[a][1],
			"docDed" : resultDeductible[a][2],
			"radioDed" : resultDeductible[a][3],
			"moneyDed" : resultDeductible[a][4].replace(",", "")
		}
		listpaymentTaxRQ.push(listpaymentTaxQ);
	}
	
	// list TranPrice
	
	var listpaymentTranPriceQ = [];
	var listpaymentTranPriceRQ = [];
	
	for (var b = 0; b < resultTotalPrice.length; b++) {
		listpaymentTranPriceQ = [];
		if(resultTotalPrice[b][1] == "CC"){
			listpaymentTranPriceQ = {
			"typePayment" : resultTotalPrice[b][1],
			"moneyTran" : resultTotalPrice[b][2].replace(",", "")
			}
		}else if (resultTotalPrice[b][1] == "CD"){
			listpaymentTranPriceQ = {
					"typePayment" : resultTotalPrice[b][1],
					"creditType" : resultTotalPrice[b][2],
					"creditNo" : resultTotalPrice[b][3],
					"edcType" : resultTotalPrice[b][4],
					"creditPrice" :resultTotalPrice[b][5].replace(",", "")
					}
		}else if (resultTotalPrice[b][1] == "CH"){
			listpaymentTranPriceQ = {
					"typePayment" : resultTotalPrice[b][1],
					"bankNo" : resultTotalPrice[b][2],
					"bankName" : resultTotalPrice[b][3],
					"branchCheck" : resultTotalPrice[b][4],
					"checkNo" : resultTotalPrice[b][5],
					"dateCheck" : resultTotalPrice[b][6],
					"moneyCheck" : resultTotalPrice[b][7].replace(",", "")
				}
		}
		
		listpaymentTranPriceRQ.push(listpaymentTranPriceQ);
	}
	
	
	if($("#custNo").val() == ""){
		$("#sCustNo").show();
		return $("#custNo").focus();
	}



	if($("#userGroup").val() == ""){
		$("#suserGroup").show();
		return $("#userGroup").focus();
	}
	if($("#debtCollection").val() == ""){
		$("#sdebtCollection").show();
		return $("#debtCollection").focus();
	}
	if($("#invoiceNo").val() == ""){
		$("#sinvoiceNo").show();
		return $("#invoiceNo").focus();
	}
//	if($("#serviceNo").val() == ""){
//		$("#sserviceNo").show();
//		return $("#serviceNo").focus();
//	}
	if($("#startupDate").val() == ""){
		$("#sstartupDate").show();
		return $("#startupDate").focus();
	}
	if($("#endDate").val() == ""){
		$("#sendDate").show();
		return $("#endDate").focus();
	}
	if($("#deadlines").val() == ""){
		$("#sdeadlines").show();
		return $("#deadlines").focus();
	}
	if($("#invoiceDate").val() == ""){
		$("#sinvoiceDate").show();
		return $("#invoiceDate").focus();
	}
	
	var dateS = document.getElementById('startupDate');
	var dateE = document.getElementById('endDate');
	var res = dateS.value.split("-");
	var res1 = dateE.value.split("-");
	var dateSt = res[0]+res[1]+res[2];
	var dateEn = res1[0]+res1[1]+res1[2];
	if(parseFloat(dateSt) > parseFloat(dateEn)){
			 $("#sstartupDate1").show();
			 $("#sendDate1").show();
		return $("#startupDate").focus();
	}
	var vatrate = 0;
	if(vatNanVat == "NON VAT"){
		$("#vatrate").val(parseFloat(0));
	}

	var dataSend = {
			 "custName":$("#custName").val() ,
			 "custNo":$("#custNo").val() ,
			 "taxId":$("#taxId").val() ,
			 "documentNo" : $("#docDed").val(),
			 "custAddress":$("#custAddress").val() ,
			 "custBrach":$("#custBrach").val() ,
			 "userGroup":$("#userGroup").val() ,
			 "debtCollection":$("#debtCollection").val() ,
			 "invoiceNo":$("#invoiceNo").val() ,
			 "serviceNo":$("#serviceNo").val() ,
			 "startupDate":$("#startupDate").val() ,
			 "endDate":$("#endDate").val() ,
			 "deadlines":$("#deadlines").val() ,
			 "invoiceDate":$("#invoiceDate").val() ,
			 "userNames":$("#userNames").val() ,
			 "taxOnly":$("#taxOnly").val() ,
			 "vatrate":$("#vatrate").val() ,
			 "chang":parseFloat($("#change").val().replace(",", "")) ,
			 "balanceBeforeTax": parseFloat($("#balanceBeforeTax").val().replace(",", "")) ,
			 "vat": parseFloat($("#vat").val().replace(",", "")) ,
			 "balanceOfTax": parseFloat($("#balanceOfTax").val().replace(",", "")) ,
			 "balanceSummary": parseFloat($("#balanceSummary").val().replace(",", "")),
			 "balanceBeforeTaxs":  parseFloat($("#balanceBeforeTaxs").val().replace(",", ""))  ,
			 "vats": parseFloat($("#vats").val().replace(",", ""))  ,
			 "balanceOfTaxs": parseFloat($("#balanceOfTaxs").val().replace(",", "")) ,
			 "balanceSummarys": parseFloat($("#balanceSummarys").val().replace(",", "")) ,
			 "balanceSum": parseFloat($("#balanceSum").val().replace(",", "")) ,
			 "amountInvoice": parseFloat($("#balanceOfTaxPrice").val().replace(",", "")) ,
			 "nonVat" :vatNanVat,
			 "remark":$("#remark").val() ,
			 "summaryTax": parseFloat($("#summaryTax").val().replace(",", "")) ,
			 "paymentTax":listpaymentTaxRQ  ,
			 "paymentTranPrice" :listpaymentTranPriceRQ	 
	}
		 
	$.ajax({
        type: "POST",
        url: "paymentService",
        data: JSON.stringify(dataSend),
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (res) {
        	if(res > 0){
        		 window.location.href = "paymentSuccess?idUser=" +res;
        	}
        }
	})
		
};
function findTypePayment() {
	var result = document.getElementById("typePayment").value;
	var credit = document.getElementById("credit");
	var check = document.getElementById("check");
	var money = document.getElementById("money");
	if (result == 'credit') {
		credit.style.display = "block";
		check.style.display = "none";
		money.style.display = "none";
	} else if (result == 'money') {
		credit.style.display = "none";
		check.style.display = "none";
		money.style.display = "block";
	} else if (result == 'check') {
		credit.style.display = "none";
		check.style.display = "block";
		money.style.display = "none";
	}
}

function autoSelect(){
	var event = $("#userGroup").val();
	
	if(event == "1"){
		// 69 ทริ
		radiobtn = document.getElementById("radioDedCC");
		radiobtn.checked = true;
	}else if(event == "2"){
		radiobtns = document.getElementById("radioDedCD");
		radiobtns.checked = true;
	}else if(event == "3"){
		radiobtns = document.getElementById("radioDedCT");
		radiobtns.checked = true;
	}else{
		radiobtns = document.getElementById("radioDedCD");
		radiobtns.checked = true;
	}
}

function findBank() {
	var bankNo = document.getElementById("bankNo").value;
		$('#bankName').val(bankNo);
		$('#bankNo').val(bankNo);
}

function findBankNo() {
	var bankName = document.getElementById("bankName").value;
		$('#bankNo').val(bankName);
		$('#bankName').val(bankName);

}

function addRow() {

	var balanceOfTaxPrice = document.getElementById("balanceOfTaxPrice").value;
	var balanceSummary = document.getElementById("balanceSummary").value;
	var balance = parseFloat(balanceOfTaxPrice.replace(",", ""));
	var summary =  parseFloat(balanceSummary.replace(",", ""));
	if(balance < summary){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระให้ถูกต้อง");
//		`$("#sBalanceSummary").hide();
		return $("#balanceSummary").focus();
	}
	hideShowdat();
	var sq = $("#summaryTax").val();
	var basu = $("#balanceSummarys").val();
	var branSum = parseFloat(basu.replace(",", ""));
	var summaTax = parseFloat(sq.replace(",", ""));
	var table = document.getElementById("deductibleTable").rows.length;
	var radioButtons = document.getElementsByName("radioDed");
	var radioResult = "";
	var invoiceNo = $("#invoiceNo").val();
	for (var x = 0; x < radioButtons.length; x++) {
		if (radioButtons[x].checked) {
			radioResult = radioButtons[x].value;
			
			if(radioResult == "01"){
				radioResult = "69 ทวิ";
			}else if(radioResult =="02"){
				radioResult = "3 เตรส";
			}else if(radioResult == "03"){
				radioResult = "69 ตรี";
			}
		}
	}
	var docDed = $("#docDed").val();
	var dmoney = $("#moneyDed").val();
	if(invoiceNo == ""){
			$("#sinvoiceNo").show();
		return  $("#invoiceNo").focus();
	}
	if(dmoney == ""){
		$("#smoneyDed").show();
		return $("#moneyDed").focus();
	}
	if(branSum == ""){
		branSum = parseFloat(0);
	}

	
	var moneyDed = parseFloat(dmoney.replace(",", ""));
	
	var plus = parseFloat(parseFloat(summaTax) + parseFloat(moneyDed)) ;
	if(plus > parseFloat(branSum)){
		alert("จำนวนเงินเกินจำนวนที่ต้องชำระ กรุณาตรวจสอบข้อมูลใหม่ ");
		return $("#moneyDed").focus();
	}
	var count = 1;
	
	for (count; count < table; count++) {
		count + table;
	}

	var markup = "<tr><td>"	+ tdAutoNumber()	+ "</td><td>"+ invoiceNo+ "</td><td>"+ docDed+ "</td><td>"	+ radioResult+ "</td><td>"+ "-"+moneyDed.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</td><td><a onclick='myDeleteFunction("+  tdAutoNumber()+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";

	$("#deductibleTable").find('tbody').append(markup);
//	var moneyDed = $("#moneyDed").val("");
};

function myDeleteFunction(count) {
	var table = document.getElementById("deductibleTable");
	if (table.rows.length > 0) {
		for (var i = 1; i <= table.rows.length; i++) {
			if (count == i) {
				table.deleteRow(parseFloat(count));
			}
		}
	}
	replaseIndexTax(table);

}
function tdAutoNumber() {
    var table = document.getElementById("deductibleTable");
    var txt = "";
    var i;
    for (i = 0; i < table.rows.length;i++) {
        txt = table.rows.length;
    }
    return txt;
}
function myDeleteDed(count) {
	var bas = $("#balanceSummarys").val();
	var balance = parseFloat(bas.replace(",", ""));
	var tableDed = document.getElementById("showDeductibleTable");
	var table = document.getElementById("sumDeductibleTable");
	var erq = $("#balanceSummary").val();
	var result = parseFloat(erq.replace(",", ""));
	var st = $("#summaryTax").val();
	var summaryTax = parseFloat(st.replace(",", ""));
	var summaryTa = parseFloat(0);


	if (table.rows.length > 0) {
		for (var i = 1; i < tableDed.rows.length; i++) {


			if (count == i) {
				var oCells = table.rows.item(i).cells;
				var total = parseFloat(oCells[4].innerHTML.replace(",", ""));
				var balances =	parseFloat(parseFloat(balance) + parseFloat(total *-1));
				if(balances < result){
					//balance = result;
					$("#change").val(parseFloat(0).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				}
				
				
				$("#balanceSummarys").val(balances.toFixed(2));
				//$("#balanceSummaryShow").val(balance.toFixed(2));
				removeTax();
				vatAmount();
				
				tableDed.deleteRow(count);
				table.deleteRow(count);
				
			}
		}
	}
	replaseIndexSumTax(tableDed);
	//replaseIndexSumTax(tableDed);

}

function addDataTableDed() {
	
	if($("#balanceSummarys").val() == ""){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ ");
	return $("#balanceSummarys").focus();
	}
	
	var oTable = document.getElementById('deductibleTable');
	var tableDed = document.getElementById("showDeductibleTable");
	var result = [];
//	var deq = $("#deduction").val();
//	var deduction = parseFloat(deq.replace(",", ""));
	var rowLength = oTable.rows.length;
	var number = parseFloat(tableDed.rows.length - parseFloat(1));
	var bas = $("#balanceSummarys").val();
	var balance = parseFloat(bas.replace(",", ""));
	var basu = $("#balanceSummarys").val();
	var branSum = parseFloat(basu.replace(",", ""));
	var sq = $("#summaryTax").val();
	var summaTax = parseFloat(sq.replace(",", ""));
	for (var i = parseFloat(1); i < rowLength; i++) {
		var oCells = oTable.rows.item(i).cells;
		result = [];
		for (var fs = 0; fs < oCells.length; fs++) {
			result.push(oCells[fs].innerHTML);
		}
		if(branSum == ""){
			branSum = parseFloat(0);
		}
		if(summaTax == ""){
			summaTax = parseFloat(0);
		}
		var moneyResult = result[4];
		var mon = moneyResult.split("-");
		
		var plus = parseFloat(summaTax) + parseFloat(mon[1]) ;
		if(plus > parseFloat(branSum)){
			alert("จำนวนเงินเกินจำนวนที่ต้องชำระ กรุณาตรวจสอบข้อมูลใหม่ ");
			return $("#moneyDed").focus();
		}
		var prict = result[4].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
		var numberRun = number + i;
		var markup = "<tr><td>"	+ numberRun	+ "</td><td>"+ "ภาษีหัก ณ ที่จ่าย"	+ "</td><td>"+ prict + "</td><td><a onclick='myDeleteDed("+ numberRun+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
		$("#showDeductibleTable").find('tbody').append(markup);
		var markup1 = "<tr><td>" + numberRun + "</td><td>" + result[1]	+ "</td><td>" + result[2]	+ "</td><td>" + result[3] + "</td><td>" + result[4]	+ "</td></tr>";
		$("#sumDeductibleTable").find('tbody').append(markup1);
//		 var prict1 = prict.replace(",", "");
//		balance =	parseFloat(balance) - parseFloat(prict1 *-1) ;
		
	}
	for (var i = document.getElementById("deductibleTable").rows.length; i > 1; i--) {
		document.getElementById("deductibleTable").deleteRow(i - 1);
	}
	
	
//	$("#balanceSummarys").val(parseFloat(balance).toFixed(2).replace(",", ""));
	
	summaryTax();
	//vatAmount();
	
}
// เงินสด
function addDataTableMoneyTranPrice() {
	var balanceSumss = $("#balanceSummary").val();
	
	if(balanceSumss == ""){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	if(parseFloat(balanceSumss) < parseFloat(0)){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	
	
	var table = document.getElementById("showTotalPriceTable").rows.length;
	var number = parseFloat(table - parseFloat(1));
	var count = parseInt(1);
	var numberRun = count + number;
	
	var moneyss = $("#moneyTran").val();
	if(moneyss == ""){
		moneyss = parseFloat(0).toFixed(2);
	}
	var money = parseFloat(moneyss.replace(",", ""));
	
	if(money == ""){
		alert("กรุณากรอกจำนวนเงิน กรุณากรอกใหม่ !");
		return $("#moneyTran").focus();
	}
	if(money < 0){
		alert("กรุณากรอกจำนวนเงิน กรุณากรอกใหม่ !");
		return $("#moneyTran").focus();
	}
	var nameMode = "CC";
	var nameMode1 = "เงินสด";
	
	var sumx = $("#summaryTax").val();
	if(sumx == ""){
		sumx = parseFloat(0).toFixed(2);
	}
	var summaryTax = parseFloat(sumx.replace(",", ""));

	var ba2 = $("#balanceSum").val();
	if(ba2 == ""){
		ba2 = parseFloat(0).toFixed(2);
	}
	var balanceS = parseFloat(ba2.replace(",", ""));
	if(balanceS == ""){
		balanceS = parseFloat(0);
	}
	var bag2 = $("#balanceSummarys").val();
	if(bag2 == ""){
		bag2 = parseFloat(0).toFixed(2);
	}
	var branSum = parseFloat(bag2.replace(",", ""));

		var markup = "<tr><td>"	+ numberRun	+ "</td><td>"+ nameMode1+ "</td><td>"+ money.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+ "</td><td><a onclick='myDeleteSumCreditTranPrice("
				+ numberRun+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
		$("#showTotalPriceTable").find('tbody').append(markup);
		
		
		var markup1 = "<tr><td>" + numberRun + "</td><td>" + nameMode	+ "</td><td>" + money + "</td></tr>";
		$("#sumTotalPriceTable").find('tbody').append(markup1);

		$("#moneyTran").val("");
		var beq = $("#balanceSummarys").val(); 
		var balan = parseFloat(beq.replace(",", ""));
		var ceq = $("#balanceSummarys").val(); 
		var changeRQ = parseFloat(ceq.replace(",", ""));
		
		
		changeRQ =  parseFloat(money)- parseFloat(balan);
		balan = parseFloat(balan) - parseFloat(money);
		if(balan < 0){
			balan = parseFloat(0);
		}
		if(changeRQ < 0){
			changeRQ = parseFloat(0);
		}
		if(summaryTax ==""){
			summaryTax = parseFloat(0);
		}
		
		var sop = $("#balanceSummary").val();
		var sumPrice = parseFloat(sop.replace(",", ""));
		
		$("#balanceSummarys").val(balan.toFixed(2));
		
		balanceS = parseFloat(balanceS + money + (summaryTax *-1));
		
		if(parseFloat(sumPrice) < parseFloat(balanceS)){
			//sumPrice = parseFloat(sumPrice) + parseFloat(money)
			balanceS = balanceS - (summaryTax *-1);
			$("#balanceSum").val(parseFloat(balanceS).toFixed(2));
			$("#balanceSumShow").val(balanceS.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}else{
			var sumba = $("#balanceSum").val();
			if(sumba == "" || sumba == 0){
				sumba = parseFloat(0);
			}
			sumba = parseFloat(sumba) + parseFloat(money);
			
			$("#balanceSum").val(parseFloat(sumba).toFixed(2));
			$("#balanceSumShow").val(sumba.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}
		
		
//		vatAmount();
		disBtn();
		changeMoney(changeRQ);
		validateCheck();
		balanceSum();
}

// add ข้อมูลลง เครดิต
function addDataSumCreditTranPrice() {
	var table = document.getElementById("showTotalPriceTable").rows.length;
	var oTable = document.getElementById('creditTable');
	var result = [];
	var nameMode = "CD";
	var nameMode1 = "บัตรเครดิต";
	var rowLength = oTable.rows.length;
	var count = parseInt(0);
	var number = parseFloat(table - parseFloat(1));
	var bas2 = $("#balanceSum").val();
	if(bas2 == ""){
		bas2 = parseFloat(0).toFixed(2)
	}
	var balanceS = parseFloat(bas2.replace(",", ""));
	

	if(balanceS == ""){
		balanceS = parseFloat(0);
	}
	for (i = 1; i < rowLength; i++) {
		var oCells = oTable.rows.item(i).cells;
		result = [];
		for (var fs = 0; fs < oCells.length; fs++) {
			result.push(oCells[fs].innerHTML);
		}
		var ba23 = $("#balanceSummarys").val();
		var branSum = parseFloat(ba23.replace(",", ""));
		
		var bard = $("#balanceSum").val();
		var brana = parseFloat(bard.replace(",", ""));
		
		var stc = $("#summaryTax").val();
		var summaTax = parseFloat(stc.replace(",", ""));
		
		if(branSum == ""){
			branSum = parseFloat(0);
		}
		if(brana == ""){
			brana = parseFloat(0);
		}
		var plus = parseFloat(result[4].toString().replace(",", ""))  ;
		
		if(plus > parseFloat(branSum)){
			alert("จำนวนเงินเกินจำนวนที่ต้องชำระ กรุณาตรวจสอบข้อมูลใหม่");
			return ;
		}

		var numberRun = number + i;
		var markup = "<tr><td>"
				+ numberRun
				+ "</td><td>"+ nameMode1+ "</td><td>"+ result[4].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")	+ "</td><td><a onclick='myDeleteSumCreditTranPrice("+ numberRun	+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
		$("#showTotalPriceTable").find('tbody').append(markup);
		var markup1 = "<tr><td>" + numberRun + "</td><td>" + nameMode+ "</td><td>" + result[1] + "</td><td>" + result[2] + "</td><td>" + result[3]	+ "</td><td>" + result[4] + "</td></tr>";
		$("#sumTotalPriceTable").find('tbody').append(markup1);
		
		
		var ba3a = $("#balanceSummarys").val(); 
		var balan = parseFloat(ba3a.replace(",", ""));
		var price = result[4].replace(",", "")
		
		balan =parseFloat(balan)-price ;
		$("#balanceSummarys").val(balan.toFixed(2));
		balanceS =parseFloat(balanceS)+ parseFloat(price);
		$("#balanceSum").val(balanceS.toFixed(2));
		$("#balanceSumShow").val(balanceS.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		
//		vatAmount();
		disBtn();
		
	}
	for (var i = document.getElementById("creditTable").rows.length; i > 1; i--) {
		document.getElementById("creditTable").deleteRow(i - 1);
	}
	validateCheck();
	balanceSum()
}
function addDataSumCheckTranPrice() {
	var balanceSumss = $("#balanceSummary").val();
	
	if(balanceSumss == ""){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	if(parseFloat(balanceSumss) < parseFloat(0)){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	var table = document.getElementById("showTotalPriceTable").rows.length;
	var oTable = document.getElementById('checkTable');
	var result = [];
	var nameMode = "CH";
	var nameMode1 = "เช็ค";
	var rowLength = oTable.rows.length;
	var count = parseInt(0);
	var number = parseFloat(table - parseFloat(1));
	var ba3d = $("#balanceSum").val();
	if(ba3d == ""){
		ba3d = parseFloat(0).toFixed(2)
	}
	
	var balanceS = parseFloat(ba3d.replace(",", ""));
	if(balanceS == ""){
		balanceS = parseFloat(0);
	}
	for (i = 1; i < rowLength; i++) {
		var oCells = oTable.rows.item(i).cells;
		result = [];
		for (var fs = 0; fs < oCells.length; fs++) {
			result.push(oCells[fs].innerHTML);
		}
		var banSu = $("#balanceSummarys").val();
		var branSum = parseFloat(banSu.replace(",", ""));
		var ssq = $("#balanceSum").val();
		var brana = parseFloat(ssq.replace(",", ""));
		var sumTax = $("#summaryTax").val();
		var summaTax = parseFloat(sumTax.replace(",", ""));
		
		if(branSum == ""){
			branSum = parseFloat(0);
		}
		if(brana == ""){
			brana = parseFloat(0);
		}
		var plus = parseFloat(result[6].toString().replace(",", "")) ;
		if(plus > parseFloat(branSum)){
			alert("จำนวนเงินเกิน กรุณากรอกใหม่ !จำนวนเงินเกินจำนวนที่ต้องชำระ กรุณาตรวจสอบข้อมูลใหม่");
			return ;
		}
		var numberRun = number + i;
		var markup = "<tr><td>"	+ numberRun	+ "</td><td>"+ nameMode1	+ "</td><td>"+ result[6].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</td><td><a onclick='myDeleteSumCreditTranPrice("+ numberRun	+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
		$("#showTotalPriceTable").find('tbody').append(markup);
		var markup1 = "<tr><td>" + numberRun + "</td><td>" + nameMode+ "</td><td>" + result[1] + "</td><td>" + result[2]+ "</td><td>" + result[3] + "</td><td>" + result[4]	+ "</td><td>" + result[5] + "</td><td>" + result[6] + "</td></tr>";
		$("#sumTotalPriceTable").find('tbody').append(markup1);
		var balans = $("#balanceSummarys").val(); 
		var balan = parseFloat(balans.replace(",", ""));
		
		var price = result[6].replace(",", "")
		balan = parseFloat(balan) - parseFloat(price);
		$("#balanceSummarys").val(balan.toFixed(2));
		balanceS = parseFloat(parseFloat(balanceS)+parseFloat(price));
		$("#balanceSum").val(balanceS.toFixed(2));
		$("#balanceSumShow").val(balanceS.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//		vatAmount();
		disBtn();
	}
	for (var i = document.getElementById("checkTable").rows.length; i > 1; i--) {
		document.getElementById("checkTable").deleteRow(i - 1);
	}
	validateCheck();
	balanceSum()
}

function addDataTableCheck() {
	var lengthNumber =$("#checkNo").val().length
	if(lengthNumber < 7){
		alert("กรุณากรอกเลขที่เช็คให้ครบ 7 หลักด้วยค่ะ");
		return $("#checkNo").focus();
	}
	
	var balanceSumss = $("#balanceSummary").val();
	
	if(balanceSumss == ""){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	if(parseFloat(balanceSumss) < parseFloat(0)){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	var summaryTax = $("#summaryTax").val();
	var table = document.getElementById("checkTable").rows.length;
	var bankNo = document.getElementById("bankNo").value;
	var bankName = document.getElementById("bankName").value;
	var checkNo = $("#checkNo").val();
	var branchCheck = $("#branchCheck").val();
	var moneyCa = $("#moneyCheck").val();
	var dateCheck = $("#dateCheck").val();
	var date =dateCheck.split("-");
	var dateChek = date[2] +"/" + date[1] + "/" + date[0]

	
	if(moneyCa == ""){
		moneyCa = parseFloat(0).toFixed(2);
	}
	var moneyCheck = parseFloat(moneyCa.replace(",", ""));
	var count = parseInt(1);
	for (count; count < table; count++) {
		count
	}
	if(bankNo == ""){
		alert("กรุณาเลือกเลขที่ธนาคารใหม่ !");
		return $("#bankNo").focus();
	}
	if(bankName == ""){
		alert("กรุณาเลือกชื่อธนาคารใหม่!");
		return $("#bankName").focus();
	}
//	if(branchCheck == ""){
//		alert("กรุณากรอกสาขาใหม่ !");
//		return $("#branchCheck").focus();
//	}
	if(parseFloat(moneyCheck) < parseFloat(0)){
		alert("จำนวนเงินเกิน กรุณากรอกใหม่ !");
		return $("#bankName").focus();
	}
	if(checkNo == ""){
		alert("กรุณากรอกเลขที่เช้คใหม่ !");
		return $("#checkNo").focus();
	}
	if(dateCheck == ""){
		alert("กรุณาเลือกวันที่เช็ค!");
		return $("#dateCheck").focus();
	}
	
	
	var bankName =document.getElementById('bankName').options[document.getElementById('bankName').selectedIndex].text;
	
	if(parseFloat(moneyCheck) < parseFloat(0)){
		alert("จำนวนเงินเกินจำนวนที่ต้องชำระ กรุณาตรวจสอบข้อมูลใหม่ !");
		return $("#moneyCheck").focus();
	}
	if(moneyCheck == ""){
		alert("จำนวนเงินเกินจำนวนที่ต้องชำระ กรุณาตรวจสอบข้อมูลใหม่ !");
		return $("#moneyCheck").focus();
	}

	
	var markup = "<tr><td>"	+ count	+ "</td><td>"+ bankNo+ "</td><td>"+ bankName+ "</td><td>"+ branchCheck+ "</td><td>"+ checkNo+ "</td><td>"+ dateChek + "</td><td>"	+ moneyCheck.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+ "</td><td><a onclick='myDeleteCheckTranPrice("
			+ count
			+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
	$("#checkTable").find('tbody').append(markup);


}

function addDataTablecreditTranPrice() {
	var lengthNumber =$("#creditNo").val().length
	if(lengthNumber < 16){
		alert("กรุณากรอกเลขบัตรให้ครบ 16 หลักด้วยค่ะ");
		return $("#creditNo").focus();
	}
	var balanceSumss = $("#balanceSummary").val();
	
	if(balanceSumss == ""){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	if(parseFloat(balanceSumss) < parseFloat(0)){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระ");
		return $("#balanceSummary").focus();
	}
	var table = document.getElementById("creditTable").rows.length;
	var creditType = document.getElementById("creditType").value;
	var edcType = document.getElementById("edcType").value;
	var creditNo = $("#creditNo").val();
	var crepi = $("#creditPrice").val();
	if(crepi == ""){
		crepi = parseFloat(0).toFixed(2);
	}
	var creditPrice = parseFloat(crepi.replace(",", ""));
	var nameMode = "บัตรเครดิต";
	var sumTax = $("#summaryTax").val();
	var summaryTax = parseFloat(sumTax.replace(",", ""));
//	var moneyT = parseFloat(creditPrice - parseFloat(summaryTax));
	if(edcType == "001"){
		edcType = "ธนาคารกรุงไทย";
	}else if(edcType == "002"){
		edcType = "ธนาคารไทยพานิชย์";
	}else if(edcType == "003"){
		edcType = "ธนาคารกสิกรไทย";
	}
	
	var count = parseInt(1);
	for (count; count < table; count++) {
		count
	}
	
	if(creditType == ""){
		alert("กรุณาเลือกประเภทบัตรเครดิต !");
		return $("#creditType").focus();
	}
	if(edcType == ""){
		alert("กรุณากรอกEDC !");
		return $("#edcType").focus();
	}
	if(creditNo == ""){
		alert("กรุณากรอกเลขบัตรเครดิต !");
		return $("#creditNo").focus();
	}

	if(parseFloat(creditPrice) < parseFloat(0)){
		alert("กรุณากรอก จำนวนเงินบัตรเครดิต");
		return $("#creditPrice").focus();
	}
	if(creditPrice == ""){
		alert("กรุณากรอก จำนวนเงินบัตรเครดิต");
		return $("#creditPrice").focus();
	}

	
	var markup = "<tr><td>"
			+ count
			+ "</td><td>"
			+ creditType
			+ "</td><td>"
			+ creditNo
			+ "</td><td>"
			+ edcType
			+ "</td><td>"
			+ creditPrice.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
			+ "</td><td><a onclick='myDeletecreditTranPrice("
			+ count
			+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
	$("#creditTable").find('tbody').append(markup);

//	$("#creditNo").val("");
//	$("#creditPrice").val("");
//	$("#edcType").val("");
//	$("#creditType").val("");
}
function validateCheck(){
	 $('addRow').attr("disabled", "true");
	 $('btnAddprice').attr("disabled", "true");
	 $("#addRow").hide();
	 $("#btnAddprice").hide();
//	$("#saddRow").show();
//	$("#saddRow1").show();
	 $("#addRowShow").show();
	 $("#addRowShow1").show();
}
function sumTranPrice() {
	var result = document.getElementById("typePayment").value;
//	document.getElementById("addRow").disabled = true;
	var balanceOfTaxPrice = document.getElementById("balanceOfTaxPrice").value;
	var balanceSummary = document.getElementById("balanceSummary").value;
	var balance = parseFloat(balanceOfTaxPrice.replace(",", ""));
	var summary =  parseFloat(balanceSummary.replace(",", ""));
	
	
	if(balance < summary){
		alert("กรุณากรอกจำนวนเงินที่ต้องชำระให้ถูกต้อง");
//		$("#sBalanceSummary").hide();
		return $("#balanceSummary").focus();
	}
	
	if (result == 'credit') {
		addDataSumCreditTranPrice();
	} else if (result == 'money') {
		addDataTableMoneyTranPrice();
	} else if (result == 'check') {
		addDataSumCheckTranPrice();
	}
}
function myDeletecreditTranPrice(count) {
	var tablesumTotal = document.getElementById("creditTable");
	if (tablesumTotal.rows.length > 0) {
		tablesumTotal.deleteRow(count);
		
	}
	replaseIndexCredit(tablesumTotal);
}
function myDeleteSumCreditTranPrice(numberRun) {
	var tablesumTotals = document.getElementById("showTotalPriceTable");
	var tablesumTotal = document.getElementById("sumTotalPriceTable");
	
	if(numberRun == "1"){
		$("#saddRow").hide();
		$("#saddRow1").hide();
		$("#addRow").show();
		$("#addRow").show();
		$("#btnAddprice").show();
		
		$("#addRowShow").hide();
		$("#addRowShow1").hide();
	}

	
	var summaryTa = parseFloat(0);
	var banol = $("#balanceSummarys").val();
	var balance = parseFloat(banol.replace(",", ""));
	var sump = $("#balanceSummary").val();
	var sumPrice = parseFloat(sump.replace(",", ""));
	var bansum = $("#balanceSum").val();
	var balanceSum = parseFloat(bansum.replace(",", ""));
	var sumTax = $("#summaryTax").val();
	var summaryTax = sumTax.replace(",", "");
	var res = parseFloat(0);
	var chen = $("#change").val();
	if (tablesumTotals.rows.length > 0) {
		for (var i = 1; i < tablesumTotals.rows.length; i++) {
			if (numberRun == i) {
				var oCells = tablesumTotals.rows.item(i).cells;
				var total = oCells[2].innerHTML.replace(",", "");
				balance =	parseFloat(parseFloat(balance) + parseFloat(total));
				balanceSum = parseFloat(parseFloat(balanceSum) - parseFloat(total))
				if(parseFloat(balanceSum) <0){
					balanceSum = parseFloat(0);
				}
//				var res = summaryTax.split("-");
				balance = parseFloat(balance);
				res = parseFloat(balance) + parseFloat(chen);
				if(parseFloat(res) >= parseFloat(sumPrice)  ){
					$("#change").val(parseFloat(0).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				}
				
				if(parseFloat(sumPrice) > parseFloat(balance)){
					//balance = parseFloat(sumPrice);
					$("#change").val(parseFloat(0).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				}
				
				$("#balanceSummarys").val(balance.toFixed(2));
				$("#balanceSum").val(balanceSum.toFixed(2));
				$("#balanceSumShow").val(balanceSum.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				
				
				
				$("#moneyTran").val(balance.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#creditPrice").val(balance.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#moneyCheck").val(balance.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				vatAmount();
				
				tablesumTotals.deleteRow(numberRun);
				tablesumTotal.deleteRow(numberRun);
				
				
			}
		}

	}
	replaseIndexPriceTotal(tablesumTotals);
	
}

function myDeleteCheckTranPrice(count) {
	var tablesumTotal = document.getElementById("checkTable");
	if (tablesumTotal.rows.length > 0) {
		tablesumTotal.deleteRow(count);
	}
	
	replaseIndexCheck(tablesumTotal);
}

function summaryTax() {
	var table = document.getElementById("showDeductibleTable");
	var rowLength = table.rows.length;
	
//	var moneyss = $("#moneyTran").val();
//	
//	if(moneyss == ""){
//		moneyss = parseFloat(0);
//	}else{
//		moneyss = FormatMoneyShowToNumber(moneyss);
//	}
	var summary = parseFloat(0);
	for (var i = 1; i < rowLength; i++) {
		var oCells = table.rows.item(i).cells;
		var total = oCells[2].innerHTML.replace(",", "");
		var res = total.split("-");
		
		summary += parseFloat(res[1]);
		
		
	}
	if (rowLength <= 0) {
		summary = parseFloat(0);
	}
	if (summary < 0) {
		summary = parseFloat(0);
	}
	var sux = $("#summaryTax").val();
	if(sux == ""){
		sux = parseFloat(0);
	}else{
		sux = parseFloat(sux.replace(",", ""));
	}
	
	var priceSum = $("#balanceSummarys").val();
	if(priceSum == ""){
		priceSum = parseFloat(0);
	}else{
		priceSum = parseFloat(priceSum.replace(",", ""));
	}
	
	var moneyss = parseFloat(priceSum - summary); 
	$("#summaryTax").val((summary.toFixed(2) * -1));
	$("#moneyTran").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#balanceSummarys").val(parseFloat(moneyss).toFixed(2));
	//$("#balanceSummaryShow").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyTran").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#creditPrice").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyCheck").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	vatAmount();
}

function removeTax() {
	var moneyss = $("#moneyTran").val();
	
	if(moneyss == ""){
		moneyss = parseFloat(0);
	}else{
		moneyss = parseFloat(moneyss.replace(",", ""));
	}
	var table = document.getElementById("showDeductibleTable");
	var rowLength = table.rows.length;
	var summary = parseFloat(0);
	for (var i = 1; i < rowLength; i++) {
		var oCells = table.rows.item(i).cells;
		var total = oCells[2].innerHTML.replace(",", "");
		var res = total.split("-");
		
		summary = parseFloat(res[1]);
	}
	if (rowLength <= 0) {
		summary = parseFloat(0);
	}
	if (summary < 0) {
		summary = parseFloat(0);
	}
	moneyss = parseFloat(moneyss)+ parseFloat(summary);
	
	
	var tax = $("#summaryTax").val();
	tax = parseFloat(tax.replace(",", ""));
	tax = parseFloat(tax - (summary*-1));
	
	$("#summaryTax").val(tax.toFixed(2));
	$("#moneyTran").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#balanceSummarys").val(parseFloat(moneyss).toFixed(2));
	//$("#balanceSummaryShow").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyTran").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#creditPrice").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyCheck").val(moneyss.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
}
function replaseIndexCredit(str) {

	rows = str.getElementsByTagName('tr')
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			cells[0].innerHTML = i;
			cells[5].innerHTML = "<a onclick='myDeletecreditTranPrice(" + i
					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
		}
	}
	
}
function replaseIndexCheck(str) {

	rows = str.getElementsByTagName('tr')
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			cells[0].innerHTML = i;
			cells[7].innerHTML = "<a onclick='myDeleteCheckTranPrice(" + i
					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
		}
	}
	
}
function replaseIndexTax(str) {

	rows = str.getElementsByTagName('tr')
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			cells[0].innerHTML = i;
			cells[5].innerHTML = "<a onclick='myDeleteFunction(" + i
					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
		}
	}
	
}
function replaseIndexSumTax(str) {

	rows = str.getElementsByTagName('tr')
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			cells[0].innerHTML = i;
			cells[3].innerHTML = "<a onclick='myDeleteDed(" + i
					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
		}
	}
	
}
function replaseIndexPriceTotal(str) {

	rows = str.getElementsByTagName('tr')
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			cells[0].innerHTML = i;
			cells[3].innerHTML = "<a onclick='myDeleteSumCreditTranPrice(" + i
					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
		}
	}
	
}

function checkNonVat() {
	var vatRate = $("#vatrate").val();
	
	if(vatRate === "NON VAT") {
		vatRateResult = 0;
		vatNanVat = "NON VAT";
	}else{
		vatRateResult = vatRate;
	}
}
