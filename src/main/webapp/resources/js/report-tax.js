$(document).ready(function (){
	reportTax = $('#reportTax').DataTable({
		"filter" : false,
		"info" : false,
		"columnDefs": [ {
			"searchable": false,
			"orderable": false,
//			"targets": [1,12]
		} ]
	});
	
	initCriteria();
	search();
	
});
function search() {
	reportTax.clear().draw();
	var data = '';
	var dataSend = { "dateFrom": $('#dateFrom').val(), "dateFromHour": $('#dateFromHour').val(), "dateFromMinute": $('#dateFromMinute').val() 
					,"dateTo": $('#dateTo').val(), "dateToHour": $('#dateToHour').val(), "dateToMinute": $('#dateToMinute').val() ,"typePrint": $('#typePrint').val()
	
	};
	$.ajax({
        type: "POST",
        url: "/histroryPayment/paymentPrint",
        data: JSON.stringify(dataSend),
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (res) {
        	for (var i = 0; i < res.length; i++) {
                    createRow(res[i], i, "reportTax");
                }
        }
	})
};


function createRow(data, seq, table) {
	no = data.numberRun
	invoice = data.invoice;
	documentDate = data.documentDate;
	custName = data.custName;
	taxId = data.taxId;
	branCode = data.branCode;
	beforeVat = data.beforeVat;
	vat = data.vat;
	paidAmount = data.paidAmount;
	recordStatus = data.recordStatus;
	if(recordStatus == "A"){
		recordStatus = "ปกติ";
	}else{
		recordStatus = "ยกเลิก";
	}
	
	var str = documentDate;
	var res = str.split("-");
	var date = res[2] +"/"+res[1]+ "/"+res[0];
	tableInit = $('#'+table).DataTable();
    var rowNode = tableInit.row.add([no, date, invoice, custName, taxId, branCode,beforeVat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), vat.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), paidAmount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"), recordStatus]).draw(true).node();
    $(rowNode).find('td').eq(0).addClass('center');
    $(rowNode).find('td').eq(1).addClass('center');
    $(rowNode).find('td').eq(6).addClass('right');
    $(rowNode).find('td').eq(7).addClass('right');
    $(rowNode).find('td').eq(8).addClass('right');
    $(rowNode).find('td').eq(9).addClass('center');

};

function reportExcel() {
	
	$("#reportTaxForm").attr("action", "/paymentPrintOrder").attr("target", "_blank").submit();
	
}
function reportPDF() {
	
	$("#reportTaxForm").attr("action", "previewPaymentPrintOrder.pdf").attr("target", "_blank").submit();
	
}

function initCriteria(){
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear()+"-"+(month)+"-"+(day);
	
	$('#dateFrom').val(today);
	$('#dateTo').val(today);
	$('#dateFromHour').val('00');
	$('#dateFromMinute').val('00');
	$('#dateToHour').val('23');
	$('#dateToMinute').val('59');
	$('#vat').val('');
	$('#categoryPayment').val('');
}
