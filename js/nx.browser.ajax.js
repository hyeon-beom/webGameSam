function NxAjax(url)
{
	this.xmlHttp	= null;
	this.responseURL= url?url:'';
	this.method		= null;
	this.debug		= false;
	
	this.createXmlHttpRequest = function (url) 
	{
		var alt = "고객님의 브라우저에 XML객체를 생성하는데 실패하였습니다.\n\n 본 페이지는 IE7.0이상 FireFox에서만 구동됩니다.";
		try 
		{
			//this.xmlHttp = new ActiveXObject("Msxml2.xmlHttp");
			//window.status ="Msxml2.xmlHttp Mode";
			this.xmlHttp = new XMLHttpRequest();
		} 
		catch(e) 
		{
			try
			{
				this.xmlHttp = new ActiveXObject("Msxml2.xmlHttp");
				//window.status ="Msxml2.xmlHttp Mode";
			}
			catch(e2)
			{
				alert(alt);
			}
		}
	}

	this.addParam = function(paramName, paramVal)
	{
		if(this.responseURL.indexOf("?")==-1)
			this.responseURL+= "?"+paramName+"="+escape(paramVal);
		else
			this.responseURL+= "&"+paramName+"="+escape(paramVal);
	}

	this.execute = function(method, owner)
	{
		this.startRequest(this.responseURL, method, owner);
	}
	
	this.startRequest = function (url, method , owner) 
	{
		this.responseURL = url;
		//alert('start');
		this.createXmlHttpRequest();
		//호출되는 정의함수 저장
		if(method)
		{
			this.method	= method;
			this.xmlHttp.onreadystatechange = method;
		}
		
		this.xmlHttp.open("GET", url, true);
		if(owner)
		{
			try
			{
				this.xmlHttp.owner = owner;
			}
			catch(e){}//IE6
		}
		this.xmlHttp.send(null);
		
	}
	
	this.endRequest = function()
	{
		if(this.xmlHttp.readyState == 4) 
		{
			if(this.xmlHttp.status == 200)//정상적인 결과 
			{
				if(this.debug)
				{
					alert("return;\n\n"+this.xmlHttp.responseText);
				}
				else
				{
					return true;//완료
				}
			}
			else if(this.xmlHttp.status == 404)//페이지 없음
			{
				alert('서버에서 404에러를 반환하였습니다');
				return false;
			}
			else if(this.xmlHttp.status == 500)//페이지 에러
			{
				
				//if(confirm('서버에서 500에러(서버에러)를 반환하였습니다\n에러페이지를 보시겠습니까?'))
				//	alert(this.responseURL+"\n\n"+this.xmlHttp.responseText);
				return false;
			}
			
		}

		return false;
	}
	
	//요놈은 예제용일뿐 안쓴다.
	this.handleStateChange = function(method) 
	{
		if(this.xmlHttp.readyState == 4) 
		{
			if(this.xmlHttp.status == 200) 
			{
				//document.getElementById("results").innerHTML = this.xmlHttp.responseText;
				//alert(this.xmlHttp.responseText);
				//document.write(this.xmlHttp.responseText);
				//document.getElementById("TXT").innerHTML = this.xmlHttp.responseText;
				alert( this.xmlHttp.responseText);
			}
		}
	}
	


}

function NxDataSet(xml, n4TableIndex)
{
	var xmlRows = n4TableIndex?xml.getElementsByTagName("Table"+n4TableIndex):xml.getElementsByTagName("Table");
	this.rows = new Array();
	for(var i=0; i<xmlRows.length; i++)
	{
		this.rows[i] = new NxDataRow(xmlRows[i]);
	}
	//alert(rows.length);
	//alert(rows[0].getElementsByTagName("n4CellX")[0].text);
}
function NxDataRow(xmlRow)
{
	this.xmlRow = xmlRow;
	this.get=function(strField)
	{
		try
		{
			if(document.all)
				return this.xmlRow.getElementsByTagName(strField)[0].text;
			else
				return this.xmlRow.getElementsByTagName(strField)[0].textContent;
		}
		catch(xmlException)
		{
			alert(xmlException + ':'+strField);
		}
	}
	
}




	