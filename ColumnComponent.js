/*
this.props:
{
	serviceUrl: service URL 
	getURL : getting value of column
	index: 
	letter :
}
this.state:
{	
	isOpened : flag for correct response
	textColumn : text in input field
	disabled : lock input
	badResponse : flag for input
}
*/

var ColumnComponent = React.createClass({
	getInitialState : function() {
		return {
				 isOpened : false,
		 		 textColumn : this.props.letter,
		 		 disabled :"",
			     badResponse :false,
			     isCorrect: false
		 	};
	},

	handleClick : function(event)
	 	{
	 	//Can be confusing for new players. Submit answers using ENTER.
	 	 /* var comp = this;
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
			});*/
						
	 	},
	 handleChange:function(event)
	 	{  			 	 
	 	 	var comp = this;
	 	  	comp.setState({
						textColumn : event.target.value,
						badResponse :false
			 	});
	 	},
	 handleEnter : function(event)
	 {	
	 	var comp = this;
	 	if (event.keyCode == 13)
	 	{
	 	    AppHelper.loadData(this.props.serviceUrl+ "/proposeColumnBoxAnswer?selectedColumnBox="+ this.props.index +"&proposedColumnBoxAnswer=" + event.target.value, false, function(response)
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
						textColumn : "",
						badResponse :false
			 	});
	 	}
	 },
	openAllButtons : function()
		{	
			if(!this.state.isOpened)
			{
			 	for(var i=0; i<4; i++)
			 		{
			 			this.refs[i].onButtonClick();
			 		}
			}
  		},
  	openColumn : function()
  	{
  		var comp = this;
  		this.openAllButtons();
  		if(!this.state.isOpened)
	 	{
		 	this.getCorrectAnswer();
	    }
  	},
  	getCorrectAnswer : function()
  	{ 		
  		var comp = this;
 	 	AppHelper.loadData(this.props.getURL , false, function(response)
		 	{
		 		comp.setState({
							textColumn : response,
							isOpened : true,
		 			  		disabled:"disabled",
		 			  		isCorrect : true
				 	});
		 	});
  		
  	},
	render :  function render() {
		var rowArray = [];
		var lettersArray = [1, 2, 3, 4];
	 	for (var i=0; i < 4; i++) { 
					var newElement=React.createElement(RowComponent,{letter: this.props.letter+lettersArray[i], ref : i, serviceUrl : this.props.serviceUrl + "/getRowBoxAnswer?selectedRowBox="+this.props.index+"-"+i})
					rowArray.push(newElement);
	 		}
	 	var columnValue="";
	 	if(this.state.isOpened)
	 	{	
			if(!this.state.isCorrect)
	 		{
				this.openAllButtons();
	 		this.getCorrectAnswer();
	 		columnValue=this.state.textColumn;
	 		}
			columnValue=this.state.textColumn;
	 	}
	 	else if (this.state.badResponse)
	 	    columnValue=this.props.letter;
	 	else
	 		columnValue=this.state.textColumn;
	 	var newElement = React.createElement("input", {value : columnValue, disabled : this.state.disabled,id : this.props.index, className : "inputs", type : "text", onClick:this.onHandleClick, onKeyDown : this.handleEnter, onBlur : this.handleClick, onChange: this.handleChange});
		rowArray.push(newElement);		
    	return React.createElement(
      		"div", { className: "taskList" },
      			rowArray      		
    	);
	}

});