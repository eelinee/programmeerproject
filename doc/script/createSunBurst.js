/* Name: Eline Rietdijk
Studentnumber: 10811834

'createSunBurst.js'
This script......*/

function createSun(sunburstData, currentCountry, currentYear) {
	var sunData = sunburstData[2000]["Canada"]


	var legendaMarginSun = 0;
	
	sunWidth = width * 0.44 - margin.left - margin.right - legendaMarginSun;
	sunHeight = height / 2 - margin.top - margin.bottom;

	var sunSvg = d3.select(".sunDiv")
		.append("svg")
		.attr("id", "sunSvg")
		.attr("width", sunWidth + margin.left + margin.right + legendaMarginSun)
		.attr("height", sunHeight + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + sunWidth / 2 + "," + (sunHeight / 2) + ")")

	// var radius = (Math.min(sunWidth, sunHeight) / 2) - 10;

	// var formatNumber = d3.format(",d");

	// var x = d3.scale.linear()
	//     .range([0, 2 * Math.PI]);

	// var y = d3.scale.sqrt()
	//     .range([0, radius]);

	// var color = d3.scale.category20c();

	// var partition = d3.layout.partition()
	//     .value(function(d, i) { return d[i]["size"]; });

	// var arc = d3.svg.arc()
	//     .startAngle(function(d, i) { return Math.max(0, Math.min(2 * Math.PI, x(d[i].x))); })
	//     .endAngle(function(d, i) { return Math.max(0, Math.min(2 * Math.PI, x(d[i].x + d[i].dx))); })
	//     .innerRadius(function(d, i) { return Math.max(0, y(d[i].y)); })
	//     .outerRadius(function(d, i) { return Math.max(0, y(d[i].y + d[i].dy)); });

	// sunSvg.selectAll(".sunPath")
	// 	.data(partition.nodes(sunData))
	// 	.enter().append("path")
	// 	.attr("class", "sunPath")
	// 	.attr("d", arc)
	// 	.style("fill", function(d, i) { console.log(d[i].name); return color(d[i].children ? d : d[i].parent).name; })
	// 	.on("click", click)
	// 	.append("title")
	// 	.text(function(d, i) { return d[i].name + "\n" + formatNumber(d[i].value); });

	// function click(d) {
	// 	svg.transition()
	// 		.duration(750)
	// 		.tween("scale", function() {
	// 		var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
	// 			yd = d3.interpolate(y.domain(), [d.y, 1]),
	// 			yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
	// 		return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
	// 		})
	// 	.selectAll("path")
	// 		.attrTween("d", function(d) { return function() { return arc(d); }; });
	// }

	// d3.select(self.frameElement).style("height", height + "px");



	// var formatNumber = d3.format(",d");

	// var x = d3.scale.linear()
	//     .range([0, 2 * Math.PI]);

	// var y = d3.scale.sqrt()
	//     .range([0, radius]);

	// var colorSun = d3.scale.category20c();

	// var partition = d3.layout.partition()
	//     .value(function(d) { return d.size; });

	// var arc = d3.svg.arc()
	//     .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
	//     .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
	//     .innerRadius(function(d) { return Math.max(0, y(d.y)); })
	//     .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

	// console.log(partition.nodes(sunData))

	// sunSvg.selectAll("path")
 //    	.data(partition.nodes(sunData))
 // 		.enter().append("path")
	// 	.attr("d", arc)
	// 	.style("fill", function(d) { return colorSun((d.children ? d : d.parent).name); })
	// 	.on("click", click)
	// 	.append("title")
	// 	.text(function(d) { return d.name + "\n" + formatNumber(d.value); });

	// function click(d) {
	//   sunSvg.transition()
	//       .duration(750)
	//       .tween("scale", function() {
	//         var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
	//             yd = d3.interpolate(y.domain(), [d.y, 1]),
	//             yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
	//         return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
	//       })
	//     .selectAll("path")
	//       .attrTween("d", function(d) { return function() { return arc(d); }; });
	// }

	// d3.select(self.frameElement).style("height", height + "px");
};