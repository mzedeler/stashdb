'use strict';

const Resource = require('../../model.js').Resource;

module.exports = (req, res, next) => {
  const node = req.stashdb.node;
  if(node instanceof Resource) {
    if(node.content) {
      if(req.accepts(node.contentType) && req.acceptsCharsets(node.charset) && req.acceptsEncodings('gzip')) {
        res.set({'Name': node.name, 'Link': '<' + node.path + '>; rel=canonical', 'Content-Type': node.contentType + (node.charset ? '; charset=' + node.charset : ''), 'Content-Encoding': 'gzip'}).send(node.content);
      } else {
        res.status(406).end();
      }
    } else {
      res.status(204).end();
    }
  } else if(node === null || node === undefined) {
    res.status(404).end();
  } else {
    console.warn('Node not instanceof Resource:');
    console.warn(node);
    res.status(500).end();
  }
};

