
function nxDialog(strLayerID, owner)
{
	NxDialog.apply(this, arguments);
	
	if(!strLayerID)
		return;
	if(!owner)
	{
		alert(this.id+'Dialog�� �����ڰ� �����ϴ�!');
		return;
	}
	else
		this.owner = owner;
	//nxStatic.mainContainer.add(this);
	
	this.strContent = '';
	this.moveCenter();
	//this.moveVCenter();
	this.setTop(200);

	this.show = function()
	{
		nxStatic.setDialog(this);
		this.title.setText(this.strCaption);
		this.content.setText(this.strContent);
		this._show();
	}
	
	this.renderControl=function(objCtl, n4Width, n4Height, n4Left, n4Top, strText, src)
	{
		this.add(objCtl);
		objCtl.setFontSize(15);
		objCtl.setBG('');
		objCtl.setWidth(n4Width);
		objCtl.setHeight(n4Height);
		objCtl.setLeft(n4Left);
		objCtl.setTop(n4Top);
		objCtl.setLayerIndex(this.getLayerIndex()+1);
		if(strText && src)
		{
			objCtl.src= src;
			objCtl.setTitle(strText);
		}
		else
		{
			if(strText)
				objCtl.setText(strText);
			if(src)
				objCtl.src= src
		}
		objCtl.show();
	}
	
	//--�巡�׾� ���
	this.barTitle = new NxControl('barTitle'+this.id);
	this.add(this.barTitle);
	this.barTitle.setWidth(this.getWidth());
	this.barTitle.setHeight(30);
	this.barTitle.setBG('#AEB1B5');
	this.barTitle.setAlpha(10);
	this.barTitle.show();
	this.barTitle.frmLayer.style.cursor='pointer';
		
	this.isDragStart = false;
	function downHandler(e)
	{
		nxStatic.modal = this.NxControl.parent;
		nxStatic.modal.bX = document.dX-nxStatic.modal.getLeft();
		nxStatic.modal.bY = document.dY-nxStatic.modal.getTop();
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
	
}
nxDialog.prototype = new NxControl();
nxDialog.prototype.constructor = nxDialog;


function nxInputDialog(strLayerID, owner)
{
	nxDialog.apply(this, arguments);
	
	
	//nxStatic.nxInputDialog = this;
	this.show = function()
	{
		this.title.setText(this.strCaption);
		this.content.setText(this.strContent);
		this._show();
		this.frmLayer.focus();
	}
	
	
	this.frmLayer.onkeydown=function(e)
	{
		var kCode = 0;
		if(document.all)
			kCode=event.keyCode
		else
			kCode=e.which;
		
		if(kCode==27)
		{
			nxStatic.closePopup();
			nxStatic.closeDialog();
		}
		
	}
	
}
nxInputDialog.prototype = new NxControl();
nxInputDialog.prototype.constructor = nxInputDialog;



function nxAmountDialog(strLayerID, owner, strCaption, strText, n4MaxValue)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.owner = owner;
	this.strCaption = strCaption;

	this.button.setTitle('Ȯ��');
	this.lblJob = new NxControl('lbllblJobe'+'_'+this.id);
	this.renderControl(this.lblJob,250, 20,150,100,strText,null);
	this.prgAmount = new nxAmountBar('prgAmount'+this.id, this);
	this.prgAmount.n4MaxValue = n4MaxValue;
	this.renderControl(this.prgAmount,250, 20,150,160,null,null);
	this.lblAmount = new NxControl('lblAmount'+'_'+this.id);
	this.renderControl(this.lblAmount,250, 20,350,165,'1000',null);
	this.prgAmount.onvaluechange=function(n4Value, sender)
	{
		sender.parent.lblAmount.setText(addCommas(n4Value));
		sender.parent.n4Value = n4Value;
	}
	this.prgAmount.setValue(0);
	this.button.frmLayer.onclick = function()
	{
		this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.n4Value);
		this.NxControl.parent.hide();
		this.NxControl.parent.unload();
	}

	this.onsubmit = function(owner, n4Value){}

}
nxAmountDialog.prototype = new NxControl();
nxAmountDialog.prototype.constructor = nxAmountDialog;


function nxTaxDialog(strLayerID, owner)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.owner = owner;
	this.strCaption = "��������";
	
	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = owner.n4BuildingCode==nxStatic.n4BuildingCode_Castle?"�¼�":"������";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"���� : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,100, 20,450,45,"���� : "+owner.n4General,null);

	this.lblPrisoner = new NxControl('lblPrisoner'+'_'+this.id);
	this.renderControl(this.lblPrisoner,100, 20,150,75,"���� : "+owner.n4Prisoner,null);
	this.lblPrivateGeneral = new NxControl('lblPrivateGeneral'+'_'+this.id);
	this.renderControl(this.lblPrivateGeneral,100, 20,300,75,"��� : "+owner.n4PrivateGeneral,null);
	this.lblGold	 = new NxControl('lblGold'+'_'+this.id);
	this.renderControl(this.lblGold,100, 20,450,75,"�� : "+addCommas(owner.n4Gold),null);

	this.lblRice	 = new NxControl('lblRice'+'_'+this.id);
	this.renderControl(this.lblRice,100, 20,150,105,"���� : "+addCommas(owner.n4Rice),null);
	this.lblDurability = new NxControl('lblDurability'+'_'+this.id);
	this.renderControl(this.lblDurability,100, 20,300,105,"�� : "+addCommas(owner.n4Durability),null);
	this.lblSecurity = new NxControl('lblSecurity'+'_'+this.id);
	this.renderControl(this.lblSecurity,100, 20,450,105,"�α� : "+addCommas(owner.n4ZenCount),null);

	this.lblTax	 = new NxControl('lblTax'+'_'+this.id);
	this.renderControl(this.lblTax,100, 20,150,135,"����(%) : "+owner.n1PerTax,null);
	this.n1LikeZen = new NxControl('n1LikeZen'+'_'+this.id);
	this.renderControl(this.n1LikeZen,100, 20,300,135,"���� : "+owner.n1LikeZen,null);
	

	this.button.setTitle('Ȯ��');
	this.lblJob = new NxControl('lbllblJobe'+'_'+this.id);
	this.renderControl(this.lblJob,250, 20,420,185,"%",null);
	this.prgAmount = new nxAmountBar('prgAmount'+this.id, this);
	this.prgAmount.n4MaxValue = 10;
	this.renderControl(this.prgAmount,250, 20,200,180,null,null);
	this.lblAmount = new NxControl('lblAmount'+'_'+this.id);
	this.renderControl(this.lblAmount,250, 20,400,185,'1000',null);
	this.prgAmount.onvaluechange=function(n4Value, sender)
	{
		sender.parent.lblAmount.setText(addCommas(n4Value));
		sender.parent.n4Value = n4Value;
	}
	this.prgAmount.setValue(owner.n1PerTax);
	this.button.frmLayer.onclick = function()
	{
		this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.n4Value);
		this.NxControl.parent.hide();
		this.NxControl.parent.unload();
	}

	this.onsubmit = function(owner, n4Value){}

}
nxTaxDialog.prototype = new NxControl();
nxTaxDialog.prototype.constructor = nxTaxDialog;



function nxGiveDialog(strLayerID, owner)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.owner = owner;
	this.strCaption = "�ֹμ���";
	
	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = owner.n4BuildingCode==nxStatic.n4BuildingCode_Castle?"�¼�":"������";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"���� : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,100, 20,450,45,"���� : "+owner.n4General,null);

	this.lblPrisoner = new NxControl('lblPrisoner'+'_'+this.id);
	this.renderControl(this.lblPrisoner,100, 20,150,75,"���� : "+owner.n4Prisoner,null);
	this.lblPrivateGeneral = new NxControl('lblPrivateGeneral'+'_'+this.id);
	this.renderControl(this.lblPrivateGeneral,100, 20,300,75,"��� : "+owner.n4PrivateGeneral,null);
	this.lblGold	 = new NxControl('lblGold'+'_'+this.id);
	this.renderControl(this.lblGold,100, 20,450,75,"�� : "+addCommas(owner.n4Gold),null);

	this.lblRice	 = new NxControl('lblRice'+'_'+this.id);
	this.renderControl(this.lblRice,100, 20,150,105,"���� : "+addCommas(owner.n4Rice),null);
	this.lblDurability = new NxControl('lblDurability'+'_'+this.id);
	this.renderControl(this.lblDurability,100, 20,300,105,"�� : "+addCommas(owner.n4Durability),null);
	this.lblSecurity = new NxControl('lblSecurity'+'_'+this.id);
	this.renderControl(this.lblSecurity,100, 20,450,105,"�α� : "+addCommas(owner.n4ZenCount),null);

	this.lblTax	 = new NxControl('lblTax'+'_'+this.id);
	this.renderControl(this.lblTax,100, 20,150,135,"����(%) : "+owner.n1PerTax,null);
	this.n1LikeZen = new NxControl('n1LikeZen'+'_'+this.id);
	this.renderControl(this.n1LikeZen,100, 20,300,135,"���� : "+owner.n1LikeZen,null);
	

	this.button.setTitle('Ȯ��');
	this.lblJob = new NxControl('lbllblJobe'+'_'+this.id);
	this.renderControl(this.lblJob,250, 20,160,185,"����",null);
	this.prgAmount = new nxAmountBar('prgAmount'+this.id, this);
	this.prgAmount.n4MaxValue = nxStatic.gameUser.n4MasterRice<100000?nxStatic.gameUser.n4MasterRice:100000;
	this.renderControl(this.prgAmount,250, 20,200,180,null,null);
	this.lblAmount = new NxControl('lblAmount'+'_'+this.id);
	this.renderControl(this.lblAmount,250, 20,400,185,'1000',null);
	this.prgAmount.onvaluechange=function(n4Value, sender)
	{
		sender.parent.lblAmount.setText(addCommas(n4Value));
		sender.parent.n4Value = n4Value;
	}
	this.prgAmount.setValue(0);
	this.button.frmLayer.onclick = function()
	{
		this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.n4Value);
		this.NxControl.parent.hide();
		this.NxControl.parent.unload();
	}

	this.onsubmit = function(owner, n4Value){}

}
nxGiveDialog.prototype = new NxControl();
nxGiveDialog.prototype.constructor = nxGiveDialog;


