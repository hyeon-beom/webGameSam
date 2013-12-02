using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;


namespace Com.Actoz.Web.UI.Controls
{
    /// <summary>
    /// AtzViewer의 요약 설명입니다.
    /// </summary>
    public class AtzTextBox : AtzControl
    {

        public string style = string.Empty;
        public string type = "text";
        public string name = string.Empty;
        public string maxlength = string.Empty;
        public string disabled = string.Empty;

        protected string strInnerControlID
        {
            get { return this.ClientID ; }//"_innerControl"
        }

        public string strPostData
        {
            get { return System.Web.HttpContext.Current.Request[this.strInnerControlID] == null ? string.Empty : System.Web.HttpContext.Current.Request[this.strInnerControlID].ToString(); }
        }

        protected override void Render(HtmlTextWriter writer)
        {
            writer.Write("<input");
            WriteAttribute(writer, "type", this.type);
            if(this.name!=string.Empty)
                WriteAttribute(writer, "name", this.name);
            WriteAttribute(writer, "id", strInnerControlID);
            WriteAttribute(writer, "name", strInnerControlID);
            if (this.style != string.Empty)
                WriteAttribute(writer, "style", this.style);
            if (this.maxlength != string.Empty)
                WriteAttribute(writer, "maxlength", this.maxlength);
            if (this.disabled.ToLower() == "true")
                WriteAttribute(writer, "disabled", "true");
            WriteAttribute(writer, "value", this.strText);
            writer.Write("/>");  
        }
    }

}
