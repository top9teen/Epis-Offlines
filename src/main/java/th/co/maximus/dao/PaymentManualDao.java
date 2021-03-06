package th.co.maximus.dao;


import java.sql.SQLException;
import java.util.List;

import th.co.maximus.bean.PaymentManualBean;
import th.co.maximus.bean.ReportPaymentBean;
import th.co.maximus.bean.ReportPaymentCriteria;
import th.co.maximus.model.ReceiptOfflineModel;
import th.co.maximus.payment.bean.PaymentResultReq;

public interface PaymentManualDao {
	public int insertPayment(PaymentManualBean paymentManualBean);
	public PaymentResultReq findById(int id)throws Exception;
	
	public List<PaymentManualBean> findPaymentManualFromNanualId(long manualId);
	
	public List<ReportPaymentBean> getReportPayment(ReportPaymentCriteria criteria);
	public ReceiptOfflineModel findByManualId(long manualId) throws SQLException;
}
