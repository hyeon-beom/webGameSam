
function nxNationSelectDialog(strLayerID, owner, strCaption, n1SortType, isPvp, n4CastleSN)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	this.strCaption_tmp = strCaption;
	this.strCaption = "������ �ҷ����� ��...";
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
	this.cancel.setTitle('�ݱ�');
	this.cancel.show();
	this.add(this.cancel);
	this.n4ConfirmIndex = 0;
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
	this.n1SelectType=1;//0-���� 1-����, 2-����		
	
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_Nation_GetList);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.addParam("n1SortType", n1SortType?n1SortType:0);//0-��� ����/��, 1--�Ÿ���Ʈ, 2--������
	if(n4CastleSN!=null)
		cmd.addParam("n4CastleSN", n4CastleSN)
	cmd.addParam("isPvp", isPvp!=null?isPvp:1);//0--pve, 1--pvp, 2-�� ����
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
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName"	, "����"	, 110);
		dlg.grid.columns[i++] = new nxGridColumn( "strCastleName"	, "��ġ"	, 120);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellX"			, "��ǥX"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellY"			, "��ǥY"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Distance"		, "�Ÿ�(��)"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "strMoveMin"		, "�̵��ð�", 80);
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

	this.strCaption = "��� ���ø� �����ϼ���";
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
	this.cancel.setTitle('�ݱ�');
	this.cancel.show();
	this.add(this.cancel);
	this.n4ConfirmIndex = 0;
	this.cancel.frmLayer.onclick = function(){this.NxControl.parent.unload();}
	
	this.n1SelectType=1;//0-���� 1-����, 2-����		
	
			
	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_Nation_GetList);
	cmd.addParam("n4BuildingSN", owner.n4BuildingSN);
	cmd.addParam("n1SortType", 7);//��� �뵵��
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
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName"	, "����"	, 110);
		dlg.grid.columns[i++] = new nxGridColumn( "strCastleName"	, "����"	, 120);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellX"			, "��ǥX"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4CellY"			, "��ǥY"	, 60);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Distance"		, "�Ÿ�(��)"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "strMoveMin"		, "�̵��ð�", 80);
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
	this.button.setTitle('�ݱ�');
	this.button.moveCenter();
	this.button.show();
	
	
	this.n1SelectType=1;//0-���� 1-����, 2-����		
	
			
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
		dlg.grid.columns[i++] = new nxGridColumn( "dateCreate"					, "�߽���"	, 150);
		dlg.grid.columns[i++] = new nxGridColumn( "strDipType"					, "����"	, 100);
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName_sender"		, "�߽���"	, 130);
		dlg.grid.columns[i++] = new nxGridColumn( "strMasterName_receiver"		, "������"	, 130);
		dlg.grid.columns[i++] = new nxGridColumn( "strGeneralName_sasin"		, "���", 110);
		dlg.grid.columns[i++] = new nxGridColumn( "isReceiverRead"				, "Ȯ��"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "isReceiverAccept"			, "����"	, 40);
		
		
		
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
				Alert('notyet','�����ڰ� Ȯ������ ���� �����Դϴ�.');
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
	this.btnClose.setTitle('�ݱ�');
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
		sayObject.strText = strGeneralName_sasin+ "�� �ձ� ���ô��� ���� �����̽��ϴ�. �����Ϸ� ���̽��ϱ�?";
		dlg.arrSay[i++] = sayObject;
		
		
		if(n1DipType==1)//���Ϳ�û
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.strText = strMasterName_receiver+ "�� ����� ������ �ξ� �ֽʽÿ�.";
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 0;
			sayObject.strText = "�����̶�... �׷��ٸ� ���ʿ��� ���� �غ��ߴ��� ����ͼ�. ";				
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 10;
			
			sayObject.confirm = isReceiverRead==1?false:true;
			sayObject.strText = strMasterName_sender+"�Բ��� <font color='yellow'>�� "+addCommas(n4Gold)+"</font>�� �����̽��ϴ�.";				
			dlg.arrSay[i++] = sayObject;
			if(isReceiverRead==1)//�̹� ó���� �����̶�� ��� �����丮 �߰��ϰ� ��
			{
				dlg.sasinCallBack(isReceiverAccept==1?true:false,dlg);
			}
		}
		else if(n1DipType==2)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.strText = strMasterName_receiver+ "�� ���̻� ������ �����ϱⰡ ���� �� �����ϴ�. ������� ������ �ı��� �ֽʽÿ�.";
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 0;
			sayObject.strText = "��Ÿ������, �޾Ƶ�������.";
			dlg.arrSay[i++] = sayObject;
		}
		else if(n1DipType==3)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.strText = strMasterName_sender+"�Ա����� "+strMasterName_receiver+ "�԰� ��ȣ�� ���Ӱ� �ϰ��� �Ͻʴϴ�.<br> �� �ǹ̷� <font color='yellow'>�� "+addCommas(n4Gold)+"</font>�� �����̽��ϴ�.";
			dlg.arrSay[i++] = sayObject;
			sayObject = new Object();
			sayObject.who = 0;
			n4Gold = parseInt(n4Gold);
			if(n4Gold>=8000)
				sayObject.strText = strMasterName_sender+"�Բ� ���ٰ� �����ֽÿ�.";
			else if(n4Gold>=5000)
				sayObject.strText = strMasterName_sender+"���� ���� ���� �ʾұ���. �ƹ�ư ���� �ްڼ�.";
			else if(n4Gold>=2000)
				sayObject.strText = strMasterName_sender+"�Ե� ���� ��������?";
			else
				sayObject.strText = "��..., �޾ƴ� �ΰڼ�.";
			
			dlg.arrSay[i++] = sayObject;
		}
		else if(n1DipType==4)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.confirm = isReceiverRead==1?false:true;
			sayObject.strText = strMasterName_receiver+ "�� �״��� õ� �� ���� �ʾҽ��ϴ�. ���� �׸� �츮���� �׺��Ͻ�����. ";
			dlg.arrSay[i++] = sayObject;
			if(isReceiverRead==1)//�̹� ó���� �����̶�� ��� �����丮 �߰��ϰ� ��
			{
				dlg.sasinCallBack(isReceiverAccept==1?true:false,dlg);
			}
		}
		else if(n1DipType==5)
		{
			sayObject = new Object();
			sayObject.who = 1;
			sayObject.confirm = isReceiverRead==1?false:true;
			sayObject.strText = strMasterName_receiver+ "�� �츮���� <font color='yellow'>�� "+addCommas(n4Gold)+"</font>�� �������ֽʽÿ�. ";
			dlg.arrSay[i++] = sayObject;
			if(isReceiverRead==1)//�̹� ó���� �����̶�� ��� �����丮 �߰��ϰ� ��
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
			//�����ı�, ģ���� �ٷ� ���� ���� ó��
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
				
				this.NxControl.confirmControl = Confirm(this.NxControl, "������ �޾Ƶ��̽ðڽ��ϱ�?", this.NxControl.sasinCallBack);
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
				var strText = "�Ⲩ�� �޾Ƶ�������.";
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
				sayObject.strText = "�����մϴ�. �Բ� õ�������� �̷�ô�.";
				
			}
			else if(dlg.n1DipType==4)
			{
				var strText = "....�׷�����...�׷��� �ϵ��� ������.";
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
				sayObject.strText = "������ �����̽ʴϴ�.";
			}
			else if(dlg.n1DipType==5)
			{
				var strText = "�̷��̳��� ���� �Ǿ�帮�ڽ��ϴ�.";
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
				sayObject.strText = "�� ������ ���� ���� ���Դϴ�.";
			}
			else
			{
				var strText = "�޾Ƶ�������.";
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
				sayObject.strText = "�����մϴ�.";
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
				var strText = "�� ���� ������ �սô�.";
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
				sayObject.strText = "���� ����� ���̱���.";
				
			}
			else if(dlg.n1DipType==4)
			{
				var strText = "����? ����� �ƴϾ��ٸ� ���� �״��� ���� ���� ���̿�.<br>�ֱ��� ���忡�� ���ڰ� ���Ͻÿ�.";
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
				sayObject.strText = "�� �׸� �� ���Դϴ�.";
			}
			else if(dlg.n1DipType==5)
			{
				var strText = "�������� ������ ������ ����.";
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
				sayObject.strText = "��� �ΰ��ô�.";
			}
			else
			{
				var strText = "�׷� �� ����.";
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
				sayObject.strText = "��¿ �� ������.";
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








