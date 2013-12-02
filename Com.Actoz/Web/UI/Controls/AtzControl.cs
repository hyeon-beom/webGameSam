using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;


namespace Com.Actoz.Web.UI.Controls
{
    /// <summary>
    /// nxViewer에 대한 요약 설명입니다.
    /// </summary>
    public class AtzControl : System.Web.UI.WebControls.WebControl
    {
        public AtzControl()
        {

        }

        #region strText
        private string _strText = string.Empty;
        public virtual string strText
        {
            get { return this._strText; }
            set { this._strText = value; }
        }
        #endregion
        protected object objVal = null;

        #region  DataRow Row
        protected DataRow Row
        {
            get
            {
                RepeaterItem item = (RepeaterItem)this.Parent;
                Repeater rpt = (Repeater)item.Parent;

                return ((DataTable)rpt.DataSource).Rows[item.ItemIndex];

            }
        }
        #endregion

        #region OnPreRender
        protected override void OnPreRender(EventArgs e)
        {
            if (this.m_strField != string.Empty)
            {
                this.strText = this.Row[this.m_strField].ToString();
                this.objVal = this.Row[this.m_strField];
            }

            base.OnPreRender(e);
        }
        #endregion

        #region strField
        private string m_strField = string.Empty;
        public string strField
        {
            get { return this.m_strField; }
            set { this.m_strField = value; }
        }
        #endregion

        #region Render
        protected override void Render(HtmlTextWriter writer)
        {
            base.Render(writer);
            writer.Write(this.strText);
        }
        #endregion

        #region WriteAttribute
        protected void WriteAttribute(HtmlTextWriter writer, string strKey, string strValue)
        {
            writer.Write(" " + strKey + "='" + strValue.Replace("'", "\"") + "'");
        }
        #endregion

        #region Request
        protected HttpRequest Request
        {
            get { return System.Web.HttpContext.Current.Request; }
        }
        #endregion 

        #region Response
        protected HttpResponse Response
        {
            get { return System.Web.HttpContext.Current.Response; }
        }
        #endregion 

    }
}
