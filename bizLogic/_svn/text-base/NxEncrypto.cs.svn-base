using System;

namespace Nx.bizLogic
{
	/// <summary>
	/// NxEncrypto에 대한 요약 설명입니다.
	/// </summary>
	public class NxEncrypto
	{
		public NxEncrypto()
		{
			//
			// TODO: 여기에 생성자 논리를 추가합니다.
			//
		}

		private static System.Text.Encoding enDef = System.Text.Encoding.UTF8;

		public static string EncryptString(string strNormalData)
		{
			string ret= string.Empty;
			byte[] bytes = enDef.GetBytes(strNormalData);
			Random rnd = new Random(DateTime.Now.Millisecond);
			string bag = string.Empty;
			for(int i=0; i<bytes.Length;i++)
			{
				string strHead	= rnd.Next(999999).ToString("000000");
				int n4Head2		= rnd.Next(9);
				string strBody	= (bytes[i]+n4Head2).ToString("000");
				bag += strHead+n4Head2+strBody;
			}
			/*
			for(int i=0; i<bag.Length;i++)
			{
				string strSplit	= bag.Substring(i,1);
				byte[] chr = new byte[]{ (byte)Convert.ToInt32(strSplit)};
				ret += enDef.GetString(chr);
			}
			

			return ret;
			*/

			return bag;
		}

		public static string DecryptString(string strEncCode)
		{
			/*
			string strCodeData = string.Empty;
			for(int i=0; i<strEncCode.Length;i++)
			{
				string chr	= strEncCode.Substring(i,1);
				byte[] chrBytes = enDef.GetBytes(chr);
				strCodeData += chrBytes[0].ToString("0");
			}
			string ret= string.Empty;
			for(int i=0; i<strCodeData.Length;i+=10)
			{
				string strSplit	= strCodeData.Substring(i,10);
				string strCode  = strSplit.Substring(7,3);
				byte[] chr = new byte[]{ (byte)Convert.ToInt32(strCode)};
				ret += enDef.GetString(chr);
			}
			*/
			string ret= string.Empty;
			for(int i=0; i<strEncCode.Length;i+=10)
			{
				string strSplit	= strEncCode.Substring(i,10);
				int n4Head2		= Convert.ToInt32(strSplit.Substring(6,1));
				int n4Code		= Convert.ToInt32(strSplit.Substring(7,3))-n4Head2;
				byte[] chr = new byte[]{ (byte)n4Code};
				ret += enDef.GetString(chr);
			}

			return ret;
		}
	}
}
