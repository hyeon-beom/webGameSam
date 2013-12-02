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
    public class AtzPager2 : AtzControl
    {
        private int _n4PageNo;
        public int n4PageNo
        {
            get { return this._n4PageNo; }
            set { this._n4PageNo = value; }
        }

        private int _n4PageSize = 5;
        public int n4PageSize
        {
            get { return this._n4PageSize; }
            set { this._n4PageSize = value; }
        }

        private int _n4TotalRowCount = 0;
        public int n4TotalRowCount
        {
            get { return this._n4TotalRowCount; }
            set { this._n4TotalRowCount = value; }
        }

        private string _strPrevButtonText = "◀";
        public string strPrevButtonText
        {
            get { return this._strPrevButtonText; }
            set { this._strPrevButtonText = value; }
        }

        private string _strNextButtonText = "▶";
        public string strNextButtonText
        {
            get { return this._strNextButtonText; }
            set { this._strNextButtonText = value; }
        }

        private string _strSplitter = ",";
        public string strSplitter
        {
            get { return this._strSplitter; }
            set { this._strSplitter = value; }
        }

        protected int n4PageCount
        {
            get
            {

                int n4Ret = this._n4TotalRowCount / this._n4PageSize;
                n4Ret += this._n4TotalRowCount % this._n4PageSize > 0 ? 1 : 0;

                return n4Ret;
            }
        }

        private int _n4PageArraySize = 5;
        public int n4PageArraySize
        {
            get { return this._n4PageArraySize; }
            set { this._n4PageArraySize = value; }
        }

        public int n4PageArrayNo
        {
            get 
            {
                int n4Ret = this._n4PageNo / this._n4PageArraySize;
                n4Ret += this._n4PageNo % this._n4PageArraySize > 0 ? 1 : 0;

                return n4Ret;
            }
        }    
        
        protected int n4StartPage
        {
            get
            {
                return (n4PageArrayNo-1)*(this.n4PageArraySize)+1;
            }
        }

        protected int n4EndPage
        {
            get
            {
                int n4Ret = this.n4StartPage + this.n4PageArraySize - 1;
                n4Ret = n4Ret > this.n4PageCount ? this.n4PageCount : n4Ret;
                return n4Ret;
            }
        }


        protected override void Render(HtmlTextWriter writer)
        {
            if (this._n4TotalRowCount <= 0)
                return;

            HiddenField ctlCurrentPage = new HiddenField();
            ctlCurrentPage.ID = "n4PageNo";
            ctlCurrentPage.Value = Com.Actoz.Util.AtzURL.GetRequestValue("n4PageNo", "1");
            this.Controls.Add(ctlCurrentPage);

            //이전 페이지 셋
            if (this.n4StartPage > 1)
            {
                Label alBefore = new Label(); 
                alBefore.Text = strPrevButtonText+" ";
                int n4Bf = this.n4StartPage - this._n4PageArraySize;
                n4Bf += this.n4StartPage % this._n4PageArraySize == 0 ? 1 : 0;
                alBefore.Attributes.Add("onclick", "document.getElementById('n4PageNo').value='" + n4Bf + "';__doPostBack('"+this.ID+"')");
                alBefore.Attributes.Add("style", "cursor:pointer");
                this.Controls.Add(alBefore);
            }

            // 숫자 페이저
            for (int i = this.n4StartPage; i <= this.n4EndPage; i++)
            {
                Label alPage = new Label();

                alPage.Text = i.ToString();//"["+i+"] ";
                alPage.Text = i == this.n4PageNo ? "<b>" + alPage.Text + "</b>" : alPage.Text;
                alPage.Attributes.Add("onclick", "document.getElementById('n4PageNo').value='" + i + "';__doPostBack('"+this.ID+"')");
                alPage.Attributes.Add("style", "cursor:pointer");
                
                if (i > this.n4StartPage)
                {
                    Label lblSplit = new Label();
                    lblSplit.Text = strSplitter;
                    this.Controls.Add(lblSplit);
                }
                this.Controls.Add(alPage);
            }
            
            //다음 페이지 셋
            if (this.n4EndPage < this.n4PageCount)
            {
                Label alAfter = new Label();
                alAfter.Text = " "+strNextButtonText;
                alAfter.Attributes.Add("onclick", "document.getElementById('n4PageNo').value='" + (this.n4EndPage + 1) + "';__doPostBack('"+this.ID+"')");
                alAfter.Attributes.Add("style", "cursor:pointer");
                this.Controls.Add(alAfter);
            }

            base.Render(writer);
        }
    }
    
}
