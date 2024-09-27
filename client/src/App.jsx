import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MonacoEditor from '@monaco-editor/react';  // Correct import

const socket = io('http://localhost:5000');

const App = () => {
    const [code, setCode] = useState('// Write your code here');
    const roomId = 'room1';

    useEffect(() => {
        socket.emit('joinRoom', roomId);

        socket.on('codeUpdate', (data) => {
            setCode(data.code);
        });

        return () => {
            socket.off('codeUpdate');
        };
    }, []);

    const handleCodeChange = (value) => {
        setCode(value);
        socket.emit('codeChange', { roomId, code: value });
    };

    return (
        <div>
            <h1>Collaborative Code Editor</h1>
            <MonacoEditor
                height="90vh"
                language="javascript"
                value={code}
                onChange={handleCodeChange}
            />
        </div>
    );
};

export default App;
