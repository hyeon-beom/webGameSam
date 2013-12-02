using System;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.IO;


namespace Com.Actoz.Security  
{
    public class Crypt
    {
        public Crypt() { }

        #region desKey
        // 암호화 키
        private static string desKey
        {
            get { return "dkaghzl!"; }
        }
        #endregion
        
        #region MD5 Hash
        private static string MD5HashCrypt(string val)
        {
            byte[] data = Convert.FromBase64String(val);
            // This is one implementation of the abstract class MD5.  
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] result = md5.ComputeHash(data);
            return Convert.ToBase64String(result);
        }
        #endregion //MD5 Hash

        #region DES암복호화
        public static string EncryptString(string inStr)
        {

            return inStr==string.Empty?string.Empty:DesEncrypt(inStr, desKey).Replace("=", "$").Replace("+", "-").Replace("/", "_");
        }

        //문자열 암호화  
        private static string DesEncrypt(string str, string key)
        {
            //키 유효성 검사  
            byte[] btKey = ConvertStringToByteArrayA(key);
            //키가 8Byte가 아니면 예외발생  
            if (btKey.Length != 8)
            {
                throw (new Exception("Invalid key. Key length must be 8 byte."));
            }
            //소스 문자열  

            byte[] btSrc = ConvertStringToByteArray(str);

            DESCryptoServiceProvider des = new DESCryptoServiceProvider();



            des.Key = btKey;

            des.IV = btKey;



            ICryptoTransform desencrypt = des.CreateEncryptor();



            MemoryStream ms = new MemoryStream();



            CryptoStream cs = new CryptoStream(ms, desencrypt,

             CryptoStreamMode.Write);



            cs.Write(btSrc, 0, btSrc.Length);

            cs.FlushFinalBlock();





            byte[] btEncData = ms.ToArray();



            return (ConvertByteArrayToStringB(btEncData));

        }//end of func DesEncrypt  



        // Public Function  

        public static string DecryptString(string inStr) // 복호화  
        {

            try
            {
                return inStr == string.Empty ? string.Empty : DesDecrypt(inStr, desKey).Replace("$", "=").Replace("-", "+").Replace("_", "/");
            }
            catch// (Exception e)
            {
                //throw new AtzLogicalException(e.Message);
                return string.Empty;
            }

        }



        //문자열 복호화  

        private static string DesDecrypt(string str, string key)
        {

            //키 유효성 검사  

            byte[] btKey = ConvertStringToByteArrayA(key);



            //키가 8Byte가 아니면 예외발생  

            if (btKey.Length != 8)
            {

                throw (new Exception("Invalid key. Key length must be 8 byte."));

            }





            byte[] btEncData = ConvertStringToByteArrayB(str);

            DESCryptoServiceProvider des = new DESCryptoServiceProvider();



            des.Key = btKey;

            des.IV = btKey;



            ICryptoTransform desdecrypt = des.CreateDecryptor();



            MemoryStream ms = new MemoryStream();



            CryptoStream cs = new CryptoStream(ms, desdecrypt,

             CryptoStreamMode.Write);



            cs.Write(btEncData, 0, btEncData.Length);



            cs.FlushFinalBlock();



            byte[] btSrc = ms.ToArray();





            return (ConvertByteArrayToString(btSrc));



        }//end of func DesDecrypt  



        //문자열->유니코드 바이트 배열  

        private static Byte[] ConvertStringToByteArray(String s)
        {

            return (new UnicodeEncoding()).GetBytes(s);

        }



        //유니코드 바이트 배열->문자열  

        private static string ConvertByteArrayToString(byte[] b)
        {

            return (new UnicodeEncoding()).GetString(b, 0, b.Length);

        }



        //문자열->안시 바이트 배열  

        private static Byte[] ConvertStringToByteArrayA(String s)
        {

            return (new ASCIIEncoding()).GetBytes(s);

        }



        //안시 바이트 배열->문자열  

        private static string ConvertByteArrayToStringA(byte[] b)
        {

            return (new ASCIIEncoding()).GetString(b, 0, b.Length);

        }



        //문자열->Base64 바이트 배열  

        private static Byte[] ConvertStringToByteArrayB(String s)
        {

            return Convert.FromBase64String(s);

        }



        //Base64 바이트 배열->문자열  

        private static string ConvertByteArrayToStringB(byte[] b)
        {

            return Convert.ToBase64String(b);

        }



        #endregion //DES암복호화

        #region RSA암복호화

        //RSA 암호화  

        public static string RSAEncrypt(string sValue)
        {
            return RSAEncrypt(sValue, strKeyPublic);
        }
        public static string RSAEncrypt(string sValue, string sPubKey)
        {
            System.Security.Cryptography.RSACryptoServiceProvider oEnc = new RSACryptoServiceProvider(); //암호화  
            oEnc.FromXmlString(sPubKey);
            //암호화할 문자열을 UFT8인코딩  
            byte[] inbuf = (new UTF8Encoding()).GetBytes(sValue);
            //암호화  
            byte[] encbuf = oEnc.Encrypt(inbuf, false);
            //암호화된 문자열 Base64인코딩  
            return Convert.ToBase64String(encbuf);
        }

