var tUser;
$(document).ready(function() {
	tUser = $('#userList').DataTable({
		"filter" : false,
		"info" : false,
		"columnDefs": [ {
			"searchable": false,
			"orderable": false,
			"targets": [1,3]
		} ]
		});
});


function searchClick() {
	tUser.clear().draw();
	var data = '';
	var dataSend = { "username": $('#name').val() };
	HoldOn.open();
	$.ajax({
        type: "POST",
        url: "/userManageMent/search",
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
	HoldOn.close();
}

function createRow(data, seq) {
    colSeq = (seq + 1);
    colCurId = data.userName;
    colCurName = data.roleCode;
    colBotton = "<a \onClick=\"viewData(" + data.id + ")\"><i class=\"fa fa-file-text-o icon-30\"></a></i> &nbsp; ";
    colBotton += " <a \onClick=\"updateData(" + data.id + ")\"><i class=\"fa fa-pencil-square-o icon-30\"></a></i> &nbsp; ";
    colBotton += " <a \onClick=\"deleteData("+data.id+")\" ><i class=\"	fa fa-trash-o icon-30\"></a></i> &nbsp; ";

    var t = $('#userList').DataTable();
    var rowNode = t.row.add([
        colSeq, colCurId, colCurName,colBotton
    ]).draw(true).node();
    $(rowNode).find('td').eq(0).addClass('center');
    $(rowNode).find('td').eq(1).addClass('center');
    $(rowNode).find('td').eq(2).addClass('center');
    $(rowNode).find('td').eq(3).addClass('center');
}

function viewData(id) {
	alert(id);
}

function updateData(id) {
	alert(id);
}

function deleteData(id) {
	alert(id);
}

function reportClick() {
	
	$('#rptCode').val('RPTxxx');
	$("#reportFrom").attr("action", "/printReport.xls").attr("target", "_blank").submit();
	
}