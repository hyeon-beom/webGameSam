using System;

namespace Nx.bizLogic
{
	/// <summary>
	/// NxMailer�� ���� ��� �����Դϴ�.
	/// </summary>
	public class NxMailer
	{
		public NxMailer()
		{
			System.Web.Mail.SmtpMail.Send("nexen@nexen.pe.kr","stan4ukr@naver.com","�����׽�Ʈ","����������");
		}
	}
}