        //RSA 복호화  
        public static string RSADecrypt(string sValue)
        {
            return RSADecrypt(sValue, strKeyPrivate);
        }
        public static string RSADecrypt(string sValue, string sPrvKey)
        {
            System.Security.Cryptography.RSACryptoServiceProvider oDec = new RSACryptoServiceProvider(); //복호화  
            //개인키로 활성화  
            oDec.FromXmlString(sPrvKey);
            byte[] srcbuf = Convert.FromBase64String(sValue);
            //바이트배열 복호화  
            byte[] decbuf = oDec.Decrypt(srcbuf, false);
            //복호화 바이트배열을 문자열로 변환  
            string sDec = (new UTF8Encoding()).GetString(decbuf, 0, decbuf.Length);
            return sDec;
        }

        public static String GetRSA_PublicKey()
        {
            return strKeyPublic;
        }

        #endregion

        #region key
        private const string strKeyPrivate = "<RSAKeyValue><Modulus>vqeRTb3st2n+MSffXzp9SYK2A4c1+MlmqPFxNzWXGikcFMBU19WJmYEsIMx7OpDWLQgcvqdKjgmS73hhK/ywK4SFSB8+ClmjVRba/DWCU7pUqnxK5eMj8okzPpxu2RBCwumCEmEPnmRdZL+w2GxIjA9/IAXCrOHyFUr94yh20o8=</Modulus><Exponent>AQAB</Exponent><P>9X+v3xnrI2jezQKA+eYyhxkJLJQmXzSaohftvqAQG/ufRcubzyLx8/VxSp8N+fJxjBEwhYKKToeHVZY+a9lfZQ==</P><Q>xs9QU4BjYze1iN3eYdnbQgo9pXmQgc/lLqVG5jTdiQmgUC0gwA6upseE8TXYcncZDmzt/DspxT7H2hMSoZyM4w==</Q><DP>oUkyEjDE+o57UdTDR2qk53zbOh5a11GIBdYSq5oc+0VkbkZGJt+eddhahdvZIszVLGBesFgC5XTExMXgXJqCwQ==</DP><DQ>QTGsoqVAckHLeuVeznG1b9OR4Ziapab5/bDfLhB58T1B3+jci36FEVXuJ3dD0k1x3wQjiooQKYlr2fxVKMAAhw==</DQ><InverseQ>yRvonZNIiSKjxtYTiYprgU9xiHZokVXZq0JEKzbXWqYMLLs6sNcqIj1iBq3Rb25vHczDfa/4/E/+sEnTXo+tQg==</InverseQ><D>AS8bOOdgC/eNi5Ka0YWUd5tnM/hn/maJy6zMLjKYAKKWuQ5EuJ5r31ctBfsfHMr/eYIeY5S4Ys9uaSxPNi24jlne9G1kyurRjo7kP4seqL6Jtvu8q4kQ1u6MVR2DiDG/TQx8wtqtzUCuTWFmQUd8hA7M9cxzF3R4Ux+iU9H1HHk=</D></RSAKeyValue>";
        private const string strKeyPublic =  "<RSAKeyValue><Modulus>vqeRTb3st2n+MSffXzp9SYK2A4c1+MlmqPFxNzWXGikcFMBU19WJmYEsIMx7OpDWLQgcvqdKjgmS73hhK/ywK4SFSB8+ClmjVRba/DWCU7pUqnxK5eMj8okzPpxu2RBCwumCEmEPnmRdZL+w2GxIjA9/IAXCrOHyFUr94yh20o8=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
        #endregion 

        #region create
        /*
         const int PROVIDER_RSA_FULL = 1;
            string CONTAINER_NAME = "??????????????"
            CspParameters cspParams;
            cspParams = new CspParameters(PROVIDER_RSA_FULL);
            cspParams.KeyContainerName = CONTAINER_NAME;
            cspParams.Flags = CspProviderFlags.UseMachineKeyStore;
            cspParams.ProviderName = "Microsoft Strong Cryptographic Provider";
            RSACryptoServiceProvider rsa = new RSACryptoServiceProvider(cspParams);

            string publicPrivateKeyXML = rsa.ToXmlString(true);
            string publicOnlyKeyXML = rsa.ToXmlString(false);

            StreamWriter swPrivate = new StreamWriter("./Key_Private.xml", false);
            swPrivate.Write(publicPrivateKeyXML);
            swPrivate.Close();

            StreamWriter swPublic = new StreamWriter("./Key_Public.xml", false);
            swPublic.Write(publicOnlyKeyXML);
            swPublic.Close();  
        */
        #endregion

    }
 } 
