
function subMenuBar(strLayerID)
{
	NxButton.apply(this, arguments);

	this.setText("<img src='../img/menu_bar.png' >");
	this.style.color		= '#FFFFFF';
	this.style.fontSize		= 15;
	this.style.fontWeight	= 'bold';
	this.setWidth(399);
	this.setHeight(63);
	this.setBG('');
	this.show();

}
subMenuBar.prototype = new NxButton();
subMenuBar.prototype.constructor = subMenuBar;



function mainMenuLoadGame(strLayerID)
{
	subMenuBar.apply(this, arguments);

	this.frmLayer.onclick = function()
	{
		nxSystem.redirect('main.htm');
	}
}
mainMenuLoadGame.prototype = new NxButton();
mainMenuLoadGame.prototype.constructor = mainMenuLoadGame;

