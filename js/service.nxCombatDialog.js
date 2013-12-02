
function nxArmySelectDialog(strLayerID, owner, n1ArmyStatus, n1Working, n4CastleSN, n4MinSoldier)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	if(!n4CastleSN)
	{
		alert('n4CastleSN 이 없습니다.');
		return;
	}
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
	this.button.setTitle('편성');
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
	this.cancel.setTitle('닫기');
	this.cancel.show();
	this.add(this.cancel);
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
	this.n1SelectType	=1;//0-없음 1-단일, 2-다중		
	this.n1SelectMaxCount = 9999;
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_armyGetList);
	if(n1ArmyStatus!=null)
		cmd.addParam("n1ArmyStatus", n1ArmyStatus);
	if(n1Working!=null)
		cmd.addParam("n1Working", n1Working);
	cmd.addParam("n4CastleSN", n4CastleSN);
	cmd.addParam("n4MinSoldier", n4MinSoldier?n4MinSoldier:0);
	
	//cmd.print();
	cmd.execute(callBack);
	this.strCaption = '부대편성' ;
	function callBack(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.n1SelectType=dlg.n1SelectType;
		dlg.grid.n4MaxSelectCount=dlg.n1SelectMaxCount;
		dlg.grid.setLeft(30);
		dlg.grid.setWidth(dlg.body.getWidth()-60);
		dlg.grid.setHeight(dlg.body.getHeight());
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName"	, "이름"	, 110);
		dlg.grid.columns[i++] = new nxExpViewGridColumn( "n4Level"		, "레벨"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "strGrade"		, "신분"	, 45);
		//dlg.grid.columns[i++] = new nxGridColumn( "n1Patriot"	, "충성"	, 50);
		dlg.grid.columns[i++] = new nxGridColumn( "n1Working"	, "작업"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Str"		, "무력"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Int"		, "지력"	, 40);
		//dlg.grid.columns[i++] = new nxGridColumn( "n4Earth"		, "육전"	, 45);
		//dlg.grid.columns[i++] = new nxGridColumn( "n4Sea"		, "해전"	, 45);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Soldiers"	, "병사"	, 50);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Stamina"	, "사기"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "strArmyStatus", "상태"	, 45);
		dlg.grid.columns[i++] = new nxAvilViewGridColumn( "strSpecialAvilName"		, "특기"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "strArmyType"	, "병과"	, 45);
		dlg.grid.columns[i++] = new nxGridColumn( "n4GeneralSN"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n1ArmyStatus", null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4AvilCode"		, null, 0);
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
		
		nxStatic.gameUser.requestUserInfo();
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
		if(this.NxControl.parent.n1SelectMaxCount<this.NxControl.parent.getSelectedItems().length)
		{
			Alert('callBackChulbyung_', '군단 편성에 부대수가 '+this.NxControl.parent.n1SelectMaxCount+'개를 초과할 수 없습니다.', nxStatic.gameUser.n4KunsaSN);
			return;
		}
		else
		{
			this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.getSelectedItems() , this.NxControl.parent);
		}
		
		//this.NxControl.parent.unload();
	}
	
	this.onsubmit = function(owner, selectedItems, dialogControl){}//ex)selectedItems[0].row['n4GeneralSN']

	
}
nxArmySelectDialog.prototype = new NxControl();
nxArmySelectDialog.prototype.constructor = nxArmySelectDialog;



