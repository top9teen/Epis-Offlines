<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="../commons/includes.jsp"></jsp:include>
<jsp:include page="../commons/sMainStyles.jsp"></jsp:include>

		<!-- sidebar -->
		<div id="wrapper">
			<div id="sidebar-wrapper">
				<nav class="navbar navbar-default sidebar" role="navigation">
				<div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
			      <ul class="nav navbar-nav">

			        <li class="active"><a href="/">หน้าจอหลัก<span style="font-size:18px;" class="pull-right hidden-xs showopacity fa fa-home">
			        </span></a></li>

					<li class="dropdown">
			          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Manage<span class="caret"></span><span style="font-size:18px;" class="pull-right hidden-xs showopacity fa fa-file-text-o"></span></a>
			          <ul class="dropdown-menu forAnimate" role="menu">
			            <li><a href="/userManageMent">UsermanageMent</a></li>
			          </ul>
			        </li>
			        <li class="dropdown">
			          <a href="#" class="dropdown-toggle" data-toggle="dropdown">ชำระค่าบริการ<span class="caret"></span><span style="font-size:18px;" class="pull-right hidden-xs glyphicon glyphicon-usd"></span></a>
			          <ul class="dropdown-menu forAnimate" role="menu">
			            <li><a href="/gotoPayment">ชำระค่าบริการ</a></li>
			            <li><a href="/payOther">ชำระค่าบริการอื่นๆ</a></li>
			          </ul>
			        </li>
			        <li class="dropdown">
			          <a href="#" class="dropdown-toggle" data-toggle="dropdown">ยกเลิกชำระค่าบริการ<span class="caret"></span><span style="font-size:18px;" class="pull-right hidden-xs glyphicon glyphicon-usd"></span></a>
			          <ul class="dropdown-menu forAnimate" role="menu">
			            <li><a href="/cancalPayment">ยกเลิกชำระค่าบริการ</a></li>
			          </ul>
			        </li>
			      </ul>
			    </div>	
				</nav>
			</div>
			<!-- /#sidebar -->
			<!-- main panel -->
<!-- 			<div id="page-content-wrapper"> -->
				
<!-- 				<div id="header-wrapper"> -->
<!-- 				</div> -->
				
<!-- 				<div id="content-wrapper" class="container-fluid"> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div>