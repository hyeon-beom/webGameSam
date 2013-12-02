
function nxNationSelectDialog(strLayerID, owner, strCaption, n1SortType, isPvp, n4CastleSN)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	this.strCaption_tmp = strCaption;
	this.strCaption = "데이터 불러오는 중...";
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
	this.cancel.setTitle('닫기');
	this.cancel.show();
	this.add(this.cancel);
	this.n4ConfirmIndex = 0;
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
	this.n1SelectType=1;//0-없음 1-단일, 2-다중		
	
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_Nation_GetList);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.addParam("n1SortType", n1SortType?n1SortType:0);//0-모든 거점/성, 1--거리소트, 2--거점만
	if(n4CastleSN!=null)
		cmd.addParam("n4CastleSN", n4CastleSN)
	cmd.addParam("isPvp", isPvp!=null?isPvp:1);//0--pve, 1--pvp, 2-내 본성
	//cmd.print();
	cmd.execute(callBack);
	
	function callBack(xml, strText, dlg)
	{
		dlg.strCaption = dlg.strCaption_tmp;
		dlg.show();
		var ds = new NxDataSet(xml);
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.n1SelectType=dlg.n1SelectType;
		dlg.grid.setLeft(30);
		dlg.grid.setWidth(dlg.body.getWidth()-60);
		dlg.grid.setHeight(dlg.body.getHeight());
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName"	, "군주"	, 110);
		dlg.grid.columns[i++] = new nxGridColumn( "strCastleName"	, "위치"	, 120);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellX"			, "좌표X"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellY"			, "좌표Y"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Distance"		, "거리(셀)"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "strMoveMin"		, "이동시간", 80);
		dlg.grid.columns[i++] = new nxGridColumn( "n4BuildingSN"	, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4MasterSN"		, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CastleSN"		, null		, 0);
		
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
		this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.getSelectedItems(), this.NxControl.parent);
		//this.NxControl.parent.unload();
	}
	
	this.onsubmit = function(building, selectedItems, dlg){}//ex)selectedItems[0].row['n4GeneralSN']
	
	
}
nxNationSelectDialog.prototype = new NxControl();
nxNationSelectDialog.prototype.constructor = nxNationSelectDialog;



function nxCastleSelectDialog(strLayerID, owner)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	this.strCaption = "대상 도시를 선택하세요";
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
	this.cancel.setTitle('닫기');
	this.cancel.show();
	this.add(this.cancel);
	this.n4ConfirmIndex = 0;
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
	this.n1SelectType=1;//0-없음 1-단일, 2-다중		
	
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_Nation_GetList);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.addParam("n1SortType", 7);//모든 대도시
	cmd.addParam("isPvp", 0);
	//cmd.print();
	cmd.execute(callBack);
	
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
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName"	, "군주"	, 110);
		dlg.grid.columns[i++] = new nxGridColumn( "strCastleName"	, "도시"	, 120);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellX"			, "좌표X"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellY"			, "좌표Y"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Distance"		, "거리(셀)"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "strMoveMin"		, "이동시간", 80);
		dlg.grid.columns[i++] = new nxGridColumn( "n4BuildingSN"	, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4MasterSN"		, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CastleSN"		, null		, 0);
		
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
		this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.getSelectedItems(), this.NxControl.parent);
	}
	
	this.onsubmit = function(building, selectedItems, dlg){}//ex)selectedItems[0].row['n4GeneralSN']
	
	
}
nxCastleSelectDialog.prototype = new NxControl();
nxCastleSelectDialog.prototype.constructor = nxCastleSelectDialog;


