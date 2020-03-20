const $ = require('jquery');
const TinyQueue = require('tinyqueue');

// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<canvas id='canvas'>JS Starter</canvas>`;

const height = 800;
const width = 800;

const canvas = $("#canvas");
canvas[0].width = width;
canvas[0].height = height;
const ctx = canvas[0].getContext('2d');
var myImageData = ctx.createImageData(width, height);

const colors = 4;

const data = myImageData.data;

const f = function(data, i, x, y, rgba) {
  data[(y * height + x) * colors + 0] = rgba.r(i, x, y) * 255;
  data[(y * height + x) * colors + 1] = rgba.g(i, x, y) * 255;
  data[(y * height + x) * colors + 2] = rgba.b(i, x, y) * 255;
  data[(y * height + x) * colors + 3] = rgba.a(i, x, y) * 255;
};

const rgba = function(width, height) {
  const r = (i, x, y) => {
    return 0;
  };

  const g = (i, x, y) => {
    return 0;
  };

  const b = (i, x, y) => {
    return d[i] / width;
  };

  const a = (i, x, y) => {
    return d[i];
  };

  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
};

const sx = width / 2;
const sy = height / 2;
const s = sx + sy * height;
const fcmp = (a, b) => {
  return d[a] - d[b];
};
const iq = [];
for (let r = 0; r < 10; r++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  const i = x + y * height;
  iq.push(i);
}

const q = new TinyQueue(iq, fcmp); //new Int32Array(data.length * 4 / colors);
const seen = new Int32Array(data.length / colors);
const d = new Float32Array(data.length / colors);

const cf = rgba(width, height);

let qi = 0;
let qj = 1;
while (q.length > 0) {
  const i = q.pop();
  qi++;

  seen[i] = 1;
  
  const x = i % height;
  const y = Math.floor(i / height);
  f(data, i, x, y, cf);

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const nx = x + dx;
      const ny = y + dy;
      if (Math.abs(dx) + Math.abs(dy) != 1) {
        continue;
      }
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const ni = nx + ny * height;
        if (seen[ni] === 0) {
          seen[ni] = 1;
          d[ni] = d[i] + 0.1 * (Math.random() - 0.2);
          q.push(ni);
          qj++;
        }
      }
    }
  }
}

ctx.putImageData(myImageData, 0, 0);