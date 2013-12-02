using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace Com.Actoz
{
    /// <summary>
    /// AtzLogicalException의 요약 설명입니다.
    /// </summary>
    public class AtzLogicalException : Exception
    {
        public AtzLogicalException(string strMessage):base(strMessage, null){}
        public AtzLogicalException(string strMessage, Exception innerException) : base(strMessage, innerException) { }

        

        public static void ThrowAlertMessage(string strMessage)
        {
            Response.Write(@"
            <script>
                alert('"+strMessage.Replace("'","`").Replace("\n","\\n")  +@"');
                history.back(-1);
            </script>

            ");
            Response.End();
        }

        private static HttpResponse Response
        {
            get { return System.Web.HttpContext.Current.Response; }
        }


    }
}
