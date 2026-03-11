import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../redux/postsSlice';

const EditModal = ({ post, onClose }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(updatePost({ id: post.id, title, content }));
        onClose();
    };

    return (
        <div className="modal-overlay overlay">
            <div className="modal-content" style={{ maxWidth: '660px' }}>
                <h2 style={{ marginBottom: '24px' }}>Edit item</h2>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
                    <input
                        type="text"
                        placeholder="Hello world"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Content</label>
                    <textarea
                        placeholder="Content here"
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ resize: 'none' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            border: '1px solid #999999',
                            padding: '7px 30px'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!title.trim() || !content.trim()}
                        onClick={handleSave}
                        style={{
                            backgroundColor: 'var(--success-color)',
                            color: 'white',
                            padding: '7px 30px'
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
