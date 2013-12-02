function NxControl(strLayerID)
{
	if(!strLayerID)
		return;
	/*	
	if(document.getElementById(strLayerID)
		&& document.getElementById(strLayerID).parentNede
		 && !nxStatic.ignoreControlID)
	{
		alert(strLayerID+'는 이미 사용중인 ID입니다.');
		return;
	}
	*/
		
		
		
	this.frmLayer			= document.createElement("div");
	this.frmLayer.NxControl = this;
	this.frmLayer.setAttribute('controlType', 'NxControl');
	this.id			= strLayerID;
	this.style		= this.frmLayer.style;
	this.style.position		= "absolute";
	this.style.width		= "10px";
	this.style.height		= "10px";
	this.style.zIndex		= 0;
	this.style.left			= "0px";
	this.style.top			= "0px";
	this.style.background	= "#FFFFFF"
	this.style.color		= '';
	//this.style.visibility	= "hidden";
	this.style.display		= 'none';
	this.style.fontSize		= "11px";
	this.style.fontFamily	= ""//"궁서";
	this.style.overflow		= "hidden";//auto,hidden;
	this.parent				= null;
	this.src				= null;
	this.children			= new Array();
	this.visible			= false;

	this.frmLayer.id			 = this.id;
	document.body.appendChild(this.frmLayer);
	//style="position:absolute; width:200px; height:115px; z-index:1; left: 515px; top: 16px;"

	this.setText=function(strText)
	{
		this.frmLayer.innerHTML = strText;
	}
	this.getText=function()
	{
		return this.frmLayer.innerHTML;
	}
	this.show=function()
	{
		this._show();
	}
	this._show=function()
	{
		if(this.src!=null)
		{
			var objID = this.id+'_src'; 
			if(this.newFrm)
				this.newFrm.unload();
			this.newFrm = new NxControl(objID);
			this.add(this.newFrm);
			this.newFrm.setWidth(this.getWidth());
			this.newFrm.setHeight(this.getHeight());
			this.newFrm.setText("<img src='"+this.src+"' style='width:100%;height:100%' />");
			this.newFrm.style.background='';
			this.newFrm.show();
			this.visible=true;
		}
		this.frmLayer.style.display	 = "";
	}
	this.doLater=function(strMethod, interval, strID)
	{
		/*
		setTimeout
		(
			"try{document.getElementById('"+(strID?strID:this.id)+"').NxControl."+strMethod+"}catch(e){alert('쓰레드 수행불가["+strMethod+"] : '+ e);}"
		,	interval
		);	
		*/
		setTimeout
		(
			"try{document.getElementById('"+(strID?strID:this.id)+"').NxControl."+strMethod+"}catch(e){}"
		,	interval
		);	
		
	}
	this.hide=function()
	{
		this._hide();
	}
	this._hide=function()
	{
		this.visible=false;
		this.frmLayer.style.display	 = "none";
	}
	this.style = this.frmLayer.style;

	this.getWidth = function()
	{
		return parseInt(this.frmLayer.style.width);
	}
	this.getHeight = function()
	{
		return parseInt(this.frmLayer.style.height);
	}
	this.setWidth = function(n4With)
	{
		this.frmLayer.style.width = n4With+"px";
	}
	this.setHeight = function(n4Height)
	{
		this.frmLayer.style.height = n4Height+"px";
	}
	this.setSize=function(n4Width, n4Height)
	{
		this.setWidth(n4Width);
		this.setHeight(n4Height);
	}
	this.setLayerIndex=function(n4Index)
	{
		try
		{
			this.style.zIndex		= n4Index;
		}
		catch(e)
		{
			//alert(n4Index+":"+e);
		}
	}
	this.getLayerIndex=function()
	{
		return parseInt(this.style.zIndex);
	}
	this.setAlt=function(strText)
	{
		this.frmLayer.removeAttribute("title");
		this.frmLayer.setAttribute("title",strText);
	}
	this.getAlt=function()
	{
		return this.frmLayer.getAttribute("title");
	}
	this.getLeft = function()
	{
		return parseInt(this.frmLayer.style.left);
	}
	this.getTop = function()
	{
		return parseInt(this.frmLayer.style.top);
	}
	this.setLeft = function(n4Left)
	{
		this.frmLayer.style.left = n4Left+"px";
	}
	this.setTop = function(n4Top)
	{
		this.frmLayer.style.top = n4Top+"px";
	}
	this.setLocation=function(x, y)
	{
		this.setLeft(x);
		this.setTop(y);
	}
	this.setBG=function(strBGCOLOR)
	{
		this.style.background = strBGCOLOR;
	}
	this.setColor=function (strColor)
	{
		this.style.color		= strColor;
	}
	this.setFontSize=function(n1FontSize)
	{
		this.style.fontSize		= n1FontSize+"px";
	}
	
	this.disBackupClick = null;
	this.disBackupDown	= null;
	this.disBackupOver	= null;
	this.disBackupOut	= null;
	this.setDisable=function(isTrue)
	{
		if(isTrue)
			this.hide();
		
		//this.frmLayer.disabled = isTrue;
		if(isTrue)
		{
			this.disBackupClick = this.frmLayer.onclick;
			this.disBackupDown	= this.frmLayer.onmousedown;
			this.disBackupOver	= this.frmLayer.onmouseover;
			this.disBackupOut	= this.frmLayer.onmouseout;
			this.frmLayer.onclick = function(){};
			this.frmLayer.onmousedown = function(){};
			this.frmLayer.onmouseover = function(){this.NxControl.unload();};
			this.frmLayer.onmouseout = function(){};
			this.frmLayer.style.opacity = "0";
			this.frmLayer.style.filter = "alpha(opacity=0)"; 
		}
		else
		{
			this.frmLayer.onclick		= this.disBackupClick;
			this.frmLayer.onmousedown	= this.disBackupDown;
			this.frmLayer.onmouseover	= this.disBackupOver;
			this.frmLayer.onmouseout	= this.disBackupOut;
			this.frmLayer.style.opacity = "1";
		}
		
	}
	this.setAlpha=function(n4Val)
	{
		this.style.filter = "alpha(opacity="+n4Val+")"; 
		this.style.opacity= n4Val/100;
	}
	this.moveCenter=function()
	{
		if(this.parent!=null)
		{
			var width	= parseInt(this.parent.style.width);
			var left	= (width/2)-(this.getWidth()/2);
			this.setLeft(left);
		}
		else
		{
			var width	= nxSystem.screen.width;
			var left	= (width/2)-(this.getWidth()/2);
			this.setLeft(left);
		}
	}
	this.moveVCenter=function()
	{
		if(this.parent!=null)
		{
			var height	= parseInt(this.parent.style.height);
			var top	= (height/2)-(this.getHeight()/2);
			this.setTop(top);
		}
		else
		{
			var height	= nxSystem.screen.height;
			var top	= (height/2)-(this.getHeight()/2);
			this.setTop(top);
		}
	}
	this.add=function(frmChild)
	{
		try
		{
			document.body.removeChild(frmChild.frmLayer);		
		}
		catch(e){}
		finally
		{
			this.children[frmChild.id] = frmChild;
			this.frmLayer.appendChild(frmChild.frmLayer);
			frmChild.parent = this;
		}
	}
	this.get=function(strID)
	{
		return document.getElementById(strID);
	}


	this.strTooltipText = null;
	this.ctlTooltip		= null;
	this.setTooltip=function(strTooltipText, width, height)
	{
		this.strTooltipText=strTooltipText;			
		if(strTooltipText)
		{
			this.ctlTooltip = new NxControl("tooltip_"+this.id);
			this.ctlTooltip.setSize(width?width:100,height?height:100);
			this.ctlTooltip.setBG('black');
			this.ctlTooltip.setAlpha(80);
			this.ctlTooltip.setText(strTooltipText);
			this.ctlTooltip.setLayerIndex(10000);
			this.ctlTooltip.frmLayer.onclick=function()
			{
				this.NxControl.hide();
			}
			var tooltip = this.ctlTooltip;
			this.frmLayer.onmouseover=function()
			{
				tooltip.setLocation(document.dX+20, document.dY);
				tooltip.show();
				tooltip.doLater("hide()",5*1000);
			}
			this.frmLayer.onmouseout=function()
			{
				tooltip.hide();
			}
			
		}
		else if(this.ctlTooltip)
		{
			this.ctlTooltip.unload();
			this.ctlTooltip = null;
		}
		
		
	}



	this.unload=function()
	{
		try
		{
			this.frmLayer.parentNode.removeChild(this.frmLayer);
			//this.parent.frmLayer.removeChild(this.frmLayer);
			this.visible=false;		
		}
		catch(e)
		{
			//alert('unload 실패:'+this.id);
		}
		finally{}
	}
}

