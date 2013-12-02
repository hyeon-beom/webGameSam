
var nxGameMain = new function _nxGameMain()
{
	this.gameGround = null;
	this.playUnit	= null;
	this.GUI		= null;
	this.arrGameGround = new Array();
	this.start=function(strLocationID)
	{
		var strLocationID = strLocationID?strLocationID:"nxGameGround_hyungno_00";
		if(!this.arrGameGround[strLocationID])
		{
			this.gameGround = eval("new "+strLocationID+"(strLocationID, this.getPlayerUnit()) "  );
			this.gameGround.init();
			this.arrGameGround[strLocationID] = this.gameGround;
		}
		else
		{
			this.getPlayerUnit();
			this.gameGround = this.arrGameGround[strLocationID];
			this.gameGround.playUnit = this.playUnit;
			this.gameGround.addUnit(this.playUnit);
		}
		this.gameGround.show();	
		this.loadGUI();
	}
	this.getPlayerUnit=function()
	{
		var strUnitID = "p1";
		if(!this.playUnit)
		{
			this.playUnit = new nxWarriorUnit(strUnitID, false, 1);//nxWarriorUnit("p1", false, 1);
			this.playUnit.isMyUnit=true;//!!
			this.playUnit.setTop(250);
			this.playUnit.setLeft(50);
		}
		this.playUnit.show();
				
		return this.playUnit;
		
		strUnitID = "p2";
		if(!this.nxUnitCollection.units[strUnitID])
		{
			var wizard = new nxWarriorUnit(strUnitID, true, 1);//nxWizardUnit
			this.imgBG.add(wizard);
			wizard.setTop(200);
			wizard.show();
		}
		
	}
	this.loadGUI=function()
	{
		if(this.GUI==null)
		{
			this.GUI = new nxGameGUI('GUI',this.gameGround.getWidth(), this.gameGround.getHeight());
			this.gameGround.add(this.GUI);
			this.GUI.show();
		}
		else
			this.gameGround.add(this.GUI);//add�� ���ٷ� ó������ ���� ���� GUI�� show �̺�Ʈ ����
		this.GUI.setLayerIndex(nxGameLayer.n4LayerIndex_GUI);
	}
	this.doLater=function(strMethod, interval, strID)
	{	
		setTimeout("nxGameMain."+strMethod, interval);	
	}
	
	if(document.all)
		alert("�˼��մϴ�. MS ���ͳ� �ͽ��÷η������� ���ɹ����� ���� ȿ���� ����� �� �����ϴ�.\n\n����ũ�� Ȥ�� ���̾������� ���� �ٸ� ������ �̿�� ���� ȿ�� ����� �����մϴ�.");
	
}

