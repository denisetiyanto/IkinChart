(function(){

Ikin = function(){};
var collections = {};
var arr = [];


	Ikin.addClick = function(){
		
		$.ajax({
		  type: "GET",
		  cache : false,
		  url: "element.html",
		  dataType: "html"
		}).done(function(data){
			var comp = $("#comp").val();
			$('#visible').append('<div id='+comp+'></div>');
			$('#'+comp).append(data);
		})
				
	};

	Ikin.removeClick = function(element){

		var id = $(element).parent().parent().parent().parent().attr("id");
		
		$('#'+id).remove();
		
	};

	Ikin.clearContent = function(){

		$('#visible').empty();
	}

	Ikin.getContext = function(id){

		return document.getElementById(id).getContext("2d");
	};

	Ikin.initChart = function(ctx){
		return new Chart(ctx);
	};

	Ikin.createChart = function(typeChart, chart, data){

			
		
			if(typeChart == "Pie" || typeChart == "pie")
				{
					chart.Pie(data, { legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
						});
				//	var legend = chart.generateLegend();
				//	$("#legend").append(legend);
					
				}
			else if(typeChart == "Bar" || typeChart == "bar"){
					
					chart.Bar(data);
				}
			else if(typeChart == "Polar" || typeChart == "polar"){
				chart.PolarArea(data);

			}
			else if(typeChart == "Radar" || typeChart == "radar"){
				chart.Radar(data);

			}
			else if(typeChart == "Line" || typeChart == "line"){
				chart.Line(data);

			}

			else{
					alert("Chart rak ono ndes!");
					return false;
				}
		
	}

	Ikin.generateLegend = function(parent, data){
		
		    parent.className = 'legend';
		    console.log(parent);
		    var datas = data.hasOwnProperty('datasets') ? data.datasets : data;

		    // remove possible children of the parent
		  //  while(parent.hasChildNodes()) {
		   //     parent.removeChild(parent.lastChild);
		   // }

		    datas.forEach(function(d) {
		        var title = document.createElement('span');
		        title.className = 'title_legend';
		        title.style.borderColor = d.hasOwnProperty('strokeColor') ? d.strokeColor : d.color;
		        title.style.borderStyle = 'solid';
		       $("#"+parent).append(title);

		        var text = document.createTextNode(d.title_legend);
		        $("."+title).append(text);
		    });
			
	}

	Ikin.createComponent = function(id, eDiv,wDiv){
		
		var element = '<div class="col-'+wDiv+'"><div class="panel panel-primary">'+
					 	'<div class="panel-heading">&nbsp;'+
						'<button class="btn btn-primary" id="_'+eDiv+'">Edit</button>'+
						'<!--button class="btn btn-primary" id="_'+eDiv+'_resize">resize</button-->'+
				  	 	'</div>'+
				  		'<div class="panel-body">'+    
						'<canvas id="'+id+'" width="300" height="400"></canvas>'+
						'<div id="legend_'+id+'"></div>'+
				  		'</div>'+
				 	  	'</div></div>';

		$('#visible').append('<div id="'+eDiv+'"></div>');
		$('#'+eDiv).append(element);
	
		

	}

	Ikin.createEmptyComponent = function(id, eDiv,wDiv){
		
		var element = '<div class="col-'+wDiv+'"><div class="panel panel-primary">'+
					 	'<div class="panel-heading">&nbsp;'+
						'<!--button class="btn btn-primary" id="_'+eDiv+'">x</button>'+
						'<button class="btn btn-primary" id="_'+eDiv+'_resize">resize</button-->'+
				  	 	'</div>'+
				  		'<div class="panel-body">'+    
						'<div id="'+id+'" width="300" height="400">Data Tidak Ditemukan</div>'+						
				  		'</div>'+
				 	  	'</div></div>';

		$('#visible').append('<div id="'+eDiv+'"></div>');
		$('#'+eDiv).append(element);
	
		

	}

	

	Ikin.initComponent = function(){
		Ikin.clearContent();
		$.ajax({
		  type: "GET",
		  cache : false,
		  url: "getChart.json",
		  dataType: "json"
		}).done(function(data){
			
			$.each(data, function(i, item){
			//	$('#'+side).append('<li> <a href="#" id="'+item.chart+'">Menu Item 1</a></li>');
				//$('#'+item.chart).click(function(){
			if(item.dataChart.labels == null){
					Ikin.createEmptyComponent("dashboard_"+i, item.chart+"_"+i, "md-5");
			}else{		
				if(item.typeChart == "Bar" || item.typeChart == "Line" || item.typeChart == "Radar"){

					var data = {
					labels : item.dataChart.labels,
					datasets : []

				};
				$.each(item.dataChart.datasets, function(index, data1){
					var dataset = {
						label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(220,220,220,1)",
		                //legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
			            data: data1
						}
						
						data.datasets.push(dataset);
				});


			   // collections[data+i] = data;
			   // if($("#"+item.chart+"_"+i).length == 0){


		        Ikin.createComponent("dashboard_"+i, item.chart+"_"+i, "md-5");
		        var ctxBar = Ikin.getContext("dashboard_"+i);
		        ctxBar.canvas.width = parseInt($("#dashboard_"+i).parent().parent().parent().width() - 30);
		        var chart = Ikin.initChart(ctxBar);
		        Ikin.createChart(item.typeChart, chart, data);
		      // Ikin.generateLegend("legend_dashboard_"+i, data);

				}

				if(item.typeChart == "Polar" || item.typeChart == "Pie"){

					var data = [];

						$.each(item.dataChart.labels, function(x, y){
							var dataset = {								
					            				value: 40,
										        color: "#949FB1",
										        highlight: "#A8B3C5",
										        label: y
											}						
						data.push(dataset);

						});
				Ikin.createComponent("dashboard_"+i, item.chart+"_"+i, "md-5");
		        var ctxBar = Ikin.getContext("dashboard_"+i);
		        ctxBar.canvas.width = parseInt($("#dashboard_"+i).parent().parent().parent().width() - 30);
		        var chart = Ikin.initChart(ctxBar);
		        Ikin.createChart(item.typeChart, chart, data);

				}	
				if(item.typeChart == "Gauge"){
					Ikin.createComponent("dashboard_"+i, item.chart+"_"+i, "md-5");
					Ikin.initGauge("dashboard_"+i, 0, 10, 3);

				}

				$('#visible').on('click', '#'+item.chart+'_'+i, function(){

					Ikin.editMonitoring();
							
						});

			}//else
				
		       // console.log(item.typeChart);

		       /* 	$('#visible').on('click', '#_'+item.chart+"_"+i, function(){
					Ikin.removeClick('#_'+item.chart+"_"+i);
					
					});

					$('#visible').on('click', '#_'+item.chart+"_"+i+"_resize", function(){
										
					 
					});
				*/
				//}
			//onclick	});

			});
			
		});

	}

	Ikin.createMonitoring = function(){
		Ikin.clearContent();
		$('#visible').unbind('click');
		$.ajax({
		  type: "GET",
		  cache : false,
		  url: "monitoring.html",
		  dataType: "html"
		}).done(function(data){
			
			$('#visible').append(data);
			$('#visible').on('click', '#post_monitoring', function(){
				
				Ikin.postMonitoring();
				Ikin.postFilterMonitoring();

			});

			
		
		
			Ikin.addFilter();
			Ikin.getJenisMonitoring();
			
			
			
		})
	}

Ikin.addFilter = function(){

		
				var i = 0;
				console.log(i);
		$('#visible').on('click', '#addfilter', function(){
			i++;
			if($.inArray(i, arr) != 1){
			if($.inArray(1, arr) != 1){
				i = 1;
			}				

			 $.ajax({
			  type: "GET",
			  url: "getFilter1.json",
			  cache : false,
			  dataType: "json"
			  }).done(function(data){
			  	
			  	if(data.filter != null){
			  		arr[i] = i;	
				console.log("+ "+arr);
			  		$('#_filter').append('<div id="filter_component_'+i+'"><div class="form-group">'+
								 '<div class="col-sm-5" id="filter_x_'+i+'">'+								  
								  '</div>'+
								  '<div class="col-sm-5" id="filter_type_x_'+i+'">'+								  
								  '</div>'+
								  '<div class="col-sm-2" id="btn_remove_'+i+'">'+
								  '</div>'+
								  '</div></div>');
			  	
			  	if(data.type_filter == "input"){			  		
			  			console.log(i);
			  		$('#filter_x_'+i).append('<input type="text" readonly class="form-control" name="filter[]" id="filter_'+i+'" placeholder="Nama Monitoring" value="'+data.filter+'">');
			  		$('#filter_type_x_'+i).append('<input type="text" class="form-control" name="value_filter[]" id="value_filter_'+i+'" placeholder="Nama Monitoring">');
			  		$('#btn_remove_'+i).append('<button id="remove_filter_component_'+i+'" class="btn btn-primary"><span class="glyphicon glyphicon-minus"></span></button>');
							  		
			  	}
			  	if(data.type_filter == "dropdown"){
			  		console.log("xx "+i);
			  		$('#filter_x_'+i).append('<input type="text" readonly class="form-control" name="filter[]" id="filter_'+i+'" placeholder="Nama Monitoring" value="'+data.filter+'">');
			  		$('#filter_type_x_'+i).append('<select class="form-control" name="value_filter[]" id="value_filter_'+i+'"><option selected value="ihhhhirrr">Pilih</option></select>');
			  		$('#btn_remove_'+i).append('<button id="remove_filter_component_'+i+'" class="btn btn-primary"><span class="glyphicon glyphicon-minus"></span></button>');
			
			  		//Ikin.getFilterWilayah("value_filter_"+i);

			  		}

			  	}

			  			  
			  
			  });	
				
			}
			else{ 
			//	$('#_filter').html("Filter data tidak ada");
				
			}

				Ikin.removeFilter("#remove_filter_component_"+i, i);
			  
	

		});

	

	}

	Ikin.removeFilter = function(e){
		
			$('#_filter').on('click', e, function(){
			
			var id = $(e).parent().parent().parent().attr("id");
			$("#"+id).remove();

			console.log(e+" "+id);

			});			
	}


	Ikin.getJenisMonitoring = function(){

		$.ajax({
		  type: "GET",
		  url: "monitor.json",
		  cache : false,
		  dataType: "json"
		}).done(function(data){
			$.each(data, function(i, item){

				$('#jenis').append("<option value='"+item.id+"'>"+item.jenis+"</option>"); 
			});
			
			
		});
	}

	Ikin.postMonitoring = function(){
		//var post = {nama_monitoring: "ihirxxx", jenis_monitoring : "test", show_dashboard: 1};

		$.post( "postMonitor.json", 
				{nama_monitoring: $('#namamonitoring').val(), jenis_monitoring : $('#jenis').val(), show_dashboard: "1"}, 
				//post,
				function(data){
				alert("Data Loaded: " + data);
				}, "json");
			  	
	}

	Ikin.postFilterMonitoring = function(){
		var filter_ = [];		
		
		var value_filter_ = [];

		 var x=$("form").serializeArray();
    		$.each(x, function(i, field){
    		if(field.name == "value_filter[]"){
    			value_filter_.push(field.value);
    		}
    		if(field.name == "filter[]"){
    			filter_.push(field.value);
    		}
     		
    		});
		
		console.log(value_filter_);
		console.log(filter_);

		$.post("postFilterMonitoring.json", 
				{filter : filter_, value_filter : value_filter_}, 
				function(data){
				alert( "Data Loaded: " + data);
				}, "json")
			  	.done(function() {
			  	//  alert( "Data Loaded: " + data.success);
			  	});
	

	}

	
	

	

	

	

	Ikin.initMyMonitoring = function(){
		Ikin.clearContent();
		$('#listmonitoring').empty();
		$('#listmonitoring').unbind('click');

		$.ajax({
		  type: "GET",
		  cache : false,
		  url: "getMyMonitoring.json",
		  dataType: "json"
		}).done(function(data){

			$('#monitor').append("<ul id='listmonitoring'></ul>");
			$.each(data, function(i, item){

				$('#listmonitoring').append("<li><a href='#' id="+item.id+">"+item.jenis+"</a></li>"); 

				Ikin.initMyMonitoringChart("#"+item.id);
			});
						
		});
	}

	Ikin.initMyMonitoringChart = function(e){

			$('#listmonitoring').on('click', e, function(){
				Ikin.clearContent();
				$('#visible').unbind('click');
				$.ajax({
				
				  type: "GET",
				  cache : false,
				  url: "getMyDetailMonitoring.json",
				  dataType: "json"
				}).done(function(data){

				if(data.dataChart.labels == null){
					Ikin.createEmptyComponent("monitoring_"+data.chart, "monitoring_","md-12");
				}else{		
					if(data.typeChart == "Bar"){
						//console.log(data.chart);
						var data1 = {
						labels : data.dataChart.labels,
						datasets : []												

							};
						$.each(data.dataChart.datasets, function(x, y){
							var dataset = {
								label: "My First dataset",
					            fillColor: "rgba(220,220,220,0.5)",
					            strokeColor: "rgba(220,220,220,0.8)",
					            highlightFill: "rgba(220,220,220,0.75)",
					            highlightStroke: "rgba(220,220,220,1)",
					            data: y
								}						
						data1.datasets.push(dataset);

						});

						Ikin.createComponent("monitoring_"+data.chart, "monitoring_","md-12");
				        var ctxBar = Ikin.getContext("monitoring_"+data.chart);	
				        ctxBar.canvas.width = parseInt($("#monitoring_"+data.chart).parent().parent().parent().width() - 30);				
				        var chart = Ikin.initChart(ctxBar);
				        Ikin.createChart(data.typeChart, chart, data1);


						}

						if(data.typeChart == "Polar"){
						//console.log(data.chart);
						var data1 = [];

						$.each(data.dataChart.labels, function(x, y){
							var dataset = {								
					            				value: 40,
										        color: "#949FB1",
										        highlight: "#A8B3C5",
										        label: y
											}						
						data1.push(dataset);

						});

						

						Ikin.createComponent("monitoring_"+data.chart, "monitoring_","md-12");
				        var ctxBar = Ikin.getContext("monitoring_"+data.chart);	
				        ctxBar.canvas.width = parseInt($("#monitoring_"+data.chart).parent().parent().parent().width() - 30);				
				        var chart = Ikin.initChart(ctxBar);
				        Ikin.createChart(data.typeChart, chart, data1);

						}
						$('#visible').on('click', '#_monitoring_', function(){
								Ikin.editMonitoring();
							
						});

						
					}//else
				});
			});
	}

	Ikin.initGauge = function(idCanvas, min, max, value){
		
		var gauge = new RGraph.Gauge({
                id: idCanvas,
                min: min,
                max: max,
                value: value
            }).draw();
	}

	Ikin.editMonitoring = function(){
		
		Ikin.clearContent();
		$.ajax({
		  type: "GET",
		  cache : false,
		  url: "editmonitoring.html",
		  dataType: "html"
		}).done(function(data){
			
			$('#visible').append(data);
			
			Ikin.getJenisMonitoring();
			Ikin.getDataToEditMonitoring();
			
		})
	}

	Ikin.getDataToEditMonitoring = function(){
			

		$.ajax({
		  type: "GET",
		  cache : false,
		  url: "editMonitoring.json",
		  dataType: "json"
		}).done(function(data){
			
			$('#namamonitoring').val(data.nama_monitoring);	
			$('#jenis').val(data.jenis);	
			$('#jenischart').val(data.chart);
			if(data.show == 1)	{
				$('#s_dashboard').prop('checked', true);
			}
			Ikin.getDataFilterToEditMonitoring();

		})

	}

	Ikin.getDataFilterToEditMonitoring = function(){

		$.ajax({
		  type: "GET",
		  cache : false,
		  url: "editFilterMonitoring.json",
		  dataType: "json"
		}).done(function(data){
			
			$.each(data, function(i, item){

				 	if(item.filter != null){
			  		arr[i] = i;	
					//console.log("+ "+arr);
			  			$('#_filter').append('<div id="filter_component_'+i+'"><div class="form-group">'+
								 '<div class="col-sm-5" id="filter_x_'+i+'">'+								  
								  '</div>'+
								  '<div class="col-sm-5" id="filter_type_x_'+i+'">'+								  
								  '</div>'+
								  '<div class="col-sm-2">'+
								  '<button id="remove_filter_component_'+i+'" class="btn btn-primary"><span class="glyphicon glyphicon-minus"></span></button>'+
								  '</div>'+
								  '</div></div>');
			  	
			  	if(item.type_filter == "input"){

			  		$('#filter_x_'+i).append('<input type="text" readonly class="form-control" name="filter[]" id="filter_'+i+'" placeholder="Nama Monitoring" value="'+item.filter+'">');
			  		$('#filter_type_x_'+i).append('<input type="text" class="form-control" name="value_filter[]" id="value_filter_'+i+'" value="'+item.value+'">');
			  	}
			  	if(item.type_filter == "dropdown"){

			  		$('#filter_x_'+i).append('<input type="text" readonly class="form-control" name="filter[]" id="filter_'+i+'" placeholder="Nama Monitoring" value="'+item.filter+'">');
			  		$('#filter_type_x_'+i).append('<select class="form-control" name="value_filter[]" id="value_filter_'+i+'"><option selected value="ihhhhirrr">Pilih</option></select>');
			  		
			  		//Ikin.getFilterWilayah("value_filter_"+i);

			  		}
			  	}


			  	Ikin.removeFilter("#remove_filter_component_"+i, i);
			})
			
			$('#visible').unbind('click');
			  	Ikin.addFilter();

		})
	}

	

}());