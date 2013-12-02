
function nxDialog(strLayerID, owner)
{
	NxDialog.apply(this, arguments);
	
	if(!strLayerID)
		return;
	if(!owner)
	{
		alert(this.id+'Dialog의 소유자가 없습니다!');
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
	
	//--드래그앤 드랍
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

	this.button.setTitle('확인');
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
	this.strCaption = "세율변경";
	
	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = owner.n4BuildingCode==nxStatic.n4BuildingCode_Castle?"태수":"소유자";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"세력 : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,100, 20,450,45,"무장 : "+owner.n4General,null);

	this.lblPrisoner = new NxControl('lblPrisoner'+'_'+this.id);
	this.renderControl(this.lblPrisoner,100, 20,150,75,"포로 : "+owner.n4Prisoner,null);
	this.lblPrivateGeneral = new NxControl('lblPrivateGeneral'+'_'+this.id);
	this.renderControl(this.lblPrivateGeneral,100, 20,300,75,"재야 : "+owner.n4PrivateGeneral,null);
	this.lblGold	 = new NxControl('lblGold'+'_'+this.id);
	this.renderControl(this.lblGold,100, 20,450,75,"금 : "+addCommas(owner.n4Gold),null);

	this.lblRice	 = new NxControl('lblRice'+'_'+this.id);
	this.renderControl(this.lblRice,100, 20,150,105,"군량 : "+addCommas(owner.n4Rice),null);
	this.lblDurability = new NxControl('lblDurability'+'_'+this.id);
	this.renderControl(this.lblDurability,100, 20,300,105,"방어도 : "+addCommas(owner.n4Durability),null);
	this.lblSecurity = new NxControl('lblSecurity'+'_'+this.id);
	this.renderControl(this.lblSecurity,100, 20,450,105,"인구 : "+addCommas(owner.n4ZenCount),null);

	this.lblTax	 = new NxControl('lblTax'+'_'+this.id);
	this.renderControl(this.lblTax,100, 20,150,135,"세율(%) : "+owner.n1PerTax,null);
	this.n1LikeZen = new NxControl('n1LikeZen'+'_'+this.id);
	this.renderControl(this.n1LikeZen,100, 20,300,135,"민충 : "+owner.n1LikeZen,null);
	

	this.button.setTitle('확인');
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
	this.strCaption = "주민선정";
	
	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = owner.n4BuildingCode==nxStatic.n4BuildingCode_Castle?"태수":"소유자";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"세력 : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,100, 20,450,45,"무장 : "+owner.n4General,null);

	this.lblPrisoner = new NxControl('lblPrisoner'+'_'+this.id);
	this.renderControl(this.lblPrisoner,100, 20,150,75,"포로 : "+owner.n4Prisoner,null);
	this.lblPrivateGeneral = new NxControl('lblPrivateGeneral'+'_'+this.id);
	this.renderControl(this.lblPrivateGeneral,100, 20,300,75,"재야 : "+owner.n4PrivateGeneral,null);
	this.lblGold	 = new NxControl('lblGold'+'_'+this.id);
	this.renderControl(this.lblGold,100, 20,450,75,"금 : "+addCommas(owner.n4Gold),null);

	this.lblRice	 = new NxControl('lblRice'+'_'+this.id);
	this.renderControl(this.lblRice,100, 20,150,105,"군량 : "+addCommas(owner.n4Rice),null);
	this.lblDurability = new NxControl('lblDurability'+'_'+this.id);
	this.renderControl(this.lblDurability,100, 20,300,105,"방어도 : "+addCommas(owner.n4Durability),null);
	this.lblSecurity = new NxControl('lblSecurity'+'_'+this.id);
	this.renderControl(this.lblSecurity,100, 20,450,105,"인구 : "+addCommas(owner.n4ZenCount),null);

	this.lblTax	 = new NxControl('lblTax'+'_'+this.id);
	this.renderControl(this.lblTax,100, 20,150,135,"세율(%) : "+owner.n1PerTax,null);
	this.n1LikeZen = new NxControl('n1LikeZen'+'_'+this.id);
	this.renderControl(this.n1LikeZen,100, 20,300,135,"민충 : "+owner.n1LikeZen,null);
	

	this.button.setTitle('확인');
	this.lblJob = new NxControl('lbllblJobe'+'_'+this.id);
	this.renderControl(this.lblJob,250, 20,160,185,"군량",null);
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

	this.strCaption = '도시정보 - ' + owner.strCastleName;

	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = owner.n4BuildingCode==nxStatic.n4BuildingCode_Castle?"태수":"소유자";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"세력 : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,100, 20,450,45,"무장 : "+owner.n4General,null);

	this.lblPrisoner = new NxControl('lblPrisoner'+'_'+this.id);
	this.renderControl(this.lblPrisoner,100, 20,150,75,"포로 : "+owner.n4Prisoner,null);
	this.lblPrivateGeneral = new NxControl('lblPrivateGeneral'+'_'+this.id);
	this.renderControl(this.lblPrivateGeneral,100, 20,300,75,"재야 : "+owner.n4PrivateGeneral,null);
	this.lblGold	 = new NxControl('lblGold'+'_'+this.id);
	this.renderControl(this.lblGold,100, 20,450,75,"금 : "+addCommas(owner.n4Gold),null);

	this.lblRice	 = new NxControl('lblRice'+'_'+this.id);
	this.renderControl(this.lblRice,150, 20,150,105,"군량 : "+addCommas(owner.n4Rice),null);
	this.lblDurability = new NxControl('lblDurability'+'_'+this.id);
	this.renderControl(this.lblDurability,100, 20,300,105,"방어도 : "+addCommas(owner.n4Durability),null);
	this.lblSecurity = new NxControl('lblSecurity'+'_'+this.id);
	this.renderControl(this.lblSecurity,200, 20,450,105,"인구 : "+addCommas(owner.n4ZenCount),null);

	this.lblTax	 = new NxControl('lblTax'+'_'+this.id);
	this.renderControl(this.lblTax,100, 20,150,135,"세율(%) : "+owner.n1PerTax,null);
	this.n1LikeZen = new NxControl('n1LikeZen'+'_'+this.id);
	this.renderControl(this.n1LikeZen,100, 20,300,135,"민충 : "+owner.n1LikeZen,null);
}
nxCastleInfoDialog.prototype = new NxControl();
nxCastleInfoDialog.prototype.constructor = nxCastleInfoDialog;



function nxNpcCastleInfoDialog(strLayerID, owner)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	if(owner.n4BuildingCode<nxStatic.n4BuildingCode_Kangjok)
		this.strCaption = '본진정보 - ' + owner.strCastleName;
	else
		this.strCaption = '본진정보 - ' + owner.getAlt();

	this.masterPic = new nxMasterFaceControl('taesu_'+this.id,owner,owner.n4MasterSN);//NxControl('taesu_'+this.id);
	this.renderControl(this.masterPic,65,85,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
	this.lblMaster = new NxControl('lblMaster'+'_'+this.id);
	var strBuildingLabel = "수장";
	this.renderControl(this.lblMaster,150, 20,150,45,  strBuildingLabel+" : "+owner.strMasterName,null);
	this.lblNation = new NxControl('lblNation'+'_'+this.id);
	this.renderControl(this.lblNation,150, 20,300,45,"세력 : "+owner.strNationName,null);
	this.lblGeneral = new NxControl('lblGeneral'+'_'+this.id);
	this.renderControl(this.lblGeneral,130, 20,450,45,"우호도 : 적대적");

	this.lblContent = new NxControl('lblContent'+'_'+this.id);
	var strContent = '';
	if( owner.n4MasterSN==2 )
		strContent = "중국 서북부의 유목민족. 한대에서 삼국시대에 이르기까지 중앙 정부에 대해 전쟁과 귀순을 반복해 왔다";
	else if( owner.n4MasterSN==3 )
		strContent = "184년 장각 등은 후한 왕조를 뒤엎고 새로운 사회 황천(黃天)을 수립할 것을 외치며 일제히 봉기하였다. 당황한 조정에서는 하진(何進)을 대장군으로 삼아 진압에 나서 10개월 후 난을 진압하였다. 그러나 황건의 나머지 무리와 일반민중의 반란이 계속 일어나고 서북쪽에는 이민족의 침입이 계속되어 지방질서는 해체되고 군웅의 할거를 초래, 후한의 멸망을 재촉하였다.";
	else if( owner.n4MasterSN==4 )
		strContent = "BC 3세기 말에서 AD 1세기 말까지 중국의 북방에서 활동한 기마유목민족. 인종은 투르크계·몽골계·아리아계 등 여러 설이 있으나 투르크 계통이라는 설이 가장 유력하다. 흔히 흉노족(匈奴族)이라고 부른다. 언어는 알타이어족에 속한다. ";
	else if( owner.n4MasterSN==5 )
	{
		strContent = "조국을 배신한 왕자를 쫓아 바다건너 미지의 대륙에서 이곳 북쪽 땅까지 오게되었다는 그들은 스스로를 십자군이라 불렀다. 그들의 신념은 빛을 따르는 정의의 사도들이라고 말하지만, 결코 난세의 영웅들에게 호의적인 세력도 아니다. 또한, 그들의 수장 우서더라이트브링어는 무시무시한 파괴력을 지닌자라는 소문이 들리고 있어 영웅들의 호기심을 자극하고 있다. ";
		this.lblNation.setText("세력 : 십자군");
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
	this.strCaption = '농장정보 ';
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
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"소유자 : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"도시 : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"경작레벨 : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,100, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"1년 최대 수확량(현재레벨) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"1년 최대 수확량(다음레벨) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			//---업그레이드
			dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
			dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'업그레이드',null);
			dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
			dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
			dlg.prgUpgrade.n4MaxValue = 1000;
			dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
			dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
			dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '시작');
			dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
			dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
			{
				sender.parent.lblGold.setText('금:'+addCommas(n4Value));
			}
			dlg.prgUpgrade.setValue(700);
			dlg.btnUpgradeOK.frmLayer.onclick=function()
			{
				var dlg = this.NxControl.parent;
				var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_rice].n4Gold * dlg.prgUpgrade.n4Value;
				if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
				{
					Alert('alert_'+this.id, '금이 부족합니다.');
					return;
				}
				var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
				gsd.strCaption="누구에게 시키시겠습니까?";
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
							var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '건물 업그레이드가 시작되었습니다.');
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
			dlg.renderControl(dlg.work,250, 20,200,160,'건물 업그레이드 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
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
	this.strCaption = '철기방 모팔모';
	this.smithPic = new NxControl('smith');
	this.renderControl(this.smithPic,100,100,24,45,null,'http://nexen.pe.kr/img/face/smith.jpg');
	this.boxSay = new nxScrollText('boxSay', 10);
	this.renderControl(this.boxSay,400,100,140,45,"어서옵쇼. 천하제일 대장장이 모팔모올시다. 철기방엔 무슨일로 오셨습니까?",null);
	this.boxSay.setBG('#33500B');
	this.lblItem = new NxControl('lblItem'+'_'+this.id);
	this.renderControl(this.lblItem,350, 20,90,180,"제련할 아이템:",null);
	this.btnItemSelect = new nxButton('btnItemSelect'+'_'+this.id, '아이템선택');
	this.renderControl(this.btnItemSelect,80, 30,450,173,null,null);

	this.button.setTitle('취소');
	this.button.setLeft(300);
	this.button.show();

	this.buttonSubmit = new nxButton('buttonSubmit','확인', this);
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

			dlg.lblItem.setText("제련된 아이템: "+strItemOverScript+"(미확인상태)");
			dlg.boxSay.setText('자~ 오래 기다리셨죠? 이놈이 잘 제련되었는지 모루를 힘껏 내려 쳐 보십시오.');
			dlg.btnItemSelect.unload();
			dlg.btnItemSelect = new nxButton('btnItemSelect'+'_'+this.id, '모루를친다');
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
						Alert('ItemInchantSuccess',strItemName+"이(가) 청명한 소리를 내며 반짝입니다.<BR>축하합니다. 제련이 성공하였습니다.");	
					else
						Alert('ItemInchantFail',strItemName+"이(가) 산산조각나버렸습니다.<BR>애석하게도 제련이 실패하였습니다.");	
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
			Alert('ItemInchant',"제련을 하시려면 건물레벨이 최소 4 이상이 되어야합니다.");	
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
						Alert('ItemInchant',"제련이 시작되었습니다.");	
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
				Confirm(owner,"금 "+addCommas(owner.n4Pay)+"을 사용하여<BR>"+owner.strItemOverScript+"을(를) 제련합니다.", callBackInchant);
			else
				Alert('noItem',"금 "+addCommas(owner.n4Pay)+"이 필요합니다.");	
		}
		else
			Alert('noItem','강화하실 아이템을 선택하세요.');
	
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
				dlg.lblItem.setText("제련할 아이템: "+strItemOverScript+"(비용:금"+addCommas(n4Pay)+")");
				dlg.boxSay.setText(strItemName+'을(를) 가져오셨군요. 알고계시겠지만, 제련을 하다보면 무기가 망가지기도 하는데 괜찮겠습니까?');
			}
			else
			{
				dlg.boxSay.setText("그건 무기가 아닌데요?");
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
	this.strCaption = '궁노정보 ';
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
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"소유자 : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"도시 : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"공격레벨 : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,100, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"공격력(현재레벨) : "+addCommas(ds.rows[0].get("n4CircleProduct")),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"공격력(다음레벨) : "+addCommas(ds.rows[0].get("n4CircleProduct2")),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
			
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			//---업그레이드
			dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
			dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'업그레이드',null);
			dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
			dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
			dlg.prgUpgrade.n4MaxValue = 1000;
			dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
			dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
			dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '시작');
			dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
			dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
			{
				sender.parent.lblGold.setText('금:'+addCommas(n4Value));
			}
			dlg.prgUpgrade.setValue(700);
			dlg.btnUpgradeOK.frmLayer.onclick=function()
			{
				var dlg = this.NxControl.parent;
				var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_rice].n4Gold * dlg.prgUpgrade.n4Value;
				if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
				{
					Alert('alert_'+this.id, '금이 부족합니다.');
					return;
				}
				var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
				gsd.strCaption="누구에게 시키시겠습니까?";
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
							var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '건물 업그레이드가 시작되었습니다.');
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
			dlg.renderControl(dlg.work,250, 20,200,160,'건물 업그레이드 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
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
	this.strCaption = '마구간 ';
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
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"소유자 : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"도시 : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"건물레벨 : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,300, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"생산 가능한 군마(현재레벨) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"생산 가능한 군마(다음레벨) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			//---생산
			if(dlg.n1Job==1)
			{
				dlg.lbl_6 = new NxControl('lbl_6'+'_'+dlg.id);
				dlg.renderControl(dlg.lbl_6,250, 20,100,180,'군마생산',null);
				dlg.prg = new nxAmountBar('nxAmountBar_'+dlg.id, dlg);
				dlg.renderControl(dlg.prg,250, 20,180,175,null,null);
				dlg.prg.n4MaxValue = parseInt(ds.rows[0].get("n4CircleProduct"));
				dlg.createAM = new NxControl('createAM'+'_'+dlg.id);
				dlg.renderControl(dlg.createAM,250, 20,330,180, '0',null);
				dlg.createGold = new NxControl('createGold'+'_'+dlg.id);
				dlg.renderControl(dlg.createGold,250, 20,410,180, '금:0',null);
				dlg.btnOK = new nxButton('btnOK'+'_'+dlg.id, '생산');
				dlg.renderControl(dlg.btnOK,80, 30,480,175,null,null);
				
				if(dlg.prg.n4MaxValue==0)
					Alert('notYet','건물 레벨이 낮아 생산이 불가능합니다.<br>업그레이드를 수행하세요.', nxStatic.gameUser.n4KunsaSN);
				
				dlg.prg.onvaluechange=function(n4Value, sender)
				{
					sender.parent.createAM.setText('수량:'+addCommas(n4Value));
					var price = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold;
					sender.parent.createGold.setText('금:'+addCommas(n4Value*price));
				}
				dlg.prg.setValue(parseInt(ds.rows[0].get("n4CircleProduct"))*0.3);
				dlg.btnOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prg.n4Value;
					if(totalPrice>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert(dlg.id,'금이 부족합니다.');
						return;
					}
					else if(dlg.prg.n4Value<1)
					{
						Alert(dlg.id,'수량은 0보다 커야합니다.');
						return;
					}
					
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="누구에게 시키시겠습니까?";
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
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '군마 생산이 시작되었습니다.');
								nw.show();
							}

							nxStatic.gameUser.requestUserInfo();
						}
					}
					
				}
			}
			else
			{
				//---업그레이드
				dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
				dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'업그레이드',null);
				dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
				dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
				dlg.prgUpgrade.n4MaxValue = 1000;
				dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
				dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
				dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '시작');
				dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
				dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
				{
					sender.parent.lblGold.setText('금:'+addCommas(n4Value));
				}
				dlg.prgUpgrade.setValue(700);
				dlg.btnUpgradeOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prgUpgrade.n4Value;
					if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert('alert_'+this.id, '금이 부족합니다.');
						return;
					}
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="누구에게 시키시겠습니까?";
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
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '건물 업그레이드가 시작되었습니다.');
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
			dlg.renderControl(dlg.work,250, 20,200,160,'군마 생산 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'수량: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 1, n4TotalSeconds );
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'건물 업그레이드 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
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
	this.strCaption = '대장간 ';
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
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"소유자 : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"도시 : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"건물레벨 : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,300, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"생산 가능한 병기(현재레벨) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"생산 가능한 병기(다음레벨) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		
			
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			if(dlg.n1Job==1)
			{
				//---생산
				dlg.selWeapon = new NxSelectBox('selWeapon'+'_'+dlg.id);
				dlg.renderControl(dlg.selWeapon,250, 20,70,180,null,null);
				dlg.selWeapon.addItem("창",nxStatic.n1CodeProduct_spear);
				dlg.selWeapon.addItem("연노",nxStatic.n1CodeProduct_bow);
				dlg.lblWeapon = new NxControl('lblWeapon'+'_'+dlg.id);
				dlg.renderControl(dlg.lblWeapon,250, 20,130,180,'생산',null);			
				dlg.prg = new nxAmountBar('nxAmountBar_'+dlg.id, dlg);
				dlg.renderControl(dlg.prg,250, 20,180,175,null,null);
				dlg.prg.n4MaxValue = parseInt(ds.rows[0].get("n4CircleProduct"));
				dlg.createAM = new NxControl('createAM'+'_'+dlg.id);
				dlg.renderControl(dlg.createAM,250, 20,330,180, '0',null);
				dlg.createGold = new NxControl('createGold'+'_'+dlg.id);
				dlg.renderControl(dlg.createGold,250, 20,410,180, '금:0',null);
				dlg.btnOK = new nxButton('btnOK'+'_'+dlg.id, '생산');
				dlg.renderControl(dlg.btnOK,80, 30,480,175,null,null);
				
				if(dlg.prg.n4MaxValue==0)
					Alert('notYet','건물 레벨이 낮아 생산이 불가능합니다.<br>업그레이드를 수행하세요.', nxStatic.gameUser.n4KunsaSN);
					
				dlg.selWeapon.selectBox.onchange=function()
				{
					var dlg = this.parentNode.NxControl.parent;
					dlg.prg.selectBtn(dlg.prg.n1SelectedIndex);
					
				}
				dlg.prg.onvaluechange=function(n4Value, sender)
				{
					sender.parent.createAM.setText('수량:'+addCommas(n4Value));
					var price = nxStatic.mainContainer.GameUser.priceInfo[dlg.selWeapon.getSelectedValue()].n4Gold;
					sender.parent.createGold.setText('금:'+addCommas(n4Value*price));
				}
				dlg.prg.setValue(parseInt(ds.rows[0].get("n4CircleProduct"))*0.3);
				dlg.btnOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[dlg.selWeapon.getSelectedValue()].n4Gold * dlg.prg.n4Value;
					if(totalPrice>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert(dlg.id,'금이 부족합니다.');
						return;
					}
					else if(dlg.prg.n4Value<1)
					{
						Alert(dlg.id,'수량은 0보다 커야합니다.');
						return;
					}
					
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="누구에게 시키시겠습니까?";
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
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, dlg.selWeapon.getSelectedText()+' 생산이 시작되었습니다.');
								nw.show();
							}
							nxStatic.gameUser.requestUserInfo();
						}
					}
					
				}
			}
			else
			{
				//---업그레이드
				dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
				dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'업그레이드',null);
				dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
				dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
				dlg.prgUpgrade.n4MaxValue = 1000;
				dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
				dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
				dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '시작');
				dlg.renderControl(dlg.btnUpgradeOK,80, 30,480,185,null,null);
				dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
				{
					sender.parent.lblGold.setText('금:'+addCommas(n4Value));
				}
				dlg.prgUpgrade.setValue(700);
				dlg.btnUpgradeOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					//var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prgUpgrade.n4Value;
					if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert('alert_'+this.id, '금이 부족합니다.');
						return;
					}
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="누구에게 시키시겠습니까?";
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
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '건물 업그레이드가 시작되었습니다.');
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
			var strWeaponName			= n1CodeProduct==nxStatic.n1CodeProduct_spear?'창':'연노';
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160, strWeaponName+' 생산 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'수량: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 1, n4TotalSeconds );
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'건물 업그레이드 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
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
				dlg.renderControl(dlg.work,250, 20,200,160,'아이템 제련 중...',null);
				dlg.work2 = new NxControl('work2'+'_'+dlg.id);
				dlg.renderControl(dlg.work2,250, 20,200,190,'아이템: '+strItemOverScript,null);
				dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
				dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
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
	this.strCaption = '병영 ';
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
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"소유자 : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"도시 : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"건물레벨 : "+ds.rows[0].get("n4BuildingLevel"),null);
		dlg.lbl_exp = new NxControl('lbl_exp'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_exp,300, 20,450,65, ds.rows[0].get("n4BuildingExp")+'/'+ds.rows[0].get("n4BuildingExpNext"),null);
		dlg.lbl_4 = new NxControl('lbl_4'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_4,250, 20,150,95,"모집 가능한 병사(현재레벨) : "+ds.rows[0].get("n4CircleProduct"),null);
		dlg.lbl_5 = new NxControl('lbl_5'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_5,250, 20,150,125,"모집 가능한 병사(다음레벨) : "+ds.rows[0].get("n4CircleProduct2"),null);
		
		if(dlg.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
			return;
		if(n1BuildingStatus==nxStatic.n1BuildingStatus_ready)
		{
			if(dlg.n1Job==1)
			{
				//---생산
				dlg.lbl_6 = new NxControl('lbl_6'+'_'+dlg.id);
				dlg.renderControl(dlg.lbl_6,250, 20,100,180,'모병',null);
				dlg.prg = new nxAmountBar('nxAmountBar_'+dlg.id, dlg);
				dlg.renderControl(dlg.prg,250, 20,180,175,null,null);
				dlg.prg.n4MaxValue = parseInt(ds.rows[0].get("n4CircleProduct"));
				dlg.createAM = new NxControl('createAM'+'_'+dlg.id);
				dlg.renderControl(dlg.createAM,250, 20,330,180, '0',null);
				dlg.createGold = new NxControl('createGold'+'_'+dlg.id);
				dlg.renderControl(dlg.createGold,250, 20,410,180, '군량:0',null);
				dlg.btnOK = new nxButton('btnOK'+'_'+dlg.id, '시작');
				dlg.renderControl(dlg.btnOK,80, 30,490,175,null,null);
				
				if(dlg.prg.n4MaxValue==0)
					Alert('notYet','건물 레벨이 낮아 모병이 불가능합니다.<br>업그레이드를 수행하세요.', nxStatic.gameUser.n4KunsaSN);
				
				dlg.prg.onvaluechange=function(n4Value, sender)
				{
					sender.parent.createAM.setText('병사:'+addCommas(n4Value));
					var price = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_soldier].n4Rice;
					sender.parent.createGold.setText('군량:'+addCommas(n4Value*price));
				}
				dlg.prg.setValue(parseInt(ds.rows[0].get("n4CircleProduct"))*0.3);
				dlg.btnOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_soldier].n4Rice * dlg.prg.n4Value;
					if(totalPrice>nxStatic.mainContainer.GameUser.n4MasterRice)
					{
						Alert(dlg.id,'군량이 부족합니다.');
						return;
					}
					else if(dlg.prg.n4Value<1)
					{
						Alert(dlg.id,'수량은 0보다 커야합니다.');
						return;
					}
					
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="누구에게 시키시겠습니까?";
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
									var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '모병이 시작되었습니다.');
									nw.show();
							}
							nxStatic.gameUser.requestUserInfo();
							
						}
					}
					
				}
			}
			else
			{
				//---업그레이드
				dlg.lblUpgrade = new NxControl('lblUpgrade'+'_'+dlg.id);
				dlg.renderControl(dlg.lblUpgrade,250, 20,100,190,'업그레이드',null);
				dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
				dlg.renderControl(dlg.prgUpgrade,250, 20,180,185,null,null);
				dlg.prgUpgrade.n4MaxValue = 1000;
				dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
				dlg.renderControl(dlg.lblGold,250, 20,410,190,'1000',null);
				dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '시작');
				dlg.renderControl(dlg.btnUpgradeOK,80, 30,490,185,null,null);
				dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
				{
					sender.parent.lblGold.setText('금:'+addCommas(n4Value));
				}
				dlg.prgUpgrade.setValue(700);
				dlg.btnUpgradeOK.frmLayer.onclick=function()
				{
					var dlg = this.NxControl.parent;
					var totalPrice = nxStatic.mainContainer.GameUser.priceInfo[nxStatic.n1CodeProduct_horse].n4Gold * dlg.prgUpgrade.n4Value;
					if(dlg.prgUpgrade.n4Value>nxStatic.mainContainer.GameUser.n4MasterGold)
					{
						Alert('alert_'+this.id, '금이 부족합니다.');
						return;
					}
					var gsd = new nxGeneralSelectDialog('nxGeneralSelectDialog'+this.id, dlg, dlg.owner.n4CastleSN, dlg.owner.n4MasterSN);
					gsd.strCaption="누구에게 시키시겠습니까?";
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
								var nw = new nxNoticeWindow('nxNoticeWindow'+'_'+this.id, '건물 업그레이드가 시작되었습니다.');
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
			dlg.renderControl(dlg.work,250, 20,200,160,'모병 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'모병인원: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
			dlg.timer = new nxTimer('timer_'+dlg.id, n4TotalSeconds);
			dlg.renderControl(dlg.timer,250, 20,280,220,null,null);
			mainMethod.jobStart(owner.n4BuildingSN, 1, n4TotalSeconds );
		}
		else if(n1BuildingStatus==nxStatic.n1BuildingStatus_upgrade)
		{
			var n4RequestProductAmount	= parseInt(ds.rows[0].get("n4RequestProductAmount"));
			var n4TotalSeconds			= parseInt(ds.rows[0].get("n4TotalSeconds"));
			dlg.work = new NxControl('work'+'_'+dlg.id);
			dlg.renderControl(dlg.work,250, 20,200,160,'건물 업그레이드 중...',null);
			dlg.work2 = new NxControl('work2'+'_'+dlg.id);
			dlg.renderControl(dlg.work2,250, 20,200,190,'EXP: '+n4RequestProductAmount,null);
			dlg.timerLabel = new NxControl('timerLabel_'+dlg.id);
			dlg.renderControl(dlg.timerLabel,250, 20,200,220,"남은 시간:",null);
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
	this.strCaption = '무장정보' ;
	function callBack(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.setLeft(30);
		dlg.grid.setWidth(dlg.body.getWidth()-60);
		dlg.grid.setHeight(dlg.body.getHeight());
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName"	, "이름"	, 110);
		dlg.grid.columns[i++] = new nxExpViewGridColumn( "n4Level"		, "레벨"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "strGrade"		, "신분"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Patriot"	, "충성"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Working"	, "작업"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Str"		, "무력"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Int"		, "지력"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Poli"		, "정치"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Charm"		, "매력"	, 40);
		dlg.grid.columns[i++] = new nxAvilViewGridColumn( "strSpecialAvilName"		, "특기"	, 40);
		dlg.grid.columns[i++] = new nxGeneralItemViewGridColumn( "n4GeneralSN"		, "아이템"	, 50,2);
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
	this.button.setTitle('선택');
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
	this.cancel.setTitle('취소');
	this.cancel.show();
	this.add(this.cancel);
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
		
	
	this.n1Working = n1Working?n1Working:0;
	this.n1Patriot = n1Patriot?n1Patriot:100;
	this.n1SelectType=1;//0-없음 1-단일, 2-다중		
	
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralGetList);
	cmd.addParam("n4CastleSN"	, n4CastleSN);
	cmd.addParam("n4MasterSN"	, n4MasterSN);
	cmd.addParam("n1Working"	, this.n1Working);
	cmd.addParam("n1Patriot"	, this.n1Patriot);
	//cmd.print();
	cmd.execute(callBack);
	this.strCaption = '무장선택' ;
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
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName"	, "이름"	, 110);
		dlg.grid.columns[i++] = new nxExpViewGridColumn( "n4Level"		, "레벨"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "strGrade"		, "신분"	, 50);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Patriot"	, "충성"	, 50);
		//dlg.grid.columns[i++] = new nxGridColumn( "n1Age"		, "나이"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Working"	, "작업"	, 45);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Str"		, "무력"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Int"		, "지력"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Poli"		, "정치"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Charm"		, "매력"	, 40);
		dlg.grid.columns[i++] = new nxAvilViewGridColumn( "strSpecialAvilName"		, "특기"	, 50);
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
	this.strCaption = n1Trade==0?'군량 매입':'군량 매각';
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
		dlg.renderControl(dlg.lbl_1,150, 20,150,45,"소유자 : "+ds.rows[0].get("strMasterName"),null);
		dlg.lbl_2 = new NxControl('lbl_2'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_2,150, 20,300,45,"도시 : "+ds.rows[0].get("strCastleName"),null);
		dlg.lbl_3 = new NxControl('lbl_3'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl_3,150, 20,450,45,"시세:  1:"+dlg.n1MarketPriceRice,null);
		
				
		//---거래
		dlg.lblJob = new NxControl('lblUpgrade'+'_'+dlg.id);
		dlg.renderControl(dlg.lblJob,250, 20,100,170,dlg.strCaption,null);
		dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
		dlg.renderControl(dlg.prgUpgrade,250, 20,190,160,null,null);
		dlg.prgUpgrade.n4MaxValue = dlg.n1Trade==0?nxStatic.mainContainer.GameUser.n4MasterGold:nxStatic.mainContainer.GameUser.n4MasterRice;
		dlg.lblGold = new NxControl('lblGold'+'_'+dlg.id);
		dlg.renderControl(dlg.lblGold,250, 20,400,150,dlg.prgUpgrade.n4MaxValue,null);
		dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, dlg.n1Trade==0?'매입':'매각');
		dlg.renderControl(dlg.btnUpgradeOK,80, 30,450,175,null,null);
		dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
		{
			if(dlg.n1Trade==0)//매입
				sender.parent.lblGold.setText('금:'+addCommas(n4Value)+"&nbsp;&nbsp; 군량:"+addCommas(parseInt(n4Value)/parseInt(dlg.n1MarketPriceRice)));
			else//매각
				sender.parent.lblGold.setText('금:'+addCommas(parseInt(n4Value*dlg.n1MarketPriceRice))+"&nbsp;&nbsp; 군량:"+addCommas(n4Value));
		}
		dlg.prgUpgrade.setValue(700);
		dlg.btnUpgradeOK.frmLayer.onclick=function()
		{
			var dlg = this.NxControl.parent;
			var totalPrice = parseInt(dlg.prgUpgrade.n4Value / dlg.n1MarketPriceRice);
			if(dlg.n1Trade==0)//매입
			{
				function callMerchantBuy(xml, strText, dlg)
				{
					var ds = new NxDataSet(xml);
					var n4Gold		= ds.rows[0].get("n4Gold");
					var n4Product	= ds.rows[0].get("n4Product");
					nxStatic.closeDialog();
					mainMethod.refresh();
					Alert('callMerchantSell'+'_'+this.id, addCommas(addCommas(n4Product))+'의 군량을 매입하였습니다.');
				}
				var cmd = new nxCommand(null, dlg);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_merchantSell);
				cmd.addParam("n1CodeProduct"	, nxStatic.n1CodeProduct_rice);
				cmd.addParam("n4BuildingSN"		, dlg.owner.n4BuildingSN);
				cmd.addParam("n4RequestAmount"	, totalPrice);
				//cmd.print();
				cmd.execute(callMerchantBuy);
				
			}
			else//매각
			{
				function callMerchantSell(xml, strText, dlg)
				{
					var ds = new NxDataSet(xml);
					var n4Gold		= ds.rows[0].get("n4Gold");
					var n4Product	= ds.rows[0].get("n4Product");
					nxStatic.closeDialog();
					mainMethod.refresh();
					Alert('callMerchantSell'+'_'+this.id, addCommas(addCommas(Math.abs(n4Gold)))+'의 금을 얻었습니다.');
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
	this.strCaption = '직급변경';
	this.n4GeneralSN= n4GeneralSN;
	
	this.button.setTitle('확인');
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
	this.cancel.setTitle('취소');
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
	this.renderControl(this.lbl1,140, 20 ,134,45,"이름 : ",null);
	this.lbl2 = new NxControl('lbl2'+'_'+this.id);
	this.renderControl(this.lbl2,100, 20 ,274,45,"신분 : ",null);
	this.lbl3 = new NxControl('lbl3'+'_'+this.id);
	this.renderControl(this.lbl3,100, 20 ,374,45,"충성 : ",null);
	this.lbl4 = new NxControl('lbl4'+'_'+this.id);
	this.renderControl(this.lbl4,100, 20 ,474,45,"나이 : ",null);
	
	this.lbl5 = new NxControl('lbl5'+'_'+this.id);
	this.renderControl(this.lbl5,100, 20 ,134,75,"작업 : ",null);
	this.lbl6 = new NxControl('lbl6'+'_'+this.id);
	this.renderControl(this.lbl6,100, 20 ,274,75,"무력 : ",null);
	this.lbl7 = new NxControl('lbl7'+'_'+this.id);
	this.renderControl(this.lbl7,100, 20 ,374,75,"지력 : ",null);
	this.lbl8 = new NxControl('lbl8'+'_'+this.id);
	this.renderControl(this.lbl8,100, 20 ,474,75,"정치 : ",null);

	this.lbl9 = new NxControl('lbl9'+'_'+this.id);
	this.renderControl(this.lbl9,100, 20 ,134,105,"매력 : ",null);
	this.lbl10 = new NxControl('lbl10'+'_'+this.id);
	
	this.lbl12 = new NxControl('lbl12'+'_'+this.id);
	this.renderControl(this.lbl12,100, 20,184,157,"직급선택 : ",null);
	
	this.lbl13 = new NxControl('lbl13'+'_'+this.id);
	this.renderControl(this.lbl13,400, 40,184,187,"",null);
	
	this.selNewGrade = new NxSelectBox('NxSelectBox_'+this.id);
	this.add(this.selNewGrade);
	this.selNewGrade.setLeft(274);
	this.selNewGrade.setTop(157);
	this.selNewGrade.addItem("무관",nxStatic.n1CodeGeneralGradeMukwan);
	this.selNewGrade.addItem("문관",nxStatic.n1CodeGeneralGradeMunkwan);
	this.selNewGrade.addItem("장군",nxStatic.n1CodeGeneralGradeGeneral);
	this.selNewGrade.addItem("군사",nxStatic.n1CodeGeneralGradeKunsa);
	this.selNewGrade.show();
	this.selNewGrade.onChange=function(sender, strValue, strText)
	{
		var lbl = sender.parent.lbl13;
		var n1Code = parseInt(strValue);
		if(n1Code==1)
			lbl.setText(strText+':무장의 무력이 증가합니다. (무력+5, 지력-5)');
		else if(n1Code==2)
			lbl.setText(strText+':무장의 지력이 증가합니다. (무력-5, 지력+5)');
		else if(n1Code==3)
			lbl.setText(strText+':무장의 전투능력이 증가합니다. 최대 5명만 지정 가능합니다. (무력+5, 지력+5)');
		else if(n1Code==4)
			lbl.setText(strText+':무장의 내정능력이 증가합니다. 최대 1명만 지정 가능합니다. (지력+5, 정치+5, 매력+5)');
	}
	
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralGetInfo);
	cmd.addParam("n4GeneralSN", this.n4GeneralSN);
	//cmd.print();
	cmd.execute(callBackn1QueryID_GeneralGetInfo);
	
	function callBackn1QueryID_GeneralGetInfo(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		
		dlg.lbl1.setText("이름 : "+ds.rows[0].get("strGeneralName"));
		dlg.lbl2.setText("신분 : "+ds.rows[0].get("strGrade"));
		dlg.lbl3.setText("충성 : "+ds.rows[0].get("n1Patriot"));
		dlg.lbl4.setText("나이 : ??");//+ds.rows[0].get("n1Age"));
		dlg.lbl5.setText("작업 : "+ds.rows[0].get("n1Working"));
		dlg.lbl6.setText("무력 : "+ds.rows[0].get("n4Str"));
		dlg.lbl7.setText("지력 : "+ds.rows[0].get("n4Int"));
		dlg.lbl8.setText("정치 : "+ds.rows[0].get("n4Poli"));
		dlg.lbl9.setText("매력 : "+ds.rows[0].get("n4Charm"));
		//dlg.lbl10.setText("육전 : "+ds.rows[0].get("n4Earth"));
		//dlg.lbl11.setText("해전 : "+ds.rows[0].get("n4Sea"));
		
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
				dlg.selGeneralPic.addItem('사진'+i,  i+'.jpg');
			}
		}
		else
		{
			for(var i=1;i<=9;i++)
			{
				dlg.selGeneralPic.addItem('사진'+i,  (i+20)+'.jpg');
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
	this.strCaption = '신무장 생성';
	//this.n4GeneralSN= n4GeneralSN;
	
	this.button.setTitle('확인');
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
	this.cancel.setTitle('취소');
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
	this.renderControl(this.lbl1,100, 20 ,184,60,"이름 : ",null);
	
	this.txtGeneralName = new NxTextBox('txtGeneralName');
	this.txtGeneralName.setLength(6);
	this.renderControl(this.txtGeneralName,130, 20 ,234,60,"",null);
	
	this.lbl10 = new NxControl('lbl10'+'_'+this.id);
	this.renderControl(this.lbl10,100, 20 ,184,90,"능력치 비중:",null);
	this.selTalent = new NxSelectBox('selTalent_'+this.id);
	this.add(this.selTalent);
	this.selTalent.setLeft(284);
	this.selTalent.setTop(90);
	this.selTalent.setWidth(150);
	this.selTalent.setHeight(30);
	this.selTalent.addItem('무력',  1);
	this.selTalent.addItem('지력',  2);
	this.selTalent.addItem('정치',  3);
	this.selTalent.addItem('매력',  4);
	this.selTalent.show();

	this.lblDesc = new NxControl('lblDesc'+'_'+this.id);
	this.renderControl(this.lblDesc,350, 100 ,184,150,"신무장을 생성합니다. 신무장의 능력치는 설정된 비중을 따르지만 궁극의 수치는 랜덤으로 결정됩니다.<BR><BR>신무장 생성현황 : "+ nxStatic.gameUser.n4CustomGeneralCount+"/"+nxStatic.gameUser.n4MaxCustomGenralLimit,null);
	
	this.selGeneralPic = new NxSelectBox('NxSelectBox_'+this.id);
	this.add(this.selGeneralPic);
	this.selGeneralPic.setLeft(70);
	this.selGeneralPic.setTop(170);
	this.selGeneralPic.setWidth(120);
	this.selGeneralPic.setHeight(30);
	this.selGeneralPic.show();
	
	for(var i=1;i<=20;i++)
	{
		this.selGeneralPic.addItem('사진'+i+'(남)',  i+'.jpg');
	}
	for(var i=21;i<=29;i++)
	{
		this.selGeneralPic.addItem('사진'+i+'(여)',  i+'.jpg');
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
			Alert('strGeneralName', '금 300,000 이 필요합니다.');
			return;
		}
		else if(strGeneralName.length>6)
		{
			Alert('strGeneralName', '이름의 길이는 6자를 초과할 수 없습니다.');
			return;
		}
		else if (nxStatic.gameUser.n4MaxCustomGenralLimit<=nxStatic.gameUser.n4CustomGeneralCount)
		{
			Alert('n4MaxCustomGenralLimit', '더이상 신무장을 생성할 수 없습니다. 기존 신무장을 해고하거나 명예점수를 올리시기 바랍니다.');
			return;
		}
		else if(strGeneralName.trim()=='')
		{
			Alert('strGeneralName', '신무장의 이름을 입력하세요.');
			return;
		}
		else if(!checkKoreanOnly(strGeneralName))
		{
			Alert('strGeneralName', '무장의 이름은 한글만 입력 가능합니다.');
			return;
		}
		
		function callBackGeneralName(xml, strText, dlg)
		{
			var ds = new NxDataSet(xml);
			var	strName =ds.rows[0].get("strName");
			var	n4Count = parseInt(ds.rows[0].get("n4Count"));			
			if(n4Count>0)
			{
				Alert('strName', strName+'은(는) 이미 사용중인 이름입니다. 다른 이름을 선택하세요.<BR><BR>(참고)삼국지에 등장하는 무장의 이름은 모두 재야에 등록되어있습니다.');
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
					Confirm(dlg,'금 300,000을 사용하여<BR>신무장을 생성합니다.<BR><BR>생성하시겠습니까?', callBackCreate, nxStatic.gameUser.n4KunsaSN );
				else
					Confirm(dlg,'신무장을 생성하시겠습니까?', callBackCreate, nxStatic.gameUser.n4KunsaSN );					
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
	
		this.rows = new Array(this.items.length);//로우데이터 저장
		
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
				
				//컬럼 커스터마이징을 위한 호출
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