//-----------------------------------------------------------------------



function NxButton(strLayerID)
{
	NxControl.apply(this, arguments);
	
	if(!strLayerID)
		return;

	//if(this.style)
	//	this.style.cursor = 'pointer';
	this.srcMouseOver	= null;
	this.srcMouseOut	= null;
	this.setBG('');
	//this.style.cursor = 'pointer';
	this.setTitle = function(strTitle)
	{
		
		var objID = this.id+'_title'; 
		if(this.get(objID))
			this.get(objID).parentNode.removeChild(this.get(objID));
		var newFrm = new NxControl(objID);
		this.add(newFrm);
		this.btnText=newFrm;
		newFrm.style.zIndex = nxLayer.n4Layer_ButtonText;//최상위
		newFrm.style.fontSize	= this.style.fontSize;
		newFrm.style.fontFamily = this.style.fontFamily;
		newFrm.style.color		= this.style.color;
		var n4chrWidth = parseInt(newFrm.style.fontSize)*strTitle.length;
		var n4chrHeight= parseInt(newFrm.style.fontSize);
		if(this.style.fontWeight=='bold')
			n4chrWidth = n4chrWidth*1.1;

		newFrm.setWidth(n4chrWidth);
		newFrm.setHeight(n4chrHeight);
		newFrm.setText(strTitle);
		newFrm.setBG('');
		newFrm.show();
		newFrm.moveCenter();
		newFrm.moveVCenter();
		newFrm.style.cursor = 'pointer';
		
	
	}
	
	this.frmLayer.onmousedown=function()
	{
		//try{this.onclick(this);}catch(e){}
	}
	this.frmLayer.onmouseup=function()
	{
		//try{this.onclick(this);}catch(e){}
	}
	
	this.frmLayer.onmouseover=function()
	{
		if(this.NxControl.srcMouseOver!=null)
			this.NxControl.src = this.NxControl.srcMouseOver;
		this.NxControl.show();
	}
	
	this.frmLayer.onmouseout=function()
	{
		if(this.NxControl.srcMouseOut!=null)
			this.NxControl.src = this.NxControl.srcMouseOut;
		this.NxControl.show();
	}
	
}
NxButton.prototype = new NxControl();
NxButton.prototype.constructor = NxButton;



