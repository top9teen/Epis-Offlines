package th.co.maximus.report.controller;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import th.co.maximus.bean.ExportPDFReport;
import th.co.maximus.bean.InvEpisOfflineReportBean;
import th.co.maximus.constants.Constants;
import th.co.maximus.service.ReportService;

@Controller
public class EpisReportController {
	
	ReportService reportService;
	private ServletContext context;


	Constants constants;
	
	public void setServletContext(ServletContext servletContext) {
		this.context = servletContext;
	}
	
	
	@RequestMapping(value= {"/previewPaymentEpisOffline"}, method = RequestMethod.POST, produces = "application/json") 
	public void previewReturnStockBySerialHTML(HttpServletRequest request, HttpServletResponse response, Model model,String stockId) throws Exception {
		String JASPER_JRXML_FILENAME = "InvEpisPayment";
		request.setAttribute("documentReport", "-1");
		reportService.inqueryEpisOfflineJSONHandler(request, response, model);
		List<InvEpisOfflineReportBean> collections = (List<InvEpisOfflineReportBean>)request.getAttribute("previewEpisOffilneprint");
		
		if(collections != null) {
			previewEpisOffilneprint(request, response, collections, JASPER_JRXML_FILENAME);
		}
	}
	
	private void previewEpisOffilneprint(HttpServletRequest request, HttpServletResponse response, List<InvEpisOfflineReportBean> collections, final String JASPER_JRXML_FILENAME) throws Exception {
		Map<String, Object> parameters = new HashMap<String, Object>();
		List<InvEpisOfflineReportBean> printCollections = new ArrayList<InvEpisOfflineReportBean>();
		InvEpisOfflineReportBean invObject = (InvEpisOfflineReportBean)collections.get(0);
		ExportPDFReport exportPDFReport = new ExportPDFReport();
		
		
		exportPDFReport.setBranArea(invObject.getBranArea());
		exportPDFReport.setBracnCode(invObject.getBracnCode());
		
		exportPDFReport.setCustNo(invObject.getCustNo());
		exportPDFReport.setCustName(invObject.getCustName());
		exportPDFReport.setDocumentNo(invObject.getDocumentNo());
		exportPDFReport.setBalanceSummary(invObject.getBalanceSummary());
		exportPDFReport.setCustomerAddress(invObject.getCustomerAddress());
		exportPDFReport.setTaxId(invObject.getTaxId());
		exportPDFReport.setRemark(invObject.getRemark());
		

		
		BigDecimal total = invObject.getBalanceSummary();
		
		BigDecimal beforeVat = total.multiply(new BigDecimal(invObject.getVatRate()));
		beforeVat = beforeVat.divide(new BigDecimal(107));
		
		BigDecimal vat = total.subtract(beforeVat);
		
		exportPDFReport.setBeforeVat(beforeVat);
		exportPDFReport.setVat(vat);
		
		String nameService = "";
		nameService = invObject.getBracnCode() + invObject.getBranArea()+ invObject.getSouce();
		
		
		List<String> result = new ArrayList<>();
		for(int i=0; i<collections.size();i++) {
			result = new ArrayList<>();
			InvEpisOfflineReportBean stockObject = (InvEpisOfflineReportBean)collections.get(i);
			
			result.add(stockObject.getPaymentCode());
			
		}
		exportPDFReport.setPaymentCode(result.get(0));
		exportPDFReport.setSouce(nameService);
		parameters.put("ReportSource", invObject);
		
		response.setContentType("application/pdf");

		JasperReport jasperReport = JasperCompileManager.compileReport(context.getRealPath(constants.repotPathc) + File.separatorChar + JASPER_JRXML_FILENAME + "jrxml");
		JRDataSource jrDataSource = (printCollections != null && !printCollections.isEmpty()) ? new JRBeanCollectionDataSource(printCollections) : new JREmptyDataSource();
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, jrDataSource);
        JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());

	}

}
