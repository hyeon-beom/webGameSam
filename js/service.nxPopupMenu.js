function nxPopupMenu(strLayerID, owner)
{
	NxControl.apply(this, arguments);  
	
	if(!owner)
	{
		alert(this.id+'�˾��� �����ڰ� �����ϴ�.');
		return;
	}

	this.style.border	= "";//"1px solid #FCEEEE";
	this.style.width	= "100px";
	this.style.height	= "100px";
	this.style.overflow = '';
	this.items			= new Array();
	this.setLayerIndex(nxLayer.n4Layer_PopupMenu);
	this.setBG('');
	this.isMainMenu		= true;
	this.owner			= owner;
	
	this.addItem=function(menuItem)
	{
		menuItem.style.xIndex = this.zIndex+1;
		menuItem.n4MenuIndex			= this.items.length;
		this.items[this.items.length]	= menuItem;
		this.children[menuItem.id]		= menuItem;
	}
	this.show=function()
	{
		if(this.isMainMenu)
			nxStatic.setPopup(this);
			
		this._show();
		var n4Top = 0;
		for(var i=0;i<this.items.length;i++)
		{
			this.add(this.items[i]);
			
			this.items[i].setTop(n4Top);
			this.items[i].moveCenter();
			this.items[i].show();
			n4Top+=this.items[i].getHeight();
			
		}
		this.checkAccess();	
	}
	this.checkAccess=function(){}
	this.hide = function()
	{
		this._hide();
		for(var i=0;i<this.items.length;i++)
			this.items[i].hide();
		this.hideChildPopup();
	}
	this.hideChildPopup=function()
	{
		for(var i=0;i<this.items.length;i++)
		{
			if(this.items[i].popupMenu)
			this.items[i].popupMenu.hide();
		}
	}
	

}
nxPopupMenu.prototype = new NxControl;
nxPopupMenu.prototype.constructor = nxPopupMenu;


function nxMenuItem(strLayerID)
{
	NxButton.apply(this, arguments);
	this.style.border	= "1px solid #FCEEEE";
	this.popupMenu		= null;
	this.n4MenuIndex	= 0;
	this.setBG('');
	
	
	this.frmLayer.onclick=function(e)
	{
		if(this.NxControl.popupMenu)
		{
			this.NxControl.parent.hideChildPopup();
			this.NxControl.popupMenu.isMainMenu = false;
			this.NxControl.popupMenu.setLeft(this.NxControl.parent.getLeft()+this.NxControl.parent.getWidth());
			this.NxControl.popupMenu.setTop(this.NxControl.parent.getTop()+(this.NxControl.getHeight()*this.NxControl.n4MenuIndex));
			this.NxControl.popupMenu.show();
			
		}
	}
	
	this.frmLayer.onmouseover=function()
	{
		var menu = this.NxControl.parent;
		for(var i=0;i<menu.items.length;i++)
		{
			menu.items[i].src = menu.items[i].srcMouseOut;
			menu.items[i].show();
		}
	
		if(this.NxControl.srcMouseOver!=null)
			this.NxControl.src = this.NxControl.srcMouseOver;
		this.NxControl.show();
	}
	
	this.findContainer=function()
	{
	   return nxStatic.mainContainer;
	}
}
nxMenuItem.prototype = new NxControl();
nxMenuItem.prototype.constructor = nxMenuItem;


//--------------------------Ŀ���͸���¡-------------------------------


