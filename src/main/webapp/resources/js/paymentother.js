$(document).ready(
		function() {
			findTypePayment();
			findBank();
			findBankNo();
			summaryTax();
			hideShowdat();
			hideDetailPayment();
			disBtn();
			vatAmount();
//			document.getElementById("radioButton").disabled = true;
			document.getElementById("radioButton1").disabled = true;
			document.getElementById("radioButton2").disabled = true;
			document.getElementById("radioButton3").disabled = true;
//			document.getElementById("radioButtons").disabled = true;
			$("#change").val(parseFloat(0).toFixed(2));
			$("#balanceSumShow").val(parseFloat(0).toFixed(2));
			$("#balanceSummarys").val(parseFloat(0).toFixed(2));
			$("#beforeSaleShow").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

			$("#moneyTran").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#creditPrice").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#moneyCheck").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#balanceBeforeTax").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#vat").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#vatsShow").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#vats").val(parseFloat(0).toFixed(2));
			$("#balanceSummaryShow").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#balanceOfTaxsShow").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#balanceOfTaxs").val(parseFloat(0).toFixed(2));
			$("#balanceBeforeTaxsShow").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#sale").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#salespacial").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#inputServiceDiscount").val(
					parseFloat(0).toFixed(2).replace(
							/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#inputSpecialDiscount").val(
									parseFloat(0).toFixed(2).replace(
											/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#inputServiceAmount").val(parseFloat(0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));								
			$("#moneyDed").val(parseFloat(0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#moneyDed1").val(parseFloat(0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#summaryTax").val(parseFloat(0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			
			document.getElementById("inputSpecialDiscount").readOnly = true;
			$('#rbSpecialDiscount').click(function() {
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
		      		        		document.getElementById("inputSpecialDiscount").readOnly = false;
		      		        	}else{
		      		        		$("#mi-modal").modal('hide');
		      		        		$("#mi-modal-notauthen").modal('show');
		      		        	
		      		        	}
		      		        	
		      		        }
					  });
					    $("#mi-modal").modal('hide');
					   
					    
					  });
					  
					  $("#modal-btn-no").on("click", function(){
					    $("#mi-modal").modal('hide');
					    
					    
					 });
					 $("#modal-btn-ok").on("click", function(){
					    $("#mi-modal-notauthen").modal('hide');
					    
					    
					 });
					 
			    });
			
		});

function disBtn() {
	var table = document.getElementById("showTotalPriceTable");
	var rowLength = table.rows.length;

	if (rowLength > 1) {

		$('button#submitFormPayment').prop('disabled', false);
	} else {
		$('button#submitFormPayment').prop('disabled', true);
	}
}

