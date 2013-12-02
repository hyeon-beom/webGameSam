using System;
using System.Web;
using System.Text;
using System.Text.RegularExpressions;

namespace Com.Actoz.Util
{
    public class AtzURL : System.Object
    {
        public AtzURL()
            : base()
        {
        }

        public static string GetBaseURL(string strURL)
        {
            if (strURL.IndexOf("?") != -1)
                return strURL.Substring(0, strURL.IndexOf("?"));
            else if (strURL.IndexOf("#") != -1)
                return strURL.Substring(0, strURL.IndexOf("#"));
            else
                return strURL;
        }

        public static string GetLocation(string strURL)
        {
            if (strURL.IndexOf("#") != -1)
                return strURL.Substring(strURL.IndexOf("#") + 1);
            else
                return string.Empty;
        }

        public static string GetQueryStrings(string strURL)
        {
            string strQueryString = string.Empty;
            if (strURL.IndexOf("?") != -1)
                strQueryString = strURL.Substring(strURL.IndexOf("?") + 1);

            if (strQueryString.IndexOf("#") != -1)
                strQueryString = strQueryString.Substring(0, strQueryString.IndexOf("#"));

            return strQueryString;
        }

        public static string SetQueryString(string strQueryString, string strParam, string strValue)
        {
            string strParamURL = strParam+"="+strValue;
            string strQueryStringRet = strQueryString;
            string strPattern = strParam + @"\=[^\&|^\?]*";
            Regex R = new Regex(strPattern);
            Match m = R.Match(strQueryString);
            if (m.Success)
            {
                string strReplace = m.Value;
                strQueryStringRet = strQueryStringRet.Replace(strReplace, strParamURL);
            }
            else
            {
                strQueryStringRet += (strQueryStringRet.IndexOf("?") == -1 ? "?" : "&");
                strQueryStringRet += strParamURL;
            }

            return strQueryStringRet;
        }

        public static string GetCurrentEncodingURL()
        {
            return HttpUtility.UrlEncode(AtzURL.GetCurrentURL());
        }

        public static string GetCurrentURL()
        {
            string baseURL = HttpContext.Current.Request.Url.ToString().Split('?')[0];
            string[] querys = HttpContext.Current.Request.RawUrl.ToString().Split('?');
            string strReturnURL = baseURL;

            if (querys.Length > 1)
                strReturnURL = strReturnURL + "?" + querys[1];

            return strReturnURL;
        }

        public static string GetCurrentBaseURL()
        {
            return AtzURL.GetBaseURL(AtzURL.GetCurrentURL());
        }

       

        public static string GetProtocol()
        {
            return AtzURL.GetProtocol(AtzURL.GetCurrentURL());
        }

        public static string GetProtocol(string strURL)
        {
            if (strURL.IndexOf(":") != -1)
                return strURL.Substring(0, strURL.IndexOf(":"));
            else
                return string.Empty;
        }

        public static string GetDomain(string strURL)
        {
            string strDomain = strURL;
            if (strDomain.IndexOf(":") != -1)
                strDomain = strDomain.Substring(strDomain.IndexOf(":") + 3);

            if (strURL.IndexOf("/") != -1)
                strDomain = strDomain.Substring(0, strDomain.IndexOf("/"));

            return strDomain;
        }

        #region GetRequestValue Helper ( GetRequestValue )
        public static string GetRequestValue(string strKey, string strInitialValue)
        {
            if (HttpContext.Current.Request[strKey] != null && HttpContext.Current.Request[strKey] != "")
                return HttpContext.Current.Server.UrlDecode(HttpContext.Current.Request[strKey]).ToString();
            else
                return strInitialValue;
        }

        public static long GetRequestValue(string strKey, long n8InitialValue)
        {
            string strValue = GetRequestValue(strKey, null);

            long n8RetVal;

            if (strValue != null)
            {
                try
                {
                    n8RetVal = Convert.ToInt64(strValue, 10);
                }
                catch (FormatException e)
                {
                    e = e = null;
                    n8RetVal = n8InitialValue;
                }
            }
            else
            {
                n8RetVal = n8InitialValue;
            }
            return n8RetVal;
        }

        public static int GetRequestValue(string strKey, int n4InitialValue)
        {
            int n4RetVal = (int)GetRequestValue(strKey, (long)n4InitialValue);
            return n4RetVal;
        }

        public static short GetRequestValue(string strKey, short n2InitialValue)
        {
            short n2RetVal = (short)GetRequestValue(strKey, (long)n2InitialValue);
            return n2RetVal;
        }

        public static byte GetRequestValue(string strKey, byte n1InitialValue)
        {
            byte n1RetVal = (byte)GetRequestValue(strKey, (long)n1InitialValue);
            return n1RetVal;
        }
        #endregion


        

        public static void Redirect(string url)
        {
            HttpContext.Current.Response.Redirect(url);
        }

       

    }
}
