let editor = null;

export async function initMonaco() {
  return new Promise((resolve) => {
    require.config({
      paths: { vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' }
    });

    require(['vs/editor/editor.main'], function () {
      editor = monaco.editor.create(document.getElementById('editor'), {
        value: '{\n  \n}',
        language: 'json',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 13,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        formatOnPaste: true,
        formatOnType: true,
      });

      resolve();
    });
  });
}

export function updateEditor(value) {
  if (editor) {
    editor.setValue(value);
    editor.getAction('editor.action.formatDocument').run();
  }
}

export function getEditorValue() {
  return editor ? editor.getValue() : '{}';
}

export function setEditorTheme(theme) {
  if (editor) {
    monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
  }
}
