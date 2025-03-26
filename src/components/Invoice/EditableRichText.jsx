import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const EditableRichText = ({ placeholder, value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder || ''}
      value={value || ''}
      onChange={onChange}
    />
  );
};

export default EditableRichText;

// import React from 'react';
// import { Editor, EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';

// const EditableRichText = ({ placeholder, value, onChange }) => {
//   const contentState = value
//     ? ContentState.createFromBlockArray(convertFromHTML(value))
//     : ContentState.createFromText('');

//   const [editorState, setEditorState] = React.useState(() =>
//     EditorState.createWithContent(contentState),
//   );

//   const handleEditorChange = (editorState) => {
//     setEditorState(editorState);

//     // Convert the editorState to HTML and pass it to the parent component
//     const contentState = editorState.getCurrentContent();
//     const html = convertToRaw(contentState);
//     console.log(html);
//     // const sanitizedHTML = typeof html === 'string' ? html.trim() : html;
//     // onChange(sanitizedHTML);
//   };

//   return (
//     <WysiwygEditor
//       editorState={editorState}
//       onEditorStateChange={handleEditorChange}
//       placeholder={placeholder || ''}
//     />
//   );
// };

// export default EditableRichText;