function nxArmyModifyDialog(strLayerID, owner, n4GeneralSN, n4KingSN)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	this.n4KingSN = n4KingSN;
	this.strCaption = '부대편성';
	this.n4GeneralSN = n4GeneralSN;
	
		
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_armyGetInfo);
	cmd.addParam("n4GeneralSN", n4GeneralSN);
	cmd.execute(callBack);
	function callBack(xml, strText, dlg)
	{
		var ds  = new NxDataSet(xml);
		var strGeneralName	= ds.rows[0].get("strGeneralName");
		var n4GeneralSN		= ds.rows[0].get("n4GeneralSN");
		var n4Level			= parseInt(ds.rows[0].get("n4Level"));
		dlg.n4ArmyMax		= 10000+((n4Level-1)*500);
		dlg.n1ArmyType		= ds.rows[0].get("n1ArmyType");
		dlg.n4Soldiers		= parseInt(ds.rows[0].get("n4Soldiers"));
		var n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterSoldier) + parseInt(dlg.n4Soldiers);
		n4EnableSoldier = n4EnableSoldier>=dlg.n4ArmyMax?dlg.n4ArmyMax:n4EnableSoldier;
		if(dlg.n1ArmyType==nxStatic.n1CodeCombatArmyType_spear)
			n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterSpear)+ parseInt(dlg.n4Soldiers)>=n4EnableSoldier?n4EnableSoldier: parseInt(nxStatic.gameUser.n4MasterSpear)+ parseInt(dlg.n4Soldiers);
		if(dlg.n1ArmyType==nxStatic.n1CodeCombatArmyType_horse)
			n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterHorse)+ parseInt(dlg.n4Soldiers)>=n4EnableSoldier?n4EnableSoldier: parseInt(nxStatic.gameUser.n4MasterHorse)+ parseInt(dlg.n4Soldiers);
		if(dlg.n1ArmyType==nxStatic.n1CodeCombatArmyType_bow)
			n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterBow  )+ parseInt(dlg.n4Soldiers)>=n4EnableSoldier?n4EnableSoldier: parseInt(nxStatic.gameUser.n4MasterBow)+ parseInt(dlg.n4Soldiers);

		//dlg.masterPic = new NxControl('mujang_'+dlg.id);
		//dlg.renderControl(dlg.masterPic,100,100,24,45,null,'http://nexen.pe.kr/img/face/kamnyung.png');
		dlg.masterPic = new nxGeneralFaceControl('nxGeneralFaceControl', dlg, n4GeneralSN);	
		dlg.add(dlg.masterPic);
		dlg.masterPic.setLeft(24);
		dlg.masterPic.setTop(45);
		dlg.masterPic.setWidth(80);
		dlg.masterPic.setHeight(100);
		dlg.masterPic.show();


		//---부대재편
		dlg.lblMSG = new NxControl('lblmsg'+'_'+dlg.id);
		dlg.renderControl(dlg.lblMSG,280, 20,160,90,strGeneralName+"의 병사를 재편성 합니다.",null);
		
		dlg.lbl = new NxControl('lbl'+'_'+dlg.id);
		dlg.renderControl(dlg.lbl,250, 20,40,170,'병사',null);
		dlg.prgUpgrade = new nxAmountBar('prgUpgrade'+dlg.id, dlg);
		dlg.renderControl(dlg.prgUpgrade,250, 20,100,165,null,null);
		dlg.prgUpgrade.n4MaxValue = n4EnableSoldier;
		dlg.prgUpgrade.setValue(dlg.n4Soldiers);
		
		dlg.seln1ArmyType = new NxSelectBox('NxSelectBox_'+dlg.id);
		dlg.add(dlg.seln1ArmyType);
		dlg.seln1ArmyType.setLeft(257);
		dlg.seln1ArmyType.setTop(170);
		dlg.seln1ArmyType.setWidth(50);
		dlg.seln1ArmyType.setHeight(20);
		dlg.seln1ArmyType.addItem("검병",nxStatic.n1CodeCombatArmyType_sword);
		dlg.seln1ArmyType.addItem("창병",nxStatic.n1CodeCombatArmyType_spear);
		dlg.seln1ArmyType.addItem("기병",nxStatic.n1CodeCombatArmyType_horse);
		dlg.seln1ArmyType.addItem("궁병",nxStatic.n1CodeCombatArmyType_bow);
		dlg.seln1ArmyType.show();
		dlg.seln1ArmyType.setSelectedValue(dlg.n1ArmyType);
		dlg.seln1ArmyType.onChange=function(sender, strValue, strText)
		{
			strValue = parseInt(strValue);
			var dlg = sender.parent;
			var n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterSoldier) + parseInt(dlg.n4Soldiers);
			
			if(parseInt(dlg.n1ArmyType)!=parseInt(strValue))
			{
				if(strValue==nxStatic.n1CodeCombatArmyType_spear)
					n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterSpear)>=n4EnableSoldier?n4EnableSoldier: parseInt(nxStatic.gameUser.n4MasterSpear);
				if(strValue==nxStatic.n1CodeCombatArmyType_horse)
					n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterHorse)>=n4EnableSoldier?n4EnableSoldier: parseInt(nxStatic.gameUser.n4MasterHorse);
				if(strValue==nxStatic.n1CodeCombatArmyType_bow)
					n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterBow  )>=n4EnableSoldier?n4EnableSoldier: parseInt(nxStatic.gameUser.n4MasterBow);
			}
			else
			{
				if(strValue==nxStatic.n1CodeCombatArmyType_spear)
					n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterSpear) + parseInt(dlg.n4Soldiers);
				if(strValue==nxStatic.n1CodeCombatArmyType_horse)
					n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterHorse) + parseInt(dlg.n4Soldiers);
				if(strValue==nxStatic.n1CodeCombatArmyType_bow)
					n4EnableSoldier = parseInt(nxStatic.gameUser.n4MasterBow  ) + parseInt(dlg.n4Soldiers);
			}
			n4EnableSoldier = n4EnableSoldier>=dlg.n4ArmyMax?dlg.n4ArmyMax:n4EnableSoldier;
						
			dlg.prgUpgrade.n4MaxValue = n4EnableSoldier;
			dlg.prgUpgrade.setValue(dlg.prgUpgrade.n4MaxValue>=dlg.prgUpgrade.n4Value?dlg.prgUpgrade.n4Value:dlg.prgUpgrade.n4MaxValue);
		}
		
		dlg.lblSoldiers = new NxControl('lblSoldiers'+'_'+dlg.id);
		dlg.renderControl(dlg.lblSoldiers,250, 20,330,170,'병사:',null);
		dlg.btnUpgradeOK = new nxButton('btnUpgradeOK'+'_'+dlg.id, '변경');
		dlg.renderControl(dlg.btnUpgradeOK,80, 30,410,165,null,null);
		dlg.btnTerminate = new nxButton('btnTerminate'+'_'+dlg.id, '해산');
		dlg.renderControl(dlg.btnTerminate,80, 30,490,165,null,null);
		dlg.prgUpgrade.onvaluechange=function(n4Value, sender)
		{
			sender.parent.lblSoldiers.setText('병사:'+addCommas(n4Value));
		}
		dlg.prgUpgrade.setValue(parseInt(ds.rows[0].get("n4Soldiers")));
		dlg.btnUpgradeOK.frmLayer.onclick=function()
		{
			var dlg = this.NxControl.parent;
			var cmd = new nxCommand(null, dlg);
			cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_armyCreateUpdate);
			cmd.addParam("n4GeneralSN"	, dlg.n4GeneralSN);
			cmd.addParam("n4Soldiers"	, dlg.prgUpgrade.n4Value);
			cmd.addParam("n1ArmyType"	, dlg.seln1ArmyType.getSelectedValue());
			cmd.addParam("n4KingSN"	, dlg.n4KingSN);
			//cmd.print();
			cmd.execute(callBackProduceStart);
			function callBackProduceStart(xml, strText, dlg)
			{
				dlg.hide();
				dlg.unload();
				dlg.onsubmit(dlg.owner);
				
			}

		}
		dlg.btnTerminate.frmLayer.onclick=function()
		{
			var dlg = this.NxControl.parent;
			var cmd = new nxCommand(null, dlg);
			cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_armyCreateUpdate);
			cmd.addParam("n4GeneralSN"	, dlg.n4GeneralSN);
			cmd.addParam("n4Soldiers"	, 0);
			cmd.addParam("n1ArmyType"	, 1);
			cmd.execute(callBackProduceStart);
			function callBackProduceStart(xml, strText, dlg)
			{
				dlg.unload();
				dlg.onsubmit(dlg.owner);
				
			}

		}
			
		this.onsubmit = function(owner){}
		
	}

}
nxArmyModifyDialog.prototype = new NxControl();
nxArmyModifyDialog.prototype.constructor = nxArmyModifyDialog;



