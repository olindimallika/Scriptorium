import React, { useState } from 'react';

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { sql } from '@codemirror/lang-sql';

const Input: React.FC<{ darkMode: boolean }> = ( { darkMode } ) => {
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>('javascript');
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<{ type: string; message: string } | null>(null);
    const [logs, setLogs] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const theme = darkMode ? "dark" : "light";

    const languageExtensions: { [key: string]: any } = {
        javascript: javascript(),
        python: python(),
        c: cpp(),
        cpp: cpp(),
        csharp: cpp(),
        java: java(),
        go: go(),
        php: php(),
        rust: rust(),
        sql: sql(),
        ruby: python(),
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!code || !language) {
            setError({ type: 'InputError', message: 'Code and language are required.' });
            return;
        }

        setIsLoading(true);
        setError(null);
        setOutput('');
        setLogs(null);

        try {
            const response = await fetch('/api/code-writing-and-execution/input', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, language, input }),
            });

            const result = await response.json();

            if (response.ok) {
                setOutput(result.output || 'Execution successful, but no output.');
            } else {
                setError({
                    type: result.errorType || 'UnknownError',
                    message: result.message || 'An unknown error occurred.',
                });
            }
        } catch (err) {
            setError({
                type: 'NetworkError',
                message: 'Failed to connect to the server. Please try again later.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLogs = async () => {
        try {
            const response = await fetch('/api/logs');
            const result = await response.text();
            setLogs(result || 'No logs available.');
        } catch {
            setLogs('Failed to fetch logs.');
        }
    };

    return (
        <div id="background" className="flex flex-col items-center justify-center min-h-screen dark:bg-zinc-800 bg-gray-100 py-8">
            <div className="w-10/12 max-w-screen-xl m-14 m-auto p-5 bg-white shadow-md rounded-lg h-full">
                <h1 className="text-xl font-bold text-center text-stone-800">Code Execution</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-5 mb-5 bg-white">
                        <div className="flex-1">
                            <label className="block mb-2 text-stone-800 text-base font-bold" htmlFor="language">Language:</label>
                            <select className="w-full p-3 mb-2.5 border border-solid border-neutral-200 rounded-md text-stone-800 text-base" id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="csharp">C#</option>
                                <option value="java">Java</option>
                                <option value="go">Go</option>
                                <option value="php">PHP</option>
                                <option value="rust">Rust</option>
                                <option value="sql">SQL</option>
                                <option value="ruby">Ruby</option>
                            </select>

                            <label className="block mb-2 text-stone-800 text-base font-bold" htmlFor="code">Code:</label>
                            {/* CodeMirror Editor, specific CodeMirror syntax from youtube video "Javascript CodeMirror Syntax Highlighter Example to Highlight Source Code in Browser Full Example" by freemediatools and chatgpt*/}
                            <CodeMirror
                                value={code}
                                height="200px"
                                theme={theme}
                                extensions={[languageExtensions[language]]}
                                onChange={(value) => setCode(value)}
                                style={{
                                    border: "1px solid #ddd",
                                    marginTop: "20px",
                                }}
                            />
                        </div>

                        <div className="flex flex-1 flex-col">
                            <button 
                                type="submit" 
                                className="cursor-pointer bg-green-500 text-white border-none p-2.5 mt-8 rounded-md" 
                                disabled={isLoading}>
                                {isLoading ? 'Running...' : 'Run'}
                            </button>
                            <label className="block mb-2 mt-4 text-stone-800 text-base font-bold" htmlFor="input">Input (stdin):</label>
                            <textarea
                                id="input"
                                className="w-full p-2.5 mb-2.5 border border-solid border-neutral-200 rounded-md font-mono text-base"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter input for your program..."
                            />
                        </div>
                    </div>

                    <div className="mt-5 bg-slate-50 p-2.5 rounded-md">
                        {output && (
                            <div className="text-black">
                                <h3>Output:</h3>
                                <pre>{output}</pre>
                            </div>
                        )}
                        {error && (
                            <div className="mt-4 p-2.5 rounded-md font-bold">
                                <h3 className="text-black">Error:</h3>
                                <pre className="bg-red-500">
                                    <strong>Type:</strong> {error.type}{"\n"}
                                    <strong>Details:</strong> {error.message}
                                </pre>
                            </div>
                        )}
                        {logs && (
                            <div className="bg-neutral-700 text-red-100 p-2.5 rounded-md max-h-52 overflow-y-auto text-base">
                                <h3>Logs:</h3>
                                <pre>{logs}</pre>
                            </div>
                        )}
                    </div>
                    <button 
                        className="cursor-pointer bg-green-500 text-white border-none p-2.5 rounded-md"
                        type="button" 
                        onClick={fetchLogs}>
                        Show Logs
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Input;