function vatAmount() {
	var result = $("#balanceSum").val();
	if ($("#balanceSum").val() !== '') {
		result = parseFloat($("#balanceSum").val().replace(",", ""));
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

//	$("#balanceOfTaxs").val(summary.toFixed(2));
	$("#beforeSale").val(beforeVat.toFixed(2));
//
//	$("#balanceOfTaxsShow").val(
//			summary.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
//					"$1,"));

	$("#balanceBeforeTaxs").val(beforeVat.toFixed(2));
//	$("#vats").val(vat.toFixed(2));

//	$("#balanceBeforeTaxsShow").val(
//			beforeVat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
//					"$1,"));
//	$("#vatsShow").val(
//			vat.toFixed(2).toString()
//					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
};

function hideShowdat() {
	$("#sCustName").hide();
	$("#sCustNo").hide();
	$("#staxId").hide();
	$("#scustAddress").hide();
	$("#scustBrach").hide();
	$("#suserGroup").hide();
	$("#sdebtCollection").hide();
	$("#sinvoiceNo").hide();
	$("#sserviceNo").hide();
	$("#sstartupDate").hide();
	$("#sendDate").hide();
	$("#sdeadlines").hide();
	$("#sinvoiceDate").hide();
	$("#addRowShow").hide();
	$("#buttonAddBillingListDis").hide();
	$("#addDataTableDedDis").hide();

}

function hideDetailPayment() {
	$("#sinputServiceType").hide();
	$("#sinputServiceDepartment").hide();
	$("#sinputServiceName").hide();
	$("#sinputServiceMoreData").hide();
	$("#sinputServiceAmount").hide();
	$("#moneyDedTxt").hide();

	$("#creditTypeTxt").hide();
	$("#edcTypeTxt").hide();
	$("#creditNoTxt").hide();
	$("#creditPriceTxt").hide();
	$("#creditPriceTxt").hide();

	$("#bankNoTxt").hide();
	$("#bankNameTxt").hide();
	$("#branchCheckTxt").hide();
	$("#bankNameTxt").hide();
	$("#checkNoTxt").hide();
	$("#dateCheckTxt").hide();
	$("#moneyCheckTxt").hide();

	$("#moneyTranTxt").hide();

}

function submitForm() {

	hideShowdat();
	var radioButtons = document.getElementsByName("radioDed");
	var radioResult = "";
	// var invoiceNo = $("#invoiceNo").val();
	var deductible = [];
	var resultDeductible = [];
	var totalPrice = [];
	var resultTotalPrice = [];
	var resultTblSale = [];

	// get radio
	for (var x = 0; x < radioButtons.length; x++) {
		if (radioButtons[x].checked) {
			radioResult = radioButtons[x].value;
		}
	}
	// ภาษี หัก ณ ที่จ่าย
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
	// ตารางขาย
	var tblSale = document.getElementById("sumtableBillingList");
	var roeLeng = tblSale.rows.length;
	for (var v = 1; v < roeLeng; v++) {
		slae = [];
		var oCellss = tblSale.rows.item(v).cells;
		for (var fv = 0; fv < oCellss.length; fv++) {
			if (oCellss[fv].lastChild.value) {
				slae.push(oCellss[fv].lastChild.value);
			} else {

				slae.push(oCellss[fv].innerHTML);
			}
		}
		resultTblSale.push(slae);

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
	// list ขาย
	var listpaymentSale = [];
	var listpaymentSaleRQ = [];

	for (var h = 0; h < resultTblSale.length; h++) {
		listpaymentSale = []
		listpaymentSale = {
			"inputServiceType" : resultTblSale[h][1],
			"inputServiceName" : resultTblSale[h][2],
			"inputServiceCode" : resultTblSale[h][2],
			"inputServiceMoreData" : resultTblSale[h][3],
			"inputServiceAmount" : resultTblSale[h][4].replace(",", ""),
			 "inputServiceDiscount" : resultTblSale[h][5],
			 "inputSpecialDiscount" : resultTblSale[h][6],
			"vatSale" : resultTblSale[h][7].replace(",", ""),
			
			"summaryinvoice" : resultTblSale[h][9].replace(",", "")
		}
		listpaymentSaleRQ.push(listpaymentSale);
	}

	// list ภาษี หัก ณ ที่จ่าย
	var listpaymentTaxQ = [];
	var listpaymentTaxRQ = [];

	for (var a = 0; a < resultDeductible.length; a++) {
		listpaymentTaxQ = []
		listpaymentTaxQ = {
			"docDed" : resultDeductible[a][1],
		"custNo" : resultDeductible[a][2],
			"radioDed" : resultDeductible[a][3],
			"moneyDed" : resultDeductible[a][4]
		}
		listpaymentTaxRQ.push(listpaymentTaxQ);
	}

	// list TranPrice

	var listpaymentTranPriceQ = [];
	var listpaymentTranPriceRQ = [];

	for (var b = 0; b < resultTotalPrice.length; b++) {
		listpaymentTranPriceQ = [];
		if (resultTotalPrice[b][1] == "CC") {
			listpaymentTranPriceQ = {
				"typePayment" : resultTotalPrice[b][1],
				"moneyTran" : resultTotalPrice[b][2].replace(",", "")
			}
		} else if (resultTotalPrice[b][1] == "CD") {
			listpaymentTranPriceQ = {
				"typePayment" : resultTotalPrice[b][1],
				"creditType" : resultTotalPrice[b][2],
				"creditNo" : resultTotalPrice[b][3],
				"edcType" : resultTotalPrice[b][4],
				"creditPrice" : resultTotalPrice[b][5].replace(",", "")
			}
		} else if (resultTotalPrice[b][1] == "CH") {
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

	if ($("#custNo").val() == "") {
		$("#sCustNo").show();
		return $("#custNo").focus();
	}
//	if ($("#custName").val() == "") {
//		$("#sCustName").show();
//		return $("#custName").focus();
//	}
	if ($("#userGroup").val() == "") {
		$("#suserGroup").show();
		return $("#userGroup").focus();
	}
//	if ($("#custBrach").val() == "") {
//		$("#scustBrach").show();
//		return $("#custBrach").focus();
//	}

	
//	if ($("#custAddress").val() == "") {
//		$("#scustAddress").show();
//		return $("#custAddress").focus();
//	}

	var dataSend = {
		"custName" : $("#custName").val(),
		"custNo" : $("#custNo").val(),
		"taxId" : $("#taxId").val(),
		"documentNo" : $("#docDed").val(),
		"custAddress" : $("#custAddress").val(),
		"custBrach" : $("#custBrach").val(),
		"userGroup" : $("#userGroup").val(),
		"userName" : $("#userName").val(),
		"vatrate" : $("#vatrate").val(),
		"balanceBeforeTax" : parseFloat($("#balanceBeforeTax").val().replace(
				",", "")),
		"vat" : parseFloat($("#vat").val().replace(",", "")),
		"balanceSummary" : parseFloat($("#balanceSummary").val().replace(",",
				"")),
		"balanceBeforeTaxs" : parseFloat($("#balanceBeforeTaxs").val().replace(
				",", "")),
		"vats" : parseFloat($("#vats").val().replace(",", "")),
		"balanceOfTaxs" : parseFloat($("#balanceOfTaxs").val().replace(",", "")),
		"balanceSummarys" : parseFloat($("#balanceSummarys").val().replace(",",
				"")),
		"balanceSum" : parseFloat($("#balanceSum").val().replace(",", "")),
		"remark" : $("#remark").val(),
		"summaryTax" : parseFloat(($("#summaryTax").val().replace(",", "")*-1)),
		"change" : $("#change").val(),
		"sale" : $("#sale").val(),
		"salespacial": $("#salespacial").val(),
		"paymentBill" : listpaymentSaleRQ,
		"paymentTax" : listpaymentTaxRQ,
		"paymentTranPrice" : listpaymentTranPriceRQ
	}

	$.ajax({
		type : "POST",
		url : "paymenOthertService",
		data : JSON.stringify(dataSend),
		dataType : "json",
		async : false,
		contentType : "application/json; charset=utf-8",
		success : function(res) {
			if (res > 0) {
				window.location.href = "payOtherSuccess?idUser=" + res;
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

//function findBank() {
//	var bankNo = document.getElementById("bankNo").value;
//	var bankName = document.getElementById("bankName").value;
//	if (bankNo == "001") {
//		$('#bankName').val("ktb");
//	} else if (bankNo == "002") {
//		$('#bankName').val("scb");
//	} else if (bankNo == "003") {
//		$('#bankName').val("kbk");
//	}
//}
//
//function findBankNo() {
//	var bankNo = document.getElementById("bankNo").value;
//	var bankName = document.getElementById("bankName").value;
//	if (bankName == "ktb") {
//		$('#bankNo').val("001");
//	} else if (bankName == "scb") {
//		$('#bankNo').val("002");
//	} else if (bankName == "kbk") {
//		$('#bankNo').val("003");
//	}
//}
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

function buttonAddBillingList() {
	hideDetailPayment();
	if ($("#inputServiceType").val() == "") {
		$("#sinputServiceType").show();
		return $("#inputServiceType").focus();
	}
	if ($("#inputServiceDepartment").val() == "") {
		$("#sinputServiceDepartment").show();
		return $("#inputServiceDepartment").focus();
	}
	
	if ($("#inputServiceName").val() == "") {
		$("#sinputServiceName").show();
		return $("#inputServiceName").focus();
	}
	if ($("#inputServiceMoreData").val() == "") {
		$("#sinputServiceMoreData").show();
		return $("#inputServiceMoreData").focus();
	}
	if ($("#inputServiceAmount").val() == "") {
		$("#sinputServiceAmount").show();
		return $("#inputServiceAmount").focus();
	}

	var table = document.getElementById("sumtableBillingList").rows.length;
	var inputServiceType = $("#inputServiceType").val(); // หน่วยรับได้
	var inputServiceDepartment = $("#inputServiceDepartment").val();
	var inputServiceCode = $("#inputServiceName").val();
	var inputServiceName = $("#inputServiceName option:selected").text();
	var inputServiceMoreData = $("#inputServiceMoreData").val();
	var inputServiceAmount = $("#inputServiceAmount").val();
	var inputServiceDiscount = $("#inputServiceDiscount").val();
	var inputSpecialDiscount = $("#inputSpecialDiscount").val();
	var vatRate = $("#vatrate").val();
	var moneyDed1 = $("#moneyDed1").val();


	 if(inputServiceDiscount == ""){ 
		 inputServiceDiscount = parseFloat(0).toFixed(2); } 
	 if(inputSpecialDiscount == ""){
	 inputSpecialDiscount = parseFloat(0).toFixed(2); }


	 var AmountbeforVat1 = parseFloat(inputServiceDiscount.replace(",", ""));
	 // ส่วนลด
	var serviceMoreData = parseFloat(inputServiceMoreData); // จำนวนรายการ
	 var specialDiscount = parseFloat(inputSpecialDiscount.replace(",", ""));
	// สว่นลดพิเศษ

	var serviceAmount = FormatMoneyShowToNumber(inputServiceAmount); // จำนวนต่อหน่วย

	var amount = parseFloat((serviceMoreData * serviceAmount));
//	var vat = parseFloat((amount * parseFloat(vatRate)) / parseFloat(107));
	var vat = parseFloat((amount * parseFloat(vatRate)/100));
	var beforeVat = parseFloat(amount - vat);
//	var sumamount = parseFloat(amount + vat);
	var sumamount = parseFloat(((amount - inputServiceDiscount )-inputSpecialDiscount) + vat);
	var count = parseFloat(0);
	count = parseFloat(count + parseFloat(table));

	var markup = "<tr><td>"
		+ count
		+ "</td><td>"
		+ inputServiceType
		+ "</td><td>"
		+ "<input class='form-control' type='text' id='serviceNametxt'	name='serviceNametxt'value='"
		+ inputServiceName
		+ "' />"
		+ "</td><td>"
		+ serviceMoreData
		+ "</td><td>"
		+ serviceAmount.toFixed(2).toString().replace(
				/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
		+ "</td><td>"
		+ inputServiceDiscount
		+ "</td><td>" 
		+ specialDiscount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
		"$1,")
		+"</td><td>"
		+ vat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
				"$1,")
		+ "</td><td>"
		+ moneyDed1
		+"</td><td>"
		+ sumamount.toFixed(2).toString().replace(
				/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
		+ "</td><td><a onclick='deleteTableSale("
		+ count
		+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
$("#sumtableBillingList").find('tbody').append(markup);

	

	var moneyCC = $("#moneyTran").val();
	var balanceBeforeTaxRQ = $("#balanceBeforeTax").val();
	var vatRQ = $("#vat").val();
	var money = parseFloat(moneyCC.replace(",", ""));

	money = parseFloat(money + amount);
	vatRQ = parseFloat(vat + vatRQ);
	balanceBeforeTaxRQ = parseFloat(beforeVat + balanceBeforeTaxRQ);

//	$("#moneyCheck").val(
//			money.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
//					"$1,"));
//	$("#creditPrice").val(
//			money.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
//					"$1,"));

	$("#balanceBeforeTax").val(balanceBeforeTaxRQ.toFixed(2));
	$("#vat").val(vatRQ.toFixed(2));
	$("#moneyDed").val(moneyDed1);

	var table = document.getElementById("sumtableBillingList");
	var re = replaseIndexV4(table);
	

}

function deleteTableSale(count) {
	var balanceSummary = $("#balanceSummary").val();
	var balanceBeforeTaxRQ = $("#balanceBeforeTax").val();
	var vatRQ = $("#vat").val();
	var vatRate = $("#vatrate").val();
	var table = document.getElementById("sumtableBillingList");
	if (table.rows.length > 0) {
		for (var i = 1; i <= table.rows.length; i++) {
			if (count == i) {
				var oCells = table.rows.item(i).cells;
				var tbMoney = parseFloat(oCells[7].innerHTML.replace(",", ""));
				var amounts = parseFloat(tbMoney);
				var vat = parseFloat((amounts * parseFloat(vatRate))
						/ parseFloat(107));
				var beforeVat = parseFloat(amounts - vat);

				var reMoney = parseFloat(parseFloat(balanceSummary) - tbMoney);
				var vatSv = parseFloat(parseFloat(vatRQ) - vat);
				var beforeSv = parseFloat(parseFloat(balanceBeforeTaxRQ)
						- beforeVat);

				$("#moneyTran").val(reMoney.toFixed(2));
// $("#balanceSummarys").val(reMoney.toFixed(2));
				$("#balanceSummary").val(reMoney.toFixed(2));
				$("#balanceBeforeTax").val(beforeSv.toFixed(2));
				$("#balanceSummaryShow").val(
						reMoney.toFixed(2).toString().replace(
								/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#vat").val(vatSv.toFixed(2));
				table.deleteRow(parseFloat(count));
			}
		}
	}
	replaseIndexV4(table);
}

function addRow() {
	hideDetailPayment();
	var table = document.getElementById("deductibleTable").rows.length;
	var radioButtons = document.getElementsByName("radioDed");
	var radioResult = "";
	var invoiceNo = $("#invoiceNo").val();
	for (var x = 0; x < radioButtons.length; x++) {
		if (radioButtons[x].checked) {
			radioResult = radioButtons[x].value;

			if (radioResult == "01") {
				radioResult = "69 ทวิ";
			} else if (radioResult == "02") {
				radioResult = "3 เตรส";
			} else if (radioResult == "03") {
				radioResult = "69 ตรี";
			}
		}
	}
	var docDed = $("#docDed").val();
	var dmoney = $("#moneyDed").val();
	var custNo = $("#custNo").val();
	/*
	 * if(invoiceNo == ""){ alert(" กรุณากรอกใหม่ !"); return
	 * $("#invoiceNo").focus(); } if(docDed == ""){ alert("กรุณากรอกเลขที่เอกสาร
	 * กรุณากรอกใหม่ !"); return $("#docDed").focus(); }
	 */
	if (custNo == "") {
		$("#scustNo").show();
		return $("#custNo").focus();
	}
	if (dmoney == "") {
		$("#moneyDedTxt").show();
		return $("#moneyDed").focus();
	}

	var moneyDed = parseFloat(dmoney.replace(",", ""));
	var count = 1;

	for (count; count < table; count++) {
		count + table;
	}

	if (parseFloat(moneyDed) < 0) {
		alert("กรุณากรอกจำนวนเงิน  กรุณากรอกใหม่ !");
		return $("#moneyDed").focus();
	}
	if (moneyDed == "") {
		alert("กรุณากรอกจำนวนเงิน  กรุณากรอกใหม่ !");
		return $("#moneyDed").focus();
	}
	var markup = "<tr><td>"
			+ tdAutoNumber()
			+ "</td><td>"
			+ custNo
			+ "</td><td>"
			+ docDed
			+ "</td><td>"
			+ radioResult
			+ "</td><td>"
			+ "-"+moneyDed.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
			+ "</td><td><a onclick='myDeleteFunction("
			+ tdAutoNumber()
			+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";

	$("#deductibleTable").find('tbody').append(markup);
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
	// tdAutoNumber();
	replaseIndexV1(table);

}
function tdAutoNumber() {
	var table = document.getElementById("deductibleTable");
	var txt = "";
	var i;
	for (i = 0; i < table.rows.length; i++) {
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
				var total = parseFloat(oCells[3].innerHTML.replace(",", ""));
				var balances = parseFloat(parseFloat(balance)
						+ parseFloat(total ));
				if (balances < result) {
					// balance = result;
					$("#change").val(
							parseFloat(0).toFixed(2).toString().replace(
									/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				}

// $("#balanceSummarys").val(balance.toFixed(2));
				// $("#balanceSummaryShow").val(balance.toFixed(2));

				// vatAmount();
				tableDed.deleteRow(count);
				table.deleteRow(count);
				removeTax();
			}
		}
	}
	replaseIndexV2(table);
	replaseIndexV3(tableDed);

}

function addDataTableDed() {
	var oTable = document.getElementById('deductibleTable');
	var tableDed = document.getElementById("showDeductibleTable");
	var result = [];
	// var deq = $("#deduction").val();
	// var deduction = parseFloat(deq.replace(",", ""));
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
		if (branSum == "") {
			branSum = parseFloat(0);
		}
		if (summaTax == "") {
			summaTax = parseFloat(0);
		}
		var plus = parseFloat(parseFloat(summaTax) + parseFloat(result[4]));
		if (plus > parseFloat(branSum)) {
			alert("จำนวนเงินเกิน กรุณากรอกใหม่ !");
			return;
		}
		var prict = result[4].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
				"$1,")
		var numberRun = number + i;
		var markup = "<tr><td>"
				+ numberRun
				+ "</td><td>"
				+ result[3]
				+ "</td><td>"
				+ prict
				+ "</td><td><a onclick='myDeleteDed("
				+ numberRun
				+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
		$("#showDeductibleTable").find('tbody').append(markup);
		var markup1 = "<tr><td>" + numberRun + "</td><td>" + result[1]
				+ "</td><td>" + result[2] + "</td><td>" + result[3]
				+ "</td><td>" + result[4] + "</td></tr>";
		$("#sumDeductibleTable").find('tbody').append(markup1);
		var prict1 = prict.replace(",", "");
		balance = parseFloat(balance) - parseFloat(prict1 );

	}
	for (var i = document.getElementById("deductibleTable").rows.length; i > 1; i--) {
		document.getElementById("deductibleTable").deleteRow(i - 1);
	}
	$("#balanceSummarys").val(parseFloat(balance *-1).toFixed(2).replace(",", ""));

	 summaryTax();
	// vatAmount();
	replaseIndexV3(tableDed);
}
// เงินสด
function addDataTableMoneyTranPrice() {
	hideDetailPayment();
	var table = document.getElementById("showTotalPriceTable").rows.length;
	var number = parseFloat(table - parseFloat(1));
	var count = parseInt(1);
	var numberRun = count + number;

	var moneyss = $("#moneyTran").val();
	if (moneyss == "") {
		moneyss = parseFloat(0).toFixed(2);
	}
	var money = FormatMoneyShowToNumber(moneyss);

	if (money == "") {
		$("#moneyTranTxt").show();
		return $("#moneyTran").focus();
	}
	if (money < 0) {
		$("#moneyTranTxt").show();
		return $("#moneyTran").focus();
	}
	var nameMode = "CC";
	var nameMode1 = "เงินสด";

	var sumx = $("#summaryTax").val();
	if (sumx == "") {
		sumx = parseFloat(0).toFixed(2);
	}
	var summaryTax = parseFloat(sumx.replace(",", ""));

	var ba2 = $("#balanceSum").val();
	if (ba2 == "") {
		ba2 = parseFloat(0).toFixed(2);
	}
	var balanceS = parseFloat(ba2.replace(",", ""));
	if (balanceS == "") {
		balanceS = parseFloat(0);
	}
	var bag2 = $("#balanceSummarys").val();
	if (bag2 == "") {
		bag2 = parseFloat(0).toFixed(2);
	}
	var branSum = parseFloat(bag2.replace(",", ""));

	var markup = "<tr><td>"
			+ numberRun
			+ "</td><td>"
			+ nameMode1
			+ "</td><td>"
			+ money.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
					"$1,")
			+ "</td><td><a onclick='myDeleteSumCreditTranPrice("
			+ numberRun
			+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
	$("#showTotalPriceTable").find('tbody').append(markup);

	var markup1 = "<tr><td>" + numberRun + "</td><td>" + nameMode + "</td><td>"
			+ money + "</td></tr>";
	$("#sumTotalPriceTable").find('tbody').append(markup1);

	$("#moneyTran").val("");
	
	var beq = $("#balanceSummarys").val();
	var balan = parseFloat(beq.replace(",", ""));
	var ceq = $("#balanceSummarys").val();
	var changeRQ = parseFloat(ceq.replace(",", ""));

	changeRQ = parseFloat(money) - parseFloat(balan);
	balan = parseFloat(balan) - parseFloat(money);
	if (balan < 0) {
		balan = parseFloat(0);
	}
	if (changeRQ < 0) {
		changeRQ = parseFloat(0);
	}

	var sop = $("#balanceSummary").val();
	var sumPrice = parseFloat(sop.replace(",", ""));

	$("#balanceSummarys").val(balan.toFixed(2));
	$("#moneyTran").val(balan.toFixed(2));
	$("#creditPrice").val(balan.toFixed(2));
	$("#moneyCheck").val(balan.toFixed(2));
	balanceS = parseFloat(balanceS + money + (summaryTax));

	if (parseFloat(sumPrice) < parseFloat(balanceS)) {
		// sumPrice = parseFloat(sumPrice) + parseFloat(money)
		balanceS = balanceS - (summaryTax);
		$("#balanceSum").val(balanceS.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#balanceSumShow").val(
				balanceS.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	} else {
		$("#balanceSum").val(parseFloat(money).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#balanceSumShow").val(
				money.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	}
	
	

	vatAmount();
	disBtn();
	changeMoney(changeRQ);
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
	if (bas2 == "") {
		bas2 = parseFloat(0).toFixed(2)
	}
	var balanceS = parseFloat(bas2.replace(",", ""));

	if (balanceS == "") {
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

		if (branSum == "") {
			branSum = parseFloat(0);
		}
		if (brana == "") {
			brana = parseFloat(0);
		}
		var plus = parseFloat(result[4].toString().replace(",", ""));

		if (plus > parseFloat(branSum)) {
			alert("จำนวนเงินเกิน กรุณากรอกใหม่ !");
			return;
		}

		var numberRun = number + i;
		var markup = "<tr><td>"
				+ numberRun
				+ "</td><td>"
				+ nameMode1
				+ "</td><td>"
				+ result[4].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
				+ "</td><td><a onclick='myDeleteSumCreditTranPrice("
				+ numberRun
				+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
		$("#showTotalPriceTable").find('tbody').append(markup);
		var markup1 = "<tr><td>" + numberRun + "</td><td>" + nameMode
				+ "</td><td>" + result[1] + "</td><td>" + result[2]
				+ "</td><td>" + result[3] + "</td><td>" + result[4]
				+ "</td></tr>";
		$("#sumTotalPriceTable").find('tbody').append(markup1);

		var ba3a = $("#balanceSummarys").val();
		var balan = parseFloat(ba3a.replace(",", ""));
		var price = result[4].replace(",", "")
		
		

		balan = parseFloat(balan) - price;
		$("#balanceSummarys").val(balan.toFixed(2));
		$("#moneyTran").val(balan.toFixed(2));
		$("#creditPrice").val(balan.toFixed(2));
		$("#moneyCheck").val(balan.toFixed(2));
		balanceS = parseFloat(balanceS) + parseFloat(price);
		$("#balanceSum").val(balanceS.toFixed(2));
		$("#balanceSumShow").val(
				balanceS.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		
		
	}
	for (var i = document.getElementById("creditTable").rows.length; i > 1; i--) {
		document.getElementById("creditTable").deleteRow(i - 1);
	}
	vatAmount();
	disBtn();
	
	
}
function addDataSumCheckTranPrice() {
	var table = document.getElementById("showTotalPriceTable").rows.length;
	var oTable = document.getElementById('checkTable');
	var result = [];
	var nameMode = "CH";
	var nameMode1 = "เช็ค";
	var rowLength = oTable.rows.length;
	var count = parseInt(0);
	var number = parseFloat(table - parseFloat(1));
	var ba3d = $("#balanceSum").val();
	if (ba3d == "") {
		ba3d = parseFloat(0).toFixed(2)
	}

	var balanceS = parseFloat(ba3d.replace(",", ""));
	if (balanceS == "") {
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

		if (branSum == "") {
			branSum = parseFloat(0);
		}
		if (brana == "") {
			brana = parseFloat(0);
		}
		var plus = parseFloat(result[6].toString().replace(",", ""));
		if (plus > parseFloat(branSum)) {
			alert("จำนวนเงินเกิน กรุณากรอกใหม่ !");
			return;
		}
		var numberRun = number + i;
		var markup = "<tr><td>"
				+ numberRun
				+ "</td><td>"
				+ nameMode1
				+ "</td><td>"
				+ result[6].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
				+ "</td><td><a onclick='myDeleteSumCreditTranPrice("
				+ numberRun
				+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
		$("#showTotalPriceTable").find('tbody').append(markup);
		var markup1 = "<tr><td>" + numberRun + "</td><td>" + nameMode
				+ "</td><td>" + result[1] + "</td><td>" + result[2]
				+ "</td><td>" + result[3] + "</td><td>" + result[4]
				+ "</td><td>" + result[5] + "</td><td>" + result[6]
				+ "</td></tr>";
		$("#sumTotalPriceTable").find('tbody').append(markup1);
		var balans = $("#balanceSummarys").val();
		var balan = parseFloat(balans.replace(",", ""));

		var price = result[6].replace(",", "")
		balan = parseFloat(balan) - parseFloat(price);
		$("#balanceSummarys").val(balan.toFixed(2));
		$("#moneyTran").val(balan.toFixed(2));
		$("#creditPrice").val(balan.toFixed(2));
		$("#moneyCheck").val(balan.toFixed(2));
		balanceS = parseFloat(parseFloat(balanceS) + parseFloat(price));
		$("#balanceSum").val(balanceS.toFixed(2));
		$("#balanceSumShow").val(
				balanceS.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		
	}
	for (var i = document.getElementById("checkTable").rows.length; i > 1; i--) {
		document.getElementById("checkTable").deleteRow(i - 1);
	}
	vatAmount();
	disBtn();
	

}

function addDataTableCheck() {
	hideDetailPayment()
	var summaryTax = $("#summaryTax").val();
	var table = document.getElementById("checkTable").rows.length;
	var bankNo = document.getElementById("bankNo").value;
	var bankName = document.getElementById("bankName").value;
	var checkNo = $("#checkNo").val();
	var branchCheck = $("#branchCheck").val();
	var moneyCa = $("#moneyCheck").val();
	var dateCheck = $("#dateCheck").val();
	var date = dateCheck.split("-");
	var dateChek = date[2] + "/" + date[1] + "/" + date[0]

	if (moneyCa == "") {
		moneyCa = parseFloat(0).toFixed(2);
	}
	var moneyCheck = parseFloat(moneyCa.replace(",", ""));
	var count = parseInt(1);
	for (count; count < table; count++) {
		count
	}
	if (bankNo == "") {
		$("#bankNoTxt").show();
		return $("#bankNo").focus();
	}
	if (bankName == "") {
		$("#bankNameTxt").show();
		return $("#bankName").focus();
	}
	if (branchCheck == "") {
		$("#branchCheckTxt").show();
		return $("#branchCheck").focus();
	}
	if (parseFloat(moneyCheck) < parseFloat(0)) {
		$("#bankNameTxt").show();
		return $("#bankName").focus();
	}
	if (checkNo.length == "" || checkNo.length < 7) {
		$("#checkNoTxt").show();
		return $("#checkNo").focus();
	}
	if (dateCheck == "") {
		$("#dateCheckTxt").show();
		return $("#dateCheck").focus();
	}

	

	if (parseFloat(moneyCheck) < parseFloat(0)) {
		$("#moneyCheckTxt").show();
		return $("#moneyCheck").focus();
	}
	if (moneyCheck == "") {
		$("#moneyCheckTxt").show();
		return $("#moneyCheck").focus();
	}

	var bankName =document.getElementById('bankName').options[document.getElementById('bankName').selectedIndex].text;
	var markup = "<tr><td>"
			+ count
			+ "</td><td>"
			+ bankNo
			+ "</td><td>"
			+ bankName
			+ "</td><td>"
			+ branchCheck
			+ "</td><td>"
			+ checkNo
			+ "</td><td>"
			+ dateChek
			+ "</td><td>"
			+ moneyCheck.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
			+ "</td><td><a onclick='myDeleteCheckTranPrice("
			+ count
			+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
	$("#checkTable").find('tbody').append(markup);

}

function addDataTablecreditTranPrice() {
	hideDetailPayment();
	var table = document.getElementById("creditTable").rows.length;
	var creditType = document.getElementById("creditType").value;
	var edcType = document.getElementById("edcType").value;
	var creditNo = $("#creditNo").val();
	var crepi = $("#creditPrice").val();
	if (crepi == "") {
		crepi = parseFloat(0).toFixed(2);
	}
	var creditPrice = parseFloat(crepi.replace(",", ""));
	var nameMode = "บัตรเครดิต";
	var sumTax = $("#summaryTax").val();
	var summaryTax = parseFloat(sumTax.replace(",", ""));
	// var moneyT = parseFloat(creditPrice - parseFloat(summaryTax));
	if (edcType == "001") {
		edcType = "ธนาคารกรุงไทย";
	} else if (edcType == "002") {
		edcType = "ธนาคารไทยพานิชย์";
	} else if (edcType == "003") {
		edcType = "ธนาคารกสิกรไทย";
	}

	var count = parseInt(1);
	for (count; count < table; count++) {
		count
	}

	if (creditType == "") {
		$("#creditTypeTxt").show();
		return $("#creditType").focus();
	}
	if (edcType == "") {
		$("#edcTypeTxt").show();
		return $("#edcType").focus();
	}

	if (creditNo.length == "" || creditNo.length < 16) {
		$("#creditNoTxt").show();
		return $("#creditNo").focus();
	}

	if (parseFloat(creditPrice) < parseFloat(0)) {
		$("#creditPriceTxt").show();
		return $("#creditPrice").focus();
	}
	if (creditPrice == "") {
		$("#creditPriceTxt").show();
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
			+ creditPrice.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
			+ "</td><td><a onclick='myDeletecreditTranPrice("
			+ count
			+ ")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
	$("#creditTable").find('tbody').append(markup);

//	$("#creditNo").val("");
//	$("#creditPrice").val("");
//	$("#edcType").val("");
//	$("#creditType").val("");
}

function sumTranPrice() {
	var result = document.getElementById("typePayment").value;
	$('addRow').attr("disabled", "true");
	$("#addRow").hide();
	$("#addRowShow").show();

	$('addDataTableDedShow').attr("disabled", "true");
	$("#addDataTableDedShow").hide();
	$("#addDataTableDedDis").show();

	$('buttonAddBillingListDis').attr("disabled", "true");
	$("#buttonAddBillingList").hide();
	$("#buttonAddBillingListDis").show();

	if (result == 'credit') {
		addDataSumCreditTranPrice();
	} else if (result == 'money') {
		addDataTableMoneyTranPrice();
	} else if (result == 'check') {
		addDataSumCheckTranPrice();
	}
	var tablesumTotals = document.getElementById("showTotalPriceTable");
	replaseIndex(tablesumTotals);
	
//	$("#balanceSum").val(s.toFixed(2));
//	$("#balanceSumShow").val(
//			s.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
}
function myDeletecreditTranPrice(count) {
	var tablesumTotal = document.getElementById("creditTable");
	if (tablesumTotal.rows.length > 0) {
		tablesumTotal.deleteRow(count);

	}
}
function myDeleteSumCreditTranPrice(numberRun) {
	var tablesumTotals = document.getElementById("showTotalPriceTable");
	var tablesumTotal = document.getElementById("sumTotalPriceTable");

	if (numberRun == "1") {

		$("#addRow").show();
		$("#addRowShow").hide();

		$("#buttonAddBillingList").show();
		$("#buttonAddBillingListDis").hide();

		$("#addDataTableDedShow").show();
		$("#addDataTableDedDis").hide();
	}

	var summaryTa = parseFloat(0);
	var banol = $("#balanceSummarys").val();
	var balance = parseFloat(banol.replace(",", ""));
	var sump = $("#balanceSummary").val();
	var sumPrice = parseFloat(sump.replace(",", ""));
	var bansum = $("#balanceSum").val();
	var balanceSum = parseFloat(bansum.replace(",", ""));
	var sumTax = $("#summaryTax").val();
	var summaryTax = parseFloat(sumTax.replace(",", ""));
	var res = parseFloat(0);
	var chen = $("#change").val();
	if (tablesumTotals.rows.length > 0) {
		for (var i = 1; i < tablesumTotals.rows.length; i++) {
			if (numberRun == i) {
				var oCells = tablesumTotals.rows.item(i).cells;
				var total = oCells[2].innerHTML.replace(",", "");
				balance = parseFloat(parseFloat(balance) + parseFloat(total));
				balanceSum = parseFloat(parseFloat(balanceSum)- parseFloat(total))
				if (parseFloat(balanceSum) < 0) {
					balanceSum = parseFloat(0);
				}

				balance = parseFloat(balance) - parseFloat(summaryTax);
				res = parseFloat(balance) + parseFloat(chen);
				 if (parseFloat(res) >= parseFloat(sumPrice)) {
				 $("#change").val(parseFloat(0).toFixed(2));
				 }
				
				 if (parseFloat(sumPrice) < parseFloat(balance)) {
				 balance = parseFloat(sumPrice);
				 $("#change").val(parseFloat(0).toFixed(2));
				 }
				
				 if (parseFloat(sumPrice) >= parseFloat(res)) {
				 var totalChange = parseFloat(balanceSum)-
				 parseFloat(sumPrice);
				 if(totalChange > 0){
				 $("#change").val(parseFloat(totalChange).toFixed(2));
				 }
								
				 }
				$("#moneyCheck").val(
						balance.toFixed(2).toString().replace(
								/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#creditPrice").val(
						balance.toFixed(2).toString().replace(
								/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$("#moneyTran").val(
						balance.toFixed(2).toString().replace(
								/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				

				
				vatAmount();

				tablesumTotals.deleteRow(numberRun);
				tablesumTotal.deleteRow(numberRun);

			}
		}

	}
	replaseIndex(tablesumTotals);

	
}

function myDeleteCheckTranPrice(count) {
	var tablesumTotal = document.getElementById("checkTable");
	if (tablesumTotal.rows.length > 0) {
		tablesumTotal.deleteRow(count);
	}
}

function summaryTax() {
	var table = document.getElementById("showDeductibleTable");
	var rowLength = table.rows.length;
	var summary = parseFloat(0);

	for (var i = 1; i < rowLength; i++) {
		var oCells = table.rows.item(i).cells;
		var total = parseFloat(oCells[2].innerHTML);
		summary += total;

	}
	if (rowLength <= 0) {
		summary = parseFloat(0);
	}
	if (summary < 0) {
		summary = parseFloat(0);
	}

	$("#summaryTax").val(summary.toFixed(2)*-1);
	vatAmount();
}

function removeTax() {
	var table = document.getElementById("showDeductibleTable");
	var rowLength = table.rows.length;
	var summary = parseFloat(0);
	for (var i = 1; i < rowLength; i++) {
		var oCells = table.rows.item(i).cells;
		var total = parseFloat(oCells[2].innerHTML);
		summaryTa = total;
		summary += total;
	}
	if (rowLength <= 0) {
		summary = parseFloat(0);
	}
	if (summary < 0) {
		summary = parseFloat(0);
	}
	$("#summaryTax").val(summary.toFixed(2));

}

function replaseIndex(str) {
	var suminputmon = 0;

	rows = str.getElementsByTagName('tr');
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			cells[0].innerHTML = i;
			if (cells[2].innerHTML) {
				console.log(suminputmon)
				console.log(cells[2].innerHTML)

				suminputmon = suminputmon
						+ FormatMoneyShowToNumber(cells[2].innerHTML);
			}
			cells[3].innerHTML = "<a onclick='myDeleteSumCreditTranPrice(" + i
					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
		}
		$("#balanceSum").val(suminputmon.toFixed(2));
		$("#balanceSummarys").val(suminputmon.toFixed(2));
		$("#balanceSumShow").val(
				suminputmon.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	}else{
		
		var defualt =  FormatMoneyShowToNumber($("#balanceOfTaxsShow").val());
		$("#balanceSum").val(suminputmon.toFixed(2));
		$("#balanceSumShow").val(
				suminputmon.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#balanceSummarys").val(defualt.toFixed(2));
		$("#balanceSummaryShow").val(
				defualt.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

	}
	
	totalSum();
};
function replaseIndexV1(str) {

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
	totalSum();
}
function replaseIndexV2(str) {

	rows = str.getElementsByTagName('tr')
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			cells[0].innerHTML = i;
			cells[4].innerHTML = "<a onclick='myDeleteFunction(" + i
					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
		}
	}
	totalSum();
}
function replaseIndexV3(str) {
	var sumdect = 0;
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
			sumdect = sumdect + FormatMoneyShowToNumber(cells[2].innerHTML);
		}
	}
	var sumtableBillingList = document.getElementById("sumtableBillingList");
	replaseIndexV4(sumtableBillingList);
	$("#summaryTax").val(
			sumdect.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
					"$1,"));
	var balanceOfTaxs = $("#balanceOfTaxs").val();
	if (balanceOfTaxs > 0) {
		var sumtotal = balanceOfTaxs - sumdect;
		$("#balanceSummarys").val(sumtotal);
		$("#balanceSummaryShow").val(
				sumtotal.toFixed(2).toString().replace(
						/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#creditPrice").val(
				sumtotal.toFixed(2).toString().replace(
						/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#moneyCheck").val(
				sumtotal.toFixed(2).toString().replace(
						/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//		 var sumtableBillingList =
//		 document.getElementById("sumtableBillingList");
//		 replaseIndexV4(sumtableBillingList);
	} else {
		$("#balanceSummarys").val(0.00);
		var sumtableBillingList = document
				.getElementById("sumtableBillingList");
		replaseIndexV4(sumtableBillingList);
	}
	totalSum();

}

function replaseIndexV4(str) {
	var sumInputmon = 0;
	var beforeSaleShow = 0;
	var beforeSaleShow1 = 0;
	var vat = 0;
	var spacial = 0;
	var sale =0;
	var summaryTax =0;
	rows = str.getElementsByTagName('tr')
	if (rows.length > 1) {
		var i, j, cells, customerId;
		for (i = 0, j = rows.length; i < j; ++i) {
			cells = rows[i].getElementsByTagName('td');
			if (!cells.length) {
				continue;
			}
			sumInputmon = sumInputmon
					+ FormatMoneyShowToNumber(cells[9].innerHTML);
			beforeSaleShow = beforeSaleShow
					+ FormatMoneyShowToNumber(cells[4].innerHTML);
			vat = vat + FormatMoneyShowToNumber(cells[7].innerHTML);
			cells[0].innerHTML = i;
//			cells[9].innerHTML = "<a onclick='deleteTableSale(" + i
//					+ ")'><span class='glyphicon glyphicon-trash'></span></a>";
			spacial = spacial + FormatMoneyShowToNumber(cells[6].innerHTML);
			sale = sale + FormatMoneyShowToNumber(cells[5].innerHTML);
			summaryTax= summaryTax + FormatMoneyShowToNumber(cells[8].innerHTML);
			beforeSaleShow1 = beforeSaleShow1+(FormatMoneyShowToNumber(cells[4].innerHTML)-FormatMoneyShowToNumber(cells[5].innerHTML));
		}
	}
	$("#moneyTran").val(
			sumInputmon.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#creditPrice").val(
			sumInputmon.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#moneyCheck").val(
			sumInputmon.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#balanceSummarys").val(sumInputmon.toFixed(2));
	$("#balanceSummary").val(sumInputmon.toFixed(2));

	$("#balanceSummaryShow").val(
			sumInputmon.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#beforeSaleShow").val(
			beforeSaleShow.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#balanceBeforeTaxsShow").val(
			beforeSaleShow1.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#vats").val(vat);
	$("#vatsShow").val(
			vat.toFixed(2).toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

	$("#balanceOfTaxs").val(sumInputmon);
	$("#balanceOfTaxsShow").val(
			sumInputmon.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#sale").val(
			sale.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#salespacial").val(
			spacial.toFixed(2).toString().replace(
					/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	$("#summaryTax").val(summaryTax.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

	totalSum();
	return sumInputmon;
}
function totalSum() {
	var sumtotal = FormatMoneyShowToNumber($("#balanceOfTaxs").val());
	var income = FormatMoneyShowToNumber($("#balanceSumShow").val());
	var summaryTax = FormatMoneyShowToNumber($("#summaryTax").val());
	var total =  (sumtotal-(summaryTax *-1 ));
	if(income > 0){
		var result = total - (income)
		if (result > 0) {
			$("#balanceSummaryShow").val(result.toFixed(2).toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#balanceSummarys").val(result.toFixed(2).toString()
			.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			var  a = 0;
			$("#change").val(a.toFixed(2).toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		} else {
			var notnevite = result * (-1);
			var  a = 0;
			$("#balanceSummaryShow").val(total.toFixed(2).toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#balanceSummarys").val(total.toFixed(2).toString()
			.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			$("#change").val(	notnevite.toFixed(2).toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}
	}else{
		$("#balanceSummaryShow").val(total.toFixed(2).toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#balanceSummarys").val(total.toFixed(2).toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#moneyTran").val(total.toFixed(2).toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#creditPrice").val(total.toFixed(2).toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		$("#moneyCheck").val(total.toFixed(2).toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		
		
	}
	
	
}

function calVat() {
	var userGroup = $("#userGroup").val();
	var vatRate = $("#vatrate").val();
	var inputServiceMoreData = $("#inputServiceMoreData").val();
	var inputServiceAmount = $("#inputServiceAmount").val();
	var inputServiceDiscount = $("#inputServiceDiscount").val();
	var inputSpecialDiscount = $("#inputSpecialDiscount").val();
	var radiovat = document.getElementsByName("radiovat");
	var radioResult = "";
	for (var x = 0; x < radiovat.length; x++) {
		if (radiovat[x].checked) {
			radioResult = radiovat[x].value;
		}
	}
	
	if ($("#userGroup").val() == "") {
		$("#suserGroup").show();
		return $("#userGroup").focus();
	}
	 // ส่วนลด
	var serviceMoreData = parseFloat(inputServiceMoreData); // จำนวนรายการ
	 var specialDiscount = parseFloat(inputSpecialDiscount.replace(",", ""));
	// สว่นลดพิเศษ
	var serviceAmount = FormatMoneyShowToNumber(inputServiceAmount); // จำนวนต่อหน่วย
	
	var amount = parseFloat((serviceMoreData * serviceAmount));
	var amountbefor = parseFloat(((amount - inputServiceDiscount )-inputSpecialDiscount));
	
	var vat = parseFloat((amount * parseFloat(vatRate)/100));
	
	var wt3 = parseFloat((amountbefor * parseFloat(3)/100));
	var wt1 = parseFloat((amountbefor * parseFloat(1)/100));
	
	var sumamount = parseFloat(((amount - inputServiceDiscount )-inputSpecialDiscount));
	var unvat = parseFloat(sumamount - vat);
	var uwt3 = parseFloat((unvat * parseFloat(3)/100));
	var uwt1 = parseFloat((unvat * parseFloat(1)/100));
	
	
	if(userGroup == 2){
		if(radioResult == "beforvat"){
			$("#moneyDed1").val(wt1.toFixed(2));
			
			$("#suserGroup").hide();
		}else if(radioResult == "aftervat"){
			$("#moneyDed1").val(uwt1.toFixed(2));
		}
		
	}else if(userGroup == 3){
		
		if(radioResult == "beforvat"){
			$("#moneyDed1").val(wt3.toFixed(2));
			$("#suserGroup").hide();
		}else if(radioResult == "aftervat"){
			$("#moneyDed1").val(uwt3.toFixed(2));
		}
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