function nxMsgLogDialog(strLayerID, owner, n1MsgType)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	
	document.body.appendChild(this.frmLayer);
	this.setLayerIndex(nxLayer.n4Layer_LogWindow);
	this.setWidth(800);
	this.head.setWidth(800);
	this.head.show();
	this.body.setWidth(800);
	this.bottom.setWidth(800);
	this.content.setWidth(700);
	this.title.setLeft(330);
	
	this.setTop(100);
	this.setHeight(500);
	this.body.setHeight(402);
	this.body.show();
	this.bottom.setTop(443);
	this.bottom.show();
	this.content.setHeight(400);
	this.content.show();
	this.button.setTop(457);
	this.button.setTitle('닫기');
	this.button.moveCenter();
	this.button.show();
	
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_system_msgGetList);
	if(n1MsgType)
		cmd.addParam("n1MsgType", n1MsgType);
	cmd.execute(callBack);
	this.strCaption = '시스템로그' ;
	function callBack(xml, strText, dlg)
	{
		
		var ds = new NxDataSet(xml);
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.n1SelectType=dlg.n1SelectType;
		dlg.grid.setLeft(30);
		dlg.grid.n1ColHeight = 40;
		
		dlg.grid.setWidth(dlg.body.getWidth()-60);
		dlg.grid.setHeight(dlg.body.getHeight());
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "dateCreate"	, "일시"	, 150);
		dlg.grid.columns[i++] = new nxGridColumn( "strMsgType"	, "종류"	, 100);
		dlg.grid.columns[i++] = new nxLogViewGridColumn( "strSubject_some"	, "메시지"	, 460, 0,true);
		dlg.grid.columns[i++] = new nxGridColumn( "strContent"	, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Key1"		, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "strSubject"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n1MsgType"	, null	, 0);
		
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
	

	this.button.frmLayer.onclick = function()
	{
		this.NxControl.parent.unload();
	}
	
	this.onsubmit = function(owner, selectedItems, dialogControl){}//ex)selectedItems[0].row['n4GeneralSN']
	
	
}
nxMsgLogDialog.prototype = new NxControl();
nxMsgLogDialog.prototype.constructor = nxMsgLogDialog;

