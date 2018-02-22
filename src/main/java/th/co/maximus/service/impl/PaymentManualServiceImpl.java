package th.co.maximus.service.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import th.co.maximus.bean.PaymentManualBean;
import th.co.maximus.constants.Constants;
import th.co.maximus.dao.PaymentManualDao;
import th.co.maximus.payment.bean.PaymentFirstBean;
import th.co.maximus.service.PaymentManualService;

@Service
public class PaymentManualServiceImpl implements PaymentManualService{
	@Autowired
	PaymentManualDao paymentManualDao;


	@Override
	public int insertPaymentManual(PaymentFirstBean paymentBean) {
		PaymentManualBean paymentManualBean = new PaymentManualBean();
		Date date = new Date();
		int userId=0;
		if(StringUtils.isNotBlank(paymentBean.getInvoiceNo())){
			paymentManualBean.setInvoiceNo(paymentBean.getInvoiceNo());
			paymentManualBean.setReceiptNoManual(paymentBean.getDocumentNo());
			paymentManualBean.setPaidDate(new Timestamp(paymentBean.getDeadlines().getTime()));
			paymentManualBean.setBrancharea(Constants.dataUser.BRANCHAREA);
			paymentManualBean.setBranchCode("001");
			paymentManualBean.setPaidAmount(paymentBean.getBalanceSum()+paymentBean.getSummaryTax());
			paymentManualBean.setSource(Constants.dataUser.SOURCE);
			paymentManualBean.setClearing("N");
			paymentManualBean.setRemark(paymentBean.getRemark());
			paymentManualBean.setCreateBy(Constants.dataUser.NAME_USER);
			paymentManualBean.setCreateDate(new Timestamp(date.getTime()));
			paymentManualBean.setUpdateBy(Constants.dataUser.NAME_USER);
			paymentManualBean.setUpdateDate(new Timestamp(date.getTime()));
			paymentManualBean.setRecordStatus("A");
			paymentManualBean.setAccountNo(paymentBean.getCustNo());
			
			if(paymentBean.getBalanceSum()>= paymentBean.getBalanceSummary()){
				paymentManualBean.setPaytype("F");
			}else{
				paymentManualBean.setPaytype("P");
			}
			
			if(paymentBean.getUserGroup().equals("01") || paymentBean.getUserGroup().equals("02") ) {
				if(StringUtils.isNotBlank(paymentBean.getCustName()) ||StringUtils.isNotBlank(paymentBean.getCustAddress() )) {
					paymentManualBean.setDocType("F");
				}else {
					paymentManualBean.setDocType("S");
				}
			}else if(paymentBean.getUserGroup().equals("03")) {
				if(StringUtils.isNotBlank(paymentBean.getCustName()) ||StringUtils.isNotBlank(paymentBean.getCustAddress() ) || StringUtils.isNotBlank(paymentBean.getTaxId())|| StringUtils.isNotBlank(paymentBean.getCustBrach()) ) {
					paymentManualBean.setDocType("F");
				}else {
					paymentManualBean.setDocType("S");
				}
			}

			
			try {
				userId=	paymentManualDao.insertPayment(paymentManualBean);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		return userId;
	}



	
	@Override
	public List<PaymentManualBean> PaymentManualAll() {
		return null;
	}
	
	/*public PaymentManualBean xx() {
		return jdbcTemplate.queryForObject("select * from payment_manual", new PaymentManuaJoin());
	}*/
	



}
