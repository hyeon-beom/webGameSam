using System;
using System.Data.SqlClient;

namespace Nx.bizLogic
{
	/// <summary>
	/// NxConnectionProvider에 대한 요약 설명입니다.
	/// </summary>
	public class NxConnectionProvider
	{

		private NxConnectionProvider()
		{
		}

		private static NxConnectionProvider m_cp = new NxConnectionProvider();
		public static NxConnectionProvider getInstance()
		{
			return NxConnectionProvider.m_cp;
		}

		private string getConnectionString()
		{
			//return "server=121.254.168.121; uid=stan4ukr; pwd=cjswo21";
			return System.Configuration.ConfigurationSettings.AppSettings["dbSvr1"];
		}

		public SqlConnection getConnection()
		{
			return new System.Data.SqlClient.SqlConnection(this.getConnectionString());
		}
		public SqlConnection getConnection4Init()
		{
			return new System.Data.SqlClient.SqlConnection(this.getConnectionString());
		}
		
		

	}
}
