function nxMyItemListDialog(strLayerID, owner, n1SelectMode)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	this.n1SelectMode = n1SelectMode?parseInt(n1SelectMode):0;
	this.strCaption = '�����͸� �ҷ����� ��...';	
	this.setWidth(400);
	this.head.setWidth(400);
	this.head.show();
	this.body.setWidth(400);
	this.body.setLayerIndex(nxLayer.n4Layer_Dialog);
	this.bottom.setWidth(400);
	this.content.setWidth(350);
	this.title.setLeft(100);

	
	this.setTop(100);
	this.setHeight(500);
	this.body.setHeight(402);
	this.body.show();
	this.bottom.setTop(443);
	this.bottom.show();
	this.content.setHeight(400);
	this.content.show();
	this.button.setTop(457);
	this.button.setTitle('���');
	//this.button.moveCenter();
	this.button.setLeft(200);
	this.button.show();
	
	this.buttonOK = new nxButton('buttonOK', this.n1SelectMode==1?'����':'�Ű�', this);
	this.add(this.buttonOK);
	this.buttonOK.setTop(457);
	this.buttonOK.setLeft(120);
	this.buttonOK.show();

	this.getSelectedItems = function()
	{
		if(this.grid.getSelectedItems().length==0)
			return null;
		else
			return this.grid.getSelectedItems();
	}
	this.buttonOK.frmLayer.onclick = function()
	{
		this.NxControl.parent.onsubmit(this.NxControl.parent.owner, this.NxControl.parent.getSelectedItems() );
		if(this.NxControl.parent.n1SelectMode==1)
			this.NxControl.parent.unload();
	}
	this.button.frmLayer.onclick = function()
	{
		this.NxControl.parent.unload();
	}
	
	
	

	if(this.n1SelectMode==1)//�θ� ���� '���'
	{
		this.onsubmit = function(owner, selectedItems){}//ex)selectedItems[0].row['n4GeneralSN']
	}
	else//�Ű� 0
	{
		this.onsubmit = function(owner, selectedItems)
		{
			var dlg = owner.MyItemListDialog;
			var selectedItems = selectedItems;
			if(selectedItems.length==1)
			{
				dlg.n4ItemKey = selectedItems[0].row['n4ItemKey'];
				dlg.strItemName = selectedItems[0].row['strItemName'];
				
				function distruct(isTrue, dlg)
				{
					if(isTrue)
					{
						function callBackItemSell(xml, strText, dlg)
						{
							var dlg = document.getElementById('MyItemListDialog').NxControl;
							dlg.unload();
							dlg.hide();
							new nxMyItemListDialog('MyItemListDialog', dlg.owner, 2).show();
							mainMethod.refresh();
						}
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemSell);
						cmd.addParam("n4ItemKey", dlg.n4ItemKey);	
						//cmd.print();
						cmd.execute(callBackItemSell);
					}
				}
				Confirm(dlg, dlg.strItemName+'��(��) ���� �Ű��Ͻðڽ��ϱ�?', distruct);
				
				
			}
			else if(selectedItems.length>1)
			{
				//dlg.n4ItemKey = selectedItems[0].row['n4ItemKey'];
				//dlg.strItemName = selectedItems[0].row['strItemName'];
				
				function distructMulti(isTrue, dlg)
				{
					if(isTrue)
					{
						
						function callBackItemSell2(xml, strText, dlg)
						{
							var dlg = document.getElementById('MyItemListDialog').NxControl;
							dlg.unload();
							dlg.hide();
							var aa = new nxMyItemListDialog('MyItemListDialog', nxStatic.gameUser, 2);
							aa.show();
							mainMethod.refresh();
						}
						
						var arrItems='';
						for(var i=0;i<selectedItems.length;i++)
						{
							arrItems+= selectedItems[i].row['n4ItemKey'] + ',';
						}
						
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemSellMulti);
						cmd.addParam("arrItems", arrItems);	
						//cmd.print();
						cmd.execute(callBackItemSell2);
						
					}
				}
				Confirm(dlg, '���õ� �������� ��� �Ű��Ͻðڽ��ϱ�?', distructMulti);
				
				
			}
			else
			{
				Alert('Alert_'+this.id, '���õ� �������� �����ϴ�.');
			}
		}
	}

	function callBackMyItem(xml, strText, dlg)
	{
		dlg.strCaption = '���� ������ �����۸��';
		dlg.show();
		var ds = new NxDataSet(xml);
		if(dlg.grid)
		{
			dlg.grid.unload();
			dlg.grid.hide();
		}
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.style.border= "1px solid #FCEEEE";
		dlg.grid.n1SelectType= dlg.n1SelectMode;
		dlg.grid.setLeft(20);
		dlg.grid.setTop(5);
		dlg.grid.setWidth(360);
		dlg.grid.setHeight(380);
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "strItemCode"		, "����"	, 70);
		dlg.grid.columns[i++] = new nxItemNameViewGridColumn( "strItemName"		, "������"	, 100);
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemLevel"		, "�����۷���"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpStr"			, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpInt"			, "����"	, 45);
	
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemSN"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n1ItemCode"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemKey"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Inchant", null	, 0);
		

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

	var cmd = new nxCommand(null, this);
	cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemMasterGetList);
	cmd.execute(callBackMyItem);

}
nxMyItemListDialog.prototype = new NxControl();
nxMyItemListDialog.prototype.constructor = nxMyItemListDialog;




