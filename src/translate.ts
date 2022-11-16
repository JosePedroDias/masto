import { spawn } from 'node:child_process';

// todo support aborting
export function translate(content:string, sourceLang:string, targetLang:string = 'en'):Promise<string> {
    return new Promise((resolve, reject) => {
        content = content
        .replace(/"/g, '')
        .replace(/\n/g, ' ');
        //console.log(`ABOUT TO TRANSLATE:\n${content}\nxxx`);
        const proc = spawn(
            `argos-translate`,
            [`--from-lang`, sourceLang, `--to-lang`, targetLang, `"${content}"`],
            { cwd: process.cwd() }
        );

        proc.stdout.on('data', (data) => {
            let txt = data.toString().trim();
            txt = txt.substring(1, txt.length - 1);
            resolve(txt);
            proc.kill();
        });

        proc.stderr.on('data', (data) => {
            reject(data.toString());
            proc.kill();
        });
    });
}

/*
translate('tenho um gato sentado ao meu lado.', 'pt', 'en')
.then((o) => console.log('ok', o))
.catch((err) => console.error('error', err));
*/