function nxCastleInfoDialog(strLayerID, owner)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	this.strCaption = '�������� - ' + owner.strCastleName;

	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = owner.n4BuildingCode==nxStatic.n4BuildingCode_Castle?"�¼�":"������";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"���� : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,100, 20,450,45,"���� : "+owner.n4General,null);

	this.lblPrisoner = new NxControl('lblPrisoner'+'_'+this.id);
	this.renderControl(this.lblPrisoner,100, 20,150,75,"���� : "+owner.n4Prisoner,null);
	this.lblPrivateGeneral = new NxControl('lblPrivateGeneral'+'_'+this.id);
	this.renderControl(this.lblPrivateGeneral,100, 20,300,75,"��� : "+owner.n4PrivateGeneral,null);
	this.lblGold	 = new NxControl('lblGold'+'_'+this.id);
	this.renderControl(this.lblGold,100, 20,450,75,"�� : "+addCommas(owner.n4Gold),null);

	this.lblRice	 = new NxControl('lblRice'+'_'+this.id);
	this.renderControl(this.lblRice,150, 20,150,105,"���� : "+addCommas(owner.n4Rice),null);
	this.lblDurability = new NxControl('lblDurability'+'_'+this.id);
	this.renderControl(this.lblDurability,100, 20,300,105,"�� : "+addCommas(owner.n4Durability),null);
	this.lblSecurity = new NxControl('lblSecurity'+'_'+this.id);
	this.renderControl(this.lblSecurity,200, 20,450,105,"�α� : "+addCommas(owner.n4ZenCount),null);

	this.lblTax	 = new NxControl('lblTax'+'_'+this.id);
	this.renderControl(this.lblTax,100, 20,150,135,"����(%) : "+owner.n1PerTax,null);
	this.n1LikeZen = new NxControl('n1LikeZen'+'_'+this.id);
	this.renderControl(this.n1LikeZen,100, 20,300,135,"���� : "+owner.n1LikeZen,null);
}
nxCastleInfoDialog.prototype = new NxControl();
nxCastleInfoDialog.prototype.constructor = nxCastleInfoDialog;



function nxNpcCastleInfoDialog(strLayerID, owner)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	if(owner.n4BuildingCode<nxStatic.n4BuildingCode_Kangjok)
		this.strCaption = '�������� - ' + owner.strCastleName;
	else
		this.strCaption = '�������� - ' + owner.getAlt();

	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = "����";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"���� : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,130, 20,450,45,"��ȣ�� : ������");

	this.lblContent = new NxControl('lblContent'+'_'+this.id);
	var strContent = '';
	if( owner.n4MasterSN==2 )
		strContent = "�߱� ���Ϻ��� �������. �Ѵ뿡�� �ﱹ�ô뿡 �̸������ �߾� ���ο� ���� ����� �ͼ��� �ݺ��� �Դ�";
	else if( owner.n4MasterSN==3 )
		strContent = "184�� �尢 ���� ���� ������ �ھ��� ���ο� ��ȸ Ȳõ(����)�� ������ ���� ��ġ�� ������ �����Ͽ���. ��Ȳ�� ���������� ����(����)�� ���屺���� ��� ���п� ���� 10���� �� ���� �����Ͽ���. �׷��� Ȳ���� ������ ������ �Ϲݹ����� �ݶ��� ��� �Ͼ�� �����ʿ��� �̹����� ħ���� ��ӵǾ� ���������� ��ü�ǰ� ������ �ҰŸ� �ʷ�, ������ ����� �����Ͽ���.";
	else if( owner.n4MasterSN==4 )
		strContent = "BC 3���� ������ AD 1���� ������ �߱��� �Ϲ濡�� Ȱ���� �⸶�������. ������ ����ũ�衤����衤�Ƹ��ư� �� ���� ���� ������ ����ũ �����̶�� ���� ���� �����ϴ�. ���� �����(��ҿ��)�̶�� �θ���. ���� ��Ÿ�̾����� ���Ѵ�. ";
	else if( owner.n4MasterSN==5 )
	{
		strContent = "������ ����� ���ڸ� �Ѿ� �ٴٰǳ� ������ ������� �̰� ���� ������ ���ԵǾ��ٴ� �׵��� �����θ� ���ڱ��̶� �ҷ���. �׵��� �ų��� ���� ������ ������ �絵���̶�� ��������, ���� ������ �����鿡�� ȣ������ ���µ� �ƴϴ�. ����, �׵��� ���� �켭������Ʈ�긵��� ���ù����� �ı����� �����ڶ�� �ҹ��� �鸮�� �־� �������� ȣ����� �ڱ��ϰ� �ִ�. ";
		this.lblNation.setText("���� : ���ڱ�");
	}

	this.renderControl(this.lblContent,400, 150,150,75,strContent,null);
	
}
nxNpcCastleInfoDialog.prototype = new NxControl();
nxNpcCastleInfoDialog.prototype.constructor = nxNpcCastleInfoDialog;


function nxFarmInfoDialog(strLayerID, owner)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.strCaption = '�������� ';
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.execute(callBack);
	function callBack(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var n1BuildingStatus = parseInt(ds.rows[0].get("n1BuildingStatus"));
		dlg.masterPic = new NxControl('taesu_'+dlg.id);
		dlg.renderControl(dlg.masterPic,100,100,24,45,null,dlg.buildingObject.src);
		dlg.lbl_1 = new NxControl('lbl_1'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"������ : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"���� : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"���۷��� : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,100, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"1�� �ִ� ��Ȯ��(���緹��) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"1�� �ִ� ��Ȯ��(��������) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			//---���׷��̵�
			dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
			dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'���׷��̵�',null);
			dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
			dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
			dlg.prgUpgrade.n4MaxValue = 1000;
			dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
			dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
			dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '����');
			dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
			dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
			{
				sender.parent.lblGold.setText('��:'+addCommas(n4Value));
			}
			dlg.prgUpgrade.setValue(700);
			dlg.btnUpgradeOK.frmLayer.onclick=function()
			{
				var dlg = this.NxControl.parent;
				var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_rice].n4Gold * dlg.prgUpgrade.n4Value;
				if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
				{
					Alert('alert_'+this.id, '���� �����մϴ�.');
					return;
				}
				var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
				gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
				//nxStatic.mainContainer.add(gsd);
				gsd.show();
				gsd.onsubmit = function(dlg, selectedItems)
				{
					if(!selectedItems)
						return;
					var cmd = new nxCommand(null, dlg);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingUpgradeStart);
					cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
					cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
					cmd.addParam("n4RequestProductAmount", dlg.prgUpgrade.n4Value);
					cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
					//cmd.print();
					cmd.execute(callBackProduceStart);
					function callBackProduceStart(xml, strText, dlg)
					{
						var ds = new NxDataSet(xml);
						nxStatic.closeDialog();
						new nxFarmInfoDialog(dlg.id, dlg.owner).show();
						if(!eventPoliCriticalCheck(ds))
						{
							var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '�ǹ� ���׷��̵尡 ���۵Ǿ����ϴ�.');
							nw.show();
						}
						nxStatic.gameUser.requestUserInfo();
					}
				}
				
			}
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'�ǹ� ���׷��̵� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			
			mainMethod.jobStart(owner.n4BuildingSN, 2, n4TotalSeconds );
		}
		
	}

}
nxFarmInfoDialog.prototype = new NxControl();
nxFarmInfoDialog.prototype.constructor = nxFarmInfoDialog;




