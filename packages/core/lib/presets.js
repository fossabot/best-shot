'use strict';

const allowPresets = [
  'env',
  'serve',
  'babel',
  'style',
  'react',
  'vue',
  'web',
  'megalo',
  'mpx',
  'airkro'
];

function sortPresets([...data]) {
  data.sort((a, b) => allowPresets.indexOf(a) - allowPresets.indexOf(b));
  return data;
}

function checkPresets(presets) {
  if (!presets.every(item => allowPresets.includes(item))) {
    const message = `[${allowPresets.join(',')}]`;
    throw new Error(`Presets only allow ${message}`);
  }

  if (presets.includes('vue') && presets.includes('react')) {
    throw new Error("Don't use React and Vue at the same time");
  }

  if (presets.includes('megalo') && presets.includes('mpx')) {
    throw new Error("Don't use Megalo and Mpx at the same time");
  }
}

function importPresets(presets) {
  checkPresets(presets);
  try {
    const sorted = sortPresets(presets);
    const io = sorted
      .map(preset => `@best-shot/preset-${preset}`)
      // eslint-disable-next-line global-require, import/no-dynamic-require
      .map(name => require(name));
    return io;
  } catch (error) {
    console.error(error);
    throw new Error('Import presets fail.');
  }
}

module.exports = {
  allowPresets,
  checkPresets,
  sortPresets,
  importPresets
};
