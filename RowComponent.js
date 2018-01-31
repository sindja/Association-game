/*
this.props:
{
	serviceUrl: service URL 
	letter :
}
this.state:
{
	text: text on button
	isOpen : opened or not
	disabled : lock button
}
*/
var RowComponent = React.createClass({
	getInitialState : function() {
		return {
				 text : this.props.letter,
				 disabled :"",
				 isOpen : false
		};
	},
	onButtonClick : function()
	{
		var comp = this;
		if(!this.state.isOpen)
		{
		AppHelper.loadData(this.props.serviceUrl, false, function(response)
			{
				comp.setState({
						text : response,
						disabled:"disabled",
						isOpen : true 
				});
			});
		}
	},
	
 render : function render() {
 		return React.createElement("button",{ disabled : this.state.disabled, onClick : this.onButtonClick}, this.state.text);
 	}
});