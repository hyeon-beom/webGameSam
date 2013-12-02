using System;
using System.Text;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using Com.Actoz.Security;

namespace Com.Actoz.Web.Session
{
    public class AtzCookieSessionBase : Object
    {

        public AtzCookieSessionBase()
        {
        }
        public AtzCookieSessionBase(bool isUseEncrypting )
        {
            this._isUseEncrypting = isUseEncrypting;
        }

        protected System.Web.HttpResponse Response
        {
            get { return System.Web.HttpContext.Current.Response; }
        }

        protected System.Web.HttpRequest Request
        {
            get { return System.Web.HttpContext.Current.Request; }
        }

        protected bool _isUseEncrypting = true;

        protected virtual string strCookieEncName
        {
            get { return this._isUseEncrypting ? "enc" : "nenc"; }

        }

        private string _strSessionString = null;
        private string strSessionString
        {
            get
            {
                if (_strSessionString == null)
                {
                    string strEncSession = Request.Cookies[strCookieEncName] == null ? string.Empty : Request.Cookies[strCookieEncName].Value;
                    this._strSessionString = strEncSession!=string.Empty? this.Decrypt(strEncSession):string.Empty;
                }
                return this._strSessionString;
            }
            set
            {
                if (Request.Cookies[strCookieEncName] == null)
                    Response.Cookies.Add(new HttpCookie(strCookieEncName));
                Response.Cookies[strCookieEncName].Value = value!=string.Empty? this.Encrypt(value):string.Empty;
                this._strSessionString = value;
            }
        }

        #region Encrypt
        protected string Encrypt(string strValue)
        {
            if (this._isUseEncrypting)
                return Crypt.EncryptString(strValue);//Crypt.RSAEncrypt(strValue);
            else
            {
                return Convert.ToBase64String(new UTF8Encoding().GetBytes(strValue));
            }
        }
        #endregion

        #region Decrypt
        protected string Decrypt(string strValue)
        {
            if (this._isUseEncrypting)
                return Crypt.DecryptString(strValue);//Crypt.RSADecrypt(strValue);
            else
            {
                 byte[] arrB84 = Convert.FromBase64String(strValue);
                 return new UTF8Encoding().GetString(arrB84);
            }
        }
        #endregion

        #region this[string strKey]
        protected string this[string strKey]
        {
            get
            {
                string[] strKeys = this.strSessionString.Split('$');
                foreach (string strVal in strKeys)
                {
                    string[] strParams = strVal.Split('=');
                    if (strParams.Length > 1 && strKey == strParams[0])
                        return strParams[1];
                }
                return null;    
            }
            set
            {
                int n4Index = this.strSessionString.IndexOf(strKey);
                if ( n4Index== -1)
                {
                    this.strSessionString = string.Format("{0}{1}={2}$", this.strSessionString, strKey, value);
                }
                else
                {
                    int n4Index2 = this.strSessionString.IndexOf('$',n4Index);
                    string strBeforeVal = this.strSessionString.Substring(n4Index, n4Index2 - n4Index+1);
                    this.strSessionString = this.strSessionString.Replace(strBeforeVal, string.Empty);
                    this.strSessionString = string.Format("{0}{1}={2}$", this.strSessionString, strKey, value);
                }
            }
        }
        #endregion

        public virtual string strUserID
        {
            get
            {
                return this["strUserID"];
            }
            private set
            {
                this["strUserID"] = value;
            }
        }

        public virtual void Login(string _strUserID)
        {
            this.strUserID = _strUserID;
        }

        public virtual bool IsLogin()
        {
            return this.strUserID == null || this.strUserID == string.Empty ? false : true;
        }

        public virtual void LogOut()
        {
            this.ClearSession();
        }

        protected void ClearSession()
        {
            this.strSessionString = string.Empty;
        }

        public void update()
        {
            strSessionString = strSessionString;
        }
    }

}