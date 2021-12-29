import { HTTPServer, HTTPRouter } from './modules/apis/src/index.js';
import { HTTPFileServer } from './modules/apis/modules/http_file_server.js';

const ngcepochcom = new HTTPFileServer({ 
    doc_root: '/opt/ngcepoch/ngcepoch.com/doc_root/' 
});

const faranalyticsnet = new HTTPFileServer({ 
    doc_root: '/opt/faranalytics/faranalytics.net/doc_root/' 
});

const router = new HTTPRouter();

router.add(
    { method: /^GET$/i },
    (req, res) => { console.log(req.method, req.url, req.headers) },
    { continue: true }
);

router.add(
    { 
        method: /^GET$/i, 
        headers: { host: /^ngcepoch\.com$/i } 
    },
    ngcepochcom.handler
);

router.add(
    { 
        method: /^GET$/i, 
        headers: { host: /^faranalytics\.net$/i } 
    },
    faranalyticsnet.handler
);

const server = new HTTPServer({ port: 3000, host: '0.0.0.0' }, router);