function nxPopupCastle(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.style.border	= "";

	this.setWidth(150);
	this.setHeight(100);

	var item = new nxPopupMenuItem('nxPopupCastle_castle_'+this.id);
	item.setTitle("��������");
	this.addItem(item);
	var item2 = new nxPopupMenuItem('nxPopupCastle_general_'+this.id);
	item2.setTitle("�Ҽӹ���");
	this.addItem(item2);
	var item3 = new nxPopupMenuItem('nxPopupCastle_fighter_'+this.id);
	item3.setTitle("��߹���");
	this.addItem(item3);
	this.item4 = new nxPopupMenuItem('nxPopupBase_merchant_'+this.id);
	this.item4.setTitle("����");
	this.addItem(this.item4);
	this.item5 = new nxPopupMenuItem('nxPopupBase_insa_'+this.id);
	this.item5.setTitle("�λ�");
	this.addItem(this.item5);
	this.item6 = new nxPopupMenuItem('nxPopupBase_combat_'+this.id);
	this.item6.setTitle("����");
	this.addItem(this.item6);
	this.item6.popupMenu = new popupCombat('popupCombat_'+this.id, owner);	
	this.item7 = new nxPopupMenuItem('nxPopupBase_diplomacy_'+this.id);
	this.item7.setTitle("�ܱ�");
	this.addItem(this.item7);
	this.item8 = new nxPopupMenuItem('nxPopupBase_policy_'+this.id);
	this.item8.setTitle("����");
	this.addItem(this.item8);
	
	
	//--���� ����
	if(nxStatic.gameUser.n4MasterSN==1)
	{
		this.item8 = new nxPopupMenuItem('nxPopupBase_dist_'+this.id);
		this.item8.setTitle("ö��");
		this.addItem(this.item8);
		this.item8.frmLayer.onclick=function()
		{
			var building = this.NxControl.parent.owner
			mainMethod.requestDistruct(building.n4BuildingSN);
		}
		
	}
	//--���� ��
	
	this.checkAccess=function()
	{
		if(this.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
		{
			this.item4.setDisable(true);
			this.item5.setDisable(true);
			this.item6.setDisable(true);
			this.item7.setDisable(true);
			this.item8.setDisable(true);
		}
	}
	
	
	this.dialogCastle	= null;
	item.frmLayer.onclick=function()
	{
		if(this.NxControl.parent.dialogCastle)
			this.NxControl.parent.dialogCastle.unload();
		this.NxControl.parent.dialogCastle = new nxCastleInfoDialog('dialogCastle_'+this.NxControl.id, this.NxControl.parent.owner);
		this.NxControl.parent.dialogCastle.show();
	}
	this.dialogGeneral	= null;
	item2.frmLayer.onclick=function()
	{
		
		if(this.NxControl.parent.dialogGeneral)
			this.NxControl.parent.dialogGeneral.unload();
		this.NxControl.parent.dialogGeneral = new nxGeneralInfoDialog('dialogGeneral_'+this.NxControl.id
			, this.NxControl.parent.owner.n4CastleSN, this.NxControl.parent.owner.n4MasterSN, this.NxControl.parent.owner);
		this.NxControl.parent.dialogGeneral.show();
		
		//mainMethod.generalList();
	}
	this.dialogFighter	= null;
	item3.frmLayer.onclick=function()
	{
		
		if(this.NxControl.parent.dialogFighter)
			this.NxControl.parent.dialogFighter.unload();
		this.NxControl.parent.dialogFighter = new nxGeneralInfoDialog('dialogFighter_'+this.NxControl.id
			, this.NxControl.parent.owner.n4CastleSN, 0, this.NxControl.parent.owner);
		this.NxControl.parent.dialogFighter.show();
		
		//mainMethod.fighterList();
	}
	this.item4.popupMenu = new popupMerchant('popupMerchant_'+this.id, owner);
	function popupMerchant(strLayerID, owner)
	{
		nxPopupMenu.apply(this, arguments);  
		this.setWidth(150);
		this.setHeight(100);
		var item = new nxPopupMenuItem('popupBuilding_riceBuy_'+this.id);
		item.setTitle("���� ����");
		this.addItem(item);
		var item2 = new nxPopupMenuItem('popupBuilding_riceSell'+this.id);
		item2.setTitle("���� �Ű�");
		this.addItem(item2);
				
		item.frmLayer.onclick=function()
    	{
    		/*
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxRiceMerchantDialog('nxRiceMerchantDialog_'+this.NxControl.parent.owner.id, this.NxControl.parent.owner, 0);
    		this.dlg.show();
    		*/
    		mainMethod.bizRiceBuy();
    	}
		item2.frmLayer.onclick=function()
    	{
    		/*
			if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxRiceMerchantDialog('nxRiceMerchantDialog_'+this.NxControl.parent.owner.id, this.NxControl.parent.owner, 1);
    		this.dlg.show();
    		*/
    		mainMethod.bizRiceSell();
    	}
		
	}
	popupMerchant.prototype = new NxControl;
	popupMerchant.prototype.constructor = popupMerchant
	
	this.item5.popupMenu = new popupInsa('popupInsa_'+this.id, owner);
	this.item7.popupMenu = new popupDiplomacy('popupDiplomacy_'+this.id, owner);
	this.item8.popupMenu = new nxPopupCastlePolicy('PopupCastlePolicy'+this.id, owner);
	
}
nxPopupCastle.prototype = new NxControl;
nxPopupCastle.prototype.constructor = nxPopupCastle


function nxPopupCastlePolicy(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.style.border	= "";

	this.setWidth(150);
	this.setHeight(100);

	var item = new nxPopupMenuItem('nxPopupBase_castle_'+this.id);
	item.setTitle("��������");
	this.addItem(item);
	var item2 = new nxPopupMenuItem('nxPopupBase_general_'+this.id);
	item2.setTitle("�ֹμ���");
	this.addItem(item2);
	var item3 = new nxPopupMenuItem('nxPopupBase_fighter_'+this.id);
	item3.setTitle("�ӽ�¡��");
	this.addItem(item3);
	
	item.frmLayer.onclick=function()
	{
		/*
		nxStatic.closePopup();
		this.popupTax = new nxTaxDialog('popupTax', this.NxControl.parent.owner);
		this.popupTax.show();
		this.popupTax.onsubmit = function(building, n4Value)
		{	
			var strMsg = "������ "+n4Value+"%�� �����մϱ�?";
			if(n4Value>5)
				strMsg = "���� ���� ��� ������ �ʽ��ϴ�.<br>�ν��� �����Ͻʽÿ�.<br><br>�̴�� �����մϱ�? ";
			building.n1PerTax_tmp=n4Value;
			Confirm(building, strMsg , callBackTaxConfirm);
    		function callBackTaxConfirm(isTrue, building)
			{
				if(isTrue)
				{
					Alert('callBackTaxConfirmAlert','������ ����Ǿ����ϴ�.');
					
					var cmd = new nxCommand(null, building);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_politicsTaxUpdate);
					cmd.addParam("n4CastleSN"	, building.n4CastleSN);
					cmd.addParam("n1PerTax"		, building.n1PerTax_tmp);
					//cmd.print();
					cmd.execute(null);
					building.n1PerTax=building.n1PerTax_tmp;					
				}
    		}
			
			
		}
		*/
		mainMethod.castleTaxModify();
	}
	
	item2.frmLayer.onclick=function()
	{
		/*
		nxStatic.closePopup();
		if(this.NxControl.parent.owner.n4ZenCount<=10000)
		{
			Alert('noOne','������ �׷� �ʿ䰡 �����ϴ�.');
			return;
		}
		if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    	{
    		Alert('cant_'+this.NxControl.id,'���� �۾��� ������ �� �����ϴ�.');
    		return;    		
    	}	
				
		this.popupGive = new nxGiveDialog('popupGive', this.NxControl.parent.owner);
		this.popupGive.show();
		this.popupGive.onsubmit = function(building, n4Value)
		{	if(n4Value==0)
				return;
			var strMsg = "���� "+addCommas(n4Value)+"�� �ֹε鿡�� �������ݴϴ�.";
			building.n4RiceAmount=n4Value;
			Confirm(building, strMsg , callBackGiveConfirm);
    		function callBackGiveConfirm(isTrue, building)
			{
				if(isTrue)
				{
					
					function callBackGive(xml, strText, building)
					{
						var ds = new NxDataSet(xml);
						building.n1LikeZen = parseInt(ds.rows[0].get("n1LikeZen"));
						Alert('callBackTaxConfirmAlert','������ '+building.n1LikeZen+'�� ����Ͽ����ϴ�.');
					}
					
					var cmd = new nxCommand(null, building);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_politicsGive);
					cmd.addParam("n4CastleSN"	, building.n4CastleSN);
					cmd.addParam("n4RiceAmount"		, building.n4RiceAmount);
					//cmd.print();
					cmd.execute(callBackGive);
					
					
					
				}
    		}
			
			
		}
		*/
		mainMethod.castleZenPrize();
	}
	
	item3.frmLayer.onclick=function()
	{
		/*
		nxStatic.closePopup();
		Confirm(this.NxControl.parent.owner, "���� �̷��Ա��� �Ͻðڽ��ϱ�?" , callBackForceTakeConfirm);
    	function callBackForceTakeConfirm(isTrue, building)
		{
			if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    		{
    			Alert('cant_','���� �۾��� ������ �� �����ϴ�.');
    			return;    		
    		}
		
			if(isTrue)
			{
				function callBackTaxForce(xml, strText, building)
				{
					Alert('callBackTaxConfirmAlert','�ӽ�¡���� �Ϸ��Ͽ����ϴ�.');
					building.n1LikeZen = building.n1LikeZen>10 ? building.n1LikeZen-10 : 0;
					
				}
								
				var cmd = new nxCommand(null, building);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_PoliticsTaxTake);
				cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
				cmd.addParam("n4CastleSN"			, building.n4BuildingSN);
				//cmd.print();
				cmd.execute(callBackTaxForce);
				
			}
    	}
		*/
		mainMethod.castleTaxForceTake();	
	}
	
}
nxPopupCastlePolicy.prototype = new NxControl;
nxPopupCastlePolicy.prototype.constructor = nxPopupCastlePolicy


function nxPopupBase(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.style.border	= "";

	this.setWidth(150);
	this.setHeight(100);

	var item = new nxPopupMenuItem('nxPopupBase_castle_'+this.id);
	item.setTitle("��������");
	this.addItem(item);
	var item2 = new nxPopupMenuItem('nxPopupBase_general_'+this.id);
	item2.setTitle("�Ҽӹ���");
	this.addItem(item2);
	var item3 = new nxPopupMenuItem('nxPopupBase_fighter_'+this.id);
	item3.setTitle("��߹���");
	this.addItem(item3);
	this.item4 = new nxPopupMenuItem('nxPopupBase_merchant_'+this.id);
	this.item4.setTitle("����");
	this.addItem(this.item4);
	this.item5 = new nxPopupMenuItem('nxPopupBase_insa_'+this.id);
	this.item5.setTitle("�λ�");
	this.addItem(this.item5);
	this.item6 = new nxPopupMenuItem('nxPopupBase_combat_'+this.id);
	this.item6.setTitle("����");
	this.addItem(this.item6);
	this.item7 = new nxPopupMenuItem('nxPopupBase_diplomacy_'+this.id);
	this.item7.setTitle("�ܱ�");
	this.addItem(this.item7);

	this.checkAccess=function()
	{
		if(this.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
		{
			this.item4.setDisable(true);
			this.item5.setDisable(true);	
			this.item6.setDisable(true);	
			this.item7.setDisable(true);	
		}
	}

	this.dialogCastle	= null;
	item.frmLayer.onclick=function()
	{
		if(this.NxControl.parent.dialogCastle)
			this.NxControl.parent.dialogCastle.unload();
		this.NxControl.parent.dialogCastle = new nxCastleInfoDialog('dialogCastle_'+this.NxControl.id, this.NxControl.parent.owner);
		this.NxControl.parent.dialogCastle.show();
	}
	this.dialogGeneral	= null;
	item2.frmLayer.onclick=function()
	{
		if(this.NxControl.parent.dialogGeneral)
			this.NxControl.parent.dialogGeneral.unload();
		this.NxControl.parent.dialogGeneral = new nxGeneralInfoDialog('dialogGeneral_'+this.NxControl.id
			, this.NxControl.parent.owner.n4CastleSN, this.NxControl.parent.owner.n4MasterSN, this.NxControl.parent.owner);
		this.NxControl.parent.dialogGeneral.show();
	}
	this.dialogFighter	= null;
	item3.frmLayer.onclick=function()
	{
		if(this.NxControl.parent.dialogFighter)
			this.NxControl.parent.dialogFighter.unload();
		this.NxControl.parent.dialogFighter = new nxGeneralInfoDialog('dialogFighter_'+this.NxControl.id
			, this.NxControl.parent.owner.n4CastleSN, 0, this.NxControl.parent.owner);
		this.NxControl.parent.dialogFighter.show();
	}
	
	this.item4.popupMenu = new popupMerchant('popupMerchant_'+this.id, owner);
	function popupMerchant(strLayerID, owner)
	{
		nxPopupMenu.apply(this, arguments);  
		this.setWidth(150);
		this.setHeight(100);
		var item = new nxPopupMenuItem('popupBuilding_riceBuy_'+this.id);
		item.setTitle("���� ����");
		this.addItem(item);
		var item2 = new nxPopupMenuItem('popupBuilding_riceSell'+this.id);
		item2.setTitle("���� �Ű�");
		this.addItem(item2);
				
		item.frmLayer.onclick=function()
    	{
    		if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxRiceMerchantDialog('nxRiceMerchantDialog_'+this.NxControl.parent.owner.id, this.NxControl.parent.owner, 0);
    		this.dlg.show();
    	}
		item2.frmLayer.onclick=function()
    	{
			if(this.dlg)
    			this.dlg.unload();
    		this.dlg = new nxRiceMerchantDialog('nxRiceMerchantDialog_'+this.NxControl.parent.owner.id, this.NxControl.parent.owner, 1);
    		this.dlg.show();
    	}
		
	}
	popupMerchant.prototype = new NxControl;
	popupMerchant.prototype.constructor = popupMerchant
	
	this.item5.popupMenu = new popupInsa('popupInsa_'+this.id, owner);
	this.item6.popupMenu = new popupCombat('popupCombat_'+this.id, owner);	
	this.item7.popupMenu = new popupDiplomacy('popupDiplomacy_'+this.id, owner);
	
	
}
nxPopupBase.prototype = new NxControl;
nxPopupBase.prototype.constructor = nxPopupBase

function popupDiplomacy(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.setWidth(150);
	this.setHeight(100);
	var item = new nxPopupMenuItem('popupBuilding_ally_'+this.id);
	item.setTitle("���Ϳ�û");
	this.addItem(item);
	var item2 = new nxPopupMenuItem('popupBuilding_breakAlly'+this.id);
	item2.setTitle("�����ı�");
	this.addItem(item2);
	var item3 = new nxPopupMenuItem('popupBuilding_friendly'+this.id);
	item3.setTitle("ģ��");
	this.addItem(item3);
	var item4 = new nxPopupMenuItem('popupBuilding_surrender'+this.id);
	item4.setTitle("�׺��ǰ�");
	this.addItem(item4);
	var item5 = new nxPopupMenuItem('popupBuilding_help'+this.id);
	item5.setTitle("������û");
	this.addItem(item5);
	
	item.frmLayer.onclick=function()
    {
		/*
		nxStatic.closePopup();
    	this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, this.NxControl.parent.owner, "��� ���ָ� �����ϼ���.", 3,1);
    	this.dlgNation.show();
    	this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    	{
    		dlg.unload();
    		if(!selectedItems)
				return;
    		building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    		building.strMasterName_target = selectedItems[0].row['strMasterName'];
    		this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    		this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    		this.dlg2.show();
    		this.dlg2.onsubmit = function(building, selectedItems)
			{
				if(!selectedItems)
					return;
				building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
				building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
				this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "���Ϳ�û", "���� �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterGold>10000?10000:nxStatic.gameUser.n4MasterGold);
    			this.dlgAmount.show();
    			this.dlgAmount.onsubmit = function(building, n4Value)
    			{
    				if(n4Value==0)
    					return;
    				
    				building.n4Value=n4Value;	
    				Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm);
    				function callBackDiplomacyConfirm(isTrue, building)
					{
						if(isTrue)
						{
							
							
							function callBackDiplomacy1(xml, strText, building)
							{
								Alert('callBackDiplomacy1_','�׵��� �츮�� ����� ������� ����� ���ڽ��ϴ�.');
							}
							var cmd = new nxCommand(null, building);
							cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
							cmd.addParam("n1DipType"			, 1);
							cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
							cmd.addParam("strMasterName"		, building.strMasterName_target);
							cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
							cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
							cmd.addParam("n4Gold"				, building.n4Value);
							//cmd.print();
							cmd.execute(callBackDiplomacy1);
							
						}
    				}
    				
    			}		
				
			}
    		
    		
    		
    	}
    	*/
    	mainMethod.nationAllyRequest();
    }
    
    item2.frmLayer.onclick=function()
    {
		/*
		nxStatic.closePopup();
    	this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, this.NxControl.parent.owner, "��� ���ָ� �����ϼ���.", 4,1);
    	this.dlgNation.show();
    	this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    	{
    		dlg.unload();
    		if(!selectedItems)
				return;
    		building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    		building.strMasterName_target = selectedItems[0].row['strMasterName'];
    		this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    		this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    		this.dlg2.show();
    		this.dlg2.onsubmit = function(building, selectedItems)
			{
				if(!selectedItems)
					return;
				building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
				building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
				Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm2);
    			function callBackDiplomacyConfirm2(isTrue, building)
				{
					if(isTrue)
					{
						function callBackDiplomacy2(xml, strText, building)
						{
							Alert('callBackDiplomacy2_','���� �� �׷��ôٸ� ��¿ �� ������.');
						}
						var cmd = new nxCommand(null, building);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
						cmd.addParam("n1DipType"			, 2);
						cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
						cmd.addParam("strMasterName"		, building.strMasterName_target);
						cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
						cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
						cmd.addParam("n4Gold"				, 0);
						//cmd.print();
						cmd.execute(callBackDiplomacy2);
							
					}
    			}	
				
			}
    	}
    	*/
    	mainMethod.nationAllyBreak();
    	
    }
    
    item3.frmLayer.onclick=function()
    {
		/*
		nxStatic.closePopup();
    	this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, this.NxControl.parent.owner, "��� ���ָ� �����ϼ���.", 2,1);
    	this.dlgNation.show();
    	this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    	{
    		dlg.unload();
    		if(!selectedItems)
				return;
    		building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    		building.strMasterName_target = selectedItems[0].row['strMasterName'];
    		this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    		this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    		this.dlg2.show();
    		this.dlg2.onsubmit = function(building, selectedItems)
			{
				if(!selectedItems)
					return;
				building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
				this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "ģ��", "���� �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterGold>10000?10000:nxStatic.gameUser.n4MasterGold);
    			this.dlgAmount.show();
    			this.dlgAmount.onsubmit = function(building, n4Value)
    			{
    				if(n4Value==0)
    					return;
    				building.n4Value=n4Value;	
    				building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
					building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
    				Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm3);
    				function callBackDiplomacyConfirm3(isTrue, building)
					{

							if(isTrue)
							{
								function callBackDiplomacy3(xml, strText, building)
								{
									Alert('callBackDiplomacy3_','�׷� �ٳ������ �ϰڽ��ϴ�.');
								}
								var cmd = new nxCommand(null, building);
								cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
								cmd.addParam("n1DipType"			, 3);
								cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
								cmd.addParam("strMasterName"		, building.strMasterName_target);
								cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
								cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
								cmd.addParam("n4Gold"				, building.n4Value);
								//cmd.print();
								cmd.execute(callBackDiplomacy3);
									
							}

    				}
    				
    			}		
				
			}
    	}
    	*/
    	mainMethod.nationFriendly();
    	
    }
	
	
	item4.frmLayer.onclick=function()
    {
		/*
		nxStatic.closePopup();
    	this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, this.NxControl.parent.owner, "��� ���ָ� �����ϼ���.", 2,1);
    	this.dlgNation.show();
    	this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    	{
    		dlg.unload();
    		if(!selectedItems)
				return;
    		building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    		building.strMasterName_target = selectedItems[0].row['strMasterName'];
    		this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    		this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    		this.dlg2.show();
    		this.dlg2.onsubmit = function(building, selectedItems)
			{
				if(!selectedItems)
					return;
				building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
				building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
				Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm4);
    			function callBackDiplomacyConfirm4(isTrue, building)
				{
					if(isTrue)
					{
						function callBackDiplomacy4(xml, strText, building)
						{
							Alert('callBackDiplomacy4_','���� �׺����� ���� ���Դϴ�.');
						}
						var cmd = new nxCommand(null, building);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
						cmd.addParam("n1DipType"			, 4);
						cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
						cmd.addParam("strMasterName"		, building.strMasterName_target);
						cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
						cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
						cmd.addParam("n4Gold"				, 0);
						//cmd.print();
						cmd.execute(callBackDiplomacy4);
							
					}
    			}	
				
			}
    	}
    	*/
    	mainMethod.nationRequestSurrender();
    	
    }
    
    item5.frmLayer.onclick=function()
    {
		/*
		nxStatic.closePopup();
    	this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, this.NxControl.parent.owner, "��� ���ָ� �����ϼ���.", 2,1);
    	this.dlgNation.show();
    	this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    	{
    		dlg.unload();
    		if(!selectedItems)
				return;
    		building.n4MasterSN_target = selectedItems[0].row['n4MasterSN'];
    		building.strMasterName_target = selectedItems[0].row['strMasterName'];
    		this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, building, building.n4CastleSN, building.n4MasterSN);
    		this.dlg2.strCaption = "������ �����ðڽ��ϱ�?";
    		this.dlg2.show();
    		this.dlg2.onsubmit = function(building, selectedItems)
			{
				if(!selectedItems)
					return;
				building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
				this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "������û", "������ �󸶳� ��û�Ͻðڽ��ϱ�?", nxStatic.gameUser.n4MasterGold>10000?10000:nxStatic.gameUser.n4MasterGold);
    			this.dlgAmount.show();
    			this.dlgAmount.onsubmit = function(building, n4Value)
    			{
    				if(n4Value==0)
    					return;
    				building.n4Value=n4Value;	
    				building.n4GeneralSN_sasin = selectedItems[0].row['n4GeneralSN'];	
					building.strGeneralName_sasin = selectedItems[0].row['strGeneralName'];	
    				Confirm(building, "����� �����ðڽ��ϱ�?" , callBackDiplomacyConfirm5);
    				function callBackDiplomacyConfirm5(isTrue, building)
					{

							if(isTrue)
							{
								function callBackDiplomacy5(xml, strText, building)
								{
									Alert('callBackDiplomacy5_',building.strMasterName_target+'���� �츮�� �����ֽ� ���Դϴ�.');
								}
								var cmd = new nxCommand(null, building);
								cmd.addParam("n1QueryID", nxStatic.n1QueryID_diplomacy_write);
								cmd.addParam("n1DipType"			, 5);
								cmd.addParam("n4MasterSN"			, building.n4MasterSN_target);
								cmd.addParam("strMasterName"		, building.strMasterName_target);
								cmd.addParam("n4GeneralSN"			, building.n4GeneralSN_sasin);
								cmd.addParam("strGeneralName"		, building.strGeneralName_sasin);
								cmd.addParam("n4Gold"				, building.n4Value);
								//cmd.print();
								cmd.execute(callBackDiplomacy5);
									
							}

    				}
    				
    			}		
				
			}
    	}
    	*/
    	mainMethod.nationHelpMe();
		
    }
    
    
}
popupDiplomacy.prototype = new NxControl;
popupDiplomacy.prototype.constructor = popupDiplomacy

function popupInsa(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.setWidth(150);
	this.setHeight(100);
	var item = new nxPopupMenuItem('search_'+this.id);
	item.setTitle("������");
	this.addItem(item);
	var item2 = new nxPopupMenuItem('prize_'+this.id);
	item2.setTitle("����");
	this.addItem(item2);
	var item3 = new nxPopupMenuItem('insa_'+this.id);
	item3.setTitle("�Ӹ�");
	this.addItem(item3);
	var item4 = new nxPopupMenuItem('cut_'+this.id);
	item4.setTitle("�ذ�");
	this.addItem(item4);
	
					
	item.frmLayer.onclick=function()
    {
		/*
    	nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this.NxControl, this.NxControl.parent.owner.n4CastleSN, 0);
    	this.NxControl.n4CastleSN = this.NxControl.parent.owner.n4CastleSN;
    	this.NxControl.n4MasterSN = this.NxControl.parent.owner.n4MasterSN;
    	this.dlg.strCaption = "������ ����Ͻðڽ��ϱ�?";
    	this.dlg.show();
    	this.dlg.onsubmit = function(menuItem, selectedItems)
		{
			if(!selectedItems)
					return;
			this.dlg2 = new nxGeneralSelectDialog('nxGeneralSelectDialogSasin_'+this.id, menuItem, menuItem.n4CastleSN, menuItem.n4MasterSN);
			menuItem.n4GerneralSN_target = selectedItems[0].row['n4GeneralSN'];
    		this.dlg2.strCaption = "�������� ��Ű�ڽ��ϱ�?";
    		this.dlg2.show();
    		this.dlg2.onsubmit = function(menuItem, selectedItems)
			{
				if(!selectedItems)
					return;
				if(nxStatic.mainContainer.GameUser.n4MasterGold<100)
				{
					Alert('insaAlert_'+menuItem.id, '���� �����մϴ�.');
					nxStatic.closeDialog();
					return;
				}
				
				var building = menuItem.parent.owner;
				var n4GerneralSN_target = menuItem.n4GerneralSN_target;
				var n4GerneralSN_sasin	= selectedItems[0].row['n4GeneralSN'];
				var cmd = new nxCommand(null, menuItem);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_insaRequest);
				cmd.addParam("n4CastleSN"		, building.n4CastleSN);
				cmd.addParam("n4GeneralSN"			, n4GerneralSN_sasin);
				cmd.addParam("n4GeneralSN_target"	, n4GerneralSN_target);
				//cmd.print();
				cmd.execute(callBackInsaRequest);
				function callBackInsaRequest(xml, strText, menuItem)
				{
					var ds = new NxDataSet(xml);
					var isOK					= ds.rows[0].get("isOK");
					var strGeneralName_target	= ds.rows[0].get("strGeneralName_target");
					var n1Point					= ds.rows[0].get("n1Point");
					nxStatic.closeDialog();
					
					if(isOK=='true')
						Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'��(��) ����ϴµ� �����Ͽ����ϴ�.');
					else if(n1Point<50)
						Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'��(��) ��ȣ�� �����Ͽ����ϴ�.');
					else if(n1Point<60)
						Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'�� ���� ���� �� ������ ���°� ���ϴ�.');
					else if(n1Point<70)
						Alert('callBackInsaRequest_'+menuItem.id, '�ƽ��Ե� '+ strGeneralName_target+'��(��) ����ϴµ� �����Ͽ����ϴ�.');
					else
						Alert('callBackInsaRequest_'+menuItem.id, strGeneralName_target+'��(��) ����ϴµ� �����Ͽ����ϴ�.');
				}
				
			}
		}
		*/
		mainMethod.insaRequest();
	}
	item2.frmLayer.onclick=function()
    {
		/*
		nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	if(nxStatic.mainContainer.GameUser.n4MasterRestSec>0)	
    	{
    		Alert('cant_'+this.NxControl.id,'���� �۾��� ������ �� �����ϴ�.');
    		return;    		
    	}	
    	this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this.NxControl, this.NxControl.parent.owner.n4CastleSN, this.NxControl.parent.owner.n4MasterSN, -1, 99);
    	this.NxControl.n4CastleSN = this.NxControl.parent.owner.n4CastleSN;
    	this.NxControl.n4MasterSN = this.NxControl.parent.owner.n4MasterSN;
    	this.dlg.strCaption = "�������� �ֽðڽ��ϱ�?";
    	this.dlg.n1SelectType = 2;
    	this.dlg.show();
    	
    	this.dlg.onsubmit = function(menuItem, selectedItems)
		{
			if(!selectedItems)
					return;
					
			var n4NeedGold = selectedItems.length*100;
			if(parseInt(nxStatic.gameUser.n4MasterGold)<n4NeedGold)
			{
				Alert('callBackInsaPrize_'+menuItem.id, '��('+addCommas(n4NeedGold)+')�� �����մϴ�.');
				return;
			}	
					
			var	arrGeneralSN = '';
    		for(var i=0;i<selectedItems.length;i++)
    		{
    			arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    		}
    		//alert(arrGeneralSN);
			
			var cmd = new nxCommand(null, menuItem);
			cmd.addParam("n1QueryID", nxStatic.n1QueryID_insaGeneralPrize);
			cmd.addParam("arrGeneralSN"	, arrGeneralSN);
			//cmd.print();
			cmd.execute(callBackInsaPrize);
			function callBackInsaPrize(xml, strText, menuItem)
			{
				nxStatic.mainContainer.GameUser.n4MasterRestSec = 300;
				Alert('callBackInsaPrize_'+menuItem.id, '������ �漺���� �ö����ϴ�.');
			}
			

		}
		*/
		mainMethod.generalPrize();
    }
    item3.frmLayer.onclick=function()
    {
		/*
		nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this.NxControl, this.NxControl.parent.owner.n4CastleSN, this.NxControl.parent.owner.n4MasterSN, -1);
    	this.NxControl.n4CastleSN = this.NxControl.parent.owner.n4CastleSN;
    	this.NxControl.n4MasterSN = this.NxControl.parent.owner.n4MasterSN;
    	this.dlg.strCaption = "������ �����Ͻðڽ��ϱ�?";
    	this.dlg.n1SelectType = 1;
    	this.dlg.show();
    	this.dlg.onsubmit = function(menuItem, selectedItems)
		{
			if(!selectedItems)
					return;
    		var n4GeneralSN = selectedItems[0].row['n4GeneralSN'];
   			this.dlg2 = new nxSetGeneralDialog('nxSetGeneralDialog_'+menuItem.id, menuItem, n4GeneralSN);
   			this.dlg2.show();
   			this.dlg2.onsubmit = function(menuItem, n4GeneralSN, strSelectedValue)
			{
   				
				var cmd = new nxCommand(null, menuItem);
				cmd.addParam("n1QueryID", nxStatic.n1QueryID_GeneralUpdate);
				cmd.addParam("n4GeneralSN"	, n4GeneralSN);
				cmd.addParam("n1Grade"	, strSelectedValue);
				//cmd.print();
				cmd.execute(callBackGeneralUpdate);
				function callBackGeneralUpdate(xml, strText, menuItem)
				{
					Alert('callBackGeneralUpdate_'+menuItem.id, '������ ������ ����Ǿ����ϴ�.');
				}
				
			}

		}
		*/
		mainMethod.insaModify();
    }
    item4.frmLayer.onclick=function()
    {
		/*
    	nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.dlg = new nxGeneralSelectDialog('nxGeneralSelectDialog_'+this.id, this.NxControl, this.NxControl.parent.owner.n4CastleSN, this.NxControl.parent.owner.n4MasterSN, -1);
    	this.NxControl.n4CastleSN = this.NxControl.parent.owner.n4CastleSN;
    	this.NxControl.n4MasterSN = this.NxControl.parent.owner.n4MasterSN;
    	this.dlg.strCaption = "������ �ذ��Ͻðڽ��ϱ�?";
    	this.dlg.show();
    	this.dlg.onsubmit = function(menuItem, selectedItems)
		{
			if(!selectedItems)
					return;
					
			Confirm(selectedItems, '�ٽ��ѹ� �������ֽʽÿ�.<BR>���� �ذ��Ͻðڽ��ϱ�?', cutcut);
			function cutcut(isTrue, selectedItems)
			{
				if(isTrue)
				{
					function callBackInsaCut(xml, strText, menuItem)
					{
						Alert('callBackInsaCut', '�ذ��Ͽ����ϴ�.');
					}
					var n4GerneralSN_target = selectedItems[0].row["n4GeneralSN"];
					var cmd = new nxCommand(null, selectedItems);
					cmd.addParam("n1QueryID", nxStatic.n1QueryID_insaCut);
					cmd.addParam("n4GeneralSN_target"	, n4GerneralSN_target);
					//cmd.print();
					cmd.execute(callBackInsaCut);
					
				}
			}

		}
		*/
		mainMethod.insaFire();
	}
	
}
popupInsa.prototype = new NxControl;
popupInsa.prototype.constructor = popupInsa


function popupCombat(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.setWidth(150);
	this.setHeight(100);
	var item = new nxPopupMenuItem('combat_'+this.id);
	item.setTitle("�δ���");
	this.addItem(item);
	var item2 = new nxPopupMenuItem('prize_'+this.id);
	item2.setTitle("�Ʒ�");
	this.addItem(item2);
	var item3 = new nxPopupMenuItem('training_'+this.id);
	item3.setTitle("�⺴");
	this.addItem(item3);
	var item4 = new nxPopupMenuItem('tobal_'+this.id);
	item4.setTitle("���");
	this.addItem(item4);
	var item5 = new nxPopupMenuItem('move_'+this.id);
	item5.setTitle("�̵�");
	this.addItem(item5);
	
	item.frmLayer.onclick=function()
    {
		/*
    	nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.NxControl.n4KingSN = this.NxControl.parent.owner.n4KingSN;
    	this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, this.NxControl,null,null,this.NxControl.parent.owner.n4CastleSN);
    	this.dlg.show();
    	this.dlg.onsubmit = function(menuItem, selectedItems)
		{
			if(!selectedItems)
					return;
			var n1ArmyStatus = parseInt(selectedItems[0].row['n1ArmyStatus']);
			if(n1ArmyStatus>1)
			{
				Alert('n1ArmyStatus_fail','�������� �δ��Դϴ�.');
				return;
			}
			this.dlg2 = new nxArmyModifyDialog('nxArmyModifyDialog_'+this.id, menuItem, selectedItems[0].row['n4GeneralSN'],menuItem.n4KingSN);
    		this.dlg2.show();
    		this.dlg2.onsubmit = function(menuItem)
			{
				menuItem.frmLayer.dlg.hide();
				menuItem.frmLayer.dlg.unload();
				menuItem.frmLayer.onclick();
			}
			
		}
		*/
		mainMethod.setArmy();
	}
	item2.frmLayer.onclick=function()
    {
		/*
    	nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, this.NxControl, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, this.NxControl.parent.owner.n4CastleSN);
    	this.dlg.n1SelectType = 2;
    	this.dlg.button.setTitle('�Ʒ�');
    	this.dlg.show();
    	this.dlg.onsubmit = function(menuItem, selectedItems, dialogControl)
		{
			if(!selectedItems)
					return;
			var	arrGeneralSN = '';
    		for(var i=0;i<selectedItems.length;i++)
    		{
    			arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    		}
    		
    		function callBack_n1QueryID_combat_armyTrainingStart(xml, strText, dialogControl)
    		{
    			dialogControl.unload();
    			Alert('callBack_n1QueryID_combat_armyTrainingStart','�Ʒ��� ���۵Ǿ����ϴ�.');
    		}
			var cmd = new nxCommand(null, dialogControl);
			cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_armyTrainingStart);
			cmd.addParam("arrGeneralSN", arrGeneralSN);
			cmd.execute(callBack_n1QueryID_combat_armyTrainingStart);
			
		}
		*/
		mainMethod.armyTraining();
	}
	
	item3.frmLayer.onclick=function()
    {
		/*
    	nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, this.NxControl.parent.owner, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, this.NxControl.parent.owner.n4CastleSN, 1);
    	this.dlg.n1SelectType = 2;
    	this.dlg.button.setTitle('Ȯ��');
    	this.dlg.strCaption = "������"
    	this.dlg.show();
    	this.dlg.onsubmit = function(building, selectedItems, dialogControl)
		{
			if(!selectedItems)
					return;
			var	arrGeneralSN = '';
    		for(var i=0;i<selectedItems.length;i++)
    		{
    			arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    		}
    		dialogControl.unload()
    		building.arrGeneralSN = arrGeneralSN;
    		this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� �����մϱ�?",5,1);
    		this.dlgNation.show();
    		this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    		{
    			dlg.unload();
    			if(!selectedItems)
					return;
    			building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    			this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "����", "������ �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterRice);
    			this.dlgAmount.show();
    			this.dlgAmount.onsubmit = function(building, n4Value)
    			{
    				if(n4Value==0)
    					return;
    				building.n4Value=n4Value;	
    				Confirm(building, "���� �⺴�Ͻðڽ��ϱ�?" , callBackCombatConfirm);
    				function callBackCombatConfirm(isTrue, building)
					{
						if(isTrue)
						{
							function callBackChulbyung(xml, strText, menuItem)
							{
								Alert('callBackChulbyung_','�⺴�Ͽ����ϴ�.');
							}
							var cmd = new nxCommand(null, building);
							cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_KundanCreate);
							cmd.addParam("arrGeneralSN"	, building.arrGeneralSN);
							cmd.addParam("n4RiceAmount"				, building.n4Value);
							cmd.addParam("n4BuildingSN"		, building.n4BuildingSN_target);
							//cmd.print();
							cmd.execute(callBackChulbyung);
							
							
						}
    				}
    			}
    			
    		}
			
		}
		*/
		mainMethod.combatStart();
	}
	
	item4.frmLayer.onclick=function()
    {
		/*
    	nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, this.NxControl.parent.owner, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, this.NxControl.parent.owner.n4CastleSN, 1);
    	this.dlg.n1SelectType = 2;
    	this.dlg.button.setTitle('Ȯ��');
    	this.dlg.strCaption = "������"
    	this.dlg.show();
    	this.dlg.onsubmit = function(building, selectedItems, dialogControl)
		{
			if(!selectedItems)
					return;
			var	arrGeneralSN = '';
    		for(var i=0;i<selectedItems.length;i++)
    		{
    			arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    		}
    		dialogControl.unload()
    		building.arrGeneralSN = arrGeneralSN;
    		this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "��� �����մϱ�?",1,0);
    		this.dlgNation.show();
    		this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    		{
    			dlg.unload();
    			if(!selectedItems)
					return;
    			building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    			this.dlgAmount = new nxAmountDialog('nxAmountDialog_'+this.id, building, "����", "������ �󸶳� �������ðڽ��ϱ�?", nxStatic.gameUser.n4MasterRice);
    			this.dlgAmount.show();
    			this.dlgAmount.onsubmit = function(building, n4Value)
    			{
    				if(n4Value==0)
    					return;
    				building.n4Value=n4Value;	
    				Confirm(building, "���� �⺴�Ͻðڽ��ϱ�?" , callBackCombatConfirm);
    				function callBackCombatConfirm(isTrue, building)
					{
						if(isTrue)
						{
							function callBackChulbyung(xml, strText, menuItem)
							{
								Alert('callBackChulbyung_','�⺴�Ͽ����ϴ�.');
							}
							var cmd = new nxCommand(null, building);
							cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_KundanCreate);
							cmd.addParam("arrGeneralSN"	, building.arrGeneralSN);
							cmd.addParam("n4RiceAmount"				, building.n4Value);
							cmd.addParam("n4BuildingSN"		, building.n4BuildingSN_target);
							//cmd.print();
							cmd.execute(callBackChulbyung);
							
							
						}
    				}
    			}
    			
    		}
			
		}  */
		mainMethod.pveStart();
	}
	
	item5.frmLayer.onclick=function()
    {
		/*
    	nxStatic.closePopup();
    	if(this.dlg)
    		this.dlg.unload();
    	this.dlg = new nxArmySelectDialog('nxArmySelectDialog_'+this.id, this.NxControl.parent.owner, nxStatic.n1CodeArmyStatus_rest,nxStatic.n1CodeWorking_rest, this.NxControl.parent.owner.n4CastleSN, 0);
    	this.dlg.n1SelectType = 2;
    	this.dlg.button.setTitle('Ȯ��');
    	this.dlg.strCaption = "������ �̵���Ű�ڽ��ϱ�?"
    	this.dlg.show();
    	this.dlg.onsubmit = function(building, selectedItems, dialogControl)
		{
			if(!selectedItems)
					return;
			var	arrGeneralSN = '';
    		for(var i=0;i<selectedItems.length;i++)
    		{
    			arrGeneralSN+=selectedItems[i].row['n4GeneralSN']+',';
    		}
    		dialogControl.unload()
    		building.arrGeneralSN = arrGeneralSN;
    		this.dlgNation = new nxNationSelectDialog('nxNationSelectDialog_'+this.id, building, "���� �̵��մϱ�?",6);
    		this.dlgNation.show();
    		this.dlgNation.onsubmit = function(building, selectedItems, dlg)
    		{
    			dlg.unload();
    			if(!selectedItems)
					return;
					
				building.n4BuildingSN_target = selectedItems[0].row['n4BuildingSN'];
    			Confirm(building, "���õ� ����� �δ븦 �̵���Ű�ڽ��ϱ�?" , callBackCombatConfirm);
    			function callBackCombatConfirm(isTrue, building)
				{
					if(isTrue)
					{
						
						function callBackChulbyung(xml, strText, menuItem)
						{
							Alert('callBackChulbyung_','����Ͽ����ϴ�.');
						}
						var cmd = new nxCommand(null, building);
						cmd.addParam("n1QueryID", nxStatic.n1QueryID_combat_KundanCreate);
						cmd.addParam("arrGeneralSN"	, building.arrGeneralSN);
						cmd.addParam("n4RiceAmount"				, 0);
						cmd.addParam("n4BuildingSN"		, building.n4BuildingSN_target);
						//cmd.print();
						cmd.execute(callBackChulbyung);
						
						
					}
    			}
    			
    		}
			
		}
		*/
		mainMethod.armyMove();
	}
	
}
popupCombat.prototype = new NxControl;
popupCombat.prototype.constructor = popupCombat


function nxPopupField(strLayerID, owner)
{
	
	nxPopupMenu.apply(this, arguments);  
	if(!strLayerID)
		return;
	
	this.setWidth(150);
	this.setHeight(100);

	var item = new nxPopupMenuItem('nxPopupField_create_'+this.id, owner );
	item.setTitle("�Ǽ�");
	this.addItem(item);
	/*
	var item2 = new nxPopupMenuItem('nxPopupField_move_'+this.id, owner);
	item2.setTitle("��������");
	this.addItem(item2);
	var item3 = new nxPopupMenuItem('nxPopupField_info_'+this.id, owner);
	item3.setTitle("���");
	this.addItem(item3);
	//region popupBuilding
	item3.popupMenu = new popupSystem('popupSystem_'+this.id, owner);
	function popupSystem(strLayerID, owner)
	{
		nxPopupMenu.apply(this, arguments);  
		this.setWidth(150);
		this.setHeight(100);
		this.item = new nxPopupMenuItem('popupBuilding_farm_'+this.id, owner);
		this.item.setTitle("�ý��� ����");
		this.addItem(this.item);
		this.item2 = new nxPopupMenuItem('popupBuilding_horse'+this.id, owner);
		this.item2.setTitle("����");
		this.addItem(this.item2);
		
		this.item.frmLayer.onclick=function()
		{
			nxStatic.ignoreControlID = true;//��ü �ߺ��� ��� Ǯ���ְ� �ݹ鿡�� �ٽ� �����ش�.
			nxStatic.closePopup();
			nxStatic.mainContainer.n4StartCellX = 5;
			nxStatic.mainContainer.n4StartCellY = 5;
			nxStatic.mainContainer.clear();
			nxStatic.mainContainer.loadBuildings();
		}
		
		
		
	}
	popupBuilding.prototype = new NxControl;
	popupBuilding.prototype.constructor = popupBuilding
	*/

	
	
	//region popupBuilding
	item.popupMenu = new popupBuilding('popupBuilding_'+this.id, owner);
	function popupBuilding(strLayerID, owner)
	{
		nxPopupMenu.apply(this, arguments);  
		this.setWidth(150);
		this.setHeight(100);
		var item = new nxPopupMenuItem('popupBuilding_farm_'+this.id);
		item.setTitle("����");
		this.addItem(item);
		var item2 = new nxPopupMenuItem('popupBuilding_horse'+this.id);
		item2.setTitle("������");
		this.addItem(item2);
		var item3 = new nxPopupMenuItem('popupBuilding_arm'+this.id);
		item3.setTitle("���尣");
		this.addItem(item3);
		var item4 = new nxPopupMenuItem('popupBuilding_blackSmith'+this.id);
		item4.setTitle("����");
		this.addItem(item4);
		var item5 = new nxPopupMenuItem('popupBuilding_tower'+this.id);
		item5.setTitle("�ó�");
		this.addItem(item5);
		
		//-���� ����
		var item6 = new nxPopupMenuItem('popupBuilding_Castle'+this.id);
		item6.setTitle("��ä");
		var item7 = new nxPopupMenuItem('popupBuilding_Kangjok'+this.id);
		item7.setTitle("��������");
		var item8 = new nxPopupMenuItem('popupBuilding_HwangKun'+this.id);
		item8.setTitle("Ȳ��������");
		var item9 = new nxPopupMenuItem('popupBuilding_HyungNo'+this.id);
		item9.setTitle("���������");
		var item10 = new nxPopupMenuItem('popupBuilding_CrossArmy'+this.id);
		item10.setTitle("���ڱ����");
		if(nxStatic.isAdmin())
		{
			this.addItem(item6);
			this.addItem(item7);
			this.addItem(item9);
			this.addItem(item8);
			this.addItem(item10);
			
		}
		//--//
		
		item.frmLayer.onclick=function()
    	{
    		nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_Farm, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
		item2.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_Horse, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
		item3.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_BlackSM, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
		item4.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_Barrack, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
		item5.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_Tower, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
    	
    	item6.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_Castle, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
    	item7.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_Kangjok, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
    	item8.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_HwangKun, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
    	item9.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_Hyungno, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
		item10.frmLayer.onclick=function()
    	{
			nxStatic.mainContainer.createBuildingRequest(nxStatic.n4BuildingCode_CrossArmy, this.NxControl.parent.owner.getCellX(), this.NxControl.parent.owner.getCellY(), this.NxControl.parent.owner);
			nxStatic.closePopup();
    	}
	}
	popupBuilding.prototype = new NxControl;
	popupBuilding.prototype.constructor = popupBuilding
	//endregion popupBuilding



}
nxPopupField.prototype = new NxControl;
nxPopupField.prototype.constructor = nxPopupField


function nxPopupNormalBuilding(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.style.border	= "";
	this.setBG('');

	this.setWidth(150);
	this.setHeight(100);

	this.item = new nxPopupMenuItem('nxPopup_produce_'+this.id);
	this.item.setTitle("����");
	if(owner.n4BuildingCode!=2 && owner.n4BuildingCode!=6)
		this.addItem(this.item);
	this.item3 = new nxPopupMenuItem('nxPopup_upgrade_'+this.id);
	this.item3.setTitle("���׷��̵�");
	this.addItem(this.item3);

	if(owner.n4BuildingCode==4)
	{
		this.item4 = new nxPopupMenuItem('nxPopup_inchant_'+this.id);
		this.item4.setTitle("����");
		this.addItem(this.item4);
	}

	this.item2 = new nxPopupMenuItem('nxPopup_destruct_'+this.id);
	this.item2.setTitle("ö��");
	this.addItem(this.item2);

	

	this.checkAccess=function()
	{
		if(this.owner.n4MasterSN!=nxStatic.gameUser.n4MasterSN)
		{
			this.item2.setDisable(true);
			if(owner.n4BuildingCode!=2 && owner.n4BuildingCode!=6)
			{
				this.item3.setDisable(true);
				this.item.setTitle("����");
			}
			else
			{
				this.item3.setTitle("����");
			}
		}
	}

	this.dialogInfo	= null;
	this.item.frmLayer.onclick=function()
	{
		var objBuilding = this.NxControl.parent.owner;
		if(this.NxControl.parent.dialogInfo)
			this.NxControl.parent.dialogInfo.unload();

		if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Farm)
			this.NxControl.parent.dialogInfo = new nxFarmInfoDialog('nxFarmInfoDialog_'+this.NxControl.id, objBuilding,1);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Horse)
			this.NxControl.parent.dialogInfo = new nxHorseInfoDialog('nxHorseInfoDialog_'+this.NxControl.id, objBuilding,1);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_BlackSM)
			this.NxControl.parent.dialogInfo = new nxBlackSMDialog('nxBlackSMDialog_'+this.NxControl.id, objBuilding,1);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Barrack)
			this.NxControl.parent.dialogInfo = new nxBarrackDialog('nxBarrackDialog_'+this.NxControl.id, objBuilding,1);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Tower)
			this.NxControl.parent.dialogInfo = new nxTowerInfoDialog('nxTowerInfoDialog_'+this.NxControl.id, objBuilding,1);
		
		this.NxControl.parent.dialogInfo.show();
	}
	this.item3.frmLayer.onclick=function()
	{
		var objBuilding = this.NxControl.parent.owner;
		if(this.NxControl.parent.dialogInfo)
			this.NxControl.parent.dialogInfo.unload();

		if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Farm)
			this.NxControl.parent.dialogInfo = new nxFarmInfoDialog('nxFarmInfoDialog_'+this.NxControl.id, objBuilding,2);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Horse)
			this.NxControl.parent.dialogInfo = new nxHorseInfoDialog('nxHorseInfoDialog_'+this.NxControl.id, objBuilding,2);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_BlackSM)
			this.NxControl.parent.dialogInfo = new nxBlackSMDialog('nxBlackSMDialog_'+this.NxControl.id, objBuilding,2);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Barrack)
			this.NxControl.parent.dialogInfo = new nxBarrackDialog('nxBarrackDialog_'+this.NxControl.id, objBuilding,2);
		else if(objBuilding.n4BuildingCode==nxStatic.n4BuildingCode_Tower)
			this.NxControl.parent.dialogInfo = new nxTowerInfoDialog('nxTowerInfoDialog_'+this.NxControl.id, objBuilding,2);
		
		this.NxControl.parent.dialogInfo.show();
	}
	this.item2.frmLayer.onclick=function()
	{
		var building = this.NxControl.parent.owner
		mainMethod.requestDistruct(building.n4BuildingSN);
	}

	if(this.item4)
	{
		this.item4.frmLayer.onclick=function()
		{
			
			var objBuilding = this.NxControl.parent.owner;
			/*
			if(this.NxControl.parent.dialogInfo)
				this.NxControl.parent.dialogInfo.unload();

			this.NxControl.parent.dialogInfo = new nxSmithInfoDialog('nxSmithInfoDialog_'+this.NxControl.id, objBuilding);
			this.NxControl.parent.dialogInfo.show();
			*/
			mainMethod.buildingInchant(objBuilding.n4BuildingSN);
		}
	}

}
nxPopupNormalBuilding.prototype = new NxControl;
nxPopupNormalBuilding.prototype.constructor = nxPopupNormalBuilding



