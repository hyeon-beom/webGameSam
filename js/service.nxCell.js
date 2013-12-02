function nxMainContainer(strLayerID, n4Width, n4Height, n4MasterSN,n4StartCellX,n4StartCellY)
{
	NxControl.apply(this, arguments);
	
	nxStatic.mainContainer = this;

	this.n4Width		= n4Width;
	this.n4Height		= n4Height;
	this.style.zIndex	= nxLayer.n4Layer_BG;		
	this.setWidth(this.n4Width);
	this.setHeight(this.n4Height);
	this.setLeft(25);
	this.setTop(30);
	this.selectedUnit = null;
	this.selectedCell = null;
	this.n4StartCellX = n4StartCellX;
	this.n4StartCellY = n4StartCellY;
	this.getColsCount=function(){return this.n4Width/nxStatic.n4CellWidth;}
	this.getRowsCount=function(){return this.n4Height/nxStatic.n4CellHeight;}
	this.cells		= null;
	this.arrTree	= null;
	
	this.pasteCell=function()
	{
		this.cells	= new Array();
		this.arrTree= new Array();
		var posX=0;
		for(var x=0; x<this.n4Width; x+=nxStatic.n4CellWidth)
		{
			var posY=0;
			this.cells[posX] = new Array();
			this.arrTree[posX] = new Array();
			for(var y=0; y<this.n4Height; y+=nxStatic.n4CellHeight)
			{
				var strCellID	= "cell_"+x+"_"+y;
				var cellObject	= new nxCell(strCellID);
				this.add(cellObject);
				this.cells[posX][posY] = cellObject;
				cellObject.setLeft(x);
				cellObject.setTop(y);
				cellObject.setAlt("평지 \nX:"+(posX+this.n4StartCellX)+", Y:"+(posY+this.n4StartCellY));
				cellObject.show();
			
				//나무심을 곳	
				var per = Math.random() * 10;
				if(per<=1)
					this.arrTree[posX][posY] = true;
				else
					this.arrTree[posX][posY] = false;
				posY++;
			}
			posX++;	
			

		}
	}
	this.pasteCell();
	
	
	this.GameUser = new nxGameUserInfoBar('nxGameUserInfoBar');
	this.GameUser.show();
	this.GameUser.n4MasterSN = n4MasterSN;
	nxStatic.gameUser = this.GameUser;
	//this.sideBar = new nxSideBar('nxSideBar');
	//this.sideBar.show();
	this.map = new nxMap('nxMap');
	this.map.setFocus2();
	this.map.show();
	
	if(n4MasterSN!=1)
	{
		nxStatic.mainMenu = new nxDiplomacyDialog('nxDiplomacyDialog');
		nxStatic.mainMenu.show();
	}

	this.bgm = new NxPlayer('sam3bg.wma');
	this.bgm.loop = -1;
	//this.bgm.play();
	/*
	var unit = new nxPlayUnit('me');
	this.add(unit);
	unit.setLeft(300);
	unit.setTop(200);
	unit.show();
	var unit2 = new nxPlayUnit('me2');
	this.add(unit2);
	unit2.setLeft(400);
	unit2.setTop(400);
	unit2.show();
	*/
	
	

	this.removeBuildingRequest = function(n4BuildingSN, building)
	{
		var cmd = new nxCommand(null, building);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_RemoveBuilding);
		cmd.addParam("n4BuildingSN", n4BuildingSN);
		cmd.execute(callBackRemoveBuilding);
		function callBackRemoveBuilding(xml, strText, building)
		{
			building.unload();
			if(building.n4BuildingCode==0)
			{
				nxStatic.mainContainer.map.clear();
				nxStatic.mainContainer.map.LoadMiniMapBuilding();
				
			}
			nxStatic.gameUser.requestUserInfo();
		}
	}
	this.createBuildingRequest = function(n4BuildingCode, cellX, cellY, owner)
	{
		if(nxStatic.gameUser.n4BuildingCount>=nxStatic.gameUser.n4MaxBuildLimit)
		{
			Alert('notYet','건설제한 최대치 '+nxStatic.gameUser.n4MaxBuildLimit+'을 초과할 수 없습니다. 전투를 통해 명예치를 쌓으면 제한수치를 증가시킬 수 있습니다. ');
			return;
		}
	
		var cmd = new nxCommand(null, owner);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_CreateBuilding);
		cmd.addParam("n4CellX"	, cellX+this.n4StartCellX);
		cmd.addParam("n4CellY"	, cellY+this.n4StartCellY);
		cmd.addParam("n4BuildingCode", n4BuildingCode);
		if(parseInt(n4BuildingCode)==0)
		{
			var strCastleName = prompt("도시의 이름을 입력하세요");
			if(!strCastleName)
				return;
			else
				cmd.addParam("strCastleName", strCastleName);	
		}
		//cmd.print();
		cmd.execute(callBack);
		
		function callBack(xml, strText, owner)
		{
			var ds = new NxDataSet(xml);	
			var x			 = ds.rows[0].get("n4CellX");
			var y			 = ds.rows[0].get("n4CellY");
			var n4BuildingSN = ds.rows[0].get("n4BuildingSN");
			var n4BuildingCode = ds.rows[0].get("n4BuildingCode");
			var building = nxStatic.mainContainer.createBuilding(n4BuildingCode, n4BuildingSN, x, y);
			var n4MasterSN		= ds.rows[0].get("n4MasterSN");
			var n4CastleSN		= ds.rows[0].get("n4CastleSN");
			building.n4MasterSN = n4MasterSN;
			building.n4CastleSN = n4CastleSN;
			building.n4KingSN		= ds.rows[0].get("n4KingSN");
			building.n4Durability	= ds.rows[0].get("n4Durability");
			building.n4BuildingLevel= ds.rows[0].get("n4BuildingLevel");
			building.strCastleName  = ds.rows[0].get("strCastleName");
			building.strMasterName	= ds.rows[0].get("strMasterName");
			building.strNationName	= ds.rows[0].get("strNationName");
			building.n4General			= ds.rows[0].get("n4General");
			building.n4PrivateGeneral	= ds.rows[0].get("n4PrivateGeneral");
			building.n4Gold				= ds.rows[0].get("n4Gold");
			building.n4Rice				= ds.rows[0].get("n4Rice");
			building.n1Security			= ds.rows[0].get("n1Security");
			building.n1LikeZen			= ds.rows[0].get("n1LikeZen");
			building.n1PerTax			= ds.rows[0].get("n1PerTax");
			
			if(n4BuildingCode==0)
			{
				nxStatic.mainContainer.map.clear();
				nxStatic.mainContainer.map.LoadMiniMapBuilding();
			}
			nxStatic.mainMenu.LoadWindow(mainMethod.getNowCastleSN());
			nxStatic.gameUser.requestUserInfo();
		}
	}
	this.createBuilding=function(n4BuildingCode, n4BuildingSN, colX, colY)
	{//1-성,2-농장,3-마구간,4-대장간,5-병영,6-궁노
		var building = null;
	
		if(n4BuildingCode==0)
			building = new nxCastleBuildingUnit('nxCastleBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==1)
			building = new nxBaseBuildingUnit('nxBaseBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==2)
			building = new nxFarmBuildingUnit('nxFarmBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==3)
			building = new nxHorseBuildingUnit('nxHorseBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==4)
			building = new nxBlackSmithBuildingUnit('nxBlackSmithBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==5)
			building = new nxBarrackBuildingUnit('nxBarrackBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==6)
			building = new nxTowerBuildingUnit('nxTowerBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==nxStatic.n4BuildingCode_Kangjok)
			building = new nxKangjokBuildingUnit('nxKangjokBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==nxStatic.n4BuildingCode_HwangKun)
			building = new nxHwangKunJokBuildingUnit('nxHwangKunJokBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==nxStatic.n4BuildingCode_Hyungno)
			building = new nxHyungnoBuildingUnit('nxHyungnoBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else if(n4BuildingCode==nxStatic.n4BuildingCode_CrossArmy)
			building = new nxCrossArmyBuildingUnit('nxCrossArmyBuildingUnit'+n4BuildingSN+'_'+this.id, n4BuildingSN);
		else
		{ 
			alert('알 수 없는 건물코드:'+n4BuildingCode);
			return;
		}
		
		building.n4BuildingCode = n4BuildingCode;
		building.n4BuildingSN	= n4BuildingSN;
		this.add(building);
		building.setLeft( (colX-this.n4StartCellX)*nxStatic.n4CellWidth);
		building.setTop( (colY-this.n4StartCellY)*nxStatic.n4CellHeight);
		building.show();
		
		nxStatic.objBuildings[nxStatic.objBuildings.length] = building;
		
		return building;
		
	}
	this.isPending = false;
	this.loadBuildings = function()
	{
		this.isPending = true;
		var cmd = new nxCommand(null,this);
		cmd.addParam("n1QueryID", nxStatic.n1QueryID_GetListBuilding);
		cmd.addParam("n4StartCellX", this.n4StartCellX);
		cmd.addParam("n4StartCellY", this.n4StartCellY);
		cmd.addParam("n4EndCellX", this.n4StartCellX+this.getColsCount());
		cmd.addParam("n4EndCellY", this.n4StartCellY+this.getRowsCount());
		//cmd.print();
		cmd.execute(this.callBackloadBuildings);
		
	}
	this.callBackloadBuildings=function(xml, strText, owner)
	{
		nxStatic.mainContainer.clear();
		var ds = new NxDataSet(xml);
		for(var i=0;i<ds.rows.length;i++)
		{
			var x			 = parseInt(ds.rows[i].get("n4CellX"));
			var y			 = parseInt(ds.rows[i].get("n4CellY"));
			var n4BuildingSN = ds.rows[i].get("n4BuildingSN");
			var n4BuildingCode	= ds.rows[i].get("n4BuildingCode");
			var n4MasterSN		= ds.rows[i].get("n4MasterSN");
			var n4CastleSN		= ds.rows[i].get("n4CastleSN");
			var building = owner.createBuilding(n4BuildingCode, n4BuildingSN,x,y);
			building.n4MasterSN = n4MasterSN;
			building.n4CastleSN = n4CastleSN;
			building.n4KingSN		= ds.rows[i].get("n4KingSN");
			building.n4Durability	= ds.rows[i].get("n4Durability");
			building.n4BuildingLevel= ds.rows[i].get("n4BuildingLevel");
			building.strCastleName  = ds.rows[i].get("strCastleName");
			building.strMasterName	= ds.rows[i].get("strMasterName");
			building.strNationName	= ds.rows[i].get("strNationName");
			building.n4General			= ds.rows[i].get("n4General");
			building.n4PrivateGeneral	= ds.rows[i].get("n4PrivateGeneral");
			building.n4Gold				= ds.rows[i].get("n4Gold");
			building.n4Rice				= ds.rows[i].get("n4Rice");
			building.n1Security			= ds.rows[i].get("n1Security");
			building.n1LikeZen			= parseInt(ds.rows[i].get("n1LikeZen"));
			building.n1PerTax			= parseInt(ds.rows[i].get("n1PerTax"));
			building.n4ZenCount			= parseInt(ds.rows[i].get("n4ZenCount"));
			building.n1BuildingStatus	= parseInt(ds.rows[i].get("n1BuildingStatus"));
			building.n4TotalSeconds		= parseInt(ds.rows[i].get("n4TotalSeconds"));
			
			building.viewBuidingStatus();
			//리스트만있다.
			building.n4RegionStartX		= ds.rows[i].get("n4RegionStartX");
			building.n4RegionStartY		= ds.rows[i].get("n4RegionStartY");
			building.n4RegionEndX		= ds.rows[i].get("n4RegionEndX");
			building.n4RegionEndY		= ds.rows[i].get("n4RegionEndY");
			
			
			
			if(n4BuildingCode==0)
				building.setAlt(building.strCastleName);
			
			if((n4BuildingCode==1) && n4MasterSN==nxStatic.gameUser.n4MasterSN
			  )
				owner.markUPMyRegion(
					parseInt(building.n4RegionStartX)
					,parseInt(building.n4RegionStartY)
					,parseInt(building.n4RegionEndX)
					,parseInt(building.n4RegionEndY)
				);
			else if(n4BuildingCode==1)//다른이 거점
				owner.markUPRegion(
					parseInt(building.n4RegionStartX)
					,parseInt(building.n4RegionStartY)
					,parseInt(building.n4RegionEndX)
					,parseInt(building.n4RegionEndY)
				);
			else if(n4BuildingCode==0)
			{
				owner.markUPRegion(
					parseInt(x-1)
					,parseInt(y-1)
					,parseInt(x+2)
					,parseInt(y+2)
				);
			}
			else if(n4BuildingCode>=100)
			{
				owner.markUPRegion(
					parseInt(building.n4RegionStartX)
					,parseInt(building.n4RegionStartY)
					,parseInt(building.n4RegionEndX)
					,parseInt(building.n4RegionEndY)
				);
			}
			
		}
		nxStatic.ignoreControlID = false;//개체중복 막기
		owner.isPending=false;
		
	}
	
	this.markUPMyRegion=function(sX,sY,eX,eY)
	{
		sX -= this.n4StartCellX;
		sY -= this.n4StartCellY;
		eX -= this.n4StartCellX;
		eY -= this.n4StartCellY;
		for(var x=sX; x<=eX;x++)
		{
			for(var y=sY; y<=eY;y++)
			{
				if(this.cells[x] && this.cells[x][y])
				{
					//this.cells[x][y].style.border= "1px solid #E28A36";
					//this.cells[x][y].frmLayer.onmouseover=function(){this.style.border= "1px solid #52A34C";}
					//this.cells[x][y].frmLayer.onmouseout=function(){this.style.border= "1px solid #E28A36";}
					this.cells[x][y].src='http://nexen.pe.kr/img/tile/brown.png';
					this.cells[x][y].show();
					this.cells[x][y].isMyRegion = true;
					this.cells[x][y].setAlt("공터 : 클릭하면 건물을 건설할 수 있습니다.");
				}
			}
		}
	}
	this.markUPRegion=function(sX,sY,eX,eY)
	{
		sX -= this.n4StartCellX;
		sY -= this.n4StartCellY;
		eX -= this.n4StartCellX;
		eY -= this.n4StartCellY;
		for(var x=sX; x<=eX;x++)
		{
			for(var y=sY; y<=eY;y++)
			{
				if(this.cells[x] && this.cells[x][y])
				{
					this.cells[x][y].src='http://nexen.pe.kr/img/tile/brown.png';
					this.cells[x][y].show();
				}
			}
		}
	}
	this.loadBuildings();
	
	
	document.body.oncontextmenu=function(){return false;}
	this.frmLayer.onselectstart=function(){return false;}
	this.setSelectedUnit=function(unit)
	{
		if(this.selectedUnit)
			this.selectedUnit.unSelectUnit();
		this.selectedUnit = unit;	

		if(document.nxPopupMenu!=null)
			document.nxPopupMenu.hide();
	}
	this.setSelectedCell=function(cell)
	{
		this.selectedCell = cell;	
	}
	
	document.body.onkeydown=function(e)
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
			nxStatic.removeNotice();
			nxStatic.closeInputDialog();
		}
		
	}
	

	this.mX = 0;
	this.mY = 0;
	this.frmLayer.onmousemove = function(e)
	{
		if(!document.all)
		{
			this.NxControl.mX = e.pageX;
			this.NxControl.mY = e.pageY;
		}
		else
		{
			this.NxControl.mX = event.clientX +  parseInt(document.body.scrollLeft);;
			this.NxControl.mY = event.clientY + parseInt(document.body.scrollTop);
		}
	}
	this.dX = 0;
	this.dY = 0;
	document.onmousemove = function(e)
	{
		var x =0;
		var y =0;
		if(!document.all)
		{
			x = parseInt(e.pageX);// + parseInt(document.body.scrollLeft);
			y = parseInt(e.pageY);// + parseInt(document.body.scrollTop);
		}
		else
		{
			x = parseInt(event.clientX);// + parseInt(document.body.scrollLeft);
			y = parseInt(event.clientY);// + parseInt(document.body.scrollTop);
			x = x + parseInt(document.body.scrollLeft);
			y = y + parseInt(document.body.scrollTop);
		}
		document.dX = x;
		document.dY = y;
		//document.title= x + '/' + document.dX;
		nxStatic.mainContainer.chkMousePos();
	}
	
	
	function nxMapArrow(strLayerID, n1Direction)
	{
		NxControl.apply(this, arguments);
		this.frmLayer.style.cursor='pointer';
		this.setWidth(40);	
		this.setHeight(40);	
		this.setBG('');
		
		//0-좌 1-우 3-위 4-아래
		this.n1Direction=n1Direction;
		if(this.n1Direction==1)
		{
			this.setText("<img src='http://nexen.pe.kr/img/icon/left.jpg' width='40' height='40' />");
			this.setTop(nxStatic.mainContainer.getHeight()/2);
			this.setLeft(nxStatic.mainContainer.getLeft());
		}
		if(this.n1Direction==2)
		{
			this.setText("<img src='http://nexen.pe.kr/img/icon/right.jpg' width='40' height='40'  />");
			this.setTop(nxStatic.mainContainer.getHeight()/2);
			this.setLeft(nxStatic.mainContainer.getLeft()+nxStatic.mainContainer.getWidth()-this.getWidth());
		}
		else if(this.n1Direction==3)
		{
			this.setText("<img src='http://nexen.pe.kr/img/icon/up.jpg' width='40' height='40'  />");
			this.setTop(nxStatic.mainContainer.getTop());
			this.setLeft(nxStatic.mainContainer.getWidth()/2);
		}
		else if(this.n1Direction==4)
		{
			this.setText("<img src='http://nexen.pe.kr/img/icon/down.jpg' width='40' height='40'  />");
			this.setTop(nxStatic.mainContainer.getTop()+nxStatic.mainContainer.getHeight()-this.getHeight());
			this.setLeft(nxStatic.mainContainer.getWidth()/2);
		}	
		
		this.isEnable = false;
		this.moveProcess=function()
		{
			if(!nxStatic.mainContainer.isPending && this.isEnable)
			{
				if(this.n1Direction==1)
					nxStatic.mainContainer.n4StartCellX --;
				else if(this.n1Direction==2)
					nxStatic.mainContainer.n4StartCellX ++;
				else if(this.n1Direction==3)
					nxStatic.mainContainer.n4StartCellY --;
				else if(this.n1Direction==4)			
					nxStatic.mainContainer.n4StartCellY ++;	

				nxStatic.ignoreControlID = true;
				nxStatic.closePopup();
				nxStatic.mainContainer.loadBuildings();
				nxStatic.mainContainer.map.setFocus2();
			}
			
			if(this.isEnable)
				setTimeout("document.getElementById('"+this.id+"').NxControl.moveProcess();", 300);			
		}
				
		this.frmLayer.onmouseover=function()
		{
			
			var owner = this.NxControl;
			owner.isEnable = true;
			nxStatic.mainContainer.isPending=false;
			setTimeout("document.getElementById('"+owner.id+"').NxControl.moveProcess();", 300);			
		}
		this.frmLayer.onmouseout=function()
		{
			var owner = this.NxControl;
			owner.isEnable = false;
		}
		
	}	
	nxMapArrow.prototype = new NxControl();
	nxMapArrow.prototype.constructor = nxMapArrow;
	
	this.ArrowLeft = new nxMapArrow("ArrowLeft", 1);
	this.ArrowRight = new nxMapArrow("ArrowRight", 2);
	this.ArrowUP = new nxMapArrow("ArrowUP", 3);
	this.ArrowDown = new nxMapArrow("ArrowDown", 4);
	
	this.chkMousePos=function()
	{
		if(document.dY<=nxStatic.mainContainer.getTop()+nxStatic.n4CellHeight 
			&& document.dY>nxStatic.mainContainer.getTop())
		{
			this.ArrowUP.show();
		}
		else if(document.dY>=nxStatic.mainContainer.getTop()+nxStatic.mainContainer.getHeight()-nxStatic.n4CellHeight 
				&& document.dY<nxStatic.mainContainer.getTop()+nxStatic.mainContainer.getHeight())
		{
			this.ArrowDown.show();			
		}
		else if(document.dX<=nxStatic.mainContainer.getLeft()+nxStatic.n4CellHeight
			&& document.dX>nxStatic.mainContainer.getLeft())
		{
			this.ArrowLeft.show();			

		}
		else if(document.dX>=nxStatic.mainContainer.getLeft()+nxStatic.mainContainer.getWidth()-nxStatic.n4CellHeight
				&& document.dX<nxStatic.mainContainer.getLeft()+nxStatic.mainContainer.getWidth())
		{
			this.ArrowRight.show();
		}
		else
		{
			nxStatic.mainContainer.frmLayer.style.cursor='';		
			this.ArrowUP.hide();	
			this.ArrowDown.hide();
			this.ArrowLeft.hide();
			this.ArrowRight.hide();
		}
		
		//document.title= document.dX + '/'+ (nxStatic.mainContainer.getLeft()+nxStatic.mainContainer.getWidth()-nxStatic.n4CellHeight);
	}

	this.clear=function()
	{
		for(var i=0; i<nxStatic.objBuildings.length;i++)
		{
			nxStatic.objBuildings[i].unload();
		}
		nxStatic.objBuildings = new Array();
		
		for(var i=0; i<this.cells.length;i++)
		{
			for(var j=0; j<this.cells[i].length;j++)
			{
				this.cells[i][j].isMyRegion = false;
				//this.cells[i][j].frmLayer.border = this.cells[i][j].strBorderMouseOut;
				this.cells[i][j].style.borderTop= this.cells[i][j].strBorderMouseOut;
				this.cells[i][j].style.borderLeft= this.cells[i][j].strBorderMouseOut;
				
				if(this.cells[i][j].src!='http://nexen.pe.kr/img/tile/grass.png')
				{
					this.cells[i][j].src='http://nexen.pe.kr/img/tile/grass.png';
					this.cells[i][j].show();
				}
								
				this.cells[i][j].frmLayer.onmouseover=function()
				{
					//this.style.border=  this.NxControl.strBorderMouseOver;
					
					//this.NxControl.setLeft(this.NxControl.getLeft()-1);
					//this.NxControl.setTop(this.NxControl.getTop()-1);
					//this.NxControl.setWidth(this.NxControl.getWidth()+2);
					//this.NxControl.setHeight(this.NxControl.getHeight()+2);
					this.NxControl.setLayerIndex(nxLayer.n4Layer_Unit);
					this.style.filter = "alpha(opacity=80)"; 
					this.style.opacity="0.8";
				}
				this.cells[i][j].frmLayer.onmouseout=function()
				{
					//this.style.borderTop= this.NxControl.strBorderMouseOut;
					//this.style.borderLeft= this.NxControl.strBorderMouseOut;

					//this.NxControl.setLeft(this.NxControl.getLeft()+1);
					//this.NxControl.setTop(this.NxControl.getTop()+1);
					//this.NxControl.setWidth(this.NxControl.getWidth()-2);
					//this.NxControl.setHeight(this.NxControl.getHeight()-2);
					this.NxControl.setLayerIndex(nxLayer.n4Layer_Texture);
					this.style.filter = "alpha(opacity=100)"; 
					this.style.opacity="1";
				}
				this.cells[i][j].setAlt("평지 \nX:"+(i+this.n4StartCellX)+", Y:"+(j+this.n4StartCellY));
				
				//나무심기
				//arrTree[posX][posY]
				var virtualX = (this.n4StartCellX+i)%10;
				var virtualY = (this.n4StartCellY+j)%10;
				if(this.arrTree[virtualX][virtualY])
				{
					this.cells[i][j].src='http://nexen.pe.kr/img/unit/tree.png';
					this.cells[i][j].show();
				}
				
			}
			
		}
		
		
	}
		
}
nxMainContainer.prototype = new NxControl();
nxMainContainer.prototype.constructor = nxMainContainer;


function nxCell(strLayerID)
{
	if(!strLayerID)
		return;

	NxControl.apply(this, arguments);

	this.strBorderMouseOut	= "1px solid #FCEEEE";
	this.strBorderMouseOver = "1px solid #52A34C";
	//this.style.border= this.strBorderMouseOut;
	this.style.borderTop= this.strBorderMouseOut;
	this.style.borderLeft= this.strBorderMouseOut;
	this.setWidth(nxStatic.n4CellWidth);
	this.setHeight(nxStatic.n4CellHeight);
	this.style.zIndex = nxLayer.n4Layer_Texture;
	this.setBG('');
	this.src = 'http://nexen.pe.kr/img/tile/grass.png';
	this.getCellX=function(){return this.getLeft()/this.getWidth();}
	this.getCellY=function(){return this.getTop()/this.getHeight();}
	this.isSelected = false;
		
	this.unSelectCell=function()
	{
		this.isSelected = false;
		this.parent.setSelectedCell(null);
	}
	this.SelectCell=function()
	{
		this.isSelected = true;
		this.parent.setSelectedCell(this);
	}

	this.frmLayer.onmouseover=function()
	{
		this.style.border= "1px solid #52A34C";
		
	}

	this.frmLayer.onmouseout=function()
	{
		//this.style.border= "1px solid #FCEEEE";
		//this.NxControl.unSelectCell();
	}
	this.frmLayer.onclick=function()
	{
		var cell = this.NxControl;
		var selectedUnit = cell.parent.selectedUnit;
		if(selectedUnit)
		{
			if(selectedUnit.constructor == nxPlayUnit)
				selectedUnit.moveTo(cell.getLeft(), cell.getTop());
		}

		nxStatic.closePopup();
	}


	this.frmLayer.onmousedown=function(e)
	{

		this.NxControl.SelectCell();

		var n1Btn = 0;
		if(document.all)
			n1Btn = event.button==0?2:event.button;
		else
			n1Btn = e.button==0?1:2;

		//if(n1Btn==2)
		//{
			if(this.NxControl.isMyRegion || nxStatic.gameUser.n4MasterSN==1)
			{
				if(this.NxControl.popMenu)
					this.NxControl.popMenu.unload()
					
				this.NxControl.popMenu = new nxPopupField('nxPopupField_'+this.id, this.NxControl);
				//this.NxControl.selectUnit();
				this.NxControl.parent.setSelectedUnit(null);
				this.NxControl.popMenu.setLeft(this.NxControl.parent.mX-5);
				this.NxControl.popMenu.setTop(this.NxControl.parent.mY-5);
				this.NxControl.popMenu.show();
			}
			else
			{
				//Alert('isMyRegion', '다른 세력의 영토입니다.');
				return false;	
			}
		//}
	}

}
NxButton.prototype = new NxControl();
NxButton.prototype.constructor = nxCell;


function nxUnit(strLayerID)
{
	NxControl.apply(this, arguments);

	this.strBorder		  = "1px solid ";
	this.strMouseOutColor = "#FF3333";
	this.strMouseOverColor= "red";
	this.style.border	  = '';//this.strBorder+this.strMouseOutColor;
	this.setWidth(nxStatic.n4CellWidth);
	this.setHeight(nxStatic.n4CellHeight);
	this.style.zIndex = nxLayer.n4Layer_Unit;
	this.setBG('');
	this.isSelected = false;
	this.getCellX=function(){return this.getLeft()/this.getWidth();}
	this.getCellY=function(){return this.getTop()/this.getHeight();}
	

	this.getStrBorderOver=function()
	{
		return this.strBorder+this.strMouseOverColor;
	}
	this.getStrBorderOut=function()
	{
		return '';//this.strBorder+this.strMouseOutColor;
	}

	this.frmLayer.onmouseover=function()
	{
		this.style.border= this.NxControl.getStrBorderOver();
	}
	this.frmLayer.onmouseout=function()
	{
		this.style.border= this.NxControl.getStrBorderOut();
	}
	this.frmLayer.onclick=function()
	{
		this.NxControl.selectUnit();
	}
	this.frmLayer.onmousedown=function(e)
	{
		
	}
	this.selectUnit=function()
	{
		this.isSelected = true;
		this.parent.setSelectedUnit(this);
	}
	this.unSelectUnit=function()
	{
		this.isSelected = false;
	}
	
}
nxUnit.prototype = new NxControl();
nxUnit.prototype.constructor = nxUnit;