function nxMsgLogDialog2(strLayerID, owner, n1MsgType)
{
	nxDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	
	this.strCaption = '전투로그';
	document.body.appendChild(this.frmLayer);
	this.setLayerIndex(nxLayer.n4Layer_LogWindow);
	this.setWidth(800);
	this.head.setWidth(800);
	this.head.show();
	this.body.setWidth(800);
	this.bottom.setWidth(800);
	this.content.setWidth(700);
	this.title.setLeft(330);
	
	this.setTop(100);
	this.setHeight(500);

	this.body.setLayerIndex(nxLayer.n4Layer_LogWindow);
	this.body.setHeight(402);
	this.iframe = new NxControl('iframe');
	this.body.add(this.iframe);
	this.iframe.setLayerIndex(nxLayer.n4Layer_LogWindow);
	this.iframe.setText("<iframe src='/inGame/nxCombatLog.aspx' width=100% height=100%></iframe>");
	this.iframe.setLeft(25);
	this.iframe.setWidth(750);
	this.iframe.setHeight(405);
	this.iframe.show();

	this.body.show();
	this.bottom.setTop(443);
	this.bottom.show();
	this.content.setHeight(400);
	this.content.show();
	this.button.setTop(457);
	this.button.setTitle('닫기');
	this.button.moveCenter();
	this.button.show();
	
	
	window.openComBat=function(n4LogIndex)
	{
		//alert(n4LogIndex);
		this.CombatLogDialog = new nxCombatLogDialog('CombatLogDialog', this, n4LogIndex);
		this.CombatLogDialog.show();
	}
	

	this.button.frmLayer.onclick = function()
	{
		this.NxControl.parent.unload();
	}
	
	this.onsubmit = function(owner, selectedItems, dialogControl){}//ex)selectedItems[0].row['n4GeneralSN']
	
	
}
nxMsgLogDialog2.prototype = new NxControl();
nxMsgLogDialog2.prototype.constructor = nxMsgLogDialog2;

