package th.co.maximus.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import th.co.maximus.bean.MapGLBean;
import th.co.maximus.bean.MasterDataBean;
import th.co.maximus.constants.Constants;
import th.co.maximus.dao.MapGLDao;
import th.co.maximus.payment.bean.PaymentOtherFirstBean;
import th.co.maximus.payment.bean.PaymentResultReq;
import th.co.maximus.service.MasterDataService;
import th.co.maximus.service.PaymentOtherService;

@Controller
public class PayOtherController {
	
	@Autowired
	private PaymentOtherService paymentOtherService;
	
	@Autowired
	MasterDataService masterDataService;
	
	@Autowired
	private MapGLDao mapGLDao;

	
	 @RequestMapping(value = {"/payOther"}, method = RequestMethod.GET)
	    public String payOther(Model model) {
		 List<MasterDataBean> bankCodeList = new ArrayList<>();
			List<MasterDataBean> bankNameList = new ArrayList<>();
			List<MasterDataBean> categoryList = new ArrayList<>();
			List<MasterDataBean> serviceDepartmentList = new ArrayList<>();
		 
			bankCodeList = masterDataService.findAllByBankCode();
			bankNameList = masterDataService.findAllByBankName();
			categoryList = masterDataService.findAllByCategory();
			serviceDepartmentList = masterDataService.findAllByServiceDepartment();
//			serviceNameList = masterDataService.findAllByServiceName();
//			serviceTypeList = masterDataService.findAllByServiceType();
			
			List<MapGLBean> serviceNameList = mapGLDao.findAll();
			List<MapGLBean> serviceTypeList = mapGLDao.findBySource(Constants.MasterData.OTHER);
			
			model.addAttribute("bankCode", bankCodeList);
			model.addAttribute("bankName", bankNameList);
			model.addAttribute("serviceType", serviceTypeList);
			model.addAttribute("serviceName", serviceNameList);
			model.addAttribute("serviceDepartment", serviceDepartmentList);
			model.addAttribute("category", categoryList);
	        return "payOther";
	    }
	 
	 
	 @RequestMapping(value = "/paymenOthertService", method = RequestMethod.POST)
		@ResponseBody
		public String payment(Model model, @RequestBody PaymentOtherFirstBean paymentBean,HttpServletRequest request, HttpServletResponse response) throws Exception {
			int paymentId = 0;
			try {
				paymentId = paymentOtherService.insert(paymentBean);
				
			
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			if(paymentId>0){
				PaymentResultReq paymentResultReq = new PaymentResultReq();
				paymentResultReq=	paymentOtherService.findByid(paymentId);
				request.setAttribute("paymentResultReq",paymentResultReq);  
			}
			return String.valueOf(paymentId);
		}
	 
	 @RequestMapping(value = "/payOtherSuccess", method = RequestMethod.GET)
		public String paymentSuccess(Model model,int idUser,HttpServletRequest request) throws Exception {
			PaymentResultReq paymentResultReq = new PaymentResultReq();
			SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy"); 
			
			if(idUser>0){
				paymentResultReq=	paymentOtherService.findByid(idUser);
				paymentResultReq.setBalanceSummaryStr(commaformatter(paymentResultReq.getBalanceSummary()));
				paymentResultReq.setBalanceOfvatStr(String.format("%,.2f", paymentResultReq.getBalanceOfvat()));
				paymentResultReq.setVatStr(String.format("%,.2f",paymentResultReq.getVat()));
				paymentResultReq.setBeforeVatStr(String.format("%,.2f",paymentResultReq.getBeforeVat()));
				if(paymentResultReq.getDeduction() == null) {
					paymentResultReq.setDeductionStr(String.format("%,.2f",new BigDecimal(0)));
				}else {
					paymentResultReq.setDeductionStr(String.format("%,.2f",paymentResultReq.getDeduction()));
				}
				
				
				paymentResultReq.setBalancePrice(paymentResultReq.getBalanceOfvat().setScale(2, RoundingMode.HALF_DOWN).subtract(paymentResultReq.getBalanceSummary().setScale(2, RoundingMode.HALF_DOWN)));
				
				Date date =  paymentResultReq.getInvoiceDate();
				String invoiceDate = dt.format(date);
				
				Date dateLineDate =  paymentResultReq.getDateLine();
				String dateLineSt = dt.format(dateLineDate);
				
				paymentResultReq.setInvoiceDateRS(invoiceDate);
				paymentResultReq.setDateLineRS(dateLineSt);
				
				request.setAttribute("paymentResultReq",paymentResultReq);  
			}
			
			
			
			return "payOther_1";
		}
	 
	public String commaformatter(BigDecimal bigDecimal) {
		
		
		DecimalFormat formatter = new DecimalFormat("#,###.00");
		String moneyformat = formatter.format(bigDecimal) ;
		
		
		return moneyformat; 
	}
	 
}
