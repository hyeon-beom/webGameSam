using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using Com.Actoz.Web.Session;

namespace Com.Actoz.Web.UI
{
    /// <summary>
    /// AtzPage의 요약 설명입니다.
    /// </summary>
    public class AtzPage : System.Web.UI.Page 
    {
	    public AtzPage()
	    {
            
	    }

        protected AtzCookieSessionBase CookieSession = new AtzCookieSessionBase();

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
        }
    }
}