function nxSmithInfoDialog(strLayerID, owner)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.strCaption = 'ö��� ���ȸ�';
	this.smithPic = new NxControl('smith');
	this.renderControl(this.smithPic,100,100,24,45,null,'http://nexen.pe.kr/img/face/smith.jpg');
	this.boxSay = new nxScrollText('boxSay', 10);
	this.renderControl(this.boxSay,400,100,140,45,"��ɼ�. õ������ �������� ���ȸ�ýô�. ö��濣 �����Ϸ� ���̽��ϱ�?",null);
	this.boxSay.setBG('#33500B');
	this.lblItem = new NxControl('lblItem'+'_'+this.id);
	this.renderControl(this.lblItem,350, 20,90,180,"������ ������:",null);
	this.btnItemSelect = new nxButton('btnItemSelect'+'_'+this.id, '�����ۼ���');
	this.renderControl(this.btnItemSelect,80, 30,450,173,null,null);

	this.button.setTitle('���');
	this.button.setLeft(300);
	this.button.show();

	this.buttonSubmit = new nxButton('buttonSubmit','Ȯ��', this);
	this.add(this.buttonSubmit);
	this.buttonSubmit.setTop(259);
	this.buttonSubmit.setLeft(200);
	this.buttonSubmit.show();


	function callBackSmith(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var n1BuildingStatus	= parseInt(ds.rows[0].get("n1BuildingStatus"));
		var n4TotalSeconds		= parseInt(ds.rows[0].get("n4TotalSeconds"));
		if(n4TotalSeconds>0)
		{
			dlg.unload();
			new nxBlackSMDialog(dlg.id, dlg.owner).show();
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_Inchant && n4TotalSeconds<=0)
		{
			var ds2  = new NxDataSet(xml,1);
			var strItemName		= ds2.rows[0].get("strItemName");
			var n4ItemKey	=  ds2.rows[0].get("n4ItemKey");
			var n4ItemSN	=  ds2.rows[0].get("n4ItemSN");
			var n4ItemLevel	=  ds2.rows[0].get("n4ItemLevel");
			var n1ItemCode  =  ds2.rows[0].get("n1ItemCode");
			var n4Inchant  =  ds2.rows[0].get("n4Inchant");
			var strItemOverScript = "<span style='cursor:pointer;' onmouseover='itemInfoViewOver("+n4ItemKey+")' onmouseout='itemInfoViewOut("+n4ItemKey+")'  >"+itemColorByLevel(strItemName,n4ItemLevel,n4Inchant)+"</span>";		

			dlg.lblItem.setText("���õ� ������: "+strItemOverScript+"(��Ȯ�λ���)");
			dlg.boxSay.setText('��~ ���� ��ٸ�����? �̳��� �� ���õǾ����� ��縦 ���� ���� �� ���ʽÿ�.');
			dlg.btnItemSelect.unload();
			dlg.btnItemSelect = new nxButton('btnItemSelect'+'_'+this.id, '��縦ģ��');
			dlg.renderControl(dlg.btnItemSelect,80, 30,450,173,null,null);
			dlg.btnItemSelect.frmLayer.onclick=function()
			{
				function callBackInchantTest(xml, strText, dlg)
				{
					dlg.unload();
					//alert(strText);
					var ds  = new NxDataSet(xml);
					var strItemName = ds.rows[0].get("strItemName");
					var isSuccess	= parseInt(ds.rows[0].get("isSuccess"));
					if(isSuccess==1)
						Alert('ItemInchantSuccess',strItemName+"��(��) û���� �Ҹ��� ���� ��¦�Դϴ�.<BR>�����մϴ�. ������ �����Ͽ����ϴ�.");	
					else
						Alert('ItemInchantFail',strItemName+"��(��) ������������Ƚ��ϴ�.<BR>�ּ��ϰԵ� ������ �����Ͽ����ϴ�.");	
				}
				var dlg = this.NxControl.parent;
				var cmdTest = new nxCommand(null, dlg);
				cmdTest.addParam("n1QueryID", nxStatic.n1QueryID_itemInchantTest);
				cmdTest.addParam("n4BuildingSN", dlg.owner.n4BuildingSN);
				//cmdTest.print();
				cmdTest.execute(callBackInchantTest);
			}
		}

	}
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.execute(callBackSmith);

	

	this.buttonSubmit.frmLayer.onclick=function()
	{
		var owner = this.NxControl.parent;
		var n4BuildingLevel = parseInt(owner.owner.n4BuildingLevel);
		
		if(n4BuildingLevel<4)
		{
			Alert('ItemInchant',"������ �Ͻ÷��� �ǹ������� �ּ� 4 �̻��� �Ǿ���մϴ�.");	
			return;
		}

		if(owner.n4ItemKey)
		{
			function callBackInchant(isTrue, dlg)
			{
				if(isTrue)
				{
					function callBackInchantOK(xml, strText, dlg)
					{
						dlg.unload();
						new nxBlackSMDialog(dlg.id, dlg.owner).show();
						Alert('ItemInchant',"������ ���۵Ǿ����ϴ�.");	
						mainMethod.refresh();
					}
					var cmd = new nxCommand(null, dlg);
					cmd.addParam("n1QueryID"		, nxStatic.n1QueryID_itemInchant);
					cmd.addParam("n4BuildingSN"	, dlg.owner.n4BuildingSN);
					cmd.addParam("n4ItemKey"	,dlg.n4ItemKey);
					//cmd.print();
					cmd.execute(callBackInchantOK);
				}
			}
			if(nxStatic.gameUser.n4MasterGold>=owner.n4Pay)
				Confirm(owner,"�� "+addCommas(owner.n4Pay)+"�� ����Ͽ�<BR>"+owner.strItemOverScript+"��(��) �����մϴ�.", callBackInchant);
			else
				Alert('noItem',"�� "+addCommas(owner.n4Pay)+"�� �ʿ��մϴ�.");	
		}
		else
			Alert('noItem','��ȭ�Ͻ� �������� �����ϼ���.');
	
	}
		
	this.btnItemSelect.frmLayer.onclick=function()
	{
		var owner = this.NxControl.parent;
		if(this.MyItemListDialog)
		{
			this.MyItemListDialog.unload();
			this.MyItemListDialog = null;
		}
		this.MyItemListDialog = new nxMyItemListDialog('MyItemListDialog', owner, 1);
		this.MyItemListDialog.show();

		
		this.MyItemListDialog.onsubmit = function(dlg, selectedItems)
		{
			if(!selectedItems)
				return;


			var strItemName = selectedItems[0].row['strItemName'];
			var n4ItemKey	= parseInt(selectedItems[0].row['n4ItemKey']);
			var n4ItemSN	= parseInt(selectedItems[0].row['n4ItemSN']);
			var n4ItemLevel	= parseInt(selectedItems[0].row['n4ItemLevel']);
			var n1ItemCode  = parseInt(selectedItems[0].row['n1ItemCode']);
			var n4Inchant  =  parseInt(selectedItems[0].row['n4Inchant']);
			var n4Pay		= n4ItemLevel*5000;
			var strItemOverScript = "<span style='cursor:pointer;' onmouseover='itemInfoViewOver("+n4ItemKey+")' onmouseout='itemInfoViewOut("+n4ItemKey+")'  >"+itemColorByLevel(strItemName,n4ItemLevel,n4Inchant)+"</span>";		
			if(n1ItemCode==1)
			{
				dlg.n4ItemKey	=	n4ItemKey;
				dlg.strItemName	=	strItemName;
				dlg.n4Pay		=   n4Pay;
				dlg.strItemOverScript= strItemOverScript;
				dlg.lblItem.setText("������ ������: "+strItemOverScript+"(���:��"+addCommas(n4Pay)+")");
				dlg.boxSay.setText(strItemName+'��(��) �������̱���. �˰��ð�����, ������ �ϴٺ��� ���Ⱑ �������⵵ �ϴµ� �����ڽ��ϱ�?');
			}
			else
			{
				dlg.boxSay.setText("�װ� ���Ⱑ �ƴѵ���?");
			}
		}

		

	}
	

}
nxSmithInfoDialog.prototype = new NxControl();
nxSmithInfoDialog.prototype.constructor = nxSmithInfoDialog;

function nxTowerInfoDialog(strLayerID, owner)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.strCaption = '�ó����� ';
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	//cmd.print();
	cmd.execute(callBack);
	function callBack(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var n1BuildingStatus = parseInt(ds.rows[0].get("n1BuildingStatus"));
		dlg.masterPic = new NxControl('taesu_'+dlg.id);
		dlg.renderControl(dlg.masterPic,100,100,24,45,null,dlg.buildingObject.src);
		dlg.lbl_1 = new NxControl('lbl_1'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"������ : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"���� : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"���ݷ��� : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,100, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"���ݷ�(���緹��) : "+addCommas(ds.rows[0].get("n4CircleProduct")),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"���ݷ�(��������) : "+addCommas(ds.rows[0].get("n4CircleProduct2")),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
			
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			//---���׷��̵�
			dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
			dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'���׷��̵�',null);
			dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
			dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
			dlg.prgUpgrade.n4MaxValue = 1000;
			dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
			dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
			dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '����');
			dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
			dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
			{
				sender.parent.lblGold.setText('��:'+addCommas(n4Value));
			}
			dlg.prgUpgrade.setValue(700);
			dlg.btnUpgradeOK.frmLayer.onclick=function()
			{
				var dlg = this.NxControl.parent;
				var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_rice].n4Gold * dlg.prgUpgrade.n4Value;
				if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
				{
					Alert('alert_'+this.id, '���� �����մϴ�.');
					return;
				}
				var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
				gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
				//nxStatic.mainContainer.add(gsd);
				gsd.show();
				gsd.onsubmit = function(dlg, selectedItems)
				{
					if(!selectedItems)
						return;
					var cmd = new nxCommand(null, dlg);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingUpgradeStart);
					cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
					cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
					cmd.addParam("n4RequestProductAmount", dlg.prgUpgrade.n4Value);
					cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
					//cmd.print();
					cmd.execute(callBackProduceStart);
					function callBackProduceStart(xml, strText, dlg)
					{
						var ds = new NxDataSet(xml);
						nxStatic.closeDialog();
						new nxTowerInfoDialog(dlg.id, dlg.owner).show();
						if(!eventPoliCriticalCheck(ds))
						{
							var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '�ǹ� ���׷��̵尡 ���۵Ǿ����ϴ�.');
							nw.show();
						}
						nxStatic.gameUser.requestUserInfo();
					}
				}
				
			}
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'�ǹ� ���׷��̵� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 2, n4TotalSeconds );
		}
		
	}

}
nxTowerInfoDialog.prototype = new NxControl();
nxTowerInfoDialog.prototype.constructor = nxTowerInfoDialog;

