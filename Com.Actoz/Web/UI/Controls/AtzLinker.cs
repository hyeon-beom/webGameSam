using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Com.Actoz.Util;

namespace Com.Actoz.Web.UI.Controls
{
    /// <summary>
    /// AtzButton의 요약 설명입니다.
    /// </summary>
    public class AtzLinker : AtzControl
    {
        public AtzLinker()
        {
        }

        private string _href = string.Empty;
        public string href
        {
            get { return this._href; }
            set { this._href = value; }
        }

        private string _target = string.Empty;
        public string target
        {
            get { return this._target; }
            set { this._target = value; }
        }

        private bool _isRemainCurrentParameters = false;
        public bool isRemainCurrentParameters
        {
            get { return this._isRemainCurrentParameters; }
            set { this._isRemainCurrentParameters = value; }
        }

        protected override void OnPreRender(EventArgs e)
        {
            if (this.strField != string.Empty)
            {
                this.objVal = this.Row[this.strField];
            }

        }

        public void SetLink(string strParamName, string strParamVal)
        {
            this._href = this._href == string.Empty ? AtzURL.GetCurrentURL() : this._href;
            this._href = AtzURL.SetQueryString(this._href, strParamName, strParamVal);
        }

        protected override void Render(HtmlTextWriter writer)
        {
            if (this.isRemainCurrentParameters)
            {
                foreach (string strKey in Request.QueryString.AllKeys)
                {
                    //throw new Exception(strKey);
                    if(this._href.ToLower().IndexOf(strKey.ToLower()+"=")<0)
                        this._href = AtzURL.SetQueryString(this._href, strKey, Request[strKey]);
                }
            }

            if(this._href!=string.Empty)
                writer.Write( string.Format( "<a href=\"{0}\" onclick=\"{1}\" target=\"{2}\" />{3}</a>", this._href, this.Attributes["onclick"]!=null?this.Attributes["onclick"]:string.Empty, this._target ,this.strText ));
            else
                writer.Write(string.Format("<a href=\"{0}\" />{1}</a>", "#", this.strText));   
        }
    }
}