function nxDiplomacyListDialog(strLayerID, owner, strCaption)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;
	document.body.appendChild(this.frmLayer);
	this.setLayerIndex(nxLayer.n4Layer_LogWindow);
	this.strCaption = strCaption;
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
	
	
	this.n1SelectType=1;//0-없음 1-단일, 2-다중		
	
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_list);
	cmd.execute(callBack);
	
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
		dlg.grid.columns[i++] = new nxGridColumn( "dateCreate"					, "발신일"	, 150);
		dlg.grid.columns[i++] = new nxGridColumn( "strDipType"					, "종류"	, 100);
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName_sender"		, "발신자"	, 130);
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName_receiver"		, "수신자"	, 130);
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName_sasin"		, "사신", 110);
		dlg.grid.columns[i++] = new nxGridColumn( "isReceiverRead"				, "확인"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "isReceiverAccept"			, "수락"	, 40);
		
		
		
		dlg.grid.columns[i++] = new nxGridColumn( "n1DipType"					, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4MasterSN_sender"			, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4MasterSN_receiver" 		, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4GeneralSN_sasin"			, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName_sasin"		, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "strMessage"					, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Gold"						, null		, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4DiplomacyIndex"			, null		, 0);

		
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
	

		dlg.grid.onselect=function()
		{
			var item = dlg.getSelectedItems()[0];
			var n4DiplomacyIndex	= item.row["n4DiplomacyIndex"];
			var isReceiverRead		= item.row["isReceiverRead"];
			var n4MasterSN_receiver	= parseInt(item.row["n4MasterSN_receiver"]);
			
			if(isReceiverRead=='O' || parseInt(nxStatic.gameUser.n4MasterSN)==n4MasterSN_receiver)
			{
				var DiplomacyReadDialog = new nxDiplomacyReadDialog('nxDiplomacyReadDialog', dlg, n4DiplomacyIndex);
				//nxStatic.mainContainer.add(DiplomacyReadDialog);
				DiplomacyReadDialog.show();
			}
			else
				Alert('notyet','수신자가 확인하지 않은 내용입니다.');
		}		
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
		//this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.getSelectedItems(), this.NxControl.parent);
		this.NxControl.parent.unload();
	}
	
	this.onsubmit = function(building, selectedItems, dlg){}//ex)selectedItems[0].row['n4GeneralSN']
	
	
}
nxDiplomacyListDialog.prototype = new NxControl();
nxDiplomacyListDialog.prototype.constructor = nxDiplomacyListDialog;