function nxPopupNpcBuilding(strLayerID, owner)
{
	nxPopupMenu.apply(this, arguments);  
	this.style.border	= "";
	this.setBG('');

	this.setWidth(150);
	this.setHeight(100);

	this.item = new nxPopupMenuItem('nxPopup_info_'+this.id);
	this.item.setTitle("����");
	this.addItem(this.item);
	this.item2 = new nxPopupMenuItem('nxPopup_destruct_'+this.id);
	this.item2.setTitle("ö��");
	this.addItem(this.item2);

	this.checkAccess=function()
	{
		if(!nxStatic.isAdmin())
		{
			this.item2.setDisable(true);
		}
	}

	this.dialogInfo	= null;
	this.item.frmLayer.onclick=function()
	{
		if(this.NxControl.parent.dialogNpc)
			this.NxControl.parent.dialogNpc.unload();
		this.NxControl.parent.dialogNpc = new nxNpcCastleInfoDialog('dialogCastle_'+this.NxControl.id, this.NxControl.parent.owner);
		this.NxControl.parent.dialogNpc.show();
	
	}
	this.item2.frmLayer.onclick=function()
	{
		
		var building = this.NxControl.parent.owner
		mainMethod.requestDistruct(building.n4BuildingSN);
		
	}

}
nxPopupNpcBuilding.prototype = new NxControl;
nxPopupNpcBuilding.prototype.constructor = nxPopupNpcBuilding



function nxPopupMenuItem(strLayerID)
{
	nxMenuItem.apply(this, arguments);
	this.style.border= "1px solid #FCEEEE";
	this.setWidth(150);
	this.setHeight(25);
	this.setFontSize(15);
	this.setColor('white');
	this.src = 'http://nexen.pe.kr/img/button/btn_base.png';
	this.srcMouseOver	= 'http://nexen.pe.kr/img/button/btn_base02.png';
	this.srcMouseOut	= 'http://nexen.pe.kr/img/button/btn_base.png';

	this.hide = function()
	{
		this._hide();
		if(this.popupMenu)
			this.popupMenu.hide();
	}
}
nxPopupMenuItem.prototype = new NxControl();
nxPopupMenuItem.prototype.constructor = nxPopupMenuItem;
