package th.co.maximus.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import th.co.maximus.bean.DeductionManualBean;
import th.co.maximus.model.DuductionEpisOffline;

@Repository("DeductionManualDao")
public class DeductionManualImpl implements DeductionManualDao{
	@Autowired
	DataSource dataSource;
	private JdbcTemplate jdbcTemplate;
	
	public DeductionManualImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	@Override
	public void insert(DeductionManualBean deductionManualBean) {
		StringBuilder sql = new StringBuilder();
		sql.append(" INSERT INTO deduction_manual ( DEDUCTIONNO, DEDUCTIONTYPE, AMOUNT, PAYMENTDATE, UPDATEDTTM, VERSIONSTAMP, INVOICE_NO,REMARK,CREATE_BY,CREATE_DATE,UPDATE_BY,UPDATE_DATE,RECORD_STATUS,MANUAL_ID) ");
		sql.append(" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ");
		jdbcTemplate.update(sql.toString(),  deductionManualBean.getDeDuctionNo(), deductionManualBean.getDeDuctionType(),deductionManualBean.getaMount(),
				deductionManualBean.getPaymentDate(),deductionManualBean.getUpdateDttm(),deductionManualBean.getVersionStamp(),deductionManualBean.getInvoiceNo(),deductionManualBean.getRemark(),deductionManualBean.getCreateBy(),deductionManualBean.getCreateDate(),
				deductionManualBean.getUpdateBy(),deductionManualBean.getUpdateDate(),deductionManualBean.getRecordStatus(),deductionManualBean.getManualId());
	}
	
	
	
	private static final class DeductionManualJoin implements RowMapper<DeductionManualBean> {

		@Override
		public DeductionManualBean mapRow(ResultSet rs, int rowNum) throws SQLException {
			DeductionManualBean deductionManualBean = new DeductionManualBean();
			deductionManualBean.setDeductionManualId(rs.getLong("DEDUCTION_MANUAL_ID"));
			deductionManualBean.setDeDuctionNo(rs.getString("DEDUCTIONNO"));
			deductionManualBean.setDeDuctionType(rs.getString("DEDUCTIONTYPE"));
			deductionManualBean.setaMount(rs.getLong("AMOUNT"));
			deductionManualBean.setPaymentDate(rs.getTimestamp("PAYMENTDATE"));
			deductionManualBean.setUpdateDttm(rs.getTimestamp("UPDATEDTTM"));
			deductionManualBean.setUpdateSystem(rs.getString("UPDATESYSTEM"));
			deductionManualBean.setUpdateUser(rs.getString("UPDATEUSER"));
			deductionManualBean.setVersionStamp(rs.getLong("VERSIONSTAMP"));
			deductionManualBean.setInvoiceNo(rs.getString("INVOICE_NO"));
			deductionManualBean.setRemark(rs.getString("REMARK"));
			deductionManualBean.setCreateBy(rs.getString("CREATE_BY"));
			deductionManualBean.setCreateDate(rs.getTimestamp("CREATE_DATE"));
			deductionManualBean.setUpdateBy(rs.getString("UPDATE_BY"));
			deductionManualBean.setUpdateDate(rs.getTimestamp("UPDATE_DATE"));
			deductionManualBean.setRecordStatus(rs.getString("RECORD_STATUS"));
			deductionManualBean.setManualId(rs.getLong("MANUAL_ID"));
			return deductionManualBean;
		}

	}

	@Override
	public List<DeductionManualBean> findDeductionManualFromManualId(long manualId) {
		StringBuilder sql = new StringBuilder();
		sql.append("  SELECT * FROM deduction_manual deduction_m where deduction_m.MANUAL_ID = ");
		sql.append(manualId);
		return jdbcTemplate.query(sql.toString(), new DeductionManualJoin());
	}
	@Override
	public List<DuductionEpisOffline> findDeductionManual(long manualId) throws Exception {
		Connection connect = dataSource.getConnection();
		List<DuductionEpisOffline> beanReReq = new ArrayList<DuductionEpisOffline>();
		DuductionEpisOffline bean = new DuductionEpisOffline();
		try {
			StringBuilder sqlStmt = new StringBuilder();
			sqlStmt.append("SELECT ded.DEDUCTIONNO ,ded.DEDUCTIONTYPE,ded.AMOUNT,ded.PAYMENTDATE,ded.INVOICE_NO,ded.REMARK ");
			sqlStmt.append(" FROM deduction_manual ded ");
			sqlStmt.append(" WHERE  ded.MANUAL_ID = ?  ");
			
			
			PreparedStatement preparedStatement = connect.prepareStatement(sqlStmt.toString());
			preparedStatement.setLong(1, manualId);
			ResultSet resultSet = preparedStatement.executeQuery();
			while (resultSet.next()) {
				bean = new DuductionEpisOffline(resultSet.getString(1), resultSet.getString(2), resultSet.getBigDecimal(3), resultSet.getDate(4), resultSet.getString(5), resultSet.getString(6));
				beanReReq.add(bean);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return beanReReq;
	}

}