function nxLogViewGridColumn( strField, strText, n4Width, align)
{
	nxGridColumn.apply(this, arguments);

	

	this.setProperty=function(nxColumnControl, rowData)
	{
		nxColumnControl.setFontSize(15);
		var strText		= nxColumnControl.getText();
		var n1MsgType	= parseInt(rowData["n1MsgType"]);
		if(n1MsgType==3)
		{
			nxColumnControl.n4Key1 = parseInt(rowData["n4Key1"]);
			var eventObj = null;
			if(!document.all)
			{
				var radio = new NxControl('ff18nom_'+nxColumnControl.id);
				radio.setBG('');
				radio.setText('<input type=radio name="ff18radio" onclick=\'document.getElementById(\"'+nxColumnControl.id+'\").onclick()\'>');
				nxColumnControl.parent.add(radio);
				radio.setTop(nxColumnControl.getTop());
				radio.setWidth(20);
				radio.setHeight(20);
				radio.show();
			}
			
			nxColumnControl.setText('<u>'+nxColumnControl.getText()+'</u>');
			nxColumnControl.frmLayer.style.cursor = "pointer";
			nxColumnControl.frmLayer.onclick=function()
			{
				if(document.getElementById("CombatLogDialog"))
				{
					this.CombatLogDialog.unload();
					this.CombatLogDialog=null;	
				}
				else
				{
					this.CombatLogDialog = new nxCombatLogDialog('CombatLogDialog', this, this.NxControl.n4Key1);
					this.CombatLogDialog.show();
					
				}
			}
			
		}	
			
	}
}
nxLogViewGridColumn.prototype = new NxControl();
nxLogViewGridColumn.prototype.constructor = nxLogViewGridColumn;