function nxHorseInfoDialog(strLayerID, owner, n1Job)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.n1Job = n1Job;
	this.strCaption = '������ ';
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.execute(callBack);
	

	function callBack(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var n1BuildingStatus = parseInt(ds.rows[0].get("n1BuildingStatus"));
		
		dlg.masterPic = new NxControl('taesu_'+dlg.id);
		dlg.renderControl(dlg.masterPic,100,100,24,45,null,dlg.buildingObject.src);
		dlg.lbl_1 = new NxControl('lbl_1'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"������ : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"���� : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"�ǹ����� : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,300, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"���� ������ ����(���緹��) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"���� ������ ����(��������) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			//---����
			if(dlg.n1Job==1)
			{
				dlg.lbl_6 = new NxControl('lbl_6'+'_'+dlg.id);
				dlg.renderControl(dlg.lbl_6,250, 20,100,180,'��������',null);
				dlg.prg = new nxAmountBar('nxAmountBar_'+dlg.id, dlg);
				dlg.renderControl(dlg.prg,250, 20,180,175,null,null);
				dlg.prg.n4MaxValue = parseInt(ds.rows[0].get("n4CircleProduct"));
				dlg.createAM = new NxControl('createAM'+'_'+dlg.id);
				dlg.renderControl(dlg.createAM,250, 20,330,180, '0',null);
				dlg.createGold = new NxControl('createGold'+'_'+dlg.id);
				dlg.renderControl(dlg.createGold,250, 20,410,180, '��:0',null);
				dlg.btnOK = new nxButton('btnOK'+'_'+dlg.id, '����');
				dlg.renderControl(dlg.btnOK,80, 30,480,175,null,null);
				
				if(dlg.prg.n4MaxValue==0)
					Alert('notYet','�ǹ� ������ ���� ������ �Ұ����մϴ�.<br>���׷��̵带 �����ϼ���.', nxStatic.gameUser.n4KunsaSN);
				
				dlg.prg.onvaluechange=function(n4Value, sender)
				{
					sender.parent.createAM.setText('����:'+addCommas(n4Value));
					var price = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold;
					sender.parent.createGold.setText('��:'+addCommas(n4Value*price));
				}
				dlg.prg.setValue(parseInt(ds.rows[0].get("n4CircleProduct"))*0.3);
				dlg.btnOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prg.n4Value;
					if(totalPrice>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert(dlg.id,'���� �����մϴ�.');
						return;
					}
					else if(dlg.prg.n4Value<1)
					{
						Alert(dlg.id,'������ 0���� Ŀ���մϴ�.');
						return;
					}
					
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
					//nxStatic.mainContainer.add(gsd);
					gsd.show();
					gsd.onsubmit = function(dlg, selectedItems)
					{
						if(!selectedItems)
							return;
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingProduceStart);
						cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
						cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
						cmd.addParam("n1CodeProduct"	, nxStatic.n1CodeProduct_horse);
						cmd.addParam("n4RequestProductAmount", dlg.prg.n4Value);
						cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
						//cmd.print();
						cmd.execute(callBackProduceStart);
						function callBackProduceStart(xml, strText, dlg)
						{
							var ds = new NxDataSet(xml, 1);
							nxStatic.closeDialog();
							new nxHorseInfoDialog(dlg.id, dlg.owner).show();
							//alert(strText);
							if(!eventPoliCriticalCheckProduct(ds))
							{
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '���� ������ ���۵Ǿ����ϴ�.');
								nw.show();
							}

							nxStatic.gameUser.requestUserInfo();
						}
					}
					
				}
			}
			else
			{
				//---���׷��̵�
				dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
				dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'���׷��̵�',null);
				dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
				dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
				dlg.prgUpgrade.n4MaxValue = 1000;
				dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
				dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
				dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '����');
				dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
				dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
				{
					sender.parent.lblGold.setText('��:'+addCommas(n4Value));
				}
				dlg.prgUpgrade.setValue(700);
				dlg.btnUpgradeOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prgUpgrade.n4Value;
					if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert('alert_'+this.id, '���� �����մϴ�.');
						return;
					}
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
					//nxStatic.mainContainer.add(gsd);
					gsd.show();
					gsd.onsubmit = function(dlg, selectedItems)
					{
						if(!selectedItems)
							return;
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingUpgradeStart);
						cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
						cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
						cmd.addParam("n4RequestProductAmount", dlg.prgUpgrade.n4Value);
						cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
						//cmd.print();
						cmd.execute(callBackProduceStart);
						function callBackProduceStart(xml, strText, dlg)
						{
							var ds = new NxDataSet(xml);
							nxStatic.closeDialog();
							new nxHorseInfoDialog(dlg.id, dlg.owner).show();
							if(!eventPoliCriticalCheck(ds))
							{
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '�ǹ� ���׷��̵尡 ���۵Ǿ����ϴ�.');
								nw.show();
							}
							nxStatic.gameUser.requestUserInfo();
						}
					}
					
				}
			}
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_work)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'���� ���� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'����: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 1, n4TotalSeconds );
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'�ǹ� ���׷��̵� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 2, n4TotalSeconds );
		}
		
	}
	
	
}
nxHorseInfoDialog.prototype = new NxControl();
nxHorseInfoDialog.prototype.constructor = nxHorseInfoDialog;

function nxBlackSMDialog(strLayerID, owner, n1Job)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.n1Job = n1Job;
	this.strCaption = '���尣 ';
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.execute(callBack);
	
	this.strWaitWeaponName = '';
	
	function callBack(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var n1BuildingStatus = parseInt(ds.rows[0].get("n1BuildingStatus"));
		
		
		dlg.masterPic = new NxControl('taesu_'+dlg.id);
		dlg.renderControl(dlg.masterPic,100,100,24,45,null,dlg.buildingObject.src);
		dlg.lbl_1 = new NxControl('lbl_1'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"������ : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"���� : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"�ǹ����� : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,300, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"���� ������ ����(���緹��) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"���� ������ ����(��������) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		
			
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			if(dlg.n1Job==1)
			{
				//---����
				dlg.selWeapon = new NxSelectBox('selWeapon'+'_'+dlg.id);
				dlg.renderControl(dlg.selWeapon,250, 20,70,180,null,null);
				dlg.selWeapon.addItem("â",nxStatic.n1CodeProduct_spear);
				dlg.selWeapon.addItem("����",nxStatic.n1CodeProduct_bow);
				dlg.lblWeapon = new NxControl('lblWeapon'+'_'+dlg.id);
				dlg.renderControl(dlg.lblWeapon,250, 20,130,180,'����',null);			
				dlg.prg = new nxAmountBar('nxAmountBar_'+dlg.id, dlg);
				dlg.renderControl(dlg.prg,250, 20,180,175,null,null);
				dlg.prg.n4MaxValue = parseInt(ds.rows[0].get("n4CircleProduct"));
				dlg.createAM = new NxControl('createAM'+'_'+dlg.id);
				dlg.renderControl(dlg.createAM,250, 20,330,180, '0',null);
				dlg.createGold = new NxControl('createGold'+'_'+dlg.id);
				dlg.renderControl(dlg.createGold,250, 20,410,180, '��:0',null);
				dlg.btnOK = new nxButton('btnOK'+'_'+dlg.id, '����');
				dlg.renderControl(dlg.btnOK,80, 30,480,175,null,null);
				
				if(dlg.prg.n4MaxValue==0)
					Alert('notYet','�ǹ� ������ ���� ������ �Ұ����մϴ�.<br>���׷��̵带 �����ϼ���.', nxStatic.gameUser.n4KunsaSN);
					
				dlg.selWeapon.selectBox.onchange=function()
				{
					var dlg = this.parentNode.NxControl.parent;
					dlg.prg.selectBtn(dlg.prg.n1SelectedIndex);
					
				}
				dlg.prg.onvaluechange=function(n4Value, sender)
				{
					sender.parent.createAM.setText('����:'+addCommas(n4Value));
					var price = nxStatic.mainContainer.GameUser.priceInfo[dlg.selWeapon.getSelectedValue()].n4Gold;
					sender.parent.createGold.setText('��:'+addCommas(n4Value*price));
				}
				dlg.prg.setValue(parseInt(ds.rows[0].get("n4CircleProduct"))*0.3);
				dlg.btnOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[dlg.selWeapon.getSelectedValue()].n4Gold * dlg.prg.n4Value;
					if(totalPrice>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert(dlg.id,'���� �����մϴ�.');
						return;
					}
					else if(dlg.prg.n4Value<1)
					{
						Alert(dlg.id,'������ 0���� Ŀ���մϴ�.');
						return;
					}
					
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
					//nxStatic.mainContainer.add(gsd);
					gsd.show();
					gsd.onsubmit = function(dlg, selectedItems)
					{
						if(!selectedItems)
							return;
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingProduceStart);
						cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
						cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
						cmd.addParam("n1CodeProduct"	, dlg.selWeapon.getSelectedValue());
						cmd.addParam("n4RequestProductAmount", dlg.prg.n4Value);
						cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
						//cmd.print();
						cmd.execute(callBackProduceStart);
						function callBackProduceStart(xml, strText, dlg)
						{
							var ds = new NxDataSet(xml,1);
							nxStatic.closeDialog();
							new nxBlackSMDialog(dlg.id, dlg.owner).show();
							if(!eventPoliCriticalCheckProduct(ds))
							{
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, dlg.selWeapon.getSelectedText()+' ������ ���۵Ǿ����ϴ�.');
								nw.show();
							}
							nxStatic.gameUser.requestUserInfo();
						}
					}
					
				}
			}
			else
			{
				//---���׷��̵�
				dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
				dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'���׷��̵�',null);
				dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
				dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
				dlg.prgUpgrade.n4MaxValue = 1000;
				dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
				dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
				dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '����');
				dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
				dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
				{
					sender.parent.lblGold.setText('��:'+addCommas(n4Value));
				}
				dlg.prgUpgrade.setValue(700);
				dlg.btnUpgradeOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					//var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prgUpgrade.n4Value;
					if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert('alert_'+this.id, '���� �����մϴ�.');
						return;
					}
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
					//nxStatic.mainContainer.add(gsd);
					gsd.show();
					gsd.onsubmit = function(dlg, selectedItems)
					{
						if(!selectedItems)
							return;
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingUpgradeStart);
						cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
						cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
						cmd.addParam("n4RequestProductAmount", dlg.prgUpgrade.n4Value);
						cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
						//cmd.print();
						cmd.execute(callBackProduceStart);
						function callBackProduceStart(xml, strText, dlg)
						{
							var ds = new NxDataSet(xml);
							nxStatic.closeDialog();
							new nxBlackSMDialog(dlg.id, dlg.owner).show();
							if(!eventPoliCriticalCheck(ds))
							{
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '�ǹ� ���׷��̵尡 ���۵Ǿ����ϴ�.');
								nw.show();
							}
							nxStatic.gameUser.requestUserInfo();
						}
					}
					
				}
			}
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_work)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			var n1CodeProduct			= parseInt(ds.rows[0].get("n1CodeProduct"));
			var strWeaponName			= n1CodeProduct==nxStatic.n1CodeProduct_spear?'â':'����';
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160, strWeaponName+' ���� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'����: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 1, n4TotalSeconds );
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'�ǹ� ���׷��̵� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 2, n4TotalSeconds );
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_Inchant)
		{
			//var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var ds2  = new NxDataSet(xml,1);
			var n4TotalSeconds	= parseInt(ds.rows[0].get("n4TotalSeconds"));

			
			if(n4TotalSeconds>0)
			{
				var strItemName		= ds2.rows[0].get("strItemName");
				var n4ItemKey	=  ds2.rows[0].get("n4ItemKey");
				var n4ItemSN	=  ds2.rows[0].get("n4ItemSN");
				var n4ItemLevel	=  ds2.rows[0].get("n4ItemLevel");
				var n1ItemCode  =  ds2.rows[0].get("n1ItemCode");
				var n4Inchant  =  ds2.rows[0].get("n4Inchant");
				
				var strItemOverScript = "<span style='cursor:pointer;' onmouseover='itemInfoViewOver("+n4ItemKey+")' onmouseout='itemInfoViewOut("+n4ItemKey+")'  >"+itemColorByLevel(strItemName,n4ItemLevel,n4Inchant)+"</span>";		

				dlg.work = new NxControl('work'+'_'+dlg.id);
				dlg.renderControl(dlg.work,250, 20,200,160,'������ ���� ��...',null);
				dlg.work2 = new NxControl('work2'+'_'+dlg.id);
				dlg.renderControl(dlg.work2,250, 20,200,190,'������: '+strItemOverScript,null);
				dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
				dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
				dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
				dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
				mainMethod.jobStart(owner.n4BuildingSN, 2, n4TotalSeconds );
			}
			else
			{
				dlg.unload();
				new nxSmithInfoDialog('nxSmithInfoDialog', owner).show();
			}
		}
		

		
	}
	
	
}
nxBlackSMDialog.prototype = new NxControl();
nxBlackSMDialog.prototype.constructor = nxBlackSMDialog;


