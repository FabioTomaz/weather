import { Component, ElementRef, ViewChild, OnInit, OnChanges, Input, AfterViewInit } from '@angular/core';
import { City } from '../model/city';
import * as d3 from 'd3';
import { ReplaySubject } from "rxjs";

@Component({
  selector: 'app-bar-plot',
  templateUrl: './bar-plot.component.html',
  styleUrls: [ './bar-plot.component.scss' ]
})
export class BarPlotComponent implements AfterViewInit {

  private citiesObserver = new ReplaySubject<City[]>(1);

  @Input() set cities(cities: City[]) {
    this.citiesObserver.next(cities);
  }

  @ViewChild('barChart')
  private chartContainer: ElementRef;

  margin = {top: 30, right: 40, bottom: 50, left: 60};

  constructor() {
  }

  ngAfterViewInit(): void {
    this.citiesObserver.subscribe((cities) => {
      this.createChart(cities);
    });
  }

  private createChart(cities: City[]): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).select('svg').remove();

    const data = cities;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', 300);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([ 0, contentWidth ])
      .padding(0.1)
      .domain(<ReadonlyArray<string>>data.map(d => d.name));

    // max value + 20%
    const maxVal = 1.2 * d3.max(data, d => d.temp);
    const y = d3
      .scaleLinear()
      .rangeRound([ contentHeight, 0 ])
      .domain([ 0, maxVal ]);

    const g = svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // text label for the y axis
    // svg.append("g")
    // .attr("class", "y axis")
    // .call(y)
    //  .append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("y", 6)
    // .attr("dy", ".71em")
    // .style("text-anchor", "end")
    // .text("Temperature (ºC)");

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, ".2f"))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.75em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.temp))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.temp));

    g.selectAll("text.bar")
      .data(data)
      .enter().append("text")
      .attr("class", "bar")
      .attr("text-anchor", "middle")
      .attr("x", function (d) {
        return x(d.name) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return y(d.temp) - 5;
      })
      .text(function (d) {
        return d.temp;
      });

      
  }

}
