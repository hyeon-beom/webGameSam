
function nxSideBar(strLayerID)
{
	NxControl.apply(this, arguments);
	this.setBG('');
	this.setTop(50);
	this.setLeft(1230);
	this.setWidth(150);
	this.setHeight(700);
		
	this.renderControl=function(objCtl, n4Width, n4Height, n4Left, n4Top, strText)
	{
		this.add(objCtl);
		objCtl.style.fontSize		= "15px";
		objCtl.setBG('');
		objCtl.setWidth(n4Width);
		objCtl.setHeight(n4Height);
		objCtl.setLeft(n4Left);
		objCtl.setTop(n4Top);
		objCtl.src= 'http://nexen.pe.kr/img/button/btn_base02.png';	
		objCtl.setTitle(strText);
		objCtl.show();
	}
	
	this.btnMsg = new NxButton('btnMsg');
	this.renderControl(this.btnMsg, 140, 30, 0, 0, "시스템로그");
	this.btnLog = new NxButton('btnLog');
	this.renderControl(this.btnLog, 140, 30, 0, 30, "전투로그");
	this.btnDiplomacy = new NxButton('btnDiplomacy');
	this.renderControl(this.btnDiplomacy, 140, 30, 0, 60, "외교일람");
	/*
	this.btnBoard = new NxButton('btnBoard');
	this.renderControl(this.btnBoard, 140, 30, 0, 90, "게시판");
	this.btnEnvironment = new NxButton('btnEnvironment');
	this.renderControl(this.btnEnvironment, 140, 30, 0, 120, "환경설정");
	*/
	this.btnMsg.frmLayer.onclick=function()
	{
		if(document.getElementById("nxMsgLogDialog"))
		{
			this.MsgLogDialog.unload();
			this.MsgLogDialog=null;	
		}
		else
		{
			this.MsgLogDialog = new nxMsgLogDialog('nxMsgLogDialog', this);
			this.MsgLogDialog.show();
		}
		
	}
	
	this.btnLog.frmLayer.onclick=function()
	{
		if(document.getElementById("nxMsgCombatLogDialog"))
		{
			this.MsgLogDialog.unload();
			this.MsgLogDialog=null;	
		}
		else
		{
			this.MsgLogDialog = new nxMsgLogDialog('nxMsgCombatLogDialog', this, 3);
			this.MsgLogDialog.show();
		}
		
	}
	
	this.btnDiplomacy.frmLayer.onclick=function()
	{
		this.DipDialog = new nxDiplomacyListDialog('nxDipDialog', this, "외교일람");
		this.DipDialog.show();
	}
	
	
	
}
nxSideBar.prototype = new NxControl();
nxSideBar.prototype.constructor = nxSideBar;