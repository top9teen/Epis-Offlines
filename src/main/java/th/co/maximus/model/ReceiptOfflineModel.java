package th.co.maximus.model;

import java.math.BigDecimal;
import java.util.Date;

public class ReceiptOfflineModel {
	private String invoiceNo;
	private String receiptNo;
	private Date paidDate;
	private String branchArea;
	private String branchCode;
	private BigDecimal paidAmount;
	private String source;
	private String remark;
	private String accountNo;
	private String manualID;
	
	public ReceiptOfflineModel(){}
	public ReceiptOfflineModel(String invoiceNo,String receiptNo,Date paidDate,String branchArea,String branchCode,BigDecimal paidAmount
			,String source,String remark,String accountNo,String manualID){
		
		this.invoiceNo = invoiceNo;
		this.receiptNo = receiptNo;
		this.paidDate = paidDate;
		this.branchArea = branchArea;
		this.branchCode = branchCode;
		this.paidAmount = paidAmount;
		this.source = source;
		this.remark = remark;
		this.accountNo = accountNo;
		this.manualID = manualID;
		
	}
	
	
	
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public String getReceiptNo() {
		return receiptNo;
	}
	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}
	public Date getPaidDate() {
		return paidDate;
	}
	public void setPaidDate(Date paidDate) {
		this.paidDate = paidDate;
	}
	public String getBranchArea() {
		return branchArea;
	}
	public void setBranchArea(String branchArea) {
		this.branchArea = branchArea;
	}
	public String getBranchCode() {
		return branchCode;
	}
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	public BigDecimal getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(BigDecimal paidAmount) {
		this.paidAmount = paidAmount;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getManualID() {
		return manualID;
	}
	public void setManualID(String manualID) {
		this.manualID = manualID;
	}
	
	
}
