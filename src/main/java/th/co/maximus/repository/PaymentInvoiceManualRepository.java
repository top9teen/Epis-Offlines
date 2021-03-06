package th.co.maximus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import th.co.maximus.model.PaymentInvoiceManualModel;

@Repository("paymentInvoiceManualRepository")
public interface PaymentInvoiceManualRepository extends JpaRepository<PaymentInvoiceManualModel, Long>{

}
