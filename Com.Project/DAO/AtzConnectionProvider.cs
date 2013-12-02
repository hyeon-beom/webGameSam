using System;
using System.Text;
using System.Data;
using System.Data.SqlClient;

using Com.Actoz.Data;
namespace Com.Actoz.DAO
{
    /// <summary>
    /// AdminConnectionProvider의 요약 설명입니다.
    /// </summary>
    public class AtzConnectionProvider
    {
        public AtzConnectionProvider()
		{
		}

        protected virtual string GetConnectionString()
        {
            throw new Exception("연결문자를 설정하셔야합니다.");
        }

        public SqlConnection GetConnection()
        {
            return new System.Data.SqlClient.SqlConnection(this.GetConnectionString());
        }
       
    }

}