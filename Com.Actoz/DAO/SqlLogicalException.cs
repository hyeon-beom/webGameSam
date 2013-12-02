using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;


namespace Com.Actoz.DAO
{
    /// <summary>
    /// SqlLogicalException의 요약 설명입니다.
    /// </summary>
    public class SqlLogicalException : AtzLogicalException
    {
        public SqlLogicalException(string strMessage, Exception innerException)
            : base(strMessage, innerException)
        {

        }

        public SqlLogicalException(string strErrorMessage, int n4ErrorCode, Exception innerException)
            : base(strErrorMessage, innerException)
        {
            this.n4ErrorCode = n4ErrorCode;
            this.strErrorMessage = strErrorMessage;
        }

        public int n4ErrorCode = 0;
        public string strErrorMessage = string.Empty;

    }

}