window.onload = function(){
	ajax();
	setInterval(function(){
		ajax();
	}, 3000)
}

function ajax(){
	$.get('http://localhost:3000/graficar', {
			curso_id : 'UTP1'
	})
	.done(function(data){
		var data = eval(data);
		console.log(data);

		var users = ['95729', '95730', '95731', '95732'];



		var dataChart = [];

		for(var j = 0; j < data.length; j++) {
			if(users.indexOf($.trim(data[j].ID)) > -1) {
				dataChart[users.indexOf($.trim(data[j].ID))] = data[j];
			}
		}

		console.log(dataChart);

		var Myline = new Chart(
			document.getElementById("chartjs-2"),
			{
				"type":"horizontalBar",
				"data":{
					"labels":["Equipo Rojo","Equipo Verde","Equipo Naranja","Equipo Azul"],
					"datasets":[
						{
							"label":"Desafío UTP",
							"data":[dataChart[0].total,dataChart[1].total,dataChart[2].total,dataChart[3].total],
							"fill":false,
							"backgroundColor":["rgba(220, 25, 25, 0.9)","rgba(31, 226, 11, 0.9)","rgba(235, 108, 14, 0.9)","rgba(12, 109, 240, 0.9)"],
							"borderColor":["rgb(220, 25, 25)","rgb(31, 226, 11)","rgb(235, 108, 14)","rgb(12, 109, 240)",],
							"borderWidth":1
						}
					]
				},
				"options":{
					"scales":{
						"xAxes":[
							{"ticks":
								{"beginAtZero":true}
							}
						]
					},

				    "animation": {
				        "duration": 0
				    },

				    "legends" : {
				    	"display" : false
				    },

				    "tooltips" : {
				    	enabled: true,
       					mode: 'single',
       					callbacks: {
				            label: function(tooltipItems, data) {
				                return "Puntaje Acumulado: " + tooltipItems.xLabel;
				            }
				        }
				    }
				}
			}
		)
		
	});
}