function nxCombatLogDialog(strLayerID, owner, n4CombatLogIndex)
{
	NxControl.apply(this, arguments);
	if(!strLayerID)
		return;
	
	document.body.appendChild(this.frmLayer);
	//nxStatic.mainContainer.add(this);
	this.setText('<img src="http://nexen.pe.kr/img/tile/pg.png" />');
	this.setBG('');
	this.setWidth(600);
	this.setHeight(800);
	this.moveCenter();
	this.setTop(50);
	this.setLayerIndex(nxLayer.n4Layer_LogWindow);
	
	
	
	this.renderControl=function(objCtl, n4Width, n4Height, n4Left, n4Top, strText, src, bgColor)
	{
		this.add(objCtl);
		if(!bgColor)
			objCtl.setBG('');
		
		objCtl.setWidth(n4Width);
		objCtl.setHeight(n4Height);
		objCtl.setLeft(n4Left);
		objCtl.setTop(n4Top);
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
	
	this.GeneralPic_attacker = new nxMasterFaceControl('GeneralPic_attacker_'+this.id, this);
	this.renderControl(this.GeneralPic_attacker, 64, 82, 70, 70, null,null);
	this.GeneralPic_preventer = new nxMasterFaceControl('GeneralPic_preventer_'+this.id, this);
	this.renderControl(this.GeneralPic_preventer, 64, 82, 462, 70, null,null);
	
	this.barSoldier_attacker = new nxBar('barSoldier_attacker',this,'red');
	this.renderControl(this.barSoldier_attacker, 115, 18, 170, 100, null, null, true);
	this.barSoldier_preventer = new nxBar('barSoldier_preventer',this,'blue');
	this.barSoldier_preventer.isReverse = true;
	this.renderControl(this.barSoldier_preventer, 115, 18, 300, 100, null, null, true);
	this.lblSoldier_attacker = new NxControl('lblSoldier_attacker');
	this.renderControl(this.lblSoldier_attacker, 30, 18, 140, 100, '병사', null, false);
	this.lblSoldier_preventer = new NxControl('lblSoldier_preventer');
	this.renderControl(this.lblSoldier_preventer, 30, 18, 420, 100, '병사', null, false);
	this.lblMasterName_attacker = new NxControl('lblMasterName_attacker');
	this.renderControl(this.lblMasterName_attacker, 50, 18, 140, 80, '군주명1', null, false);
	this.lblMasterName_preventer = new NxControl('lblMasterName_preventer');
	this.lblMasterName_preventer.style.textAlign="right";
	this.renderControl(this.lblMasterName_preventer, 70, 18, 370, 80, '군주명2', null, false);
	this.GeneralPic_attacker.onBinding=function(owner,FaceControl){owner.lblMasterName_attacker.setText(FaceControl.strMasterName);}
	this.GeneralPic_preventer.onBinding=function(owner,FaceControl){owner.lblMasterName_preventer.setText(FaceControl.strMasterName);}
	
	this.barRice_attacker = new nxBar('barRice_attacker',this,'#E87100');
	this.renderControl(this.barRice_attacker, 115, 18, 170, 120, null, null, true);
	this.barRice_preventer = new nxBar('barRice_preventer',this,'#E87100');
	this.barRice_preventer.isReverse = true;
	this.renderControl(this.barRice_preventer, 115, 18, 300, 120, null, null, true);
	this.lblRice_attacker = new NxControl('lblRice_attacker');
	this.renderControl(this.lblRice_attacker, 30, 18, 140, 120, '군량', null, false);
	this.lblRice_preventer = new NxControl('lblRice_preventer');
	this.renderControl(this.lblRice_preventer, 30, 18, 420, 120, '군량', null, false);

	
	this.logFrame = new NxControl('logFrame');
	this.renderControl(this.logFrame, 510, 500, 50, 200, '전투로그를 불러오고 있습니다....', null, false);
	this.logFrame.style.overflowY = 'auto';
	this.logFrame.style.overflowX = 'hidden';
	this.logFrame.style.fontSize  = "13px";
	this.combatDataSet = null;
	
	
	this.logFrame.frmLayer.onmousemove=function()
	{
		if(!document.all)
			this.NxControl.parent.scrollEvent(this.NxControl);
	}
	this.scrollEvent=function(nxControl)
	{
		var sh = nxControl.frmLayer.scrollHeight;
		var st = nxControl.frmLayer.scrollTop;
		var combatDataSet= nxControl.parent.combatDataSet;
		if(combatDataSet)
		{
			var count = combatDataSet.rows.length;
			if(count>0)
			{
				var rowNum= st==0?0: parseInt(count*(st/sh)+1);	
				if(!combatDataSet.rows[rowNum])
					return;
					
				var startAttSoldier = parseInt(combatDataSet.rows[0].get("n4AttackerSoldiers")); 
				var startPreSoldier = parseInt(combatDataSet.rows[0].get("n4PreventerSoldiers")); 
				var n4AttackerSoldiers		= parseInt(combatDataSet.rows[rowNum].get("n4AttackerSoldiers")); 
				var n4PreventerSoldiers		= parseInt(combatDataSet.rows[rowNum].get("n4PreventerSoldiers")); 
				var n1AttPer = startAttSoldier==0?0:parseInt((n4AttackerSoldiers/startAttSoldier)*100);
				var n1PrePer = startPreSoldier==0?0:parseInt((n4PreventerSoldiers/startPreSoldier)*100);
				
				var startAttRiceAmount = parseInt(combatDataSet.rows[0].get("n4AttackerRiceAmount")); 
				var startPreRiceAmount = parseInt(combatDataSet.rows[0].get("n4PreventerRiceAmount")); 
				var n4AttackerRiceAmount		= parseInt(combatDataSet.rows[rowNum].get("n4AttackerRiceAmount")); 
				var n4PreventerRiceAmount		= parseInt(combatDataSet.rows[rowNum].get("n4PreventerRiceAmount")); 
				var n1AttRPer = startAttRiceAmount==0?0:parseInt((n4AttackerRiceAmount/startAttRiceAmount)*100);
				var n1PreRPer = startPreRiceAmount==0?0:parseInt((n4PreventerRiceAmount/startPreRiceAmount)*100);
				
				
				if(st>0 && count==rowNum+2)
				{
					n1AttPer = n1AttPer>=n1PrePer?n1AttPer:0;	
					n1PrePer = n1PrePer>=n1AttPer?n1PrePer:0;	
				} 
				//this.NxControl.parent.lblSoldier_attacker.setText(rowNum);
				nxControl.parent.barSoldier_attacker.setPer(n1AttPer);					
				nxControl.parent.barSoldier_preventer.setPer(n1PrePer);
				nxControl.parent.barRice_attacker.setPer(n1AttRPer);					
				nxControl.parent.barRice_preventer.setPer(n1PreRPer);
			}
		}
		if(document.all)
				setTimeout("if(document.getElementById('"+nxControl.parent.id+"')){document.getElementById('"+nxControl.parent.id+"').NxControl.scrollEvent(document.getElementById('"+nxControl.id+"').NxControl);}",50);					
		
	}
	this.scrollEvent(this.logFrame);
	
	this.btnClose = new NxButton('btnClose');
	this.renderControl(this.btnClose, 100, 20, 320, 720, '닫기', 'http://nexen.pe.kr/img/button/btn_base02.png', false);
	//this.btnClose.moveCenter();
	
	this.btnLog = new NxButton('btnLog');
	this.renderControl(this.btnLog, 100, 20, 180, 720, '새창으로', 'http://nexen.pe.kr/img/button/btn_base02.png', false);
	this.btnLog.frmLayer.onclick=function()
	{
		var url = "/inGame/nxCombatModal.aspx?key="+this.NxControl.parent.n4CombatLogIndex;
		var content			=  this.NxControl.parent.logFrame.getText();
		if(document.all)
		{
			window.strCombatMsg = content;
			var child = window.open(url,"combat","width=500,height=600,scrollbars=yes");
			
			//child.innerHTML = "sdfsdfsfsdf";//content;
		}
		else
		{
			var openWindowStyle = "dialogWidth:500px;dialogHeight:600px;center: Yes; help: No; resizable: No; status: No;scrollbars:yes"
			var returnVal = showModalDialog(url,this.NxControl.parent.logFrame, openWindowStyle);	
		}
	}
	

	
	this.btnClose.frmLayer.onclick=function()
	{
		this.NxControl.parent.unload();
	}
	
	this.n4CombatLogIndex = n4CombatLogIndex;
	
	var cmdTitle = new nxCommand(null, this);
	cmdTitle.addParam("n1QueryID", nxStatic.n1QueryID_combat_LogGetList);
	cmdTitle.addParam("n4ComBatLogIndex", n4CombatLogIndex);
	cmdTitle.addParam("n1LogType", 1);
	cmdTitle.execute(callBackLog2);
	function callBackLog2(xml, strText, dlg)
	{
		dlg.combatDataSet = new NxDataSet(xml);
		dlg.logFrame.frmLayer.focus();
		/*
		if(dlg.combatDataSet.rows.length>0)
		{
			dlg.GeneralPic_attacker.loadPic(dlg.combatDataSet.rows[0].get("n4AttackerMasterSN"));
			dlg.GeneralPic_preventer.loadPic(dlg.combatDataSet.rows[0].get("n4PrevnterMasterSN"));
		}
		*/
	}
	
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_LogGetList);
	cmd.addParam("n4ComBatLogIndex", n4CombatLogIndex);
	cmd.execute(callBack);
	function callBack(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		dlg.combatXML = xml;
		
		var strContent = '';
		if(ds.rows.length>=3)
		{
			var dateCreate		= ds.rows[2].get("dateCreate"); 
			strContent += '전투일자 : ' + dateCreate;
		}
		strContent += '<table border=1 cellspacing="0" cellpadding="0" style="width:490px;font:normal 12px \'굴림\',gulim,sans-serif;color:black;font-weight:normal;border-collapse:collapse;border-spacing:0;">';
		strContent+= '<colgroup><col width="16" height=30 /><col width="120" /><col /></colgroup>';
		for(var i=0;i<ds.rows.length;i++)
		{
			var n1LogType	= parseInt(ds.rows[i].get("n1LogType"));
			var n1Round		= ds.rows[i].get("n1Round");
			var strMessage	= ds.rows[i].get("strMessage");
			var isAttacker	= parseInt(ds.rows[i].get("isAttacker"));
			var strAttackGeneralName	= ds.rows[i].get("strAttackGeneralName");
			var strPreventerGeneralName = ds.rows[i].get("strPreventerGeneralName");
			var n1ArmyType				= parseInt(ds.rows[i].get("n1ArmyType")); 
			var n4PreventerSoldiers		= parseInt(ds.rows[i].get("n4PreventerSoldiers")); 
			var n4AttackerSoldiers		= parseInt(ds.rows[i].get("n4AttackerSoldiers")); 
			var n4AttackerRiceAmount	= parseInt(ds.rows[i].get("n4AttackerRiceAmount")); 
			var n4PreventerRiceAmount	= parseInt(ds.rows[i].get("n4PreventerRiceAmount")); 
			var n1SkillCode				= parseInt(ds.rows[i].get("n1SkillCode")); 
			
			var n4LevelAttackGeneral	= parseInt(ds.rows[i].get("n4LevelAttackGeneral")); 
			var n4LevelPreventerGeneral	= parseInt(ds.rows[i].get("n4LevelPreventerGeneral")); 
			
			var alt = '병과';
			alt = n1ArmyType==1?'검병':alt;
			alt = n1ArmyType==2?'창병':alt;
			alt = n1ArmyType==3?'기병':alt;
			alt = n1ArmyType==4?'궁병':alt;
			alt = n1ArmyType==5?'궁노':alt;
			alt = n1ArmyType==6?'성벽수비대':alt;
			var n1SkillImageCode = 0;
			
			if(i==0)
			{
				dlg.GeneralPic_attacker.loadPic(ds.rows[0].get("n4AttackerMasterSN"));
				dlg.GeneralPic_preventer.loadPic(ds.rows[0].get("n4PrevnterMasterSN"));
			
			}
			
			if(n1LogType==0)
			{
				if(isAttacker==1)	
					strContent += "<tr height=20><td>"+nxStatic.getIcon(n1ArmyType,null,null,alt)+"</td><td bgcolor='#FF6666' >"+strAttackGeneralName+"Lv"+n4LevelAttackGeneral+" ("+addCommas(n4AttackerSoldiers)+")</td><td> "+strMessage+"</td></tr>";
				else
					strContent += "<tr height=20><td>"+nxStatic.getIcon(n1ArmyType,null,null,alt)+"</td><td bgcolor='#CFDBE2' >"+strAttackGeneralName+"Lv"+n4LevelAttackGeneral+" ("+addCommas(n4AttackerSoldiers)+")</td><td> "+strMessage+"</td></tr>";
			}
			else if(n1LogType==1)
				strContent += "<tr height=30><td colspan=3 bgcolor='#FF7E00'> "+strMessage+"-&nbsp;&nbsp;&nbsp; 공격자 : "+addCommas(n4AttackerSoldiers)+"/"+addCommas(n4AttackerRiceAmount)+"&nbsp;&nbsp;&nbsp; 방어자 : "+addCommas(n4PreventerSoldiers)+"/"+addCommas(n4PreventerRiceAmount)+"</td></tr>";
			else
				strContent += "<tr height=30><td colspan=3> "+strMessage+"</td></tr>";
			
		}
			
		strContent += "</table>";
		dlg.logFrame.setText(strContent);
		
		setTimeout("try{document.getElementById('"+dlg.logFrame.id+"').scrollTop=0}catch(ee){}",1000);
		
		
	}
	

	
	
	
}
nxCombatLogDialog.prototype = new NxControl();
nxCombatLogDialog.prototype.constructor = nxCombatLogDialog;
