import http from 'http';
import querystring from 'querystring';

function generateHTML (pageTitle, pageDescription) {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${pageTitle}</title>
    </head>
    <body>
        <h1>${pageTitle}</h1>
        <p>${pageDescription}</p>
    </body>
    </html>`;

    return {
        html: html,
        length: Buffer.byteLength(html, 'utf-8')
    };
}

function sanitize (string) {
    if (typeof string !== 'string') {
        return '';
    }

    return string.replace(/[&<>"'/]/g, (match) => {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#x27;';
            case '/': return '&#x2F;';
            default: return match;
        }
    });
}

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET') {
            switch (req.url) {
                case '/': {
                    const page = generateHTML('Home', 'Welcome to the Home Page');

                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Length': page.length,
                        'X-Content-Type-Options': 'nosniff'
                    });

                    res.end(page.html);
                    break;
                }

                case '/about': {
                    const page = generateHTML('About', 'Learn more about us');

                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Length': page.length,
                        'X-Content-Type-Options': 'nosniff'
                    });

                    res.end(page.html);
                    break;
                }

                case '/contact': {
                    const page = generateHTML('Contact', 'Get in touch');

                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Length': page.length,
                        'X-Content-Type-Options': 'nosniff'
                    });

                    res.end(page.html);
                    break;
                }

                default: {
                    const page = generateHTML('Page not found', 'The page you are looking for does not exist');

                    res.writeHead(404, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Length': page.length,
                        'X-Content-Type-Options': 'nosniff'
                    });

                    res.end(page.html);
                    break;
                }
            }
        } else if (req.method === 'POST' && req.url === '/submit') {
            let body = '';
            const MAX_SIZE = 1024 * 1024;
            let isTooLarge = false;

            req.on('data', (chunk) => {
                if (isTooLarge) return;

                body += chunk;

                if (Buffer.byteLength(body, 'utf-8') > MAX_SIZE) {
                    isTooLarge = true;

                    res.writeHead(413, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end('<h1>413 Payload Too Large</h1>');

                    req.destroy();
                }
            });

            req.on('end', () => {
                if (isTooLarge) return;

                const parsedData = querystring.parse(body);

                if (!parsedData.name || !parsedData.email) {
                    res.writeHead(400, { 'Content-Type': "text/html; charset=utf-8"});
                    return res.end('<h1>400 Bad Request: Invalid form data</h1>');
                }

                const safeName = sanitize(parsedData.name);
                const safeEmail = sanitize(parsedData.email);
                const content = `<h1>Form Submitted</h1><p>Name: ${safeName}</p><p>Email: ${safeEmail}</p>`;

                const responseHTML = generateHTML('Form Submitted', content);

                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Content-Length': responseHTML.length,
                    'X-Content-Type-Options': 'nosniff'
                });
                res.end(responseHTML.html);
            });
        } else {
            const page = generateHTML('Method Not Allowed', 'This HTTP method is not supported.');
            res.writeHead(405, {
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Length': page.length
            });
            res.end(page.html);
        }
    } catch (error) {
        console.error(error);
        const page = generateHTML('Server Error', 'Internal Server Error occurred.');
        res.writeHead(500, {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Length': page.length,
            'X-Content-Type-Options': 'nosniff'
        });
        res.end(page.html);
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});