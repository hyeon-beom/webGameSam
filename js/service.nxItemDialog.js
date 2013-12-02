function nxMyItemListDialog(strLayerID, owner, n1SelectMode)
{
	nxInputDialog.apply(this, arguments);
	if(!strLayerID)
		return;

	this.n1SelectMode = n1SelectMode?parseInt(n1SelectMode):0;
	this.strCaption = '데이터를 불러오는 중...';	
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
	this.button.setTitle('취소');
	//this.button.moveCenter();
	this.button.setLeft(200);
	this.button.show();
	
	this.buttonOK = new nxButton('buttonOK', this.n1SelectMode==1?'선택':'매각', this);
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
	
	
	

	if(this.n1SelectMode==1)//부모에 전달 '취소'
	{
		this.onsubmit = function(owner, selectedItems){}//ex)selectedItems[0].row['n4GeneralSN']
	}
	else//매각 0
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
				Confirm(dlg, dlg.strItemName+'을(를) 정말 매각하시겠습니까?', distruct);
				
				
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
				Confirm(dlg, '선택된 아이템을 모두 매각하시겠습니까?', distructMulti);
				
				
			}
			else
			{
				Alert('Alert_'+this.id, '선택된 아이템이 없습니다.');
			}
		}
	}

	function callBackMyItem(xml, strText, dlg)
	{
		dlg.strCaption = '내가 소유한 아이템목록';
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
		dlg.grid.columns[i++] = new nxGridColumn( "strItemCode"		, "종류"	, 70);
		dlg.grid.columns[i++] = new nxItemNameViewGridColumn( "strItemName"		, "아이템"	, 100);
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemLevel"		, "아이템레벨"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpStr"			, "무력"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpInt"			, "지력"	, 45);
	
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
	this.button.setTitle('닫기');
	this.button.moveCenter();
	this.button.show();
	
	this.generalPic = new nxGeneralFaceControl('nxGeneralFaceControl', this, n4GeneralSN)	
	this.renderControl(this.generalPic, 64, 82, 50, 50);
	this.lblName = new NxControl('lblName');
	this.renderControl(this.lblName, 130, 30, 130, 50, "이름:");
	this.lblGrade = new NxControl('lblName');
	this.renderControl(this.lblGrade, 100, 30, 280, 50, "신분:");
	this.lblPatrot = new NxControl('lblName');
	this.renderControl(this.lblPatrot, 100, 30, 410, 50, "충성도:");
	//this.lblMaster = new NxControl('lblName');
	//this.renderControl(this.lblMaster, 100, 30, 520, 50, "군주:");
	this.lblcharm = new NxControl('lblName');
	this.renderControl(this.lblcharm, 100, 30, 540, 50, "매력:");
	
	this.lblstr = new NxControl('lblName');
	this.renderControl(this.lblstr, 100, 30, 130, 80, "무력:");
	this.lblint = new NxControl('lblName');
	this.renderControl(this.lblint, 100, 30, 280, 80, "지력:");
	this.lblpoli = new NxControl('lblName');
	this.renderControl(this.lblpoli, 100, 30, 410, 80, "정치:");
	
	this.lbllev = new NxControl('lbllev');
	this.renderControl(this.lbllev, 300, 30, 130, 110, "레벨:");
	
	
	
	if(this.n4MasterSN==nxStatic.gameUser.n4MasterSN)
	{
		this.btnGive = new nxButton('btnGive','수여', owner);
		this.renderControl(this.btnGive, 80, 30, 500, 410);
		this.btnTake = new nxButton('btnTake','회수', owner);
		this.renderControl(this.btnTake, 80, 30, 180, 410);
		
		this.btnWaste = new nxButton('btnWaste','매각', owner);
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
				Alert('Alert_'+this.id, '선택된 아이템이 없습니다.');
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
				Confirm(dlg, '정말 매각하시겠습니까?', distruct);
				
				
			}
			else
			{
				Alert('Alert_'+this.id, '선택된 아이템이 없습니다.');
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
				Alert('Alert_'+this.id, '선택된 아이템이 없습니다.');
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
		dlg.grid.columns[i++] = new nxGridColumn( "strItemCode"		, "종류"	, 70);
		dlg.grid.columns[i++] = new nxItemNameViewGridColumn( "strItemName"		, "아이템"	, 120);
		dlg.grid.columns[i++] = new nxGridColumn( "n4ItemLevel"		, "아이템레벨"	, 80);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpStr"			, "무력"	, 40);
		dlg.grid.columns[i++] = new nxGridColumn( "n4UpInt"			, "지력"	, 40);
	
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
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "strItemCode"		, "종류"	, 70);
		dlg.gridGenItem.columns[i++] = new nxItemNameViewGridColumn( "strItemName"		, "아이템"	, 120);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4ItemLevel"		, "아이템레벨"	, 80);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4UpStr"			, "무력"	, 40);
		dlg.gridGenItem.columns[i++] = new nxGridColumn( "n4UpInt"			, "지력"	, 40);
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
	
		dlg.lblName.setText("이름: "+ds.rows[0].get("strGeneralName"));
		dlg.lblGrade.setText("신분: "+ds.rows[0].get("strGrade"));
		dlg.lblPatrot.setText("충성도: "+ds.rows[0].get("n1Patriot"));
		//dlg.lblMaster.setText("군주: "+nxStatic.gameUser.strMasterName);
		dlg.lblstr.setText("무력: "+dlg.getAmountUP(ds.rows[0].get("n4StrO"), ds.rows[0].get("n4Str")));
		dlg.lblint.setText("지력: "+dlg.getAmountUP(ds.rows[0].get("n4IntO"), ds.rows[0].get("n4Int")));
		dlg.lblpoli.setText("정치: "+dlg.getAmountUP(ds.rows[0].get("n4PoliO"), ds.rows[0].get("n4Poli")));
		dlg.lblcharm.setText("매력: "+dlg.getAmountUP(ds.rows[0].get("n4CharmO"), ds.rows[0].get("n4Charm")));
		dlg.lbllev.setText("레벨: "+ds.rows[0].get("n4Level")+" ("+addCommas(ds.rows[0].get("n8Exp"))+"/"+addCommas(ds.rows[0].get("n8ExpNext"))+")");
			
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
		nxColumnControl.btnView.setText("<input type=button value=' 아이템' style='width:50px;font-size:11px;text-Align:left'/>");
		nxColumnControl.btnView.setBG('');
		nxColumnControl.btnView.setWidth(70);
		nxColumnControl.btnView.setHeight(15);
		nxColumnControl.btnView.show();
		nxColumnControl.btnView.n4GeneralSN = parseInt(rowData["n4GeneralSN"]);
		nxColumnControl.btnView.n4MasterSN	= n4MasterSN;

		nxColumnControl.btnView.frmLayer.onclick=function()
		{
			var ItemManageDialog = new nxItemManageDialog('nxItemManageDialog_'+this.id, this.NxControl, "장수 아이템 정보", this.NxControl.n4GeneralSN, this.NxControl.n4MasterSN);
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
		nxColumnControl.setAlt('다음레벨까지 '+strAlt);
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
arrSpecial[1]=	"연전: 통상타시 50% 확률로 2번 공격";
arrSpecial[2]=	"급습: 육상전시 50% 확률로 공격을 받지않음	";
arrSpecial[3]=	"돌격: 통상공격시 30% 확률로 무장이 적진으로 돌진하여 추가 피해를 준다. 부대의 사기 상승.";
arrSpecial[4]=	"보좌: 지원공격 발생	";
arrSpecial[5]=	"기장: 기병대로 자신보다 무력이 낮은 상대와 대전중 기병전법 성공시 크리티컬	";
arrSpecial[6]=	"금강: 적 공격이 아군보다 약할경우 50%의 확률로 피해를 받지않음	";
arrSpecial[7]=	"허실: 자기보다 낮은 지략의 무장에게 계략이 반드시 성공	";
arrSpecial[8]=	"규율: 위보에 걸려들지 않는다	";
arrSpecial[9]=	"주악: 매턴마다 아군부대의 기력이 회복된다	";
arrSpecial[10]=	"신장: 아군보다 무력이 약한 부대에게 통상.전법 공격시 크리티컬	";
arrSpecial[11]=	"투신: 창병.극병 전법 성공시 크리티컬	";
arrSpecial[12]=	"위풍: 공격한 적부대의 기력을 크게 감소	";
arrSpecial[13]=	"명성: 모병 실행시 추가병사 모집가능	";
arrSpecial[14]=	"용장: 자신보다 무력이 낮은 약한 부대에 한하여 모든전법 성공시 크리티컬	";
arrSpecial[15]=	"화공: 자신보다 지력이 낮은 약한 부대에 한하여 화계가 성공	";
arrSpecial[16]=	"기신: 기병대 전법 성공시 크리티컬	";
arrSpecial[17]=	"번식: 기병대 병기 생산량 증가	";
arrSpecial[18]=	"궁장: 궁병대로 자신보다 무력이 낮은 상대와 대전중 궁병전법 성공시 크리티컬	";
arrSpecial[19]=	"비책: 자신보다 지략이 높은적에게 계략 성공시 크리티컬	";
arrSpecial[20]=	"강탈: 적 부대 격파시 일정확률로 적의 군량을 갈취	";
arrSpecial[21]=	"반계: 계략을 되받아친다.	";
arrSpecial[22]=	"능리: 대장간에서 생산되는 모든 물품의 생산량이 증가	";
arrSpecial[23]=	"궁신: 노병 전법 성공시 크리티컬	";
arrSpecial[24]=	"매복: 복병 성공 시 크리티컬	";
arrSpecial[25]=	"앙양: 적 부대를 무너트리면 기력회복	";
arrSpecial[26]=	"묘계: 자신보다 지략 낮은 적에게 책략 성공시 크리티컬	";
arrSpecial[27]=	"미도: 매 계절마다 병량 수입이 150%(군사 지정 시)	";
arrSpecial[28]=	"통찰: 적 계략을 무조건 간파	";
arrSpecial[29]=	"언독: 자신보다 지략이 낮은 적에게 위보가 반드시 성공	";
arrSpecial[30]=	"검신: 검병 통상 공격시 치명피해";
arrSpecial[31]=	"귀문:: 요술. 낙뢰 사용가능	";
arrSpecial[32]=	"창장: 창병대로 자신보다 약한 부대를 창법계 전법 성공시 250% 피해";
arrSpecial[33]=	"질주: 창병대로 자신보다 약한 부대를 창병계 전법 성공시  30% 확률로 혼란";
arrSpecial[34]=	"불굴: 열세일 때 50% 확률로 피해 무효화	";
arrSpecial[35]=	"침착: 착란에 걸려들지 않는다	";
arrSpecial[36]=	"심공: 적 부대 공격시 적군 병사를 아군 병사에 가담	";
arrSpecial[37]=	"심모: 계략 성공시 반드시 크리티컬	";
arrSpecial[38]=	"신산: 자신보다 지략이 낮은 상대에게 계략이 꼭 성공. 	";
arrSpecial[39]=	"연환: 계략 성공시 250% 피해	";
arrSpecial[40]=	"소탕: 공격한 적 부대의 기력을 약하게 감소	";
arrSpecial[41]=	"답파: 낙석피해 최소화	";
arrSpecial[42]=	"명경: 위보.착란계에 걸리지 않음	";
arrSpecial[43]=	"발명: 병기 개발시. 기간단축	";
arrSpecial[44]=	"구축: 자신보다 무력이 약한 부대에 한하여 통상공격이 크리티컬	";
arrSpecial[45]=	"노발: 적 부대의 전법을 받으면 기력회복	";
arrSpecial[46]=	"패왕: 모든 전법 성공시 크리티컬	";
arrSpecial[47]=	"철벽: 적의 통상공격에 피해를 60% 만 받는다.	";

