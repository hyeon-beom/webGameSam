using System;
using System.Data;
using System.Data.SqlClient;

namespace Nx.bizLogic
{
	/// <summary>
	/// NxBaseCommand에 대한 요약 설명입니다.
	/// </summary>
	public class NxBaseCommand
	{
		public SqlCommand m_cmd = null;
		private string m_strSPName = string.Empty;
		public NxBaseCommand(string strSPName)
		{
			this.m_strSPName = strSPName;
			this.InitParam();
		}

		public object this[string strParamName]
		{
			set
			{
				if(!this.m_cmd.Parameters.Contains(strParamName))
					throw new Exception(strParamName+" 파라미터는 존재하지 않는 파라미터입니다.");
				else
				{
					this.m_cmd.Parameters[strParamName].Value = value;
				}
			}
		}

		public DataSet execute()
		{
			SqlConnection cn = Nx.bizLogic.NxConnectionProvider.getInstance().getConnection();
			try
			{
				this["@frk_isRequiresNewTransaction"]	= 1;
				this.m_cmd.Connection = cn;
				this.m_cmd.CommandTimeout = 5;
				cn.Open();
				SqlDataAdapter da = new SqlDataAdapter();
				da.SelectCommand = this.m_cmd;
				DataSet ds = new DataSet();
				da.Fill( ds);
				da = null;

				int n4ErrorCode		= 0;
				string strErrorText = string.Empty;
				try
				{
					SqlParameter param_n4ErrorCode = m_cmd.Parameters[ "@frk_n4ErrorCode" ];
					SqlParameter param_strErrorText = m_cmd.Parameters[ "@frk_strErrorText" ];
					n4ErrorCode		= ( int )( param_n4ErrorCode.Value );
					strErrorText	= ( string )( param_strErrorText.Value );
				}
				catch{}
				if(n4ErrorCode!=0)
				{
					
					throw new Exception(strErrorText);

				}
				
				
				cn.Close();
				

				return ds;
			}
			catch(Exception e){throw e;}
			finally
			{
				cn.Close();
			}
	
		}

		private void InitParam()
		{
			SqlConnection cn = Nx.bizLogic.NxConnectionProvider.getInstance().getConnection4Init();
			try
			{
				this.m_cmd = new SqlCommand();
				this.m_cmd.CommandType = System.Data.CommandType.StoredProcedure;
				this.m_cmd.CommandText = m_strSPName;
				this.m_cmd.Connection  = cn;
				this.m_cmd.Connection.Open();
				SqlCommandBuilder.DeriveParameters( m_cmd );
			}
			catch(Exception e){throw e;}
			finally
			{
				cn.Close();
			}
		}
	}
}