function nxBarrackDialog(strLayerID, owner, n1Job)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.n1Job = n1Job;
	this.strCaption = '���� ';
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	//cmd.print();
	cmd.execute(callBack);
	
	
	
	function callBack(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var n1BuildingStatus = parseInt(ds.rows[0].get("n1BuildingStatus"));
		
		dlg.masterPic = new NxControl('taesu_'+dlg.id);
		dlg.renderControl(dlg.masterPic,100,100,24,45,null,dlg.buildingObject.src);
		dlg.lbl_1 = new NxControl('lbl_1'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"������ : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"���� : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"�ǹ����� : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,300, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"���� ������ ����(���緹��) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"���� ������ ����(��������) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			if(dlg.n1Job==1)
			{
				//---����
				dlg.lbl_6 = new NxControl('lbl_6'+'_'+dlg.id);
				dlg.renderControl(dlg.lbl_6,250, 20,100,180,'��',null);
				dlg.prg = new nxAmountBar('nxAmountBar_'+dlg.id, dlg);
				dlg.renderControl(dlg.prg,250, 20,180,175,null,null);
				dlg.prg.n4MaxValue = parseInt(ds.rows[0].get("n4CircleProduct"));
				dlg.createAM = new NxControl('createAM'+'_'+dlg.id);
				dlg.renderControl(dlg.createAM,250, 20,330,180, '0',null);
				dlg.createGold = new NxControl('createGold'+'_'+dlg.id);
				dlg.renderControl(dlg.createGold,250, 20,410,180, '����:0',null);
				dlg.btnOK = new nxButton('btnOK'+'_'+dlg.id, '����');
				dlg.renderControl(dlg.btnOK,80, 30,490,175,null,null);
				
				if(dlg.prg.n4MaxValue==0)
					Alert('notYet','�ǹ� ������ ���� ���� �Ұ����մϴ�.<br>���׷��̵带 �����ϼ���.', nxStatic.gameUser.n4KunsaSN);
				
				dlg.prg.onvaluechange=function(n4Value, sender)
				{
					sender.parent.createAM.setText('����:'+addCommas(n4Value));
					var price = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_soldier].n4Rice;
					sender.parent.createGold.setText('����:'+addCommas(n4Value*price));
				}
				dlg.prg.setValue(parseInt(ds.rows[0].get("n4CircleProduct"))*0.3);
				dlg.btnOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_soldier].n4Rice * dlg.prg.n4Value;
					if(totalPrice>nxStatic.mainContainer.GameUser.n4MasterRice)
					{
						Alert(dlg.id,'������ �����մϴ�.');
						return;
					}
					else if(dlg.prg.n4Value<1)
					{
						Alert(dlg.id,'������ 0���� Ŀ���մϴ�.');
						return;
					}
					
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
					//nxStatic.mainContainer.add(gsd);
					gsd.show();
					gsd.onsubmit = function(dlg, selectedItems)
					{
						if(!selectedItems)
							return;
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingProduceStart);
						cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
						cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
						cmd.addParam("n1CodeProduct"	, nxStatic.n1CodeProduct_soldier);
						cmd.addParam("n4RequestProductAmount", dlg.prg.n4Value);
						cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
						//cmd.print();
						cmd.execute(callBackProduceStart);
						function callBackProduceStart(xml, strText, dlg)
						{
							var ds = new NxDataSet(xml,1);
							nxStatic.closeDialog();
							new nxBarrackDialog(dlg.id, dlg.owner).show();
							if(!eventAvilCheckSoldiers(ds))
							{
									var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '���� ���۵Ǿ����ϴ�.');
									nw.show();
							}
							nxStatic.gameUser.requestUserInfo();
							
						}
					}
					
				}
			}
			else
			{
				//---���׷��̵�
				dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
				dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'���׷��̵�',null);
				dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
				dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
				dlg.prgUpgrade.n4MaxValue = 1000;
				dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
				dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
				dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '����');
				dlg.renderControl(dlg.btnUpgradeOK,80, 30,490,185,null,null);
				dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
				{
					sender.parent.lblGold.setText('��:'+addCommas(n4Value));
				}
				dlg.prgUpgrade.setValue(700);
				dlg.btnUpgradeOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prgUpgrade.n4Value;
					if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert('alert_'+this.id, '���� �����մϴ�.');
						return;
					}
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="�������� ��Ű�ðڽ��ϱ�?";
					//nxStatic.mainContainer.add(gsd);
					gsd.show();
					gsd.onsubmit = function(dlg, selectedItems)
					{
						if(!selectedItems)
							return;
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_BuildingUpgradeStart);
						cmd.addParam("n4BuildingCode"	, dlg.owner.n4BuildingCode);
						cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
						cmd.addParam("n4RequestProductAmount", dlg.prgUpgrade.n4Value);
						cmd.addParam("n4GeneralSN", selectedItems[0].row['n4GeneralSN']);
						//cmd.print();
						cmd.execute(callBackProduceStart);
						function callBackProduceStart(xml, strText, dlg)
						{
							var ds = new NxDataSet(xml);
							nxStatic.closeDialog();
							new nxBarrackDialog(dlg.id, dlg.owner).show();
							if(!eventPoliCriticalCheck(ds))
							{
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '�ǹ� ���׷��̵尡 ���۵Ǿ����ϴ�.');
								nw.show();
							}
							nxStatic.gameUser.requestUserInfo();
						}
					}
					
				}
			}
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_work)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'�� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'���ο�: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 1, n4TotalSeconds );
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'�ǹ� ���׷��̵� ��...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"���� �ð�:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 2, n4TotalSeconds );
		}
		
	}
	
	
}
nxBarrackDialog.prototype = new NxControl();
nxBarrackDialog.prototype.constructor = nxBarrackDialog;



function nxGeneralInfoDialog(strLayerID, n4CastleSN, n4MasterSN, owner)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
		
	this.setTop(100);
	this.setHeight(500);
	this.body.setLayerIndex(nxLayer.n4Layer_Dialog);
	this.body.setHeight(402);
	this.body.show();
	this.bottom.setTop(443);
	this.bottom.show();
	this.content.setHeight(400);
	this.content.show();
	this.button.setTop(457);
	this.button.show();
	
	
	this.n4MasterSN=n4MasterSN;	
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralGetList);
	cmd.addParam("n4CastleSN"	, n4CastleSN);
	cmd.addParam("n4MasterSN"	, n4MasterSN);
	//cmd.print();
	cmd.execute(callBack);
	this.strCaption = '��������' ;
	function callBack(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.setLeft(30);
		dlg.grid.setWidth(dlg.body.getWidth()-60);
		dlg.grid.setHeight(dlg.body.getHeight());
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName"	, "�̸�"	, 110);
		dlg.grid.columns[i++] = new nxExpViewGridColumn( "n4Level"		, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "strGrade"		, "�ź�"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Patriot"	, "�漺"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Working"	, "�۾�"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Str"		, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Int"		, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Poli"		, "��ġ"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Charm"		, "�ŷ�"	, 40);
		dlg.grid.columns[i++] = new nxAvilViewGridColumn( "strSpecialAvilName"		, "Ư��"	, 40);
		dlg.grid.columns[i++] = new nxGeneralItemViewGridColumn( "n4GeneralSN"		, "������"	, 50,2);
		dlg.grid.columns[i++] = new nxGridColumn( "n4AvilCode"		, null, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4MasterSN"		, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n8Exp"		, null, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n8ExpNext"		, null	, 0);
		
		for(var i=0;i<ds.rows.length;i++)
		{
			var item = new nxGridItem();
			for(var j=0;j<dlg.grid.columns.length; j++)
			{
				var field = dlg.grid.columns[j].strField;
				item.add( field	, ds.rows[i].get(field));
			}
			dlg.grid.items[i] = item;
		}

		dlg.grid.show();
	}

	
}
nxGeneralInfoDialog.prototype = new NxControl();
nxGeneralInfoDialog.prototype.constructor = nxGeneralInfoDialog;


