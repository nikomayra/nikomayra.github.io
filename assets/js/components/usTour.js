import * as d3 from 'd3';
import * as topojson from 'topojson-client';

// State name mapping (TopoJSON uses full names)
const stateAbbreviations = {
  California: 'CA',
  Georgia: 'GA',
  Florida: 'FL',
  'New York': 'NY',
  Texas: 'TX',
  Washington: 'WA',
  Arizona: 'AZ',
  Hawaii: 'HI',
  Illinois: 'IL',
  Missouri: 'MO',
  Nebraska: 'NE',
  Pennsylvania: 'PA',
  'South Carolina': 'SC',
  Tennessee: 'TN',
  Alabama: 'AL',
  Colorado: 'CO',
  Kentucky: 'KY',
  'North Carolina': 'NC',
  'South Dakota': 'SD',
  Utah: 'UT',
  Wisconsin: 'WI',
  Idaho: 'ID',
  Montana: 'MT',
  'New Mexico': 'NM',
  Oregon: 'OR',
  Nevada: 'NV',
  Wyoming: 'WY',
  Kansas: 'KS',
  Connecticut: 'CT',
  Iowa: 'IA',
};

const visitedStates = {
  visitedStates: Object.keys(stateAbbreviations),
};

function getColorValue(cssVar) {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

document.addEventListener('DOMContentLoaded', async function () {
  // Constants for the visualization
  const width = 975;
  const height = 610;
  const transition_duration = 750;

  // Create tooltip
  const tooltip = d3.select('#us-tour').append('div').attr('class', 'tooltip');

  // Create SVG container
  const svg = d3
    .select('#us-tour')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;');

  // Load US topology data
  const us = await d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json');
  const path = d3.geoPath();

  // Draw states
  const states = svg
    .append('g')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .join('path')
    .attr('d', path)
    .attr('class', 'state')
    .each(function (d) {
      const stateName = d.properties.name;
      if (visitedStates.visitedStates.includes(stateName)) {
        d3.select(this).classed('visited', true);
      }
    })
    .on('mouseover', function (event, d) {
      const stateName = d.properties.name;
      if (!visitedStates.visitedStates.includes(stateName)) return;

      const stateAbbr = stateAbbreviations[stateName];
      tooltip
        .html(`${stateAbbr}`)
        .classed('visible', true)
        .style('left', `${event.clientX}px`)
        .style('top', `${event.clientY - 10}px`);
    })
    .on('mousemove', function (event) {
      tooltip.style('left', `${event.clientX}px`).style('top', `${event.clientY - 10}px`);
    })
    .on('mouseout', function () {
      tooltip.classed('visible', false);
    });

  // Add state borders
  svg
    .append('path')
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr('fill', 'none')
    .attr('stroke', getColorValue('--us-tour-state-border-color'))
    .attr('stroke-linejoin', 'round')
    .attr('d', path);
});