function nxItemManageDialog(strLayerID, owner, strCaption, n4GeneralSN, n4MasterSN)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	
	this.n4GeneralSN=n4GeneralSN;
	this.n4MasterSN=n4MasterSN;
	this.strCaption = strCaption;
	this.setWidth(800);
	this.head.setWidth(800);
	this.head.show();
	this.body.setWidth(800);
	this.body.setLayerIndex(nxLayer.n4Layer_Dialog);
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
	
	this.generalPic = new nxGeneralFaceControl('nxGeneralFaceControl', this, n4GeneralSN)	
	this.renderControl(this.generalPic, 64, 82, 50, 50);
	this.lblName = new NxControl('lblName');
	this.renderControl(this.lblName, 130, 30, 130, 50, "�̸�:");
	this.lblGrade = new NxControl('lblName');
	this.renderControl(this.lblGrade, 100, 30, 280, 50, "�ź�:");
	this.lblPatrot = new NxControl('lblName');
	this.renderControl(this.lblPatrot, 100, 30, 410, 50, "�漺��:");
	//this.lblMaster = new NxControl('lblName');
	//this.renderControl(this.lblMaster, 100, 30, 520, 50, "����:");
	this.lblcharm = new NxControl('lblName');
	this.renderControl(this.lblcharm, 100, 30, 540, 50, "�ŷ�:");
	
	this.lblstr = new NxControl('lblName');
	this.renderControl(this.lblstr, 100, 30, 130, 80, "����:");
	this.lblint = new NxControl('lblName');
	this.renderControl(this.lblint, 100, 30, 280, 80, "����:");
	this.lblpoli = new NxControl('lblName');
	this.renderControl(this.lblpoli, 100, 30, 410, 80, "��ġ:");
	
	this.lbllev = new NxControl('lbllev');
	this.renderControl(this.lbllev, 300, 30, 130, 110, "����:");
	
	
	
	if(this.n4MasterSN==nxStatic.gameUser.n4MasterSN)
	{
		this.btnGive = new nxButton('btnGive','����', owner);
		this.renderControl(this.btnGive, 80, 30, 500, 410);
		this.btnTake = new nxButton('btnTake','ȸ��', owner);
		this.renderControl(this.btnTake, 80, 30, 180, 410);
		
		this.btnWaste = new nxButton('btnWaste','�Ű�', owner);
		this.renderControl(this.btnWaste, 80, 30, 590, 410);

		this.btnGive.frmLayer.onclick=function()
		{
			var dlg = this.NxControl.parent;
			var selectedItems = dlg.getMasterSelectedItems();
			if(selectedItems)
			{
				var n4ItemKey = selectedItems[0].row['n4ItemKey'];
				
				function callBackItemGive(xml, strText, dlg)
				{
					dlg.loadData();
				}
				var cmd = new nxCommand(null, dlg);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemGiveGeneral);
				cmd.addParam("n4GeneralSN", dlg.n4GeneralSN);
				cmd.addParam("n4ItemKey", n4ItemKey);	
				//cmd.print();
				cmd.execute(callBackItemGive);
				
			}
			else
			{
				Alert('Alert_'+this.id, '���õ� �������� �����ϴ�.');
			}
		}
		this.btnWaste.frmLayer.onclick=function()
		{
			var dlg = this.NxControl.parent;
			var selectedItems = dlg.getMasterSelectedItems();
			if(selectedItems)
			{
				dlg.n4ItemKey = selectedItems[0].row['n4ItemKey'];
				
				function distruct(isTrue, dlg)
				{
					if(isTrue)
					{
						function callBackItemSell(xml, strText, dlg)
						{
							dlg.loadData();
							mainMethod.refresh();
						}
						var cmd = new nxCommand(null, dlg);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemSell);
						cmd.addParam("n4ItemKey", dlg.n4ItemKey);	
						//cmd.print();
						cmd.execute(callBackItemSell);
					}
				}
				Confirm(dlg, '���� �Ű��Ͻðڽ��ϱ�?', distruct);
				
				
			}
			else
			{
				Alert('Alert_'+this.id, '���õ� �������� �����ϴ�.');
			}
		}
		this.btnTake.frmLayer.onclick=function()
		{
			var dlg = this.NxControl.parent;
			var selectedItems = dlg.getGeneralSelectedItems();
			if(selectedItems)
			{
				var n4ItemKey = selectedItems[0].row['n4ItemKey'];
				
				function callBackItemTake(xml, strText, dlg)
				{
					dlg.loadData();
				}
				var cmd = new nxCommand(null, dlg);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemTakeGeneral);
				cmd.addParam("n4GeneralSN", dlg.n4GeneralSN);
				cmd.addParam("n4ItemKey", n4ItemKey);	
				//cmd.print();
				cmd.execute(callBackItemTake);
				
			}
			else
			{
				Alert('Alert_'+this.id, '���õ� �������� �����ϴ�.');
			}
		}
	}
		
	this.loadData =function()
	{	
		var cmdGeneralInfo = new nxCommand(null, this);
		cmdGeneralInfo.addParam("n1QueryID", nxStatic.n1QueryID_GeneralGetInfo);
		cmdGeneralInfo.addParam("n4GeneralSN", this.n4GeneralSN);
		cmdGeneralInfo.execute(callBackcmdGeneralInfo);
		
		if(this.n4MasterSN==nxStatic.gameUser.n4MasterSN)
		{
			var cmd = new nxCommand(null, this);
			cmd.addParam("n1QueryID", nxStatic.n1QueryID_itemMasterGetList);
			cmd.execute(callBack);
		}
		
		var cmdGeneralItem = new nxCommand(null, this);
		cmdGeneralItem.addParam("n1QueryID", nxStatic.n1QueryID_itemGeneralGetList);
		cmdGeneralItem.addParam("n4GeneralSN", this.n4GeneralSN);
		cmdGeneralItem.execute(callBackcmdGeneralItem);
		
		
		
	}
	this.loadData();
	
	
	function callBack(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		if(dlg.grid)
		{
			dlg.grid.unload();
			dlg.grid.hide();
		}
		dlg.grid = new nxGridControl('grid_'+dlg.id);
		dlg.grid.style.border= "1px solid #FCEEEE";
		dlg.grid.n1SelectType=1;
		dlg.grid.setLeft(400);
		dlg.grid.setTop(130);
		dlg.grid.setWidth(370);
		dlg.grid.setHeight(230);
		dlg.body.add(dlg.grid);
		var i=0;
		dlg.grid.columns[i++] = new nxGridColumn( "strItemCode"		, "����"	, 70);
		dlg.grid.columns[i++] = new nxItemNameViewGridColumn( "strItemName"		, "������"	, 120);
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemLevel"		, "�����۷���"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpStr"			, "����"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpInt"			, "����"	, 40);
	
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemSN"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n1ItemCode"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemKey"	, null	, 0);
		dlg.grid.columns[i++] = new nxGridColumn( "n4Inchant", null	, 0);
		

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
	
	
	function callBackcmdGeneralItem(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
		if(dlg.gridGenItem)
		{
			dlg.gridGenItem.unload();
			dlg.gridGenItem.hide();
		}
		dlg.gridGenItem = new nxGridControl('gridGen_'+dlg.id);
		dlg.gridGenItem.style.border= "1px solid #FCEEEE";
		dlg.gridGenItem.n1SelectType=1;
		dlg.gridGenItem.setLeft(30);
		dlg.gridGenItem.setTop(130);
		dlg.gridGenItem.setWidth(360);
		dlg.gridGenItem.setHeight(230);
		dlg.body.add(dlg.gridGenItem);
		var i=0;
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "strItemCode"		, "����"	, 70);
		dlg.gridGenItem.columns[i++] = new nxItemNameViewGridColumn( "strItemName"		, "������"	, 120);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4ItemLevel"		, "�����۷���"	, 80);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4UpStr"			, "����"	, 40);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4UpInt"			, "����"	, 40);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4ItemSN"	, null	, 0);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n1ItemCode"	, null	, 0);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4ItemKey"	, null	, 0);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4Inchant", null	, 0);

		for(var i=0;i<ds.rows.length;i++)
		{
			var item = new nxGridItem();
			for(var j=0;j<dlg.gridGenItem.columns.length; j++)
			{
				var field = dlg.gridGenItem.columns[j].strField;
				item.add( field	, ds.rows[i].get(field));
			}
			dlg.gridGenItem.items[i] = item;
		}
		dlg.gridGenItem.show();
	}
	
	function callBackcmdGeneralInfo(xml, strText, dlg)
	{
		var ds = new NxDataSet(xml);
	
		dlg.lblName.setText("�̸�: "+ds.rows[0].get("strGeneralName"));
		dlg.lblGrade.setText("�ź�: "+ds.rows[0].get("strGrade"));
		dlg.lblPatrot.setText("�漺��: "+ds.rows[0].get("n1Patriot"));
		//dlg.lblMaster.setText("����: "+nxStatic.gameUser.strMasterName);
		dlg.lblstr.setText("����: "+dlg.getAmountUP(ds.rows[0].get("n4StrO"), ds.rows[0].get("n4Str")));
		dlg.lblint.setText("����: "+dlg.getAmountUP(ds.rows[0].get("n4IntO"), ds.rows[0].get("n4Int")));
		dlg.lblpoli.setText("��ġ: "+dlg.getAmountUP(ds.rows[0].get("n4PoliO"), ds.rows[0].get("n4Poli")));
		dlg.lblcharm.setText("�ŷ�: "+dlg.getAmountUP(ds.rows[0].get("n4CharmO"), ds.rows[0].get("n4Charm")));
		dlg.lbllev.setText("����: "+ds.rows[0].get("n4Level")+" ("+addCommas(ds.rows[0].get("n8Exp"))+"/"+addCommas(ds.rows[0].get("n8ExpNext"))+")");
			
	}
	
	

	this.getAmountUP=function(n4Ori, n4Now)
	{
		n4Ori = parseInt(n4Ori);
		n4Now = parseInt(n4Now);
		if(n4Now==n4Ori)
			return n4Now;
		else
		{
			var pulse	= n4Now>n4Ori?'+':'-';
			var val		= n4Now-n4Ori;
			return n4Now+"("+pulse+""+Math.abs(val)+")";
		}
	}	
	
	this.getGeneralSelectedItems = function()
	{
		if(this.gridGenItem.getSelectedItems().length==0)
			return null;
		else
			return this.gridGenItem.getSelectedItems();
	}
	this.getMasterSelectedItems = function()
	{
		if(this.grid.getSelectedItems().length==0)
			return null;
		else
			return this.grid.getSelectedItems();
	}
	
}
nxItemManageDialog.prototype = new NxControl();
nxItemManageDialog.prototype.constructor = nxItemManageDialog;

