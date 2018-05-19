package th.co.maximus;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import th.co.maximus.batch.CallEpisOnline;
import th.co.maximus.controller.ClearingPaymentEpisOffline;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class CallEpisOnlineTest {
	@Autowired
	private CallEpisOnline callEpisOnline;
	
	@Autowired
	private ClearingPaymentEpisOffline clearingPaymentEpisOffline;
	
	@Test
	@Ignore
	public void callRest() {
		callEpisOnline.callOnline();
	}
	
	@Test
	@Ignore
	public void callRestGet() {
		callEpisOnline.callOnlineSyncMasterData();
	}
	
	@Test
	@Ignore
	public void callRestGetGL() {
		callEpisOnline.callOnlineSyncMapGL();
	}
	
	@Test
	@Ignore
	public void test() throws Exception{
		clearingPaymentEpisOffline.callOnlinePayment(1);
	}

}
