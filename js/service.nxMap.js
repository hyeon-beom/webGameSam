
function nxMap(strLayerID)
{
	NxControl.apply(this, arguments);
	if(!strLayerID)
		return;
	
	this.setLeft(50);
	this.setTop(50);
	this.setWidth(300);
	this.setHeight(300);
	
	this.mapMaxCellX = 2400;
	this.mapMaxCellY = 2400;
	this.n1Double = this.mapMaxCellX/this.getWidth();
	
	this.arrObjects = new Array();
	 

	this.src = 'http://nexen.pe.kr/img/map_mini.jpg';
	this.setLayerIndex(nxLayer.n4Layer_Map);
	
	this.bWidth = this.n1Double;
	this.bHeight= this.n1Double;
	this.boxSelection = new NxControl('boxSelection');
	this.add(this.boxSelection);
	this.boxSelection.show();
	this.boxSelection.setLayerIndex(nxLayer.n4Layer_Map+1);
	this.boxSelection.setBG('');
	this.boxSelection.setWidth(this.bWidth+3);
	this.boxSelection.setHeight(this.bHeight+3);
	this.boxSelection.style.border= "1px solid red";
	this.isCastleOver = false;
	
	
	this.mX=0;
	this.mY=0;
	this.bX=0;
	this.bY=0;
	this.frmLayer.onmousedown=function()
	{
		var x = this.NxControl.mX-this.NxControl.getLeft();
		var y = this.NxControl.mY-this.NxControl.getTop();
		this.NxControl.bX = x-(this.NxControl.boxSelection.getWidth()/2);
		this.NxControl.bY = y-(this.NxControl.boxSelection.getHeight()/2);
		this.NxControl.bX = this.NxControl.bX>0?this.NxControl.bX:0;
		this.NxControl.bY = this.NxControl.bY>0?this.NxControl.bY:0;
		
		
		if(!this.NxControl.isCastleOver && this.NxControl.bY>20)
			this.NxControl.setFocus(this.NxControl.bX, this.NxControl.bY);
		
	}
	this.goHome=function()
	{
		nxStatic.ignoreControlID = true;//개체 중복을 잠시 풀어주고 콜백에서 다시 막아준다.
		nxStatic.closePopup();
		nxStatic.mainContainer.n4StartCellX = parseInt(nxStatic.gameUser.n4RegionStartX-3);
		nxStatic.mainContainer.n4StartCellY = parseInt(nxStatic.gameUser.n4RegionStartY);
		this.setFocus2();
		nxStatic.mainContainer.loadBuildings();
	}
	this.setFocus=function(bX, bY)
	{
		this.bX=bX;
		this.bY=bY;
		this.boxSelection.setLeft(bX);
		this.boxSelection.setTop(bY);
		
		nxStatic.ignoreControlID = true;//개체 중복을 잠시 풀어주고 콜백에서 다시 막아준다.
		nxStatic.closePopup();
		nxStatic.mainContainer.n4StartCellX = parseInt((bX*this.n1Double)-7);
		nxStatic.mainContainer.n4StartCellY = parseInt((bY*this.n1Double)-2);
		//nxStatic.mainContainer.clear();
		nxStatic.mainContainer.loadBuildings();
	}
	this.setFocus2=function()
	{
		var X = parseInt(nxStatic.mainContainer.n4StartCellX / this.n1Double);
		var Y = parseInt(nxStatic.mainContainer.n4StartCellY / this.n1Double);
		this.boxSelection.setLeft(X);
		this.boxSelection.setTop(Y);
	}
	this.frmLayer.onmousemove = function(e)
	{
		if(!document.all)
		{
			this.NxControl.mX = e.pageX;
			this.NxControl.mY = e.pageY;
		}
		else
		{
			this.NxControl.mX = event.clientX;
			this.NxControl.mY = event.clientY;
		}
	}
	
	this.LoadMiniMapBuilding=function()
	{
	
		function callBackloadMiniMapBuildings(xml, strText, owner)
		{
			var ds = new NxDataSet(xml);
			for(var i=0;i<ds.rows.length;i++)
			{
				var x			 = ds.rows[i].get("n4CellX");
				var y			 = ds.rows[i].get("n4CellY");
				var n4BuildingSN = ds.rows[i].get("n4BuildingSN");
				var n4BuildingCode	= parseInt(ds.rows[i].get("n4BuildingCode"));
				var n4MasterSN		= ds.rows[i].get("n4MasterSN");
				var n4CastleSN		= ds.rows[i].get("n4CastleSN");
				var colorUser		= ds.rows[i].get("colorUser");
				
				if(n4BuildingCode<=1)
				{
					var strIconID = 'mapBuilding_'+n4BuildingSN;
					var building = null;
					if(document.getElementById(strIconID))
						building = document.getElementById(strIconID).NxControl;
					else
						building = new NxControl('mapBuilding_'+n4BuildingSN);
					
					building.n4MasterSN		= n4MasterSN;
					building.n4BuildingSN	= n4BuildingSN;
					building.setLeft(parseInt(x/owner.n1Double));
					building.setTop(parseInt(y/owner.n1Double));
					building.setLayerIndex(nxLayer.n4Layer_Map+1);
					building.n4CellX = x;
					building.n4CellY = y;
					building.style.cursor = 'pointer';
					
					building.setBG(colorUser);
					if(n4BuildingCode==0)
					{
						building.setWidth(10);
						building.setHeight(10);
						var strMasterName = n4MasterSN==1?'중립':ds.rows[i].get("strMasterName");
						building.setAlt(ds.rows[i].get("strCastleName")+":"+strMasterName);
						owner.add(building);
						building.show();
						building.frmLayer.onclick=function()
						{
							var building = this.NxControl;
							var x = parseInt(building.getLeft());//-(nxStatic.mainContainer.map.bWidth/2);
							var y = parseInt(building.getTop());//-(nxStatic.mainContainer.map.bHeight/2);
							nxStatic.mainContainer.map.setFocus(x,y);
								
							if(this.NxControl.n4MasterSN==nxStatic.gameUser.n4MasterSN)
							{
								mainMethod.gotoBuilding3(this.NxControl.n4BuildingSN, true);
							}
						}
					}
					else if(n4BuildingCode==1 && n4MasterSN==nxStatic.gameUser.n4MasterSN)
					{
						building.setWidth(8);
						building.setHeight(8);
						building.setAlt('본진('+ds.rows[i].get("strCastleName")+'):'+ds.rows[i].get("strMasterName"));
						owner.add(building);
						building.show();
						building.frmLayer.onclick=function()
						{
							nxStatic.mainContainer.map.goHome();
							if(this.NxControl.n4MasterSN==nxStatic.gameUser.n4MasterSN)
							{
								mainMethod.gotoBuilding3(this.NxControl.n4BuildingSN, true);
							}
						}
					}
					
					
					
					
					building.frmLayer.onmouseover=function()
					{
						nxStatic.mainContainer.map.isCastleOver=true;
					}
					building.frmLayer.onmouseout=function()
					{
						nxStatic.mainContainer.map.isCastleOver=false;
					}

					
					owner.arrObjects[i]=building;
				}
			}
		}
		var cmd = new nxCommand(null,this);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetListBuilding);
		cmd.addParam("n4StartCellX", 0);
		cmd.addParam("n4StartCellY", 0);
		cmd.addParam("n4EndCellX", this.mapMaxCellX);
		cmd.addParam("n4EndCellY", this.mapMaxCellY);
		cmd.addParam("isUseMiniMap", 1);
		cmd.addParam("n4MasterSN", nxStatic.gameUser.n4MasterSN);
				
		
		cmd.execute(callBackloadMiniMapBuildings);
	}
	this.LoadMiniMapBuilding();
	
	this.clear=function()
	{
		for(var i=0;i<this.arrObjects.length;i++)
		{
			this.arrObjects[i].unload();
		}
	}
	
	
	//--드래그앤 드랍
	this.barTitle = new NxControl('barTitle');
	this.barTitle.setBG('#590d0d');
	this.barTitle.setWidth(this.getWidth());
	this.barTitle.setHeight(20);
	this.barTitle.setLayerIndex(nxLayer.n4Layer_Map+11);
	this.barTitle.show();
	this.add(this.barTitle);
	this.barTitle.frmLayer.style.cursor='pointer';
	this.isDragStart = false;
	function downHandler(e)
	{
		nxStatic.mainContainer.map.isDragStart = true;
	}
	function upHandler(e)
	{
		nxStatic.mainContainer.map.isDragStart = false;
	}
	function moveHandler(e)
	{
		if(nxStatic.mainContainer.map.isDragStart)
		{
			nxStatic.mainContainer.map.setLeft(document.dX-nxStatic.mainContainer.map.bX);
			nxStatic.mainContainer.map.setTop(document.dY-nxStatic.mainContainer.map.bY);
		}
	}
	if(document.all)
	{
		this.barTitle.frmLayer.attachEvent("onmousedown", downHandler);
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
nxMap.prototype = new NxControl();
nxMap.prototype.constructor = nxMap;