function nxGeneralSelectDialog(strLayerID, owner, n4CastleSN, n4MasterSN, n1Working, n1Patriot)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	
	this.body.setLayerIndex(nxLayer.n4Layer_Dialog);	
	this.setTop(100);
	this.setHeight(500);
	this.body.setHeight(402);
	this.body.show();
	this.bottom.setTop(443);
	this.bottom.show();
	this.content.setHeight(400);
	this.content.show();
	this.button.setTop(457);
	this.button.setTitle('����');
	this.button.setLeft(200);
	this.button.show();
	this.cancel = new NxButton('cancel_'+this.id);
	this.cancel.setBG('');
	this.cancel.setWidth(90);
	this.cancel.setHeight(30);
	this.cancel.setLeft(300);
	this.cancel.setTop(457);
	this.cancel.style.fontSize		= "15px";
	this.cancel.src = 'http://nexen.pe.kr/img/button/btn_base.png';	
	this.cancel.setTitle('���');
	this.cancel.show();
	this.add(this.cancel);
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
		
	
	this.n1Working = n1Working?n1Working:0;
	this.n1Patriot = n1Patriot?n1Patriot:100;
	this.n1SelectType=1;//0-���� 1-����, 2-����		
	
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralGetList);
	cmd.addParam("n4CastleSN"	, n4CastleSN);
	cmd.addParam("n4MasterSN"	, n4MasterSN);
	cmd.addParam("n1Working"	, this.n1Working);
	cmd.addParam("n1Patriot"	, this.n1Patriot);
	//cmd.print();
	cmd.execute(callBack);
	this.strCaption = '���弱��' ;
	function callBack(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.n1SelectType=dlg.n1SelectType;
		dlg.grid.setLeft(30);
		dlg.grid.setWidth(dlg.body.getWidth()-60);
		dlg.grid.setHeight(dlg.body.getHeight());
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName"	, "�̸�"	, 110);
		dlg.grid.columns[i++] = new nxExpViewGridColumn( "n4Level"		, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "strGrade"		, "�ź�"	, 50);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Patriot"	, "�漺"	, 50);
		//dlg.grid.columns[i++] = new nxGridColumn( "n1Age"		, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Working"	, "�۾�"	, 45);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Str"		, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Int"		, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Poli"		, "��ġ"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Charm"		, "�ŷ�"	, 40);
		dlg.grid.columns[i++] = new nxAvilViewGridColumn( "strSpecialAvilName"		, "Ư��"	, 50);
		dlg.grid.columns[i++] = new nxGridColumn( "n4AvilCode"		, null, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4GeneralSN"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "isCustomGeneral"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n8Exp"		, null, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n8ExpNext"		, null	, 0);
		
		for(var i=0;i<ds.rows.length;i++)
		{
			var item = new nxGridItem();
			for(var j=0;j<dlg.grid.columns.length; j++)
			{
				var field = dlg.grid.columns[j].strField;
				item.add( field	, ds.rows[i].get(field));
			}
			dlg.grid.items[i] = item;
		}

		dlg.grid.show();
	}
	
	this.getSelectedItems = function()
	{
		if(this.grid.getSelectedItems().length==0)
			return null;
		else
			return this.grid.getSelectedItems();
	}
	
	this.button.frmLayer.onclick = function()
	{
		this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.getSelectedItems() );
		this.NxControl.parent.unload();
	}
	
	this.onsubmit = function(owner, selectedItems){}//ex)selectedItems[0].row['n4GeneralSN']

	
}
nxGeneralSelectDialog.prototype = new NxControl();
nxGeneralSelectDialog.prototype.constructor = nxGeneralSelectDialog;


function nxRiceMerchantDialog(strLayerID, owner, n1Trade)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.n1Trade = n1Trade;
	this.buildingObject = owner;
	this.strCaption = n1Trade==0?'���� ����':'���� �Ű�';
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetInfoBuilding);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.execute(callBack);
	function callBack(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var n1BuildingStatus = parseInt(ds.rows[0].get("n1BuildingStatus"));
		dlg.n1MarketPriceRice = parseInt(ds.rows[0].get("n1MarketPriceRice"));
		
		dlg.masterPic = new NxControl('taesu_'+dlg.id);
		dlg.renderControl(dlg.masterPic,100,100,24,45,null,dlg.buildingObject.src);
		dlg.lbl_1 = new NxControl('lbl_1'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"������ : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"���� : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"�ü�:  1:"+dlg.n1MarketPriceRice,null);
		
				
		//---�ŷ�
		dlg.lblJob = new NxControl('lblUpgrade'+'_'+dlg.id);
		dlg.renderControl(dlg.lblJob,250, 20,100,170,dlg.strCaption,null);
		dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
		dlg.renderControl(dlg.prgUpgrade,250, 20,190,160,null,null);
		dlg.prgUpgrade.n4MaxValue = dlg.n1Trade==0?nxStatic.mainContainer.GameUser.n4MasterGold:nxStatic.mainContainer.GameUser.n4MasterRice;
		dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
		dlg.renderControl(dlg.lblGold,250, 20,400,150,dlg.prgUpgrade.n4MaxValue,null);
		dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, dlg.n1Trade==0?'����':'�Ű�');
		dlg.renderControl(dlg.btnUpgradeOK,80, 30,450,175,null,null);
		dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
		{
			if(dlg.n1Trade==0)//����
				sender.parent.lblGold.setText('��:'+addCommas(n4Value)+"&nbsp;&nbsp; ����:"+addCommas(parseInt(n4Value)/parseInt(dlg.n1MarketPriceRice)));
			else//�Ű�
				sender.parent.lblGold.setText('��:'+addCommas(parseInt(n4Value*dlg.n1MarketPriceRice))+"&nbsp;&nbsp; ����:"+addCommas(n4Value));
		}
		dlg.prgUpgrade.setValue(700);
		dlg.btnUpgradeOK.frmLayer.onclick=function()
		{
			var dlg = this.NxControl.parent;
			var totalPrice = parseInt(dlg.prgUpgrade.n4Value / dlg.n1MarketPriceRice);
			if(dlg.n1Trade==0)//����
			{
				function callMerchantBuy(xml, strText, dlg)
				{
					var ds = new NxDataSet(xml);
					var n4Gold		= ds.rows[0].get("n4Gold");
					var n4Product	= ds.rows[0].get("n4Product");
					nxStatic.closeDialog();
					mainMethod.refresh();
					Alert('callMerchantSell'+'_'+this.id, addCommas(addCommas(n4Product))+'�� ������ �����Ͽ����ϴ�.');
				}
				var cmd = new nxCommand(null, dlg);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_merchantSell);
				cmd.addParam("n1CodeProduct"	, nxStatic.n1CodeProduct_rice);
				cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
				cmd.addParam("n4RequestAmount"	, totalPrice);
				//cmd.print();
				cmd.execute(callMerchantBuy);
				
			}
			else//�Ű�
			{
				function callMerchantSell(xml, strText, dlg)
				{
					var ds = new NxDataSet(xml);
					var n4Gold		= ds.rows[0].get("n4Gold");
					var n4Product	= ds.rows[0].get("n4Product");
					nxStatic.closeDialog();
					mainMethod.refresh();
					Alert('callMerchantSell'+'_'+this.id, addCommas(addCommas(Math.abs(n4Gold)))+'�� ���� ������ϴ�.');
				}
				
				var cmd = new nxCommand(null, dlg);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_merchantBuy);
				cmd.addParam("n1CodeProduct"	, nxStatic.n1CodeProduct_rice);
				cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
				cmd.addParam("n4RequestAmount"	, dlg.prgUpgrade.n4Value);
				//cmd.print();
				cmd.execute(callMerchantSell);
			}
		}
		
		
	}

}
nxRiceMerchantDialog.prototype = new NxControl();
nxRiceMerchantDialog.prototype.constructor = nxRiceMerchantDialog;


