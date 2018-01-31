/*
this.props:
{	
	serviceUrl : 
	getURL : getting correct value
}
this.state:
{
	finallValue : value in text box
	isOpened : is open or not
	badResponse : 
	disabled : 
}
*/

var GameComponent = React.createClass({
	getInitialState : function() {
		return {
			finallValue : "???",
			isOpened : false,
			badResponse : false,
			disabled : "",
		};
	},

	handleClick : function(event)
	 	{
	 		//Can be confusing for new players. Submit answers using ENTER.
	 		/*var comp = this;
	 		AppHelper.loadData(this.props.serviceUrl + event.target.value, false, function(response)
	 				{
	 		 		  if(response)
	 		 			  {	 			 
	 		 			  	comp.setState({
	 		 			  			isOpened : response,
	 		 			  			disabled:"disabled"
	 		 			  	});
	 		 			  }
	 		 		  else
	 		 			  {
	 		 			  	comp.setState({
	 		 					 	 badResponse: true,			  			
	 		 			 		});
	 		 			  }	 		  
	 				});	*/	 			
	 		
	 	},
	 handleChange : function(event)
		 	{  			 	 
		 	 	var comp = this;
		 	  	comp.setState({
		 	  			finallValue : event.target.value,
		 	  			badResponse : false
				 	});
		 	},
	handleEnter : function(event)
	 {	
		
	 	var comp = this;
	 	if (event.keyCode == 13)
	 	{
	 	    AppHelper.loadData(this.props.serviceUrl + "/proposeFinalBoxAnswer?proposedFinalBoxAnswer=" + event.target.value, false, function(response)
	 				{
	 		 		  if(response)
	 		 			  {	 			 
	 		 			  	comp.setState({
	 		 			  			isOpened : response,
	 		 			  			disabled:"disabled"
	 		 			  	});
	 		 			  }
	 		 		  else
	 		 			  {
	 		 			  	comp.setState({
	 		 					 	 badResponse: true,			  			
	 		 			 		});
	 		 			  }	 		  
	 				});	
	 	}
	 },	
	 onHandleClick : function()
	 {
	 	var comp = this;
	 	if(!this.state.isOpened)
	 	{
	 		comp.setState({
						finallValue : "",
						badResponse :false
			 	});
	 	}
	 },
	openAllColumns : function()
	{
		if(this.state.isOpened)
		{	
			for(var i=0; i<4; i++)
			 {
				this.refs[i].openColumn();
			 }
		}
	},	 	
	getCorrectAnswer : function()
	{
		var comp = this;
  		AppHelper.loadData(this.props.getURL , false, function(response)
		 	{
		 		comp.setState({
							finallValue : response,
							isOpened : true,
		 			  		disabled:"disabled"
				 	});
		 	});
	},
	render :  function render() {
		var columnArray = [];
		var lettersArray = ["A", "B", "C", "D"];
		for (var i=0; i < 4; i++) { 
					var newElement=React.createElement(ColumnComponent,{letter : lettersArray[i], ref : i, serviceUrl : this.props.serviceUrl ,
														index:i, getURL : this.props.serviceUrl + "/getColumnBoxAnswer?selectedColumnBox="+i})
					columnArray.push(newElement);
	 		}
		var inputValue="";
	 	if(this.state.isOpened)
	 	{	
	 		this.openAllColumns();
	 		this.getCorrectAnswer();
	 		inputValue=this.state.finallValue;
	 		inputValue = inputValue.toUpperCase();
	 	}
	 	else if (this.state.badResponse)
	 	    inputValue="???";
	 	else
	 		inputValue=this.state.finallValue;
	 	var newElement = React.createElement("input", {value : inputValue, className : "finals",disabled : this.state.disabled, onClick:this.onHandleClick, type : "text", onKeyDown : this.handleEnter, onBlur :this.handleClick, onChange : this.handleChange});
		columnArray.push(newElement);				
		return React.createElement(
      		"div", { className: "taskLists" },
  				columnArray
    	);		
	}
});