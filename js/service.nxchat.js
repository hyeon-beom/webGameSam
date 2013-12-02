
function nxChat(strLayerID, strMasterName)
{
	NxControl.apply(this, arguments);
	this.setBG('#AEB1B5');
	this.setTop(512);
	this.setLeft(0);
	this.setWidth(500);
	this.setHeight(200);
	this.setLayerIndex(nxLayer.n4Layer_ConfirmWindow);
	
	
	
	
	this.createControl = function(strID, n4Left, n4Top, n4Width, n4height,strText)
	{
		var ctl = new NxControl(strID);
		this.add(ctl);
		ctl.setBG('');
		if(strText)
			ctl.setText(strText);
		ctl.setTop(n4Top);
		ctl.setLeft(n4Left);
		ctl.setWidth(n4Width);
		ctl.setHeight(n4height);
		ctl.setColor("white");
		ctl.setFontSize(15);
		ctl.show();
		
		return ctl;
	}
	//var strchatTag = "<embed height='"+ (this.getHeight()-30) +"' width='"+ (this.getWidth()-20) +"'  src='http://www.gagalive.kr/livechat1.swf?chatroom=nexenpekr&user="+strMasterName+"&encrypt="+strMasterName+"'><param name=wmode value=transparent></embed>"
	var strchatTag ="<iframe id='chatIframe' src='nxChat.aspx' frameborder=0 scrolling=no  height='"+ (this.getHeight()-30) +"' width='"+ (this.getWidth()-20) +"' ></iframe>";
	
	//alert(strchatTag);
	this.chatWindow = this.createControl('chatWindow', 10, 20, this.getWidth(), this.getHeight()-20,strchatTag);

	this.show=function()
	{
		this._show();
	}
	
	
	
	
	//--드래그앤 드랍
	this.barTitle = new NxControl('barTitle'+this.id);
	this.add(this.barTitle);
	this.barTitle.setWidth(this.getWidth()-50);
	this.barTitle.setHeight(150);
	this.barTitle.setBG('#AEB1B5');
	this.barTitle.setAlpha(10);
	this.barTitle.setLayerIndex(nxLayer.n4Layer_ConfirmWindow)
	this.barTitle.show();
	this.barTitle.frmLayer.style.cursor='pointer';
		
	this.isDragStart = false;
	function downHandler(e)
	{
		nxStatic.modal = this.NxControl.parent;
		nxStatic.modal.bX = document.dX-nxStatic.modal.getLeft();
		nxStatic.modal.bY = document.dY-nxStatic.modal.getTop();
		nxStatic.modal.isDragStart
		nxStatic.modal.isDragStart = true;
	}
	function upHandler(e)
	{
		if(nxStatic.modal)
		{
			nxStatic.modal.isDragStart = false;
		}
		nxStatic.modal = null;
	}
	function moveHandler(e)
	{
		if(nxStatic.modal)
		{
			if(nxStatic.modal.isDragStart)
			{
				nxStatic.modal.setLeft(document.dX-nxStatic.modal.bX);
				nxStatic.modal.setTop(document.dY-nxStatic.modal.bY);
			}
		}
	}
	if(document.all)
	{
		//this.frmLayer.attachEvent("onmousedown", downHandler);
		this.barTitle.frmLayer.onmousedown=function()
		{
			nxStatic.modal = this.NxControl.parent;
			nxStatic.modal.bX = document.dX-nxStatic.modal.getLeft();
			nxStatic.modal.bY = document.dY-nxStatic.modal.getTop();
			nxStatic.modal.isDragStart = true;
		}
		document.attachEvent("onmouseup", upHandler);
		document.attachEvent("onmousemove", moveHandler);
	}
	else
	{
		this.barTitle.frmLayer.addEventListener("mousedown",downHandler,true);
		document.addEventListener("mouseup",upHandler,true);
		document.addEventListener("mousemove",moveHandler,true);
	}	
	
	
	//숨기기 보이기
	//if(document.all)
	//{
		this.n1Mode = 1;
		this.combo = this.createControl('combo', this.getWidth()-25, 2, 20, 20, "▼");
		this.combo.frmLayer.style.cursor='pointer';
		this.combo.setAlt("최소화(마우스로 이동이 가능합니다)");
		this.combo.frmLayer.onclick=function()
		{
			var chatBox = this.NxControl.parent;
			if(chatBox.n1Mode==1)
			{
				chatBox.setTop(692);
				chatBox.setLeft(0);
				chatBox.setHeight(20);
				chatBox.n1Mode=0;
				chatBox.show();
				this.NxControl.setAlt("채팅참여");
				this.NxControl.setText("▲");
				document.getElementById('chatIframe').style.display='none';
			}
			else
			{
				chatBox.setHeight(200);
				chatBox.setLeft(0);
				chatBox.setTop(512);
				chatBox.n1Mode=1;
				chatBox.show();
				this.NxControl.setAlt("채팅종료");
				this.NxControl.setText("▼");
				document.getElementById('chatIframe').style.display='';
			}
		}
	//}
	
}
nxChat.prototype = new NxControl();
nxChat.prototype.constructor = nxChat;