function nxGeneralItemViewGridColumn( strField, strText, n4Width, align)
{
	nxGridColumn.apply(this, arguments);
	
	this.setProperty=function(nxColumnControl, rowData)
	{
		var n4MasterSN =  parseInt(rowData["n4MasterSN"]);
		//if(n4MasterSN!= parseInt(nxStatic.gameUser.n4MasterSN))
		//	return;
		
		nxColumnControl.setText('');
		nxColumnControl.btnView = new NxControl('btnItemView_'+nxColumnControl.id);
		nxColumnControl.add(nxColumnControl.btnView);
		nxColumnControl.style.textAlign='left';
		//nxColumnControl.btnView.setFontSize(12);
		nxColumnControl.btnView.setText("<input type=button value=' ������' style='width:50px;font-size:11px;text-Align:left'/>");
		nxColumnControl.btnView.setBG('');
		nxColumnControl.btnView.setWidth(70);
		nxColumnControl.btnView.setHeight(15);
		nxColumnControl.btnView.show();
		nxColumnControl.btnView.n4GeneralSN = parseInt(rowData["n4GeneralSN"]);
		nxColumnControl.btnView.n4MasterSN	= n4MasterSN;

		nxColumnControl.btnView.frmLayer.onclick=function()
		{
			var ItemManageDialog = new nxItemManageDialog('nxItemManageDialog_'+this.id, this.NxControl, "��� ������ ����", this.NxControl.n4GeneralSN, this.NxControl.n4MasterSN);
			ItemManageDialog.show();
		}
	}
}
nxLogViewGridColumn.prototype = new NxControl();
nxLogViewGridColumn.prototype.constructor = nxLogViewGridColumn;

