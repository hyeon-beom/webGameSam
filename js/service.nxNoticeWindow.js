function nxNoticeWindow(strLayerID, strText, n4GeneralSN)
{
	NxControl.apply(this, arguments);
	
	if(!strLayerID)
		return;
	
	//nxStatic.mainContainer.add(this);
	this.setWidth(400);
	this.setHeight(100);
	this.setBG('');
	this.setLayerIndex(nxLayer.n4Layer_NoticeWindow);
	this.src = 'http://nexen.pe.kr/img/notice/base.png';
	this.moveCenter();
	this.setTop(400);
	//this.moveVCenter();
	this.ctlContent = new NxControl('ctlContent_'+this.id);
	this.add(this.ctlContent);

	this.ctlContent.setHeight(90);
	this.ctlContent.style.fontSize		= "16px";
	this.ctlContent.style.fontFamily	= "±Ã¼­";
	this.ctlContent.style.color		= 'white';
	this.ctlContent.setBG('');
	this.ctlContent.setText(strText);
	this.ctlContent.setLayerIndex(this.getLayerIndex()+1);

	if(n4GeneralSN==null)
	{	
		this.ctlContent.setWidth(this.getWidth()*0.9);
		this.ctlContent.moveCenter();
	}
	else
	{
		this.GeneralFaceControl = new nxGeneralFaceControl('nxGeneralFaceControl', this, n4GeneralSN);		
		this.add(this.GeneralFaceControl);
		this.GeneralFaceControl.setLeft(5);
		this.GeneralFaceControl.setTop(5);
		this.GeneralFaceControl.setWidth(75);
		this.GeneralFaceControl.setHeight(90);
		this.GeneralFaceControl.show();
		this.ctlContent.setWidth(this.getWidth()-this.GeneralFaceControl.getWidth()-20);
		this.ctlContent.setLeft(this.GeneralFaceControl.getWidth()+this.GeneralFaceControl.getLeft()+10);

	}

	this.ctlContent.moveVCenter();
	this.ctlContent.show();
	nxStatic.addNotice(this);
	
	document.onclick = function()
	{
		nxStatic.removeNotice();
	}
	
}
nxNoticeWindow.prototype = new NxControl();
nxNoticeWindow.prototype.constructor = nxNoticeWindow;

function nxConfirmWindow(strLayerID,owner, strText, callBack, n4GeneralSN)
{
	NxControl.apply(this, arguments);
	
	if(!strLayerID)
		return;
	
	//nxStatic.mainContainer.add(this);
	this.setTop(400);
	this.owner = owner;
	this.callBack = callBack;
	this.setWidth(400);
	this.setHeight(150);
	this.setBG('');
	this.setLayerIndex(nxLayer.n4Layer_ConfirmWindow);
	this.src = 'http://nexen.pe.kr/img/notice/base.png';
	this.moveCenter();
	//this.moveVCenter();
	this.ctlContent = new NxControl('ctlContent_'+this.id);
	
	this.ctlContent.setHeight(100);
	this.ctlContent.style.fontSize		= "16px";
	this.ctlContent.style.fontFamily	= "±Ã¼­";
	this.ctlContent.style.color		= 'white';
	this.ctlContent.setBG('');
	this.ctlContent.setText(strText);
	if(n4GeneralSN==null)
	{	
		this.ctlContent.setWidth(this.getWidth()*0.9);
		this.ctlContent.setLeft(10);
		this.ctlContent.setTop(10);
	}
	else
	{
		this.GeneralFaceControl = new nxGeneralFaceControl('nxGeneralFaceControl', this, n4GeneralSN);		
		this.add(this.GeneralFaceControl);
		this.GeneralFaceControl.setLeft(10);
		this.GeneralFaceControl.setTop(10);
		this.GeneralFaceControl.setWidth(75);
		this.GeneralFaceControl.setHeight(90);
		this.GeneralFaceControl.show();
		this.ctlContent.setWidth(this.getWidth()-this.GeneralFaceControl.getWidth()-20);
		this.ctlContent.setLeft(this.GeneralFaceControl.getWidth()+this.GeneralFaceControl.getLeft()+10);
		this.ctlContent.setTop(10);

	}
	
	this.add(this.ctlContent);
	this.ctlContent.setLayerIndex(this.getLayerIndex()+10);
	
	this.ctlContent.show();
	
	this.btnOK = new nxButton('btnOK_'+this.id,"¿¹");
	this.add(this.btnOK);
	this.btnOK.setWidth(80);
	this.btnOK.setHeight(30);
	this.btnOK.style.fontSize		= "16px";
	this.btnOK.style.fontFamily	= "±Ã¼­";
	this.btnOK.style.color		= 'white';
	this.btnOK.setBG('');
	this.btnOK.setLayerIndex(this.getLayerIndex()+1);
	this.btnOK.setLeft(this.getWidth()/2-(this.btnOK.getWidth()+10))
	this.btnOK.setTop(110)
	this.btnOK.show();
	
	this.btnNo = new nxButton('btnNo_'+this.id,"¾Æ´Ï¿À");
	this.add(this.btnNo);
	this.btnNo.setWidth(80);
	this.btnNo.setHeight(30);
	this.btnNo.style.fontSize		= "16px";
	this.btnNo.style.fontFamily	= "±Ã¼­";
	this.btnNo.style.color		= 'white';
	this.btnNo.setBG('');
	this.btnNo.setLayerIndex(this.getLayerIndex()+1);
	this.btnNo.setLeft(this.getWidth()/2+10)
	this.btnNo.setTop(110)
	this.btnNo.show();
	
	this.btnOK.frmLayer.onclick=function()
	{
		this.NxControl.parent.callBack(true, this.NxControl.parent.owner); 	
		this.NxControl.parent.unload();
	}
	this.btnNo.frmLayer.onclick=function()
	{
		this.NxControl.parent.callBack(false, this.NxControl.parent.owner); 	
		this.NxControl.parent.unload();
	}
	
}
nxConfirmWindow.prototype = new NxControl();
nxConfirmWindow.prototype.constructor = nxConfirmWindow;