function NxDialog(strLayerID)
{
	NxControl.apply(this, arguments);
	
	if(!strLayerID)
		return;

	this.style.fontSize		= "13px";
	this.style.fontFamily	= "궁서";
	this.style.color		= 'white';
	this.setWidth(600);
	this.setHeight(300);
	this.setBG('');
	this.moveCenter();

	this.head = new NxControl('dialogHead_'+this.id);
	this.head.setBG('');
	this.head.setWidth(600);
	this.head.setHeight(43);
	this.head.setLeft(0);
	this.head.setTop(0);
	this.head.src = 'http://nexen.pe.kr/img/dialog/baseDialog_head.png';
	this.head.show();
	this.add(this.head);
	this.body = new NxControl('dialogBody_'+this.id);
	this.body.setBG('');
	this.body.setWidth(600);
	this.body.setHeight(202);
	this.body.setLeft(0);
	this.body.setTop(43);
	this.body.src = 'http://nexen.pe.kr/img/dialog/baseDialog_body.png';
	this.body.show();
	this.add(this.body);
	this.bottom = new NxControl('dialogBottom_'+this.id);
	this.bottom.setBG('');
	this.bottom.setWidth(600);
	this.bottom.setHeight(45);
	this.bottom.setLeft(0);
	this.bottom.setTop(245);
	this.bottom.src = 'http://nexen.pe.kr/img/dialog/baseDialog_bottom.png';
	this.bottom.show();
	this.add(this.bottom);
	this.title = new NxControl('dialogtitle_'+this.id);
	this.title.setBG('');
	this.title.style.fontWeight	= 'bold';
	this.title.style.fontSize = this.style.fontSize;
	this.title.setWidth(200);
	this.title.setHeight(25);
	this.title.setLeft(130);
	this.title.setTop(13);
	this.title.show();
	this.add(this.title);
	this.content = new NxControl('dialogcontent_'+this.id);
	this.content.setBG('');
	this.content.style.fontSize = this.style.fontSize;
	this.content.setWidth(500);
	this.content.setHeight(200);
	this.content.setLeft(50);
	this.content.setTop(50);
	this.content.style.overflow		= "auto";
	this.content.show();
	this.add(this.content);
	this.button = new NxButton('dialogButton_'+this.id);
	this.button.setBG('');
	this.button.setWidth(90);
	this.button.setHeight(30);
	this.button.setLeft(255);
	this.button.setTop(259);
	this.button.style.fontSize		= "15px";
	this.button.src = 'http://nexen.pe.kr/img/button/btn_base.png';	
	this.button.setTitle('닫기');
	this.button.show();
	this.add(this.button);
	this.button.frmLayer.onclick = function(){this.NxControl.parent.hide();this.NxControl.parent.unload();}
	
	this.strCaption			= "제목을 입력하세요.";
	this.strContent			= "내용을 입력하세요.";
	this.setLayerIndex(nxLayer.n4Layer_Dialog);

	this.show = function()
	{
		this.title.setText(this.strCaption);
		this.content.setText(this.strContent);
		this._show();
	}
}
NxDialog.prototype = new NxControl();
NxDialog.prototype.constructor = NxDialog;