function nxSetGeneralDialog(strLayerID, owner, n4GeneralSN)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.strCaption = '���޺���';
	this.n4GeneralSN= n4GeneralSN;
	
	this.button.setTitle('Ȯ��');
	this.button.setLeft(200);
	this.button.show();
	this.cancel = new NxButton('cancel_'+this.id);
	this.cancel.setBG('');
	this.cancel.setWidth(90);
	this.cancel.setHeight(30);
	this.cancel.setLeft(300);
	this.cancel.setTop(this.button.getTop());
	this.cancel.style.fontSize		= "15px";
	this.cancel.src = 'http://nexen.pe.kr/img/button/btn_base.png';	
	this.cancel.setTitle('���');
	this.cancel.show();
	this.add(this.cancel);
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
	this.masterPic = new nxGeneralFaceControl('nxGeneralFaceControl', this, n4GeneralSN);	
	this.add(this.masterPic);
	this.masterPic.setLeft(24);
	this.masterPic.setTop(45);
	this.masterPic.setWidth(80);
	this.masterPic.setHeight(100);
	this.masterPic.show();
	//this.renderControl(this.masterPic,100,100,24,45,null,null);
	
	
	
	this.lbl1 = new NxControl('lbl1'+'_'+this.id);
	this.renderControl(this.lbl1,140, 20 ,134,45,"�̸� : ",null);
	this.lbl2 = new NxControl('lbl2'+'_'+this.id);
	this.renderControl(this.lbl2,100, 20 ,274,45,"�ź� : ",null);
	this.lbl3 = new NxControl('lbl3'+'_'+this.id);
	this.renderControl(this.lbl3,100, 20 ,374,45,"�漺 : ",null);
	this.lbl4 = new NxControl('lbl4'+'_'+this.id);
	this.renderControl(this.lbl4,100, 20 ,474,45,"���� : ",null);
	
	this.lbl5 = new NxControl('lbl5'+'_'+this.id);
	this.renderControl(this.lbl5,100, 20 ,134,75,"�۾� : ",null);
	this.lbl6 = new NxControl('lbl6'+'_'+this.id);
	this.renderControl(this.lbl6,100, 20 ,274,75,"���� : ",null);
	this.lbl7 = new NxControl('lbl7'+'_'+this.id);
	this.renderControl(this.lbl7,100, 20 ,374,75,"���� : ",null);
	this.lbl8 = new NxControl('lbl8'+'_'+this.id);
	this.renderControl(this.lbl8,100, 20 ,474,75,"��ġ : ",null);

	this.lbl9 = new NxControl('lbl9'+'_'+this.id);
	this.renderControl(this.lbl9,100, 20 ,134,105,"�ŷ� : ",null);
	this.lbl10 = new NxControl('lbl10'+'_'+this.id);
	
	this.lbl12 = new NxControl('lbl12'+'_'+this.id);
	this.renderControl(this.lbl12,100, 20,184,157,"���޼��� : ",null);
	
	this.lbl13 = new NxControl('lbl13'+'_'+this.id);
	this.renderControl(this.lbl13,400, 40,184,187,"",null);
	
	this.selNewGrade = new NxSelectBox('NxSelectBox_'+this.id);
	this.add(this.selNewGrade);
	this.selNewGrade.setLeft(274);
	this.selNewGrade.setTop(157);
	this.selNewGrade.addItem("����",nxStatic.n1CodeGeneralGradeMukwan);
	this.selNewGrade.addItem("����",nxStatic.n1CodeGeneralGradeMunkwan);
	this.selNewGrade.addItem("�屺",nxStatic.n1CodeGeneralGradeGeneral);
	this.selNewGrade.addItem("����",nxStatic.n1CodeGeneralGradeKunsa);
	this.selNewGrade.show();
	this.selNewGrade.onChange=function(sender, strValue, strText)
	{
		var lbl = sender.parent.lbl13;
		var n1Code = parseInt(strValue);
		if(n1Code==1)
			lbl.setText(strText+':������ ������ �����մϴ�. (����+5, ����-5)');
		else if(n1Code==2)
			lbl.setText(strText+':������ ������ �����մϴ�. (����-5, ����+5)');
		else if(n1Code==3)
			lbl.setText(strText+':������ �����ɷ��� �����մϴ�. �ִ� 5�� ���� �����մϴ�. (����+5, ����+5)');
		else if(n1Code==4)
			lbl.setText(strText+':������ �����ɷ��� �����մϴ�. �ִ� 1�� ���� �����մϴ�. (����+5, ��ġ+5, �ŷ�+5)');
	}
	
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralGetInfo);
	cmd.addParam("n4GeneralSN", this.n4GeneralSN);
	//cmd.print();
	cmd.execute(callBackn1QueryID_GeneralGetInfo);
	
	function callBackn1QueryID_GeneralGetInfo(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		
		dlg.lbl1.setText("�̸� : "+ds.rows[0].get("strGeneralName"));
		dlg.lbl2.setText("�ź� : "+ds.rows[0].get("strGrade"));
		dlg.lbl3.setText("�漺 : "+ds.rows[0].get("n1Patriot"));
		dlg.lbl4.setText("���� : ??");//+ds.rows[0].get("n1Age"));
		dlg.lbl5.setText("�۾� : "+ds.rows[0].get("n1Working"));
		dlg.lbl6.setText("���� : "+ds.rows[0].get("n4Str"));
		dlg.lbl7.setText("���� : "+ds.rows[0].get("n4Int"));
		dlg.lbl8.setText("��ġ : "+ds.rows[0].get("n4Poli"));
		dlg.lbl9.setText("�ŷ� : "+ds.rows[0].get("n4Charm"));
		//dlg.lbl10.setText("���� : "+ds.rows[0].get("n4Earth"));
		//dlg.lbl11.setText("���� : "+ds.rows[0].get("n4Sea"));
		
		dlg.selNewGrade.setSelectedValue(ds.rows[0].get("n1Grade"));
		
		var n1Gender			= parseInt(ds.rows[0].get("n1Gender"));
		var strGeneralPicName	= ds.rows[0].get("strGeneralPicName");
		
		dlg.selGeneralPic = new NxSelectBox('NxSelectBox_'+this.id);
		dlg.add(dlg.selGeneralPic);
		dlg.selGeneralPic.setLeft(30);
		dlg.selGeneralPic.setTop(150);
		dlg.selGeneralPic.setWidth(80);
		dlg.selGeneralPic.setHeight(30);
		if(n1Gender==1)
		{
			for(var i=1;i<=20;i++)
			{
				dlg.selGeneralPic.addItem('����'+i,  i+'.jpg');
			}
		}
		else
		{
			for(var i=1;i<=9;i++)
			{
				dlg.selGeneralPic.addItem('����'+i,  (i+20)+'.jpg');
			}		
		}
		dlg.selGeneralPic.show();
		dlg.selGeneralPic.setSelectedValue(strGeneralPicName);
		dlg.selGeneralPic.onChange=function(sender, strValue, strText)
		{
			sender.parent.masterPic.src = "http://nexen.pe.kr/img/face/general/"+strValue;
			sender.parent.masterPic.show();
		}

	}
	
	this.button.frmLayer.onclick = function()
	{
		if(this.NxControl.parent.owner)
			this.NxControl.parent.onsubmit(this.NxControl.parent.owner,this.NxControl.parent.n4GeneralSN , this.NxControl.parent.selNewGrade.getSelectedValue(),this.NxControl.parent.selGeneralPic.getSelectedValue()  );
		this.NxControl.parent.unload();
	}
	
	this.onsubmit = function(owner,n4GeneralSN,strSelectedValue){}
	
}
nxSetGeneralDialog.prototype = new NxControl();
nxSetGeneralDialog.prototype.constructor = nxSetGeneralDialog;


function nxCreateGeneralDialog(strLayerID, owner)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.buildingObject = owner;
	this.strCaption = '�Ź��� ����';
	//this.n4GeneralSN= n4GeneralSN;
	
	this.button.setTitle('Ȯ��');
	this.button.setLeft(200);
	this.button.show();
	this.cancel = new NxButton('cancel_'+this.id);
	this.cancel.setBG('');
	this.cancel.setWidth(90);
	this.cancel.setHeight(30);
	this.cancel.setLeft(300);
	this.cancel.setTop(this.button.getTop());
	this.cancel.style.fontSize		= "15px";
	this.cancel.src = 'http://nexen.pe.kr/img/button/btn_base.png';	
	this.cancel.setTitle('���');
	this.cancel.show();
	this.add(this.cancel);
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
	this.masterPic = new nxGeneralFaceControl('nxGeneralFaceControl', null);	
	this.add(this.masterPic);
	this.masterPic.setLeft(74);
	this.masterPic.setTop(65);
	this.masterPic.setWidth(80);
	this.masterPic.setHeight(100);
	this.masterPic.src = "http://nexen.pe.kr/img/face/general/1.jpg";
	this.masterPic.show();
	//this.renderControl(this.masterPic,100,100,24,45,null,null);
	
	
	
	this.lbl1 = new NxControl('lbl1'+'_'+this.id);
	this.renderControl(this.lbl1,100, 20 ,184,60,"�̸� : ",null);
	
	this.txtGeneralName = new NxTextBox('txtGeneralName');
	this.txtGeneralName.setLength(6);
	this.renderControl(this.txtGeneralName,130, 20 ,234,60,"",null);
	
	this.lbl10 = new NxControl('lbl10'+'_'+this.id);
	this.renderControl(this.lbl10,100, 20 ,184,90,"�ɷ�ġ ����:",null);
	this.selTalent = new NxSelectBox('selTalent_'+this.id);
	this.add(this.selTalent);
	this.selTalent.setLeft(284);
	this.selTalent.setTop(90);
	this.selTalent.setWidth(150);
	this.selTalent.setHeight(30);
	this.selTalent.addItem('����',  1);
	this.selTalent.addItem('����',  2);
	this.selTalent.addItem('��ġ',  3);
	this.selTalent.addItem('�ŷ�',  4);
	this.selTalent.show();

	this.lblDesc = new NxControl('lblDesc'+'_'+this.id);
	this.renderControl(this.lblDesc,350, 100 ,184,150,"�Ź����� �����մϴ�. �Ź����� �ɷ�ġ�� ������ ������ �������� �ñ��� ��ġ�� �������� �����˴ϴ�.<BR><BR>�Ź��� ������Ȳ : "+ nxStatic.gameUser.n4CustomGeneralCount+"/"+nxStatic.gameUser.n4MaxCustomGenralLimit,null);
	
	this.selGeneralPic = new NxSelectBox('NxSelectBox_'+this.id);
	this.add(this.selGeneralPic);
	this.selGeneralPic.setLeft(70);
	this.selGeneralPic.setTop(170);
	this.selGeneralPic.setWidth(120);
	this.selGeneralPic.setHeight(30);
	this.selGeneralPic.show();
	
	for(var i=1;i<=20;i++)
	{
		this.selGeneralPic.addItem('����'+i+'(��)',  i+'.jpg');
	}
	for(var i=21;i<=29;i++)
	{
		this.selGeneralPic.addItem('����'+i+'(��)',  i+'.jpg');
	}		
	
	
	this.selGeneralPic.onChange=function(sender, strValue, strText)
	{
		sender.parent.masterPic.src = "http://nexen.pe.kr/img/face/general/"+strValue;
		sender.parent.masterPic.show();
	}
	
	
	
	this.button.frmLayer.onclick = function()
	{
		var dlg = this.NxControl.parent;
		var strGeneralName = dlg.txtGeneralName.getText();
		
		if(nxStatic.gameUser.n4GeneralCount>=10 &&  nxStatic.gameUser.n4MasterGold<300000)
		{
			Alert('strGeneralName', '�� 300,000 �� �ʿ��մϴ�.');
			return;
		}
		else if(strGeneralName.length>6)
		{
			Alert('strGeneralName', '�̸��� ���̴� 6�ڸ� �ʰ��� �� �����ϴ�.');
			return;
		}
		else if (nxStatic.gameUser.n4MaxCustomGenralLimit<=nxStatic.gameUser.n4CustomGeneralCount)
		{
			Alert('n4MaxCustomGenralLimit', '���̻� �Ź����� ������ �� �����ϴ�. ���� �Ź����� �ذ��ϰų� �������� �ø��ñ� �ٶ��ϴ�.');
			return;
		}
		else if(strGeneralName.trim()=='')
		{
			Alert('strGeneralName', '�Ź����� �̸��� �Է��ϼ���.');
			return;
		}
		else if(!checkKoreanOnly(strGeneralName))
		{
			Alert('strGeneralName', '������ �̸��� �ѱ۸� �Է� �����մϴ�.');
			return;
		}
		
		function callBackGeneralName(xml, strText, dlg)
		{
			var ds = new NxDataSet(xml);
			var	strName =ds.rows[0].get("strName");
			var	n4Count = parseInt(ds.rows[0].get("n4Count"));			
			if(n4Count>0)
			{
				Alert('strName', strName+'��(��) �̹� ������� �̸��Դϴ�. �ٸ� �̸��� �����ϼ���.<BR><BR>(����)�ﱹ���� �����ϴ� ������ �̸��� ��� ��߿� ��ϵǾ��ֽ��ϴ�.');
				return false;
			}
			else
			{
				function callBackCreate(isTrue, dlg)
				{
					if(isTrue)
					{
						function callBackCreateOK(xml, strText, dlg)
						{
							//alert(strText);
							var ds = new NxDataSet(xml);
							var n4GeneralSN = ds.rows[0].get("n4GeneralSN");
							dlg.unload();
   							mainMethod.insaModify(n4GeneralSN);
   							mainMethod.refresh();
							
						}
						var n1Gender = dlg.selGeneralPic.getSelectedIndex()<20?1:2;
						var cmdCreate = new nxCommand(null, dlg);
						cmdCreate.addParam("n1QueryID"		, nxStatic.n1QueryID_GeneralCreate);
						cmdCreate.addParam("strGeneralName"	, dlg.txtGeneralName.getText());
						cmdCreate.addParam("n4CastleSN"		, mainMethod.getNowRealCastleSN());
						cmdCreate.addParam("n4BuildingSN"	, 0);
						cmdCreate.addParam("n1Gender"		, n1Gender);
						cmdCreate.addParam("strGeneralPicName",	dlg.selGeneralPic.getSelectedValue());
						cmdCreate.addParam("isCustomGeneral",1);
						cmdCreate.addParam("n1CreateType"	,dlg.selTalent.getSelectedValue());
						//cmdCreate.print();
						cmdCreate.execute(callBackCreateOK);
					}
				}
				if(nxStatic.gameUser.n4GeneralCount>=10)
					Confirm(dlg,'�� 300,000�� ����Ͽ�<BR>�Ź����� �����մϴ�.<BR><BR>�����Ͻðڽ��ϱ�?', callBackCreate, nxStatic.gameUser.n4KunsaSN );
				else
					Confirm(dlg,'�Ź����� �����Ͻðڽ��ϱ�?', callBackCreate, nxStatic.gameUser.n4KunsaSN );					
			}
		}
		var cmd = new nxCommand(null, dlg);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_SearchName);
		cmd.addParam("strGeneralName",strGeneralName);
		cmd.execute(callBackGeneralName);
	}
	
	//this.onsubmit = function(owner,n4GeneralSN,strSelectedValue){}
	
}
nxCreateGeneralDialog.prototype = new NxControl();
nxCreateGeneralDialog.prototype.constructor = nxCreateGeneralDialog;