function nxDiplomacyReadDialog(strLayerID, owner, n4DiplomacyIndex)
{
	NxControl.apply(this, arguments);

	document.body.appendChild(this.frmLayer);
	this.setLayerIndex(nxLayer.n4Layer_LogWindow+1);
	
	this.n4DiplomacyIndex=n4DiplomacyIndex;
	this.setWidth(800);
	this.setTop(50);
	this.setLeft(200);
	this.setHeight(650)
	this.setBG('black');
		
	this.btnClose =new NxButton('btnClose');
	this.add(this.btnClose);
	this.btnClose.style.fontSize		= "15px";
	this.btnClose.setBG('');
	this.btnClose.setWidth(100);
	this.btnClose.setHeight(25);
	this.btnClose.setTop(620);
	this.btnClose.moveCenter();
	this.btnClose.src= 'http://nexen.pe.kr/img/button/btn_base02.png';	
	this.btnClose.setTitle('닫기');
	this.btnClose.show();
	this.confirmControl = null;
	this.btnClose.frmLayer.onclick=function(){ this.NxControl.parent.unload();if(this.NxControl.parent.confirmControl){this.NxControl.parent.confirmControl.unload();} }
	
	this.kingdom = new NxControl('kingdom');
	this.add(this.kingdom);
	this.kingdom.src = 'http://nexen.pe.kr/img/event/diplomacy.png';
	this.kingdom.setLeft(50);
	this.kingdom.setTop(150);
	this.kingdom.setWidth(700);
	this.kingdom.setHeight(350);
	this.kingdom.show();
	
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_read);
	cmd.addParam("n4DiplomacyIndex", n4DiplomacyIndex);
	//cmd.print();
	cmd.execute(callBackDipRead);
	
	this.ds = null;
	function callBackDipRead(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		dlg.ds = ds;
		var n1DipType			= ds.rows[0].get("n1DipType");
		var n4MasterSN_sender	= ds.rows[0].get("n4MasterSN_sender");
		var strMasterName_sender= ds.rows[0].get("strMasterName_sender");
		var n4MasterSN_receiver	= ds.rows[0].get("n4MasterSN_receiver");
		var strMasterName_receiver= ds.rows[0].get("strMasterName_receiver");
		var n4GeneralSN_sasin	= ds.rows[0].get("n4GeneralSN_sasin");
		var strGeneralName_sasin= ds.rows[0].get("strGeneralName_sasin");
		var strMessage			= ds.rows[0].get("strMessage");
		var n4Gold				= ds.rows[0].get("n4Gold");
		var isReceiverRead		= parseInt(ds.rows[0].get("isReceiverRead"));
		var isReceiverAccept	= parseInt(ds.rows[0].get("isReceiverAccept"));
		var dateArrive			= ds.rows[0].get("dateArrive");
		var dateCreate			= ds.rows[0].get("dateCreate");
		var n1Gender_MasterReceiver	= parseInt(ds.rows[0].get("n1Gender_MasterReceiver"));
		var	n1Gender_GeneralSasin	= parseInt(ds.rows[0].get("n1Gender_GeneralSasin"));
		dlg.n1DipType		= n1DipType;
		dlg.isReceiverRead	= isReceiverRead;
		
		dlg.kingImg = new NxControl('kingImg');
		dlg.add(dlg.kingImg);
		dlg.kingImg.setBG('');
		dlg.kingImg.src = n1Gender_MasterReceiver==1?'http://nexen.pe.kr/img/event/diplomacy_kingman.png':'http://nexen.pe.kr/img/event/diplomacy_kingwoman.png';
		dlg.kingImg.setLeft(530);
		dlg.kingImg.setTop(195);
		dlg.kingImg.setWidth(80);
		dlg.kingImg.setHeight(80);
		dlg.kingImg.show();
		
		dlg.sasinImg = new NxControl('sasinImg');
		dlg.add(dlg.sasinImg);
		dlg.sasinImg.setBG('');
		dlg.sasinImg.src = n1Gender_GeneralSasin==1?'http://nexen.pe.kr/img/event/diplomacy_sasinman.png':'http://nexen.pe.kr/img/event/diplomacy_sasinwoman.png';
		dlg.sasinImg.setLeft(230);
		dlg.sasinImg.setTop(330);
		dlg.sasinImg.setWidth(70);
		dlg.sasinImg.setHeight(120);
		dlg.sasinImg.show();		
		
		dlg.kingPic = new nxMasterFaceControl('nxMasterFaceControl', dlg, n4MasterSN_receiver)
		dlg.add(dlg.kingPic);
		dlg.kingPic.setLeft(50);
		dlg.kingPic.setTop(50);
		dlg.kingPic.setWidth(64);
		dlg.kingPic.setHeight(82);
		dlg.kingPic.show();	
		
		dlg.kingSay = new nxScrollText('kingSay',10);
		dlg.add(dlg.kingSay);
		dlg.kingSay.setLeft(150);
		dlg.kingSay.setTop(50);
		dlg.kingSay.setWidth(400);
		dlg.kingSay.setHeight(82);
		dlg.kingSay.setBG('#63250C')
		dlg.kingSay.setColor('white');
		dlg.kingSay.setFontSize(15);
		dlg.kingSay.show();	
		
		dlg.sasinPic = new nxGeneralFaceControl('nxGeneralFaceControl', dlg, n4GeneralSN_sasin)
		dlg.add(dlg.sasinPic);
		dlg.sasinPic.setLeft(50);
		dlg.sasinPic.setTop(520);
		dlg.sasinPic.setWidth(64);
		dlg.sasinPic.setHeight(82);
		dlg.sasinPic.show();
		
		dlg.sasinSay = new nxScrollText('sasinSay',10);
		dlg.add(dlg.sasinSay);
		dlg.sasinSay.setLeft(150);
		dlg.sasinSay.setTop(520);
		dlg.sasinSay.setWidth(400);
		dlg.sasinSay.setHeight(82);
		dlg.sasinSay.setBG('#63250C')
		dlg.sasinSay.setColor('white');
		dlg.sasinSay.setFontSize(15);
		dlg.sasinSay.show();	
		
		dlg.arrSay = new Array();
		var i=0;
		var sayObject = new Object();
		sayObject.who = 0;
		sayObject.strText = strGeneralName_sasin+ "님 먼길 오시느라 수고가 많으셨습니다. 무슨일로 오셨습니까?";
		dlg.arrSay[i++] = sayObject;
		
		
		if(n1DipType==1)//동맹요청
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.strText = strMasterName_receiver+ "님 저희와 동맹을 맺어 주십시오.";
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 0;
			sayObject.strText = "동맹이라... 그렇다면 그쪽에선 무얼 준비했는지 보고싶소. ";				
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 10;
			
			sayObject.confirm = isReceiverRead==1?false:true;
			sayObject.strText = strMasterName_sender+"님께서 <font color='yellow'>금 "+addCommas(n4Gold)+"</font>을 보내셨습니다.";				
			dlg.arrSay[i++] = sayObject;
			if(isReceiverRead==1)//이미 처리한 내용이라면 결과 레파토리 추가하고 끝
			{
				dlg.sasinCallBack(isReceiverAccept==1?true:false,dlg);
			}
		}
		else if(n1DipType==2)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.strText = strMasterName_receiver+ "님 더이상 동맹을 유지하기가 힘들 것 같습니다. 저희와의 동맹을 파기해 주십시오.";
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 0;
			sayObject.strText = "안타깝지만, 받아들이지요.";
			dlg.arrSay[i++] = sayObject;
		}
		else if(n1DipType==3)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.strText = strMasterName_sender+"님깨서는 "+strMasterName_receiver+ "님과 우호를 두텁게 하고자 하십니다.<br> 그 의미로 <font color='yellow'>금 "+addCommas(n4Gold)+"</font>을 보내셨습니다.";
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 0;
			n4Gold = parseInt(n4Gold);
			if(n4Gold>=8000)
				sayObject.strText = strMasterName_sender+"님께 고맙다고 전해주시오.";
			else if(n4Gold>=5000)
				sayObject.strText = strMasterName_sender+"님이 직접 오지 않았군요. 아무튼 고맙게 받겠소.";
			else if(n4Gold>=2000)
				sayObject.strText = strMasterName_sender+"님도 요즘 어려운가보오?";
			else
				sayObject.strText = "뭐..., 받아는 두겠소.";
			
			dlg.arrSay[i++] = sayObject;
		}
		else if(n1DipType==4)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.confirm = isReceiverRead==1?false:true;
			sayObject.strText = strMasterName_receiver+ "님 그대의 천운도 얼마 남지 않았습니다. 이제 그만 우리에게 항복하시지요. ";
			dlg.arrSay[i++] = sayObject;
			if(isReceiverRead==1)//이미 처리한 내용이라면 결과 레파토리 추가하고 끝
			{
				dlg.sasinCallBack(isReceiverAccept==1?true:false,dlg);
			}
		}
		else if(n1DipType==5)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.confirm = isReceiverRead==1?false:true;
			sayObject.strText = strMasterName_receiver+ "님 우리에게 <font color='yellow'>금 "+addCommas(n4Gold)+"</font>을 원조해주십시오. ";
			dlg.arrSay[i++] = sayObject;
			if(isReceiverRead==1)//이미 처리한 내용이라면 결과 레파토리 추가하고 끝
			{
				dlg.sasinCallBack(isReceiverAccept==1?true:false,dlg);
			}
		}
		
		dlg.kingSay.setText(dlg.arrSay[0].strText);
		dlg.n1SayIndex++;
	}
	
	this.n1SayIndex=0;
	this.frmLayer.onclick=function()
	{
		var n1SayIndex = this.NxControl.n1SayIndex;
		var sayObject  = this.NxControl.arrSay[n1SayIndex];
		if(sayObject)
		{
			if(sayObject.who ==0)
			{
				this.NxControl.kingSay.setText(sayObject.strText);
			}
			else
			{
				this.NxControl.sasinSay.setText(sayObject.strText);
			}
			this.NxControl.n1SayIndex++;
			//동맹파기, 친선은 바로 읽은 것을 처리
			if(this.NxControl.arrSay.length==this.NxControl.n1SayIndex
				&& this.NxControl.isReceiverRead==0
				&& (this.NxControl.n1DipType==2 || this.NxControl.n1DipType==3)
			
			)
			{
				function callbackDip(xml, strText, dlg)
				{
					//alert(strText);
				}
				var cmd = new nxCommand(null, this);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_update);
				cmd.addParam("n4DiplomacyIndex", this.NxControl.n4DiplomacyIndex);
				cmd.addParam("isReceiverAccept", 1);
				//cmd.print();
				cmd.execute(callbackDip);			
			}
		}
		else if(n1SayIndex>0 && this.NxControl.arrSay[n1SayIndex-1])
		{
			if(this.NxControl.arrSay[n1SayIndex-1].confirm)
			{
				
				this.NxControl.confirmControl = Confirm(this.NxControl, "제안을 받아들이시겠습니까?", this.NxControl.sasinCallBack);
				this.NxControl.n1SayIndex++;
			}
		}
	}
	
	this.sasinCallBack=function(isTrue, dlg)
	{
		var i = 0;
		if(dlg.isReceiverRead)
			i = dlg.arrSay.length;
		else
		{
			dlg.n1SayInde--;
			i = dlg.n1SayIndex;
		}
		
		if(isTrue)
		{
			if(dlg.n1DipType==1)
			{
				var strText = "기꺼이 받아들이지요.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "감사합니다. 함께 천하통일을 이룹시다.";
				
			}
			else if(dlg.n1DipType==4)
			{
				var strText = "....그렇지요...그렇게 하도록 하지요.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "현명한 선택이십니다.";
			}
			else if(dlg.n1DipType==5)
			{
				var strText = "미력이나마 힘이 되어드리겠습니다.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "이 은혜는 잊지 않을 것입니다.";
			}
			else
			{
				var strText = "받아들이지요.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "감사합니다.";
			}
			dlg.arrSay[i++] = sayObject;
			
			if(!dlg.isReceiverRead)
			{
				function callbackOKRequest(xml, strText, dlg)
				{
					mainMethod.refresh();
				}
				var cmd = new nxCommand(null, this);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_update);
				cmd.addParam("n4DiplomacyIndex", dlg.n4DiplomacyIndex);
				cmd.addParam("isReceiverAccept", 1);
				//cmd.print();
				cmd.execute(callbackOKRequest);						
			}
		}
		else
		{
			if(dlg.n1DipType==1)
			{
				var strText = "그 얘기는 다음에 합시다.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "역시 어려운 일이군요.";
				
			}
			else if(dlg.n1DipType==4)
			{
				var strText = "뭐라? 사신이 아니었다면 당장 그대의 목을 쳤을 것이오.<br>주군께 전장에서 보자고 전하시오.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "곧 그리 될 것입니다.";
			}
			else if(dlg.n1DipType==5)
			{
				var strText = "쓸데없이 낭비할 여력이 없소.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "어디 두고봅시다.";
			}
			else
			{
				var strText = "그럴 수 없소.";
				if(!dlg.isReceiverRead)
					dlg.kingSay.setText(strText);
				else
				{
					sayObject = new Object();
					sayObject.who = 0;
					sayObject.strText = strText;
					dlg.arrSay[i++] = sayObject;
				}
				sayObject = new Object();
				sayObject.who = 1;
				sayObject.strText = "어쩔 수 없지요.";
			}
			dlg.arrSay[i++] = sayObject;
			
			if(!dlg.isReceiverRead)
			{
				function callbackDipend(xml, strText, dlg)
				{
					mainMethod.refresh();
				}
				var cmd = new nxCommand(null, this);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_update);
				cmd.addParam("n4DiplomacyIndex", dlg.n4DiplomacyIndex);
				cmd.addParam("isReceiverAccept", 0);
				//cmd.print();
				cmd.execute(callbackDipend);		
			}
		}
	}
	
	
}

nxDiplomacyReadDialog.prototype = new NxControl();
nxDiplomacyReadDialog.prototype.constructor = nxDiplomacyReadDialog;








