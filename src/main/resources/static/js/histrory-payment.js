$(document).ready(function () {
	histroryTB = $('#histroryPaymentTB').DataTable({
		"filter" : false,
		"info" : false,
		"columnDefs": [ {
			"searchable": false,
			"orderable": false
//			"targets": [0,2]
		} ]
		});
	
	search();
	
	$('#clearCriteria').click(function(){
		$('#billAccount').val('');
		search();
	});
});

function search(){
	histroryTB.clear().draw();
	var data = '';
	var dataSend = {"accountNo": $('#billAccount').val()};
	$.ajax({
        type: "POST",
        url: "/histroryPayment/find",
        data: JSON.stringify(dataSend),
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (res) {
        	for (var i = 0; i < res.length; i++) {
                    createRow(res[i], i);
                }
        }
	})
};

function createRow(data, seq) {

	no = seq + 1
	paidDate = data.paidDateStr;
	createDate = data.createDateStr;
	receiptNoManual = data.receiptNoManual;
	branchCode = data.brancharea;
	createBy = data.createBy;
	invoiceNo = data.invoiceNo;
	period = data.period;
	amount = formatDouble(data.amount,2);
	source = data.source;
	paidAmount = formatDouble(data.paidAmount,2);
	vatAmount = formatDouble(data.vatAmount,2);
	recordStatus = data.recordStatus;

	if(data.remark == null || data.remark == ''){
		remark = "-"
	}else{
		remark = data.remark;
	}
	accountNo = data.accountNo;
	
    var t = $('#histroryPaymentTB').DataTable();
    var rowNode = t.row.add([no ,paidDate ,createDate ,receiptNoManual, branchCode, createBy ,invoiceNo ,period , amount, source, paidAmount, vatAmount, recordStatus, remark, accountNo
    ]).draw(true).node();
    $(rowNode).find('td').eq(0).addClass('left');
    $(rowNode).find('td').eq(1).addClass('left');
    $(rowNode).find('td').eq(2).addClass('left');
    $(rowNode).find('td').eq(3).addClass('left');
    $(rowNode).find('td').eq(4).addClass('left');
    $(rowNode).find('td').eq(5).addClass('left');
    $(rowNode).find('td').eq(6).addClass('left');
    $(rowNode).find('td').eq(7).addClass('left');
    $(rowNode).find('td').eq(8).addClass('right');
    $(rowNode).find('td').eq(9).addClass('center');
    $(rowNode).find('td').eq(10).addClass('right');
    $(rowNode).find('td').eq(11).addClass('right');
    $(rowNode).find('td').eq(12).addClass('left');
    $(rowNode).find('td').eq(13).addClass('center');
};