function nxGridControl(strLayerID, owner)
{
	NxControl.apply(this, arguments);
	if(!strLayerID)
		return;

	this.setBG('');	
	this.style.overflowY		= "auto";//auto,hidden;
	this.style.overflowX		= "hidden";
	this.columns	= new Array();
	this.items		= new Array();
	this.n1SelectType = 0; //1radio 2checkbox
	this.n1ColHeight = 20;
	this.content	 = new NxControl('content_'+this.id);
	this.n4MaxSelectCount = 99999999;
	
	this.getSelectedItems=function()
	{
		var ret = new Array();
		var chks = this.content.frmLayer.childNodes;
		for(var i=0;i<chks.length;i++)
		{	if(this.n1SelectType==1 && chks[i].name=='chkObj')
			{
				if(chks[i].radio)
				{
					if(chks[i].radio.checked)
					{
						ret[0] = chks[i].item;
						return ret;
					}
				}
			}
			else if(this.n1SelectType==2 && chks[i].name=='chkObj')
			{	
				if(chks[i].checked)
					ret[ret.length]  = chks[i].item;
			}
		}
		
		return 	ret;	
	}
	
	this.rows = new Array();
	
	this.clear=function()
	{
		this.content.unload();
		this.content	 = new NxControl('content_'+this.id);
	}
	
	this.n1ColumnIndex = null;
	this.sort=function(n1ColumnIndex)
	{
		for(var j=0;j<this.items.length;j++)
		{
			for(var i=0;i<this.items.length;i++)
			{
				if(i< (this.items.length-1) )
				{
					var val1 = this.items[i].row[this.columns[n1ColumnIndex].strField];
					var val2 = this.items[i+1].row[this.columns[n1ColumnIndex].strField];
					if(isNumeric(val1) && isNumeric(val2))
					{
						val1 = parseInt(val1);
						val2 = parseInt(val2);
					}
					
					if(val1<val2)
					{
						var tmp = this.items[i];
						this.items[i] = this.items[i+1];
						this.items[i+1] = tmp;
					}
				}
						
			}
		}
		nxStatic.sortArray[this.id] = n1ColumnIndex;
	}
	
	this.checkAll=function(allCheckBox)
	{
		var checked = allCheckBox.checked;
		var chks = this.content.frmLayer.childNodes;
		var n4Max = this.n4MaxSelectCount;
		
		for(var i=0;i<chks.length;i++)
		{
			if(chks[i].name=='chkObj' && chks[i].childNodes.length>0 && n4Max>0)
			{	
				chks[i].childNodes[0].checked = checked;
				chks[i].checked = checked;
				n4Max--;
			}
		}
		
		
	}
	
	this.show = function()
	{
		if(this.n1ColumnIndex==null && nxStatic.sortArray[this.id])
			this.sort(nxStatic.sortArray[this.id]);
	
		this.rows = new Array(this.items.length);//�ο쵥���� ����
		
		this._show();
		this.content.style.overflow	= "auto";
		this.content.setBG('');
		this.add(this.content);
		this.content.setTop(26)
		this.content.setLeft(0);
		var left = 0;
		var width= 0;
		for(var i=0;i<this.columns.length;i++)
		{
			var col = new NxControl('col_'+this.id+'_'+i);
			this.add(col);			
			col.style.fontSize		= "15px";
			col.setBG('#264200');
			col.style.border= "1px solid #FCEEEE";
			col.setWidth(this.columns[i].n4Width);
			col.setHeight(20);
			col.setText('<center><u>'+this.columns[i].strText+'</center></u>');
			col.setLeft(left);
			col.style.cursor='pointer';
			col.colIndex = i;
			if(this.columns[i].strText)
			{
				col.show();
				width+=this.columns[i].n4Width;
			}
			if(this.n1SelectType==2 && i==0)
			{
				var chkID = 'chkSelectAll'+this.id;
				var inpuChk = new NxControl(chkID);
				this.add(inpuChk);
				inpuChk.setText("<input type=checkbox name='selectAll' onclick=\"document.getElementById('"+this.id+"').NxControl.checkAll(this);\" />");
				inpuChk.setWidth(30);
				inpuChk.setHeight(this.n1ColHeight);
				inpuChk.setLeft(left);
				inpuChk.setTop(0);
				inpuChk.setBG('');
				inpuChk.show();
			}
			
			col.frmLayer.onclick=function()
			{
				this.NxControl.parent.clear();
				this.NxControl.parent.sort(this.NxControl.colIndex);
				this.NxControl.parent.show();
			}
			
			
			var top = 0;
			for(var j=0;j<this.items.length;j++)
			{
				var row = new  NxControl('row_'+this.id+'_'+i+'_'+j);
				this.content.add(row);	
				row.style.fontSize		= "15px";
				row.setBG('');
				row.setWidth(this.columns[i].n4Width);
				row.setHeight(this.n1ColHeight);
				if(this.n1SelectType==0)
				{
					if(this.columns[i].align==0)
						row.setText(this.items[j].row[this.columns[i].strField]);
					else
						row.setText('<center>'+ this.items[j].row[this.columns[i].strField] +'</center>');
				}		
				else
				{
					if(this.columns[i].align==0)
						row.setText('&nbsp;&nbsp;&nbsp;'+ this.items[j].row[this.columns[i].strField]);
					else
						row.setText('<center>&nbsp;&nbsp;&nbsp;'+ this.items[j].row[this.columns[i].strField] +'</center>');
				}
				row.setLeft(left);
				row.setTop(top);
				
				//�÷� Ŀ���͸���¡�� ���� ȣ��
				this.columns[i].setProperty(row, this.items[j].row);
				
				
				if(this.n1SelectType>0 && i==0)
				{
					var chkID = 'inputBox_'+j+'_'+row.id;
					var inpuChk = new NxControl(chkID);
					inpuChk.frmLayer.item = this.items[j];
					inpuChk.frmLayer.name = 'chkObj';
					inpuChk.setBG('');
					this.content.add(inpuChk);	
					if(this.n1SelectType==1)
						inpuChk.setText("<input type=radio name='chks' onclick=\"document.getElementById('"+chkID+"').radio=this; document.getElementById('"+this.id+"').NxControl.onselect();\"  />");
					else if(this.n1SelectType==2)
						inpuChk.setText("<input type=checkbox name='chks' onclick=\"document.getElementById('"+chkID+"').checked=document.getElementById('"+chkID+"').checked?false:true;\" />");
					inpuChk.setWidth(30);
					inpuChk.setHeight(this.n1ColHeight);
					inpuChk.setLeft(left);
					inpuChk.setTop(top);
					inpuChk.show();
				}
				
				if(this.columns[i].strText)
				{
					row.show();
					top+=this.n1ColHeight;//20;
				}
				
			}

			left += parseInt(this.columns[i].n4Width);
			
		}
		
		this.content.setHeight(this.getHeight()-40);
		//this.content.setWidth(width+20);
		this.content.setWidth(this.getWidth());
		this.content.show();
	}
	
	this.onselect=function(){}
}
nxGridControl.prototype = new NxControl();
nxGridControl.prototype.constructor = nxGridControl;

function nxGridColumn( strField, strText, n4Width, align)
{
	this.strField	= strField;
	this.strText	= strText;
	this.n4Width	= n4Width?n4Width:50;
	this.align		= align!=null?align:1;//0-left, 1-center, 2-right
	this.colIndex	= 0;
	
	this.setProperty=function(nxColumnControl, rowData)
	{
	
	}
}
function nxGridItem()
{
	this.row = new Array();

	this.add=function(strField, strValue)
	{
		this.row[strField] = strValue;
	}
}