function nxItemNameViewGridColumn( strField, strText, n4Width, align)
{
	nxGridColumn.apply(this, arguments);
	
	this.setProperty=function(nxColumnControl, rowData)
	{
		var strItemName =  rowData["strItemName"];
		var n4ItemLevel =  parseInt(rowData["n4ItemLevel"]);
		var n4ItemKey	=  parseInt(rowData["n4ItemKey"]);
		var n4Inchant   =  parseInt(rowData["n4Inchant"]);
		
		var strItemName = "<span style='cursor:pointer;' onmouseover='itemInfoViewOver("+n4ItemKey+")' onmouseout='itemInfoViewOut("+n4ItemKey+")'  >"+itemColorByLevel(strItemName,n4ItemLevel,n4Inchant)+"</span>";
		nxColumnControl.setText(strItemName);
		
	}
}
nxItemNameViewGridColumn.prototype = new NxControl();
nxItemNameViewGridColumn.prototype.constructor = nxItemNameViewGridColumn;

function nxExpViewGridColumn( strField, strText, n4Width, align)
{
	nxGridColumn.apply(this, arguments);
	
	this.setProperty=function(nxColumnControl, rowData)
	{
		nxColumnControl.style.textAlign='center';
		var n4Level			=  parseInt(rowData["n4Level"]);
		var n8Exp			=  parseInt(rowData["n8Exp"]);
		var n8ExpNext		=  parseInt(rowData["n8ExpNext"]);
		var strAlt			=  n8Exp==0?'0%':parseInt(n8Exp/n8ExpNext*100)+'%';				
		var strLabel = "<span style='width:40px;cursor:pointer' ><u>"+n4Level+"</u></span>";
		nxColumnControl.setText(strLabel);
		nxColumnControl.setAlt('������������ '+strAlt);
		this.align = 2;
	}
}
nxAvilViewGridColumn.prototype = new NxControl();
nxAvilViewGridColumn.prototype.constructor = nxAvilViewGridColumn;

