package th.co.maximus.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import th.co.maximus.bean.MapGLBean;
import th.co.maximus.constants.Constants;

@Service
public class MapGLDaoImp implements MapGLDao{
	
	@Autowired
	DataSource dataSource;
	
	private JdbcTemplate jdbcTemplate;

	public MapGLDaoImp(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	private static final class mapGL implements RowMapper<MapGLBean> {

		@Override
		public MapGLBean mapRow(ResultSet rs, int rowNum) throws SQLException {
			MapGLBean glBean = new MapGLBean();
			glBean.setId(rs.getLong("id"));
			glBean.setGlCode(rs.getString("GL_CODE"));
			glBean.setServiceCode(rs.getString("SERVICE_CODE"));
			glBean.setProductCode(rs.getString("PRODUCT_CODE"));
			glBean.setProductName(rs.getString("PRODUCT_NAME"));
			glBean.setSubProductCode(rs.getString("SUB_PRODUCT_CODE"));
			glBean.setSubProductName(rs.getString("SUB_PRODUCT_NAME"));
			glBean.setServiceName(rs.getString("SERVICE_NAME"));
			glBean.setRevenueTypeCode(rs.getString("REVENUE_TYPE_CODE"));
			glBean.setRevenueTypeName(rs.getString("REVENUE_TYPE_NAME"));
			glBean.setSegMentCode(rs.getString("SEGMENT_CODE"));
			glBean.setSegMentName(rs.getString("SEGMENT_NAME"));
			glBean.setSource(rs.getString("SOURCE"));
			glBean.setStatus(rs.getString("STATUS"));
			glBean.setRemark(rs.getString("REMARK"));
			glBean.setRecordStatus(rs.getString("RECORD_STATUS"));
			
			return glBean;
		}

	}

	@Override
	public List<MapGLBean> findAll() {
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT * FROM map_gl_service_type  ");
		return jdbcTemplate.query(sql.toString() , new mapGL());
	}

	@Override
	public List<MapGLBean> findBySource(String source) {
		StringBuilder sql = new StringBuilder();
		sql.append(" SELECT * FROM map_gl_service_type mg  ");
		sql.append(" WHERE mg.SOURCE = '"+source+"'");
		return jdbcTemplate.query(sql.toString() , new mapGL());
	}

}