function NxSelectBox(strLayerID)
{
	NxControl.apply(this, arguments);
	
	if(!strLayerID)
		return;

	this.style.fontSize		= "13px";
	this.style.fontFamily	= "궁서";
	this.style.color		= 'white';
	this.selectBox = document.createElement("select");
	this.frmLayer.appendChild(this.selectBox);
	this.selectBox.NxControl = this;
	this.setBG('');
	this.setWidth(50);
	this.setHeight(20);
	
	this.setSelectedValue=function(strVal)
	{
		this.selectBox.value = strVal;
		this.onChange(this, strVal, this.getSelectedText());
	}
	this.getSelectedText = function()
	{
		return this.selectBox.options[this.selectBox.selectedIndex].text;
	}
	this.getSelectedValue= function()
	{
		return this.selectBox.options[this.selectBox.selectedIndex].value;
	}
	this.getSelectedIndex= function()
	{
		return this.selectBox.selectedIndex;
	}
			
	this.addItem=function(strText, strValue)
	{
		var option = new Option();
		option.value	= strValue;
        option.text		= strText;
        this.selectBox.options.add(option);
	}
	this.removeItem=function(n4Index)
	{
		this.selectBox.options.remove(n4Index); 
	}
	this.selectBox.onchange=function()
	{
		this.NxControl.onChange(this.NxControl, this.NxControl.getSelectedValue(), this.NxControl.getSelectedText() );
	}
	this.onChange=function(sender, strValue, strText){}
	
}
NxSelectBox.prototype = new NxControl();
NxSelectBox.prototype.constructor = NxSelectBox;


function NxTextBox(strLayerID)
{
	NxControl.apply(this, arguments);
	
	if(!strLayerID)
		return;

	this.style.fontSize		= "13px";
	this.style.fontFamily	= "궁서";
	this.style.color		= 'white';
	this.textBox = document.createElement("input");
	this.textBox.setAttribute("type","text");
	this.frmLayer.appendChild(this.textBox);
	this.textBox.NxControl = this;
	//this.textBox.style = this.style;
	this.setBG('');
	this.setWidth(50);
	this.setHeight(20);
	
	this.setLength=function(n4len)
	{
		this.textBox.setAttribute("maxlength",n4len);
	}
	
	this.getText = function()
	{
		return this.textBox.value;
	}
	this.setText= function(strVal)
	{
		return this.textBox.value = strVal;
	}

}
NxTextBox.prototype = new NxControl();
NxTextBox.prototype.constructor = NxTextBox;


function NxEventDelegate(owner)
{
	this.owner = owner;
	this.events = new Array();
	this.add=function(eventMethod)
	{
		this.events[this.events.length]=eventMethod;
	}
	
	this.execute=function(args)
	{
		for(var i=0;i<this.events.length;i++)
		{
			this.events[i](this.owner, args);
		}
	}
	
	this.clear=function()
	{
		this.events = new Array();
	}
}
/*
var a = new NxEventDelegate();
a.add(function(){alert('aa');});
a.add(function(){alert('bb');});
a.execute();
*/

function NxHashtable()
{
	this.array = new Array();
	
	this.get=function(strKey)
	{
		for(var i=0;i<this.array.length;i++)
		{
			if(this.array[i].strKey = strKey)
				return this.array[i];
		}
		
		return null;
	}
	this.set=function(strKey , val)
	{
		if(this.get(strKey)==null)
		{
			this.array[this.array.length] = val;
			val.strKey = strKey;
		}
		else
			this.get(strKey) = val;
	}
	this.getIndexOf=function(i)
	{
		return this.array[i];
	}
	this.getLength=function()
	{
		return this.array.length;
	}	
}
