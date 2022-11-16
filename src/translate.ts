import { spawn } from 'node:child_process';

export function translate(content:string, sourceLang:string, targetLang:string = 'en'):Promise<string> {
    return new Promise((resolve, reject) => {
        const proc = spawn(
            `argos-translate`,
            [`--from-lang`, sourceLang, `--to-lang`, targetLang, `${content}`],
            { cwd: process.cwd() }
        );

        proc.stdout.on('data', (data) => {
            resolve(data.toString().trim());
            proc.kill();
        });

        proc.stderr.on('data', (data) => {
            reject(data.toString());
            proc.kill();
        });

        /* proc.on('exit', (code) => {
            console.log(`Child process exited with exit code ${code}`);
        }); */
    });
}

/*
translate('tenho um gato sentado ao meu lado.', 'pt', 'en')
.then((o) => console.log('ok', o))
.catch((err) => console.error('error', err));
*/