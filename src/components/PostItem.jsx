    import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, SquarePen } from 'lucide-react';
import { useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const PostItem = ({ post }) => {
    const { username } = useSelector((state) => state.user);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isOwner = username === post.username;

    const timeAgo = formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true });

    return (
        <div className="card" style={{ padding: 0, marginBottom: '24px', overflow: 'hidden' }}>
            <header style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3 style={{ fontSize: '18px' }}>{post.title}</h3>
                {isOwner && (
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Trash2
                            size={20}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsDeleteModalOpen(true)}
                        />
                        <SquarePen
                            size={20}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsEditModalOpen(true)}
                        />
                    </div>
                )}
            </header>
            <div style={{ padding: '24px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#777777',
                    marginBottom: '16px',
                    fontSize: '14px'
                }}>
                    <span style={{ fontWeight: 700 }}>@{post.username}</span>
                    <span>{timeAgo}</span>
                </div>
                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
            </div>

            {isDeleteModalOpen && (
                <DeleteModal
                    id={post.id}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            )}
            {isEditModalOpen && (
                <EditModal
                    post={post}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default PostItem;