function nxAvilViewGridColumn( strField, strText, n4Width, align)
{
	nxGridColumn.apply(this, arguments);
	
	this.setProperty=function(nxColumnControl, rowData)
	{
		nxColumnControl.style.textAlign='center';
		var strSpecialAvilName	=  rowData["strSpecialAvilName"];
		var n4AvilCode			=  parseInt(rowData["n4AvilCode"]);
						
		var strLabel = "<span style='width:40px;cursor:pointer' onmouseover='tooltipViewOver("+n4AvilCode+")' onmouseout='tooltipViewOut()'  > <u>&nbsp;"+strSpecialAvilName+"</u></span>";
		nxColumnControl.setText(strLabel);
		nxColumnControl.setAlt(arrSpecial[n4AvilCode]);
		this.align = 1;
	}
}
nxAvilViewGridColumn.prototype = new NxControl();
nxAvilViewGridColumn.prototype.constructor = nxAvilViewGridColumn;

var arrSpecial = new Array();
arrSpecial[1]=	"����: ���Ÿ�� 50% Ȯ���� 2�� ����";
arrSpecial[2]=	"�޽�: �������� 50% Ȯ���� ������ ��������	";
arrSpecial[3]=	"����: �����ݽ� 30% Ȯ���� ������ �������� �����Ͽ� �߰� ���ظ� �ش�. �δ��� ��� ���.";
arrSpecial[4]=	"����: �������� �߻�	";
arrSpecial[5]=	"����: �⺴��� �ڽź��� ������ ���� ���� ������ �⺴���� ������ ũ��Ƽ��	";
arrSpecial[6]=	"�ݰ�: �� ������ �Ʊ����� ���Ұ�� 50%�� Ȯ���� ���ظ� ��������	";
arrSpecial[7]=	"���: �ڱ⺸�� ���� ������ ���忡�� �跫�� �ݵ�� ����	";
arrSpecial[8]=	"����: ������ �ɷ����� �ʴ´�	";
arrSpecial[9]=	"�־�: ���ϸ��� �Ʊ��δ��� ����� ȸ���ȴ�	";
arrSpecial[10]=	"����: �Ʊ����� ������ ���� �δ뿡�� ���.���� ���ݽ� ũ��Ƽ��	";
arrSpecial[11]=	"����: â��.�غ� ���� ������ ũ��Ƽ��	";
arrSpecial[12]=	"��ǳ: ������ ���δ��� ����� ũ�� ����	";
arrSpecial[13]=	"��: �� ����� �߰����� ��������	";
arrSpecial[14]=	"����: �ڽź��� ������ ���� ���� �δ뿡 ���Ͽ� ������� ������ ũ��Ƽ��	";
arrSpecial[15]=	"ȭ��: �ڽź��� ������ ���� ���� �δ뿡 ���Ͽ� ȭ�谡 ����	";
arrSpecial[16]=	"���: �⺴�� ���� ������ ũ��Ƽ��	";
arrSpecial[17]=	"����: �⺴�� ���� ���귮 ����	";
arrSpecial[18]=	"����: �ú���� �ڽź��� ������ ���� ���� ������ �ú����� ������ ũ��Ƽ��	";
arrSpecial[19]=	"��å: �ڽź��� ������ ���������� �跫 ������ ũ��Ƽ��	";
arrSpecial[20]=	"��Ż: �� �δ� ���Ľ� ����Ȯ���� ���� ������ ����	";
arrSpecial[21]=	"�ݰ�: �跫�� �ǹ޾�ģ��.	";
arrSpecial[22]=	"�ɸ�: ���尣���� ����Ǵ� ��� ��ǰ�� ���귮�� ����	";
arrSpecial[23]=	"�ý�: �뺴 ���� ������ ũ��Ƽ��	";
arrSpecial[24]=	"�ź�: ���� ���� �� ũ��Ƽ��	";
arrSpecial[25]=	"�Ӿ�: �� �δ븦 ����Ʈ���� ���ȸ��	";
arrSpecial[26]=	"����: �ڽź��� ���� ���� ������ å�� ������ ũ��Ƽ��	";
arrSpecial[27]=	"�̵�: �� �������� ���� ������ 150%(���� ���� ��)	";
arrSpecial[28]=	"����: �� �跫�� ������ ����	";
arrSpecial[29]=	"��: �ڽź��� ������ ���� ������ ������ �ݵ�� ����	";
arrSpecial[30]=	"�˽�: �˺� ��� ���ݽ� ġ������";
arrSpecial[31]=	"�͹�:: ���. ���� ��밡��	";
arrSpecial[32]=	"â��: â����� �ڽź��� ���� �δ븦 â���� ���� ������ 250% ����";
arrSpecial[33]=	"����: â����� �ڽź��� ���� �δ븦 â���� ���� ������  30% Ȯ���� ȥ��";
arrSpecial[34]=	"�ұ�: ������ �� 50% Ȯ���� ���� ��ȿȭ	";
arrSpecial[35]=	"ħ��: ������ �ɷ����� �ʴ´�	";
arrSpecial[36]=	"�ɰ�: �� �δ� ���ݽ� ���� ���縦 �Ʊ� ���翡 ����	";
arrSpecial[37]=	"�ɸ�: �跫 ������ �ݵ�� ũ��Ƽ��	";
arrSpecial[38]=	"�Ż�: �ڽź��� ������ ���� ��뿡�� �跫�� �� ����. 	";
arrSpecial[39]=	"��ȯ: �跫 ������ 250% ����	";
arrSpecial[40]=	"����: ������ �� �δ��� ����� ���ϰ� ����	";
arrSpecial[41]=	"����: �������� �ּ�ȭ	";
arrSpecial[42]=	"���: ����.�����迡 �ɸ��� ����	";
arrSpecial[43]=	"�߸�: ���� ���߽�. �Ⱓ����	";
arrSpecial[44]=	"����: �ڽź��� ������ ���� �δ뿡 ���Ͽ� �������� ũ��Ƽ��	";
arrSpecial[45]=	"���: �� �δ��� ������ ������ ���ȸ��	";
arrSpecial[46]=	"�п�: ��� ���� ������ ũ��Ƽ��	";
arrSpecial[47]=	"ö��: ���� �����ݿ� ���ظ� 60% �� �޴´�.	";

