function nxCommand(strURL, owner)
{
	this.owner = owner;
	this.strURL = document.location.href.indexOf('nexen.pe.kr')>=0?'http://nexen.pe.kr/gameResponse.aspx':'http://localhost/gameResponse.aspx';
	this.strURL = strURL?strURL:this.strURL;
	//this.strURL = strURL?strURL:'http://localhost/gameResponse.aspx';
	
	this.nxAjax = new NxAjax(this.strURL);
	this.callBack = null;
	this.addParam=function(strParam, strVal)
	{
		this.nxAjax.addParam(strParam, strVal);
	}
	this.execute=function(callBackMethod)
	{
		var strRndParam = 20+Math.floor(Math.random() * 999999);
		this.addParam("strRndParam",strRndParam);//랜덤파라미터를 넘겨 공격오인을 막고 저장페이지 로딩을 막는다.
		
		this.callBack = callBackMethod?callBackMethod:null;
		this.nxAjax.execute(this.response, this);
	}
	this.print=function()
	{
		alert(this.nxAjax.responseURL);
	}
	
	var owner = this;//for IE6
	this.response=function()//this=xmlHttp
	{
		if(this.owner)
		{
			if(this.owner.nxAjax.endRequest())
			{
				
				if(this.owner.callBack)
				{
					this.owner.callBack(this.responseXML, this.responseText, this.owner.owner);
					
				}
			}
		}
		//IE6
		else if(isIE6())
		{
			if(owner.nxAjax.endRequest())
			{
				
				if(owner.callBack)
				{
					owner.callBack(owner.nxAjax.xmlHttp.responseXML, owner.nxAjax.xmlHttp.responseText, owner.owner);
					
				}
			}
			
		}
		
			
	}
}